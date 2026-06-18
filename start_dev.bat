@echo off
title Wedding Invite Local Server
echo ===================================================
echo   Starting Wedding Invite Local Development Server
echo ===================================================
set PATH=C:\Users\user\.gemini\node;%PATH%
echo Running: npm run dev
echo.
npm run dev
pause
