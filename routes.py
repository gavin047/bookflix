from flask import Blueprint, request, jsonify
from models import User, Book, CartItem, Purchase
from database import db

main_routes = Blueprint('main', __name__)

# User Registration
@main_routes.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "User already exists!"}), 400

    new_user = User(email=data['email'], password=data['password'])  # Hash the password in production!
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"message": "User registered successfully!"}), 201

# User Login
@main_routes.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user and user.password == data['password']:  # Hash comparison in production!
        return jsonify({"access_token": "dummy_token"}), 200  # Replace with actual token generation logic
    
    return jsonify({"message": "Invalid credentials"}), 401

# Manage Books
@main_routes.route('/api/books', methods=['GET', 'POST'])
def manage_books():
    if request.method == 'GET':
        return get_all_books()
    return add_new_book()

def get_all_books():
    books = Book.query.all()
    return jsonify([{
        "id": book.id,
        "title": book.title,
        "author": book.author,
        "release_date": book.release_date.isoformat(),
        "star_rating": book.star_rating,
        "price": book.price,
    } for book in books]), 200

def add_new_book():
    data = request.get_json()
    new_book = Book(
        title=data['title'],
        author=data['author'],
        release_date=data['release_date'],
        star_rating=data['star_rating'],
        price=data['price']
    )
    db.session.add(new_book)
    db.session.commit()
    return jsonify({"message": "Book added successfully!"}), 201

# Add to Cart
@main_routes.route('/api/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    cart_item = CartItem(
        user_id=data['user_id'], 
        book_id=data['book_id'], 
        quantity=data.get('quantity', 1)  # Default to 1 if not provided
    )
    db.session.add(cart_item)
    db.session.commit()
    return jsonify({"message": "Book added to cart!"}), 201

# Get Cart Items
@main_routes.route('/api/cart/<int:user_id>', methods=['GET'])
def get_cart(user_id):
    cart_items = CartItem.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "id": item.id,
        "book": {
            "id": item.book.id,
            "title": item.book.title,
            "author": item.book.author,
            "price": item.book.price,
        },
        "quantity": item.quantity,
        "added_on": item.added_on.isoformat(),
    } for item in cart_items]), 200

# Process Purchase
@main_routes.route('/api/purchase', methods=['POST'])
def purchase_book():
    data = request.get_json()
    new_purchase = Purchase(
        user_id=data['user_id'], 
        book_id=data['book_id'], 
        quantity=data.get('quantity', 1)  # Default to 1 if not provided
    )
    db.session.add(new_purchase)
    db.session.commit()
    return jsonify({"message": "Purchase recorded successfully!!!"}), 201

# Get all purchases for a user (for order history)
@main_routes.route('/api/purchases/<int:user_id>', methods=['GET'])
def get_user_purchases(user_id):
    purchases = Purchase.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "id": purchase.id,
        "book_id": purchase.book_id,
        "quantity": purchase.quantity,
        "purchase_date": purchase.purchase_date.isoformat(),
    } for purchase in purchases]), 200
