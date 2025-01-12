from flask import Blueprint, request, jsonify

auth = Blueprint("auth", __name__)

@auth.route("/login")
def login():
    return "<p>Login</p>" # TODO

@auth.route("/logout")
def logout():
    return "<p>Logout</p>" # TODO

@auth.route("/sign-up")
def sign_up():
    return "<p>Sign Up</p>" # TODO
