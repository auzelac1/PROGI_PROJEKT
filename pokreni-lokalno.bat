@echo off
start "Charter - Backend" /d "%~dp0backend" cmd /k ".venv\Scripts\python.exe -m uvicorn main:app --reload"
start "Charter - Frontend" /d "%~dp0frontend" cmd /k "title Charter - Frontend & node node_modules\vite\bin\vite.js"
