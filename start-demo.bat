@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ===================================================
echo   INJEKSION — Birbasa index.html acilir...
echo ===================================================
start "" "%~dp0index.html"
