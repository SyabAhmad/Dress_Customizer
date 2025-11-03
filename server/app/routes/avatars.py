"""
Avatar routes: get and update user avatar measurements.
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Avatar

avatars_bp = Blueprint('avatars', __name__)


@avatars_bp.route('', methods=['GET'])
@jwt_required()
def get_avatar():
    """Get user's avatar measurements."""
    try:
        user_id = get_jwt_identity()
        avatar = Avatar.query.filter_by(user_id=user_id).first()
        
        if not avatar:
            # Return default avatar if not found
            return jsonify({
                'height': 100,
                'width': 100,
                'build': 0,
                'head': 100
            }), 200
        
        return jsonify(avatar.to_dict()), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@avatars_bp.route('', methods=['POST'])
@jwt_required()
def create_or_update_avatar():
    """Create or update user avatar measurements."""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Try to get existing avatar
        avatar = Avatar.query.filter_by(user_id=user_id).first()
        
        if avatar:
            # Update existing
            avatar.height = float(data.get('height', avatar.height))
            avatar.width = float(data.get('width', avatar.width))
            avatar.build = float(data.get('build', avatar.build))
            avatar.head = float(data.get('head', avatar.head))
            message = 'Avatar updated successfully'
        else:
            # Create new
            avatar = Avatar(
                user_id=user_id,
                height=float(data.get('height', 100)),
                width=float(data.get('width', 100)),
                build=float(data.get('build', 0)),
                head=float(data.get('head', 100))
            )
            db.session.add(avatar)
            message = 'Avatar created successfully'
        
        db.session.commit()
        
        return jsonify({
            'message': message,
            'avatar': avatar.to_dict()
        }), 200 if avatar.id else 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
