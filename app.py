from flask import Flask
from flask_cors import CORS
from database import db
from routes import main_routes

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3002"}})  # Allow CORS from frontend URL

# Load configuration from config.py
app.config.from_object('config.Config')

# Initialize the database
db.init_app(app)

# Register routes
app.register_blueprint(main_routes)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables if they don't exist
    app.run(port=5000, debug=True)  # Run on port 5000