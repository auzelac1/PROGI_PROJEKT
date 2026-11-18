@echo off
cd /d "%~dp0"

:: 1. Gasi stare skrivene Python procese da ne blokiraju port 8000
:: Tonko: opasna komanda, moglo bi nekom programe zeznut koji su im pokrenuti na racunalu, skripte, servere, subprocese....
:: taskkill /F /IM python.exe >nul 2>&1

:: 2. Pokrece Backend u novom prozoru (bez --reload da ga OneDrive ne zamrzne)
start "Charter - Backend" cmd /k "cd /d "%~dp0backend" && title Charter - Backend && .venv\Scripts\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8000"

:: 3. Ceka 2 sekunde da se backend sigurno upali
timeout /t 2 /nobreak >nul

:: 4. Pokrece Frontend u drugom prozoru
start "Charter - Frontend" cmd /k "cd /d "%~dp0frontend" && title Charter - Frontend && node node_modules\vite\bin\vite.js"
