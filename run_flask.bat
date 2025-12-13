@echo off
echo Building React application...
call npm run build
if errorlevel 1 (
    echo Build failed! Please check the errors above.
    pause
    exit /b 1
)

echo.
echo Starting Flask server...
python app.py

