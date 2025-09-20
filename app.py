from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to the Flask API!"

@app.route('/api/status', methods=['GET'])
def get_status():
    return jsonify({"status": "API is running"}), 200

@app.route('/api/data', methods=['POST'])
def process_data():
    data = request.json
    # Process the data as needed
    return jsonify({"message": "Data processed successfully", "data": data}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
    #app.run(debug=True)
# To run the app, use the command: python app.py