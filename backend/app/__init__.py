import os
import secrets
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS
from flask_session import Session
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from datetime import timedelta

# Load environment variables from .env file
load_dotenv()

# Initialize Flask extensions
db = SQLAlchemy()
login_manager = LoginManager()
bcrypt = Bcrypt()

# Define paths
BASE_DIR = os.path.abspath(os.path.dirname(__file__))  # Base directory of the app
INSTANCE_DIR = os.path.join(BASE_DIR, "instance")  # Path for the instance folder
SESSION_DIR = os.path.join(
    BASE_DIR, "flask_session"
)  # Path for the flask_session folder
DB_NAME = "database.db"


def get_or_generate_secret_key():
    """
    Retrieves the BRAIN_BUDDY_KEY from the environment. If it doesn't exist, generates a new key,
    saves it to the .env file, and uses it.
    """
    key = os.getenv("BRAIN_BUDDY_KEY")

    if not key:
        # Generate a new secret key
        key = secrets.token_hex(32)
        print(f"Generated a new secret key: {key}")

        # Save the key to the .env file
        with open(".env", "a") as env_file:
            env_file.write(f"\nBRAIN_BUDDY_KEY={key}")

        # Reload environment variables
        load_dotenv()

    return key


def create_app():
    # Create the Flask app
    app = Flask(__name__, instance_path=INSTANCE_DIR, instance_relative_config=True)

    # Configurations
    app.config["SECRET_KEY"] = get_or_generate_secret_key()
    app.config["SQLALCHEMY_DATABASE_URI"] = (
        f"sqlite:///{os.path.join(INSTANCE_DIR, DB_NAME)}"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Flask-Session configurations
    app.config["SESSION_TYPE"] = "filesystem"
    app.config["SESSION_FILE_DIR"] = SESSION_DIR
    app.config["SESSION_PERMANENT"] = True
    app.config["SESSION_USE_SIGNER"] = True
    app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(hours=1)

    # Secure cookie configurations
    app.config["SESSION_COOKIE_SECURE"] = False  # Use True in production
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
    app.config["REMEMBER_COOKIE_DURATION"] = timedelta(hours=1)

    # Ensure instance and session directories exist
    os.makedirs(INSTANCE_DIR, exist_ok=True)
    os.makedirs(SESSION_DIR, exist_ok=True)

    # Initialize extensions
    db.init_app(app)
    login_manager.init_app(app)
    Session(app)
    CORS(app)

    # Register blueprints
    from .views import views
    from .auth import auth
    from .buddyAI import buddyAI

    app.register_blueprint(views, url_prefix="/")  # Main routes
    app.register_blueprint(auth, url_prefix="/")  # Authentication routes
    app.register_blueprint(buddyAI, url_prefix="/")

    # Flask-Login user loader
    from .models import User

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(str(user_id))

    return app


def create_database(app):
    with app.app_context():
        db_path = os.path.join(INSTANCE_DIR, DB_NAME)
        if not os.path.exists(db_path):
            db.create_all()
            print(f"Database has been created at: {db_path}")
