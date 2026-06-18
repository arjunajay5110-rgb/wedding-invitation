@echo off
title Wedding Invite Phone Testing Helper
echo ===================================================
echo   Wedding Invite Phone Testing Helper
echo ===================================================
echo.
set PATH=C:\Users\user\.gemini\node;%PATH%

:: Find local IPv4 address
echo [1] Finding your computer's local IP address...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4"') do (
    set ip=%%a
)
:: Trim leading space
set ip=%ip:~1%
echo     Your computer's local IP is: http://%ip%:3000
echo.
echo ===================================================
echo   HOW TO TEST ON YOUR PHONE (Same Wi-Fi):
echo ===================================================
echo   1. Make sure your Phone and Computer are connected to the SAME Wi-Fi network.
echo   2. Open this link on your phone:
echo      http://%ip%:3000
echo.
echo   Tip: You can copy and paste this link to WhatsApp Web to send it to your phone!
echo ===================================================
echo.
echo Starting server on http://0.0.0.0:3000 (accessible on local network)...
echo.
npx next dev -H 0.0.0.0 -p 3000
pause
