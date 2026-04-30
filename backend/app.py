from flask import Flask, jsonify, request, render_template
from models import SafetyScoreModel, ItineraryPlanner
from fintech import BudgetTracker
from community import CommunitySupport
from currency import convert as convert_currency_amount

app = Flask(__name__)

# Initialize models
safety_model = SafetyScoreModel()
itinerary_planner = ItineraryPlanner()
budget_tracker = BudgetTracker()
community_support = CommunitySupport()


@app.after_request
def add_cors_headers(response):
    """Allow Next.js (localhost:3000) to call JSON APIs from the browser."""
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    return response


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/convert', methods=['POST', 'OPTIONS'])
def convert_currency():
    if request.method == 'OPTIONS':
        return ('', 204)
    data = request.get_json(silent=True) or {}
    try:
        amount = float(data.get('amount', 0))
    except (TypeError, ValueError):
        return jsonify({'error': 'Invalid amount'}), 400
    from_curr = data.get('from') or 'USD'
    to_curr = data.get('to') or 'EUR'
    try:
        converted = convert_currency_amount(amount, from_curr, to_curr)
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    return jsonify({'convertedAmount': converted})

@app.route('/safety_score', methods=['POST'])
def get_safety_score():
    data = request.json
    location = data.get('location')
    score = safety_model.predict(location)
    return jsonify({'safety_score': score})

@app.route('/itinerary', methods=['POST'])
def plan_itinerary():
    data = request.json
    itinerary = itinerary_planner.plan(data)
    return jsonify(itinerary)

@app.route('/budget', methods=['POST'])
def track_budget():
    data = request.json
    budget = budget_tracker.track(data)
    return jsonify(budget)

@app.route('/community', methods=['POST'])
def community_alert():
    data = request.json
    alerts = community_support.get_alerts(data)
    return jsonify(alerts)

if __name__ == '__main__':
    app.run(debug=True)
