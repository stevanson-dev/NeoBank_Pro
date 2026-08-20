# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Normal terminal commends
cd foldername → folder-kulla pogum
cd .. → one level back
cd \ → drive-oda root-ku pogum

back end maven run to springboot--   .\mvnw.cmd spring-boot:run
frontend run node --   npm run dev

##  NEOBANK PRO – INSTALLATION COMMAND NOTES

1. Software Versions

[✓] Node.js
    → node-v26.5.0-x64

[✓] Java JDK
    → OpenJDK21U-jdk_x64_windows_hotspot_21.0.12_8

[✓] MySQL Server
    → 8.0.46

[✓] Apache Maven
    → Maven Wrapper (mvnw.cmd)
    → Maven 3.9.16

[✓] VS Code

[✓] Git

[✓] Postman

2. React + Vite Frontend

[✓] Create React + Vite
npm create vite@latest

[✓] Install Existing Project Packages
npm install

[✓] React Router DOM
npm install react-router-dom

[✓] React Icons
npm install react-icons

[✓] Qrcode create
npm install html5-qrcode

[✓] Axios
npm install axios

[✓] Tailwind CSS
npm install tailwindcss @tailwindcss/vite

[✓] Run React Project
npm run dev


3. Spring Boot Backend

[✓] Spring Boot
    → Maven Project
    → pom.xml

[✓] Spring Boot Dependencies
    → Spring Web
    → Spring Data JPA
    → MySQL Driver
    → Spring Security
    → Validation

[✓] Maven Dependencies Install
.\mvnw.cmd clean install

[✓] Build Backend
.\mvnw.cmd clean package

[✓] Run Backend
.\mvnw.cmd spring-boot:run

4. MySQL Database

[✓] MySQL Database
    → neobankpro

[✓] MySQL Workbench

[✓] Database Export
    → neobankpro.sql

[✓] Database Import
    → neobankpro.sql

5. Git Setup

[✓] Git Initialize
git init

[✓] Check Git
git --version

[✓] Add GitHub Repository
git remote add origin <GitHub-Repository-URL>

[✓] Check Remote
git remote -v

[✓] Add Project Files
git add .

[✓] Commit Project
git commit -m "Initial commit"

[✓] Push Project to GitHub
git push -u origin main

6. Postman

[✓] Postman API Collection

[✓] Export Collection
    → Collections
    → ...
    → Export
    → Collection v2.1
    → Export

[✓] Backup File
    → NeoBank Pro API.postman_collection.json

[✓] Import on Another Laptop
    → Import
    → Select .postman_collection.json




 ## frontend structure

    frontend/
│
├── public/
│   └── icon.png
│
├── src/
│   │
│   ├── assets/
│   │   ├── Create account bg.png
│   │   ├── ForgotPassword bg.png
│   │   ├── Login bg.png
│   │   └── logo.png
│   │
│   ├── components/
│   │   │
│   │   ├── Admin/
│   │   │   ├── AdminProtectedRoute.jsx
│   │   │   └── AdminSidebar.jsx
│   │   │
│   │   ├── Dashboard page/
│   │   │   ├── BalanceCard_Dashboard.jsx
│   │   │   ├── Navbar_Dashboard.jsx
│   │   │   ├── QuickActions_Dashboard.jsx
│   │   │   ├── RecentTransactions_Dashboard.jsx
│   │   │   ├── Sidebar_Dashboard.jsx
│   │   │   └── SpendingOverview_Dashboard.jsx
│   │   │
│   │   ├── Landing page/
│   │   │   ├── CTA.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Security.jsx
│   │   │   └── TrustStrip.jsx
│   │   │
│   │   └── Transfer History Dash/
│   │       ├── ExportButtons.jsx
│   │       ├── FilterBar.jsx
│   │       ├── GlassCard.jsx
│   │       ├── PageHeader.jsx
│   │       ├── Pagination.jsx
│   │       ├── SummaryCard.jsx
│   │       └── TransactionModal.jsx
│   │
│   ├── context/
│   │   └── ThemeContext.jsx
│   │
│   ├── hooks/
│   │
│   ├── layouts/
│   │   └── AdminLayout.jsx
│   │
│   ├── pages/
│   │   │
│   │   ├── Admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── Cards.jsx
│   │   │   ├── Deposits.jsx
│   │   │   ├── Notifications.jsx
│   │   │   ├── Reports.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── Transactions.jsx
│   │   │   ├── Users.jsx
│   │   │   └── Withdrawals.jsx
│   │   │
│   │   ├── Accounts.jsx
│   │   ├── Analytics.jsx
│   │   ├── Cards.jsx
│   │   ├── ChangePassword.jsx
│   │   ├── CreateNewPin.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── ForgotPin.jsx
│   │   ├── Home.jsx
│   │   ├── LanguageSettings.jsx
│   │   ├── Login.jsx
│   │   ├── LoginActivity.jsx
│   │   ├── NotFound.jsx
│   │   ├── Notifications.jsx
│   │   ├── PayBills.jsx
│   │   ├── PaymentProcessing.jsx
│   │   ├── PinUpdated.jsx
│   │   ├── Profile.jsx
│   │   ├── QRPay.jsx
│   │   ├── Register.jsx
│   │   ├── ReviewTransfer.jsx
│   │   ├── Settings.jsx
│   │   ├── ThemeSettings.jsx
│   │   ├── TransactionPin.jsx
│   │   ├── TransactionsHistory.jsx
│   │   ├── Transfer.jsx
│   │   ├── TransferSuccess.jsx
│   │   ├── TwoFactorAuth.jsx
│   │   └── VerifyPinOTP.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── services/
│   │
│   ├── styles/
│   │
│   ├── utils/
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
└── index.html



## backend structure



└── backend
    └── neobankpro
        ├── pom.xml
        ├── mvnw.cmd
        │
        └── src
            └── main
                ├── java
                │   └── com
                │       └── neobankpro
                │           └── neobankpro
                │               ├── NeobankproApplication.java
                │               │
                │               ├── config
                │               │   └── SecurityConfig.java
                │               │
                │               ├── controller
                │               │   ├── AuthController.java
                │               │   └── TestController.java
                │               │
                │               ├── dto
                │               │   ├── RegisterRequest.java
                │               │   ├── RegisterResponse.java
                │               │   ├── LoginRequest.java
                │               │   └── LoginResponse.java
                │               │
                │               ├── entity
                │               │   └── User.java
                │               ├── exception
                │               │   ├── DuplicateResourceException.java
                │               │   └── GlobalExceptionHandler.java
                │               │
                │               ├── repository
                │               │   └── UserRepository.java
                │               │
                │               ├── security
                │               │   └── JwtAuthenticationFilter.java
                │               │
                │               ├── service
                │               │   ├── AuthService.java
                │               │   └── JwtService.java
                │               │
                │               └── exception
                │
                └── resources
                    └── application.properties