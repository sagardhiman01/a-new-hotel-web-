@echo off
title Hotel Mohan Inn Web Server
echo ========================================================
echo   Hotel Mohan Inn - Web Application Server
echo   Running at http://localhost:3005
echo ========================================================
set ELECTRON_RUN_AS_NODE=1
start "" "http://localhost:3005"
"%LOCALAPPDATA%\Programs\Antigravity IDE\Antigravity IDE.exe" "%~dp0server.js"
pause
