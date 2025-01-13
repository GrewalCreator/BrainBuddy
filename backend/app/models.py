from . import db
from flask_login import UserMixin
from uuid import uuid4

def get_uuid():
    return uuid4().hex

class User(UserMixin, db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    name = db.Column(db.String(150), nullable=False)