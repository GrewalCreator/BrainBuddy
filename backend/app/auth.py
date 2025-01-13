from flask import Blueprint, request, jsonify, redirect, url_for
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User, db
from . import bcrypt

auth = Blueprint("auth", __name__)


@auth.route("/sign-up", methods=["POST"])
def sign_up():
    data = request.get_json()
    email = data.get("email", "").strip()
    password = data.get("password", "").strip()
    name = data.get("name", "").strip()

    # Validate input
    if not email or not password or not name:
        return jsonify({"error": "Email, password, and name are required"}), 400

    # Check if user exists
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    # Create new user
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    new_user = User(email=email, password=hashed_password, name=name)
    db.session.add(new_user)
    db.session.commit()

    return (
        jsonify(
            {
                "message": f"User {name} registered successfully",
                "id": new_user.id,
                "email": new_user.email,
            }
        ),
        201,
    )


@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # Validate input
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Check if user exists
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not registered"}), 401

    # Validate password
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    # Log the user in
    login_user(user)
    return (
        jsonify(
            {"message": f"Welcome {user.name}!", "id": user.id, "email": user.email}
        ),
        200,
    )


@auth.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200


@auth.route("/api/is_authenticated", methods=["GET"])
def is_authenticated():
    if current_user.is_authenticated:
        return (
            jsonify(
                {
                    "isAuthenticated": True,
                    "user": {
                        "id": current_user.id,
                        "name": current_user.name,
                        "email": current_user.email,
                    },
                }
            ),
            200,
        )
    else:
        return jsonify({"isAuthenticated": False}), 401


# # Example of a protected route
# @auth.route("/profile")
# @login_required
# def profile():
#     return jsonify({"message": f"Welcome to your profile, {current_user.name}!"})
