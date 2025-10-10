from flask import Blueprint, jsonify
from ..mock_data import data

personal_bp = Blueprint('personal', __name__)

@personal_bp.route('/personal', methods=['GET'])
def get_personal():
    return jsonify(data['personal'])
