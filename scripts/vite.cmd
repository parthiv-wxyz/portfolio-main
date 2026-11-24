@echo off
setlocal

"%ProgramFiles%\nodejs\node.exe" "%~dp0..\node_modules\vite\bin\vite.js" %*
