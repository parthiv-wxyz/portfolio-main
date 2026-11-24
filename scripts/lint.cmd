@echo off
setlocal

"%ProgramFiles%\nodejs\node.exe" "%~dp0..\node_modules\eslint\bin\eslint.js" %*
