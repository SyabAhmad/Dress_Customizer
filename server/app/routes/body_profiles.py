"""
Body profile routes: get and update body measurements.
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import BodyProfile

body_profiles_bp = Blueprint('body_profiles', __name__)


@body_profiles_bp.route('', methods=['GET'])
@jwt_required()
def get_body_profile():
    """Get account's body profile measurements."""
    try:
        account_id = get_jwt_identity()
        profile = BodyProfile.query.filter_by(account_id=account_id).first()
        
        if not profile:
            # Return default body profile if not found
            return jsonify({
                'height': 100,
                'width': 100,
                'build': 0,
                'head': 100
            }), 200
        
        return jsonify(profile.to_dict()), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@body_profiles_bp.route('', methods=['POST'])
@jwt_required()
def create_or_update_body_profile():
    """Create or update body profile measurements."""
    try:
        account_id = get_jwt_identity()
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Try to get existing body profile
        profile = BodyProfile.query.filter_by(account_id=account_id).first()
        
        if profile:
            # Update existing
            profile.height = float(data.get('height', profile.height))
            profile.width = float(data.get('width', profile.width))
            profile.build = float(data.get('build', profile.build))
            profile.head = float(data.get('head', profile.head))
            message = 'Body profile updated successfully'
        else:
            # Create new
            profile = BodyProfile(
                account_id=account_id,
                height=float(data.get('height', 100)),
                width=float(data.get('width', 100)),
                build=float(data.get('build', 0)),
                head=float(data.get('head', 100))
            )
            db.session.add(profile)
            message = 'Body profile created successfully'
        
        db.session.commit()
        
        return jsonify({
            'message': message,
            'profile': profile.to_dict()
        }), 200 if profile.id else 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
