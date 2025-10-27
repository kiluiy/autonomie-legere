@echo off
echo ========================================
echo   MISE A JOUR AUTONOMIE LEGERE
echo ========================================
echo.

REM Aller dans le dossier du projet
cd /d "%~dp0"

echo [1/4] Ajout des fichiers modifies...
git add .

echo.
echo [2/4] Creation du commit...
set /p MESSAGE="Message de commit (ou ENTER pour 'Mise a jour'): "
if "%MESSAGE%"=="" set MESSAGE=Mise a jour

git commit -m "%MESSAGE%"

echo.
echo [3/4] Envoi sur GitHub...
git push origin main

echo.
echo [4/4] Deploiement sur Vercel...
cd autonomie-app
vercel --prod --yes

echo.
echo ========================================
echo   MISE A JOUR TERMINEE !
echo ========================================
echo.
echo Ton app est maintenant a jour sur :
echo - GitHub : https://github.com/kiluiy/autonomie-legere
echo - Vercel  : https://autonomie-46ippkm4c-kiluiys-projects.vercel.app
echo.
pause
