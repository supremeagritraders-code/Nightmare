@echo off
setlocal enabledelayedexpansion

cd /d C:\Users\lenovo\Documents\Nightmare\backend

echo.
echo ========================================
echo Nightmare Backend - Starting...
echo ========================================
echo.

REM Compile TypeScript using node directly
echo Compiling TypeScript...
"C:\Program Files\nodejs\node.exe" ".\node_modules\typescript\bin\tsc"

if %errorlevel% equ 0 (
    echo Compiled successfully!
    echo.
    echo Starting server on http://localhost:3000
    echo Press Ctrl+C to stop...
    echo.
    "C:\Program Files\nodejs\node.exe" dist/index.js
) else (
    echo.
    echo ERROR: Build failed with code %errorlevel%
    echo Please check src/ files for errors
)

endlocal
pause
