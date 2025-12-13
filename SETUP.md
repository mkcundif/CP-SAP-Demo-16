# Setup Instructions

## Step 1: Install Node.js

You need to install Node.js (which includes npm) to run this React application.

1. **Download Node.js** from: https://nodejs.org/
   - Download the LTS (Long Term Support) version
   - Choose the Windows installer (.msi file)

2. **Run the installer** and follow the setup wizard
   - Make sure to check "Add to PATH" during installation
   - This will install both Node.js and npm

3. **Verify installation** by opening a new terminal/PowerShell window and running:
   ```powershell
   node --version
   npm --version
   ```
   You should see version numbers for both commands.

## Step 2: Install Dependencies

Once Node.js is installed, open a terminal in this project folder and run:

```powershell
npm install
```

This will install all required packages (React, Tailwind CSS, Recharts, etc.)

## Step 3: Start the Development Server

After dependencies are installed, start the development server:

```powershell
npm run dev
```

You should see output like:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## Step 4: Open in Browser

Click on the `http://localhost:5173/` link or copy it into your browser.

The application will automatically reload when you make changes to the code.

---

## Troubleshooting

**If `npm` is still not recognized after installing Node.js:**
- Close and reopen your terminal/PowerShell window
- Make sure you selected "Add to PATH" during Node.js installation
- Restart your computer if needed

**If port 5173 is already in use:**
- Vite will automatically try the next available port (5174, 5175, etc.)
- Check the terminal output for the actual port number

