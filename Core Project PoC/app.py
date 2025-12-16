from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder='dist', static_url_path='')

# Serve the React app for all routes (SPA routing)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    # Check if dist folder exists
    if not os.path.exists('dist'):
        print("Warning: 'dist' folder not found. Please run 'npm run build' first.")
        print("Starting Flask anyway, but the app may not work correctly.")
    
    app.run(debug=True, host='127.0.0.1', port=5000)

