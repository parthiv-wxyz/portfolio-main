@echo off
setlocal

"%ProgramFiles%\nodejs\node.exe" "%~dp0..\node_modules\typescript\bin\tsc" -b || exit /b %errorlevel%
"%ProgramFiles%\nodejs\node.exe" "%~dp0..\node_modules\vite\bin\vite.js" build
