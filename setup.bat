@echo off
echo ========================================
echo National Web Community of Philatelists
echo MVP Setup Script
echo ========================================
echo.

echo Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error installing root dependencies
    pause
    exit /b 1
)

echo.
echo Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo Error installing server dependencies
    pause
    exit /b 1
)

echo.
echo Installing client dependencies...
cd ../client
call npm install
if %errorlevel% neq 0 (
    echo Error installing client dependencies
    pause
    exit /b 1
)

cd ..

echo.
echo Setting up environment files...
if not exist "server\.env" (
    copy "server\.env.example" "server\.env"
    echo Created server/.env file
    echo Please update the environment variables in server/.env
) else (
    echo server/.env already exists
)

echo.
echo ========================================
echo Setup completed successfully!
echo ========================================
echo.
echo Next steps:
echo 1. Update environment variables in server/.env
echo 2. Make sure MongoDB is running
echo 3. Run 'npm run dev' to start the development server
echo.
pause