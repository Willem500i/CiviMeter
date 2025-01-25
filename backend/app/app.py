from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return "Hello, World!"

@app.route('/api/submit', methods=['POST'])
def submit():
    user_id = request.form.get('userId')
    image = request.files.get('image')
    # Process the image and user_id as needed
    return jsonify({'message': 'Image uploaded successfully'}), 200

@app.route('/api/history', methods=['POST'])
def history():
    user_id = request.json.get('userId')
    # Fetch history for the user_id
    dummy_data = [
        {
            'licensePlate': 'ABC123',
            'description': 'Parked in a no-parking zone',
            'isSafetyHazard': False,
            'coinsAwarded': 10,
            'imageUrl': 'https://via.placeholder.com/150/0000FF/808080?text=No+Parking',
        },
        {
            'licensePlate': 'XYZ789',
            'description': 'Blocking a fire hydrant',
            'isSafetyHazard': True,
            'coinsAwarded': 20,
            'imageUrl': 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Fire+Hydrant',
        },
        {
            'licensePlate': 'LMN456',
            'description': 'Double parked',
            'isSafetyHazard': False,
            'coinsAwarded': 15,
            'imageUrl': 'https://via.placeholder.com/150/00FF00/000000?text=Double+Parked',
        },
    ]
    return jsonify({'data': dummy_data}), 200

@app.route('/api/usercoins', methods=['POST'])
def user_coins():
    user_id = request.json.get('userId')
    # Fetch coins for the user_id
    return jsonify({'data': {'coins': 100}}), 200

@app.route('/api/giftcards', methods=['GET'])
def gift_cards():
    # Fetch available gift cards
    dummy_data = [
        {
            'name': 'CVS',
            'value': 10,
            'imageUrl': 'https://www.giftcards.com/content/dam/bhn/live/nam/us/en/catalog-assets/product-images/07675019055/07675019055_74842_master.png/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
            'coinCost': 1000,
            'website': 'https://www.cvs.com',
        },
        {
            'name': 'Coke',
            'value': 5,
            'imageUrl': 'https://via.placeholder.com/150/00FF00/000000?text=Coke',
            'coinCost': 500,
            'website': 'https://www.coca-cola.com',
        },
        {
            'name': 'Amazon',
            'value': 25,
            'imageUrl': 'https://via.placeholder.com/150/0000FF/808080?text=Amazon',
            'coinCost': 2500,
            'website': 'https://www.amazon.com',
        },
        {
            'name': 'Steam',
            'value': 20,
            'imageUrl': 'https://via.placeholder.com/150/FFFF00/000000?text=Steam',
            'coinCost': 2000,
            'website': 'https://store.steampowered.com',
        },
        {
            'name': 'Lyft',
            'value': 15,
            'imageUrl': 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Lyft',
            'coinCost': 1500,
            'website': 'https://www.lyft.com',
        },
        {
            'name': 'Uber',
            'value': 15,
            'imageUrl': 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Uber',
            'coinCost': 1500,
            'website': 'https://www.uber.com',
        },
    ]
    return jsonify({'data': dummy_data}), 200

if __name__ == '__main__':
    app.run(debug=True)