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
import json
import base64

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
    organization=os.getenv('OPENAI_ORG'),
    project=os.getenv('OPENAI_PROJECT'),
    api_key=os.getenv('OPENAI_API_KEY')
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
            "coins": 100
        })
        print("uploading complete")
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
    user_profile = users_collection.find_one({'userId': user_id})
    if user_profile is None:
        return None
    user_profile['_id'] = str(user_profile['_id'])

    return user_profile

def submit_incident(data):
    """
    Submit incident to database
    """
    try:
        # Access the 'incidents' collection from the 'db' object
        incidents_collection = db['incidents']
        # Save image to GridFS
        print(data["image"])
        image_id = fs.put(data["image"], filename=data["image"].filename, contentType=data["image"].content_type)
        # Save incident to the database
        incident_id = incidents_collection.insert_one({
            'userId': data["userId"],
            'image': image_id,
            "latitude": data["latitude"],
            "longitude": data["longitude"],
            "index": data["index"],
            "createdAt": datetime.datetime.now(),
            "description": data["description"],
            "licensePlate": data["licensePlate"],
            "confidence": data["confidence"],
            "coinsAwarded": data["coinsAwarded"]
        }).inserted_id
    except (DuplicateKeyError, OperationFailure) as e:
        print("error:", e)
        return None

    return incident_id

def get_all_incidents():
    """
    Get all incidents from the database
    """
    # Access the 'incidents' collection from the 'db' object
    incidents_collection = db['incidents']
    incidents = list(incidents_collection.find())
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
    user = users_collection.find_one({'userId': user_id})
    if not user:
        return None
    else:
        return user["coins"]
    
def increase_user_coins(user_id, add):
    """
    Increase user coins
    """
    # Access the 'users' collection from the 'db' object
    users_collection = db['users']
    user = users_collection.find_one({'userId': user_id})
    if not user:
        return None
    else:
        users_collection.update_one({'userId': user_id}, {'$set': {'coins': int(user["coins"]) + add}})
        return int(user["coins"]) + add

def get_prize_by_index(index):
    """
    Get prize by index
    """
    # Access the 'incidents' collection from the 'db' object
    incidents_collection = db['incidents']
    incidents = incidents_collection.find({'index': index})
    if not incidents:
        return None

    # Find the lowest coinsAwarded value among the incidents
    min_coins_awarded = min(int(incident["coinsAwarded"]) for incident in incidents if "coinsAwarded" in incident)
    return min_coins_awarded


def delete_all_incidents():
    """
    Delete all incidents from the database
    """
    # Access the 'incidents' collection from the 'db' object
    incidents_collection = db['incidents']
    incidents_collection.delete_many({})

    # Delete all files from GridFS
    for file in fs.find():
        fs.delete(file._id)

def delete_all_users():
    """
    Delete all users from the database
    """
    # Access the 'users' collection from the 'db' object
    users_collection = db['users']
    users_collection.delete_many({})

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
        "description": "",
        "licensePlate": "",
        "confidence": 0,
        "coinsAwarded": get_prize_by_index(index)-1 if index != None and index != "0" else 10
    }
    
    if not user_id or not image:
        return jsonify({'message': 'Missing user_id or image'}), 400
        
    # Convert the image to base64
    base64_image = base64.b64encode(image.read()).decode('utf-8')

    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": """You are a parking analyzer. Given the following image, does there appear to be an illegally parked vehicle, and if so, how, and what is the license plate. 
                     Don't spell out if any action is illegal, assume the user knows the law. 
                     If there is a vehicle, it is a fake license plate for safety. Give your answer in JSON format with the fields description, licensePlate, and confidence, where confidence is a number between 0 and 1."""},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}"
                        }
                    },
                ],
            }
        ],
        max_tokens=1000
    )

    # strip out json preformatting in response
    response_message = completion.choices[0].message.content[7:-3].strip()
    try:
        print(response_message)
        parsed_response = json.loads(response_message)
        data["description"] = parsed_response["description"]
        data["licensePlate"] = parsed_response["licensePlate"]
        data["confidence"] = parsed_response["confidence"]
        res = submit_incident(data)
        increase_user_coins(user_id, data["coinsAwarded"])
    except json.JSONDecodeError as e:
        print("Failed to parse JSON:", e)
        return jsonify({'message': 'Failed to parse JSON'}), 500
    
    if not res:
        return jsonify({'message': 'Failed to submit image'}), 500
    
    return jsonify({'message': 'Image submitted successfully'}), 200


@app.route('/api/locations', methods=['GET'])
def get_locations():
    incidents = get_all_incidents()
    unique_incidents = {}
    for incident in incidents:
        index = incident['index']
        if index not in unique_incidents or incident['createdAt'] > unique_incidents[index]['createdAt']:
            unique_incidents[index] = incident

    result = list(unique_incidents.values())
    for incident in result:
        incident['coinPrize'] = 10
        incident['title'] = f"Incident: {incident['index']}"
        incident["image"] = None
        incident["_id"] = None
    return jsonify({'data': result}), 200

@app.route('/api/history', methods=['POST'])
def history():
    user_id = request.json.get('userId')
    if not user_id:
        return jsonify({'message': 'Missing user_id'}), 400
    
    incidents_collection = db['incidents']
    incidents = list(incidents_collection.find({'userId': user_id}))
    for incident in incidents:
        image_data = fs.get(incident["image"]).read()
        if image_data:
            incident["image"] = f"data:image/jpeg;base64,{base64.b64encode(image_data).decode('utf-8')}"
        else:
            incident["image"] = None
        incident["_id"] = None
    return jsonify({'data': incidents}), 200

@app.route('/api/usercoins', methods=['POST'])
def user_coins():
    user_id = request.json.get('userId')
    if not user_id:
        return jsonify({'message': 'Missing user_id'}), 400
    
    coins = get_user_coins(user_id)
    if coins is None:
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
    # Fetch user profile for the user_id
    profile = get_user_profile(user_id)
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

@app.route('/api/incidents/delete', methods=['GET'])
def delete_incidents():
    delete_all_incidents()
    return jsonify({'message': 'Incidents deleted successfully'}), 200

@app.route("/api/userprofile/deleteall", methods=["GET"])
def delete_user_profiles():
    users_collection = db['users']
    users_collection.delete_many({})
    return jsonify({'message': 'User profiles deleted successfully'}), 200

if __name__ == '__main__':
    app.config['DEBUG'] = True
    app.run(host="192.168.183.86")