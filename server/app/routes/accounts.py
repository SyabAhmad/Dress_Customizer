"""
Account routes: get profile, update profile.
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Account, BodyProfile

accounts_bp = Blueprint('accounts', __name__)


@accounts_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get current account profile."""
    try:
        account_id = get_jwt_identity()
        account = Account.query.get(account_id)
        
        if not account:
            return jsonify({'error': 'Account not found'}), 404
        
        return jsonify(account.to_dict()), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@accounts_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """Update account profile."""
    try:
        account_id = get_jwt_identity()
        account = Account.query.get(account_id)
        
        if not account:
            return jsonify({'error': 'Account not found'}), 404
        
        data = request.get_json()
        
        if 'first_name' in data:
            account.first_name = data['first_name']
        if 'last_name' in data:
            account.last_name = data['last_name']
        if 'phone' in data:
            account.phone = data['phone']
        if 'account_type' in data:
            account.account_type = data['account_type']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Profile updated successfully',
            'account': account.to_dict()
        }), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@accounts_bp.route('/delete', methods=['DELETE'])
@jwt_required()
def delete_account():
    """Delete account and all related data."""
    try:
        account_id = get_jwt_identity()
        account = Account.query.get(account_id)
        
        if not account:
            return jsonify({'error': 'Account not found'}), 404
        
        db.session.delete(account)
        db.session.commit()
        
        return jsonify({'message': 'Account deleted successfully'}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
