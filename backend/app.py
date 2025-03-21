from flask import Flask, request, jsonify
from signal_flow_graph import SignalFlowAnalyzer

app = Flask(__name__)

@app.route('/analyze', methods=['GET'])
def analyze():
    print("Hello")
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
