from flask import Flask, request, jsonify
import os
import pymongo
import gridfs
from pymongo.errors import DuplicateKeyError, OperationFailure
from bson.objectid import ObjectId
from bson.errors import InvalidId
from dotenv import load_dotenv
import datetime
from openai import OpenAI

load_dotenv()
app = Flask(__name__)
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
# Initialize PyMongo with the Flask app
mongo = pymongo.MongoClient(app.config['MONGO_URI'])
# Get database
db = mongo.get_database("data")
# Initialize GridFS
fs = gridfs.GridFS(db)

client = OpenAI(
    organization='',
    project='',
    api_key=''  # Remove the actual API key
)

# Uploads a new user profile to the database
def upload_user_profile(data):
    print("uploading")
    try:
        # Access the 'users' collection from the 'db' object
        users_collection = db['users']
        # Save user profile to the database
        users_collection.insert_one({
            '_id': ObjectId(),  # Generate a new ObjectId for the user
            'userId': data["userId"],
            'firstName': data['firstName'],
            'lastName': data['lastName'],
            'email': data['email'],
            'phoneNumber': data['phoneNumber'],
            'homeCity': data['homeCity'],
            'profilePicture': data['profilePicture'],
            "coins": 0
        })
        print("hi!")
    except Exception as e:
        print("error:", e)
        return None

    return data["userId"]


def get_user_profile(user_id):
    """
    Get user profile
    """

    # Access the 'users' collection from the 'db' object
    users_collection = db['users']
    print("user_id:", user_id)
    user_profile = users_collection.find_one({'userId': user_id})
    user_profile['_id'] = str(user_profile['_id'])

    return user_profile

def submit_incident(data):
    """
    Submit incident to database
    """
    try:
        print("trying")
        # Access the 'incidents' collection from the 'db' object
        incidents_collection = db['incidents']
        # Save image to GridFS
        image_id = fs.put(data["image"], filename=data["image"].filename)
        # Save incident to the database
        incident_id = incidents_collection.insert_one({
            'userId': data["userId"],
            'imaged': image_id,
            "latitude": data["latitude"],
            "longitude": data["longitude"],
            "index": data["index"],
            "createdAt": datetime.datetime.now(),
        }).inserted_id
    except (DuplicateKeyError, OperationFailure) as e:
        print("error:", e)
        return None

    return incident_id

def get_all_incidents():
    """
    Get all incidents from the database
    """
    print("test")
    # Access the 'incidents' collection from the 'db' object
    incidents_collection = db['incidents']
    incidents = list(incidents_collection.find())
    print(incidents)

    return incidents

def get_gift_cards():
    """
    Get all gift cards from the database
    """
    # Access the 'gift_cards' collection from the 'db' object
    gift_cards_collection = db['giftcards']
    gift_cards = list(gift_cards_collection.find())

    return gift_cards

def get_user_coins(user_id):
    """
    Get user coins
    """

    # Access the 'users' collection from the 'db' object
    users_collection = db['users']
    user_coins = users_collection.find_one({'userId': user_id})['coins']

    return user_coins


########################################################
########################################################
########################################################
########################################################
########################################################

# API: Submit a new incident
@app.route('/api/submit_incident', methods=['POST'])
def submit():
    user_id = request.form.get('userId')
    image = request.files.get('image')

    incidents_collection = db['incidents']
    max_index = incidents_collection.find_one(sort=[("index", -1)])["index"] if incidents_collection.count_documents({}) > 0 else 0
    index = request.form.get("index")
    data = {
        "userId": user_id,
        "image": image,
        "latitude": request.form.get('latitude'),
        "longitude": request.form.get('longitude'),
        "index": int(index) if (index != None and index != "0") else max_index + 1,
    }
    
    if not user_id or not image:
        return jsonify({'message': 'Missing user_id or image'}), 400
    
    # Call OpenAPI


    res = submit_incident(data)
    if not res:
        return jsonify({'message': 'Failed to submit image'}), 500
    
    return jsonify({'message': 'Image submitted successfully'}), 200


@app.route('/api/locations', methods=['GET'])
def get_locations():
    # Dummy data for locations in Washington DC
    
    incidents = get_all_incidents()
    unique_incidents = {}
    for incident in incidents:
        index = incident['index']
        if index not in unique_incidents or incident['createdAt'] > unique_incidents[index]['createdAt']:
            unique_incidents[index] = incident

    result = list(unique_incidents.values())
    for incident in result:
        incident['coinPrize'] = 10
        incident['title'] = 'Incident'
        incident['description'] = 'Incident Description'
        incident["imaged"] = None
        incident["_id"] = str(incident["_id"])
    return jsonify({'data': result}), 200

@app.route('/api/history', methods=['POST'])
def history():
    user_id = request.json.get('userId')
    if not user_id:
        return jsonify({'message': 'Missing user_id'}), 400
    
    incidents_collection = db['incidents']
    incidents = list(incidents_collection.find({'userId': user_id}))
    for incident in incidents:
        incident['coinPrize'] = 10
        incident['title'] = 'Incident'
        incident['description'] = 'Incident Description'
        incident["imaged"] = None
        incident["_id"] = str(incident["_id"])
    return jsonify({'data': incidents}), 200

@app.route('/api/usercoins', methods=['POST'])
def user_coins():
    user_id = request.json.get('userId')
    print(user_id)
    if not user_id:
        return jsonify({'message': 'Missing user_id'}), 400
    
    coins = get_user_coins(user_id)
    if not coins:
        return jsonify({'message': 'Failed to fetch coins'}), 500
    # Fetch coins for the user_id
    return jsonify({'data': {'coins': coins}}), 200

@app.route('/api/giftcards', methods=['GET'])
def gift_cards():
    # Fetch available gift cards

    data = get_gift_cards()
    for gift_card in data:
        gift_card["_id"] = str(gift_card["_id"])

    return jsonify({'data': data}), 200

@app.route('/api/userprofile', methods=['POST'])
def fetch_user_profile():
    user_id = request.json.get('userId')
    print(user_id)
    # Fetch user profile for the user_id
    profile = get_user_profile(user_id)
    print("success here")
    if not profile:
        return jsonify({'message': 'Failed to fetch user profile'}), 500
    return jsonify({'data': profile}), 200
    

@app.route('/api/userprofile/upload', methods=['POST'])
def upload_user_profile_route():
    user_profile = request.json
    res = upload_user_profile(user_profile)
    if not res:
        return jsonify({'message': 'Failed to upload user profile'}), 500
    return jsonify({'message': 'User profile uploaded successfully'}), 200          

if __name__ == '__main__':
    app.config['DEBUG'] = True
    app.run(host="10.150.237.229")