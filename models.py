from database import db
from datetime import datetime

class User(db.Model):
    tablename = 'user'

id = db.Column(db.Integer, primary_key=True)
email = db.Column(db.String(120), unique=True, nullable=False)
password = db.Column(db.String(128), nullable=False)

cart_items = db.relationship('CartItem', backref='user', lazy=True)
purchases = db.relationship('Purchase', backref='user', lazy=True)
class Book(db.Model):
    tablename = 'book'

id = db.Column(db.Integer, primary_key=True)
title = db.Column(db.String(255), nullable=False)
author = db.Column(db.String(255), nullable=False)
release_date = db.Column(db.Date, nullable=False)
star_rating = db.Column(db.Float, nullable=False)
price = db.Column(db.Float, nullable=False)

purchases = db.relationship('Purchase', backref='book', lazy=True)
class CartItem(db.Model):
    tablename = 'cart_item'

id = db.Column(db.Integer, primary_key=True)
user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
quantity = db.Column(db.Integer, default=1)
added_on = db.Column(db.DateTime, default=datetime.utcnow)

book = db.relationship('Book', backref='cart_items', lazy=True)
class Purchase(db.Model):
    tablename = 'purchase'

id = db.Column(db.Integer, primary_key=True)
user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
purchase_date = db.Column(db.DateTime, default=datetime.utcnow)
quantity = db.Column(db.Integer, default=1)

book = db.relationship('Book', backref='purchases', lazy=True)
class Order(db.Model):
    tablename = 'order'

id = db.Column(db.Integer, primary_key=True)
user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
order_date = db.Column(db.DateTime, default=datetime.utcnow)
total_amount = db.Column(db.Float, nullable=False)