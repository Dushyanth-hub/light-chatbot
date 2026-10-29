# 💡 Light — AI Chatbot

A clean, responsive, and ultra-fast cross-platform AI chatbot powered by the **Groq API**. Built with a unified codebase (**React + Vite + Tailwind CSS**) and packaged for desktop and mobile:
- 🪟 **Windows Desktop App** (`.exe`) via **Electron**
- 📱 **Android Mobile App** (`.apk`) via **Capacitor**

---

## 📥 Downloads

Pre-built binaries are hosted on [GitHub Releases](https://github.com/Dushyanth-hub/light-chatbot/releases).

| Platform | Format | Download Link | Notes |
| :--- | :--- | :--- | :--- |
| 🪟 **Windows** | `.exe` Installer | [⬇️ Download Windows Setup](https://github.com/Dushyanth-hub/light-chatbot/releases/latest/download/Light-Setup-1.0.0.exe) | Standard Windows installer (`release\Light Setup 1.0.0.exe`) |
| 📱 **Android** | `.apk` Package | [⬇️ Download Android APK](https://github.com/Dushyanth-hub/light-chatbot/releases/latest/download/app-debug.apk) | Direct installable APK (`app-debug.apk`) |

> 📌 **Note:** You can also browse all versions and asset downloads directly on the **[Releases Page](https://github.com/Dushyanth-hub/light-chatbot/releases)**.

---

## ⚡ Features

- **Blazing Fast**: Real-time token streaming powered by Groq's low-latency inference engine (`llama-3.3-70b-versatile`).
- **Cross-Platform**: Unified codebase running smoothly on both Windows PC and Android phones.
- **In-App API Key Configuration**: Safely enter your Groq API key inside the app via the ⚙️ Settings dialog without hardcoding secrets.
- **Model Selector**: Switch between Groq-supported models on the fly.
- **Persistent Local History**: Conversations persist locally across app restarts.
- **Markdown & Code Highlighting**: Syntax-highlighted code snippets and clean formatting.

---

## ⚠️ Pre-Build Security Note

> **Before you build for sharing:**
> Rename `.env` to `.env.backup` so your personal API key isn't bundled inside the distributed app:
> ```powershell
> Rename-Item .env .env.backup
> ```
> Users can freely configure their own free Groq API key inside the in-app **Settings (⚙️)**.

---

## 🛠️ Build & Development Commands

> **Important**: Run these commands in **PowerShell as Administrator**, inside your project folder:
> ```powershell
> cd path\to\light
> ```

---

### 🪟 Windows App (`.exe`)

#### 1. Install dependencies & build installer:
```powershell
npm install
npm run dist:win
```

Your installer will be generated at:
```text
release\Light Setup 1.0.0.exe
```

#### 2. Test without building the installer:
```powershell
npm run electron
```

---

### 📱 Android App (`APK`)

#### 1. Build and sync web assets:
```powershell
npm run build
npx cap sync
npx cap open android
```

#### 2. Generate APK in Android Studio:
1. Wait for Android Studio to index and sync Gradle.
2. In the top menu, click **Build** > **Generate App Bundles or APKs** > **Generate APKs** *(or **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**)*.
3. Click **locate** in the notification popup when the build finishes.

Your APK file will be ready at:
```text
android\app\build\outputs\apk\debug\app-debug.apk
```

---

### 🔄 After Any Code Change

Whenever you modify code in `src/` or assets:

#### For Windows:
```powershell
npm run dist:win
```

#### For Android:
```powershell
npm run build
npx cap sync
```
Then build the APK again inside Android Studio (**Build** > **Build APK(s)**).

---

### 🚀 Build Both in One Go

To build and prepare both the Windows installer and Android project in a single sequence:

```powershell
npm install
npm run dist:win
npm run build
npx cap sync
npx cap open android
```

---

## 📁 Project Structure

```text
Lightchatbot/
├── .env.example                       # Example environment file template
├── .gitignore                         # Git ignore definitions
├── README.md                          # Project documentation and guide
├── capacitor.config.json              # Capacitor mobile app configuration
├── package.json                       # Scripts and project dependencies
├── vite.config.js                     # Vite build configuration (base: './')
│
├── electron/
│   └── main.js                        # Electron desktop main process
│
├── src/
│   ├── App.jsx                        # Main application orchestrator & state
│   ├── main.jsx                       # React application entry point
│   ├── index.css                      # Tailwind CSS & global styling
│   ├── components/
│   │   ├── ChatInput.jsx              # Message input box & submit controls
│   │   ├── ChatWindow.jsx             # Chat stream view & header
│   │   ├── MessageBubble.jsx          # Markdown message bubble renderer
│   │   └── SettingsModal.jsx          # Modal for Groq API key & model selection
│   └── services/
│       └── groq.js                    # Groq API streaming service
│
├── android/                           # Native Android Capacitor platform project
│   ├── app/
│   │   ├── build.gradle               # App-level Gradle build script
│   │   └── src/main/                  # Android manifest, icons, and assets
│   │       └── AndroidManifest.xml
│   └── build/outputs/apk/             # Output folder for compiled Android APKs
│
└── release/                           # Output folder for compiled Windows .exe installers
```

---

## 🔑 Getting a Free Groq API Key

1. Visit [console.groq.com](https://console.groq.com) and create a free account.
2. Navigate to [API Keys](https://console.groq.com/keys) and click **Create API Key**.
3. Copy your key (starts with `gsk_...`).
4. In **Light**, click the **Settings (⚙️)** icon in the top right corner and paste your key.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
