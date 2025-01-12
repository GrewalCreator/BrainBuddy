from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from os import path, getenv
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()
login_manager = LoginManager()
DB_NAME = "database.db" # TODO: replace with DB name

def create_app():
    app = Flask(__name__)

    # Configuration
    app.config['SECRET_KEY'] = getenv('SECRET_KEY')  # TODO: Replace with a real secret key
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'  # TODO: Replace with your DB URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions
    db.init_app(app)
    login_manager.init_app(app)

    # Register blueprints
    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')  # Main routes
    app.register_blueprint(auth, url_prefix='/')  # Authentication routes

    # Flask-Login user loader
    from .models import User  # Import the User model TODO: create user model in models.py
    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))  # Fetch user by ID

    return app

def create_database(app):
    with app.app_context():
        if not path.exists('app/' + DB_NAME):
            db.create_all()
            print('Database has been created.')