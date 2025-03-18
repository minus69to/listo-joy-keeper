
#!/bin/bash
# Script to build and deploy the app to Android

echo "Building web application..."
npm run build

echo "Syncing with Capacitor..."
npx cap sync android

echo "Opening Android Studio..."
npx cap open android

echo "================================"
echo "Next steps:"
echo "1. Connect your Android device via USB"
echo "2. Enable USB debugging on your device"
echo "3. Click the Run button in Android Studio"
echo "================================"
