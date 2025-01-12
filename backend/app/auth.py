from flask import Blueprint, request, jsonify, redirect, url_for
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User, db

auth = Blueprint("auth", __name__)

@auth.route("/login", methods=["POST"])
def login():
    data = request.json  # Expecting JSON payload: { "email": "user@example.com", "password": "password" }
    email = data.get("email")
    password = data.get("password")

    # Validate input
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Find user by email
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    # Log the user in
    login_user(user)
    return jsonify({"message": f"Welcome {user.name}!"}), 200

@auth.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200

@auth.route("/sign-up", methods=["POST"])
def sign_up():
    data = request.json  # Expecting JSON payload: { "email": "user@example.com", "password": "password", "name": "John Doe" }
    email = data.get("email")
    password = data.get("password")
    name = data.get("name")

    # Validate input
    if not email or not password or not name:
        return jsonify({"error": "Email, password, and name are required"}), 400

    # Check if email already exists
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    # Create a new user
    hashed_password = generate_password_hash(password, method="sha256")
    new_user = User(email=email, password=hashed_password, name=name)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": f"User {name} registered successfully"}), 201

# Example of a protected route
@auth.route("/profile")
@login_required
def profile():
    return jsonify({"message": f"Welcome to your profile, {current_user.name}!"})