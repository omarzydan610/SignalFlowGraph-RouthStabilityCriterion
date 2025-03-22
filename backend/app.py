from flask import Flask, request, jsonify
from flask_cors import CORS
from signal_flow_graph import SignalFlowAnalyzer

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    graph = data.get('graph')
    if not graph:
        return jsonify({"error": "Graph data is required"}), 400
      
    print(graph)
    analyzer = SignalFlowAnalyzer(graph)
    result = analyzer.to_dict()
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5050)
