from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS
from flask_session import Session
from flask_bcrypt import Bcrypt
from os import path, getenv
from dotenv import load_dotenv
from datetime import timedelta


load_dotenv()

db = SQLAlchemy()
login_manager = LoginManager()
bcrypt = Bcrypt()
DB_NAME = "database.db"


def create_app():
    app = Flask(__name__)

    # Configurations
    app.config["SECRET_KEY"] = getenv("SECRET_KEY")
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_NAME}"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    app.config["SESSION_TYPE"] = "filesystem"
    app.config["SESSION_PERMANENT"] = False
    app.config["SESSION_USE_SIGNER"] = True
    app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(hours=1)

    # for handling cookies securely
    app.config["SESSION_COOKIE_SECURE"] = True  # HTTPS only
    app.config["SESSION_COOKIE_HTTPONLY"] = True  # Prevent JavaScript access
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"  # Mitigate CSRF

    # Initialize extensions
    db.init_app(app)
    login_manager.init_app(app)
    Session(app)
    CORS(app)

    # Register blueprints
    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/")

    # Flask-Login user loader
    from .models import User

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(str(id))

    return app


def create_database(app):
    with app.app_context():
        if not path.exists("app/" + DB_NAME):
            db.create_all()
            print("Database has been created.")
