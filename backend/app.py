from flask import Flask, request, jsonify
from flask_cors import CORS
from signal_flow_graph import SignalFlowAnalyzer
from routh_hurwitz import RouthHurwitz
import json

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

@app.route('/signal-flow-graph', methods=['POST'])
def solveSignalFlowGraph():
    data = request.json
    graph = data.get('graph')
    if not graph:
        return jsonify({"error": "Graph data is required"}), 400
      
    print(graph)
    analyzer = SignalFlowAnalyzer(graph)
    result = analyzer.to_dict()
    return jsonify(result)

@app.route('/routh-stability', methods=['POST'])
def solveRouthHurwitz():
    print("Routh Stability Analysis")
    data = request.json
    
    characteristic_equation = data.get('characteristicEquation')
    print(characteristic_equation)
    if not characteristic_equation:
        return jsonify({"error": "Characteristic equation is required"}), 400
    
    analyzer = RouthHurwitz(characteristic_equation)
    result = analyzer.to_dict()
    return jsonify(result)
    

if __name__ == '__main__':
    app.run(port=5050)
