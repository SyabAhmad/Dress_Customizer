"""
Authentication routes: signup, signin, token refresh.
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from app import db
from app.models import Account

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/signup', methods=['POST'])
def signup():
    """Register a new account."""
    try:
        data = request.get_json()
        
        required_fields = ['email', 'password', 'firstName', 'lastName', 'phone', 'userType']
        if not data or not all(data.get(field) for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Check if account exists
        if Account.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Account already exists'}), 409
        
        # Validate password length
        if len(data['password']) < 6:
            return jsonify({'error': 'Password must be at least 6 characters'}), 400
        
        # Create new account
        account = Account(
            email=data['email'],
            password_hash=generate_password_hash(data['password']),
            first_name=data.get('firstName', ''),
            last_name=data.get('lastName', ''),
            phone=data.get('phone', ''),
            account_type=data.get('userType', 'individual')
        )
        db.session.add(account)
        db.session.commit()
        
        # Generate access token
        access_token = create_access_token(identity=account.id)
        
        return jsonify({
            'message': 'Account created successfully',
            'account': account.to_dict(),
            'access_token': access_token
        }), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@auth_bp.route('/signin', methods=['POST'])
def signin():
    """Authenticate account and return JWT token."""
    try:
        data = request.get_json()
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Missing email or password'}), 400
        
        # Find account
        account = Account.query.filter_by(email=data['email']).first()
        
        if not account or not check_password_hash(account.password_hash, data['password']):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Generate access token
        access_token = create_access_token(identity=account.id)
        
        return jsonify({
            'message': 'Login successful',
            'account': account.to_dict(),
            'access_token': access_token
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@auth_bp.route('/verify', methods=['GET'])
@jwt_required()
def verify():
    """Verify JWT token is valid."""
    account_id = get_jwt_identity()
    account = Account.query.get(account_id)
    
    if not account:
        return jsonify({'error': 'Account not found'}), 404
    
    return jsonify({
        'valid': True,
        'account': account.to_dict()
    }), 200
