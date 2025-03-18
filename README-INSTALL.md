
# Listo Joy Keeper - Android Installation Guide

This guide will help you install the Listo Joy Keeper app on your Android device.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/downloads)
- [Android Studio](https://developer.android.com/studio)
- Android SDK (installed via Android Studio)
- A physical Android device (optional, but recommended for testing)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/listo-joy-keeper.git
cd listo-joy-keeper
```

### 2. Install Dependencies

Make sure you're in the project root directory (where package.json is located) and run:

```bash
npm install
```

### 3. Build the Web App

```bash
npm run build
```

### 4. Add Android Platform (if not already added)

```bash
npx cap add android
```

### 5. Sync the Web Code with Android

```bash
npx cap sync android
```

### 6. Open in Android Studio

```bash
npx cap open android
```

### 7. Run on a Device

- Connect your Android device via USB
- Enable USB debugging on your device
  - Go to Settings > About phone
  - Tap Build number 7 times to enable Developer options
  - Go back to Settings > System > Developer options
  - Enable USB debugging
- In Android Studio, select your device from the dropdown menu
- Click the Run button (green triangle)

## Troubleshooting

- **"No package.json found"**: Make sure you're in the correct directory
- **Android Studio not recognizing device**: Try disconnecting and reconnecting your device
- **Build errors**: Make sure you have the latest Android SDK tools installed
- **App crashes on startup**: Check the logs in Android Studio for more details

## Development Workflow

Whenever you make changes to the web code:

1. Run `npm run build`
2. Run `npx cap sync android`
3. Run `npx cap open android`
4. Click the Run button in Android Studio

