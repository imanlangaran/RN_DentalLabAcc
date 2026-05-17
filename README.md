# 🦷 RN DentalLabAcc

A modern React Native application for managing dental laboratory accounting, doctor records, and clinic-related workflows. Built with Expo, React Native, Drizzle ORM, and multilingual support, the project focuses on providing an organized and efficient mobile experience for dental laboratory management.

---

## ✨ Features

* 📋 Dental laboratory accounting management
* 👨‍⚕️ Doctor and clinic record management
* 🌍 Multi-language support
* 🎨 Modern mobile UI with custom styling
* ⚡ Built with Expo and React Native
* 🗂 Organized project architecture
* 🪝 Reusable hooks and components
* 💾 Local database integration
* 🧩 Scalable folder structure
* 📱 Mobile-first responsive experience

---

## 📂 Project Structure

```bash
RN_DentalLabAcc/
├── app/                 # Application routes and screens
├── Components/          # Reusable UI components
├── Constants/           # Application constants
├── assets/              # Fonts, images, and static assets
├── db/                  # Database logic
├── drizzle/             # Drizzle ORM configuration
├── hooks/               # Custom React hooks
├── lang/                # Localization files
├── models/              # Data models
├── public/
├── styles/              # Global and shared styles
├── app.json             # Expo configuration
├── drizzle.config.ts    # Drizzle ORM config
├── eas.json             # Expo EAS build config
└── package.json         # Dependencies and scripts
```

---

## 🛠 Tech Stack

### Frontend

* React Native
* Expo
* TypeScript
* NativeWind / Tailwind Styling

### Backend & Database

* Drizzle ORM
* Local database integration

### Development Tools

* ESLint
* Babel
* Metro Bundler
* Expo EAS

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/imanlangaran/RN_DentalLabAcc.git
```

### 2. Navigate into the project

```bash
cd RN_DentalLabAcc
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npx expo start
```

---

## 📱 Running on Device

### Android

```bash
npx expo run:android
```

### iOS

```bash
npx expo run:ios
```

---

## 🗄 Database

This project uses Drizzle ORM for database management.

Drizzle configuration can be found in:

```bash
drizzle.config.ts
```

Database-related logic is organized inside:

```bash
/db
```

---

## 🌐 Localization

The project includes multilingual support using the `lang` directory.

You can add or edit translations inside:

```bash
/lang
```

---

## 🎨 Styling

Global styles are managed through:

```bash
global.css
```

Additional reusable styles are available inside:

```bash
/styles
```

---

## 📸 Screenshots

Project screenshots are available inside:

```bash
public/Screenshots/
```

You can display them in GitHub README like this:

```md
![Screenshot](./public/Screenshots/example.png)
```

---

## ⚙️ Build Configuration

Expo Application Services (EAS) configuration:

```bash
eas.json
```

Application configuration:

```bash
app.json
```

---

## 📦 Scripts

### Start development server

```bash
npm start
```

### Run lint

```bash
npm run lint
```

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

---

## 🧠 Architecture Notes

The project follows a modular and scalable architecture:

* Components are separated into reusable modules
* Hooks contain shared application logic
* Database access is isolated from UI components
* Localization is centralized for easier maintenance
* Styling is organized globally and feature-based

---

## 🔮 Future Improvements

* Cloud synchronization
* Authentication system
* Online backup support
* Advanced reporting and analytics
* Push notifications
* Dark mode support

---

## 👨‍💻 Author

Developed by [Iman Langaran](https://github.com/imanlangaran)
