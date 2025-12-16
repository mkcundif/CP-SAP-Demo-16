# Flask Setup Instructions

This project can now be run using Flask in a Python virtual environment.

## Prerequisites

1. **Python 3.8+** installed on your system
2. **Node.js and npm** (for building the React app)

## Setup Steps

### Step 1: Build the React Application

First, you need to build the React app into static files:

```powershell
npm install
npm run build
```

This will create a `dist` folder with the built static files.

### Step 2: Create Python Virtual Environment

Create a virtual environment:

```powershell
python -m venv venv
```

### Step 3: Activate the Virtual Environment

**On Windows (PowerShell):**
```powershell
.\venv\Scripts\Activate.ps1
```

**On Windows (Command Prompt):**
```cmd
venv\Scripts\activate.bat
```

**On macOS/Linux:**
```bash
source venv/bin/activate
```

### Step 4: Install Python Dependencies

With the virtual environment activated, install Flask:

```powershell
pip install -r requirements.txt
```

### Step 5: Run the Flask Application

Start the Flask server:

```powershell
python app.py
```

The application will be available at: **http://127.0.0.1:5000**

## Development Workflow

For development, you can use either:

1. **Vite Dev Server** (hot reload, faster development):
   ```powershell
   npm run dev
   ```
   Access at: http://localhost:5173

2. **Flask Server** (production-like, requires rebuild):
   ```powershell
   npm run build
   python app.py
   ```
   Access at: http://127.0.0.1:5000

## Notes

- The Flask app serves the built static files from the `dist` folder
- After making changes to the React app, you need to rebuild (`npm run build`) for changes to appear in Flask
- The Flask app handles SPA routing - all routes will serve `index.html` to support React Router if you add it later

