from database import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    
    # Relationships
    cart_items = db.relationship('CartItem', backref='user', lazy=True)
    purchases = db.relationship('Purchase', backref='user', lazy=True)  # Relationship to Purchases

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(255), nullable=False)
    release_date = db.Column(db.Date, nullable=False)
    star_rating = db.Column(db.Float, nullable=False)
    price = db.Column(db.Float, nullable=False)

    # Relationship to Purchases
    purchases = db.relationship('Purchase', backref='book', lazy=True)

class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)  # Quantity of the book in the cart
    added_on = db.Column(db.DateTime, default=datetime.utcnow)  # Timestamp when added to cart

    book = db.relationship('Book', backref='cart_items', lazy=True)

class Purchase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    purchase_date = db.Column(db.DateTime, default=datetime.utcnow)  # When the purchase was made
    quantity = db.Column(db.Integer, default=1)  # Quantity of books purchased

    book = db.relationship('Book', backref='purchases', lazy=True)  # Relationship to Book

# Optionally: You can create a model for order history if needed
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    order_date = db.Column(db.DateTime, default=datetime.utcnow)  # When the order was placed
    total_amount = db.Column(db.Float, nullable=False)  # Total amount for the order