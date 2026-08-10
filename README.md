# SignAny 2.0 — Enterprise Document Automation & Electronic Signatures

[![SignAny 2.0](https://img.shields.io/badge/SignAny-2.0%20Upgrade-6366f1?style=for-the-badge)](https://esignany.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start-ff4154?style=for-the-badge)](https://tanstack.com/start)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%20v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

**SignAny 2.0** is an enterprise-grade document automation and electronic signature platform built for modern legal, enterprise, and Salesforce-integrated workflows. Send, sign, and track documents seamlessly with cryptographic audit trails, enterprise compliance, and custom workspace branding.

---

## 🌟 Key Features

- **✒️ Smart Electronic Signatures**: Cryptographic Audit Trails, SHA-256 document hashing, and tamper-evident PDF verification.
- **☁️ Salesforce Integration**: Native Web-to-Lead integration with automatic lead capture directly into Salesforce CRM.
- **🛡️ Global Compliance**: Fully compliant with international e-signature standards:
  - **ESIGN Act** (United States)
  - **UETA** (Uniform Electronic Transactions Act)
  - **GLBA** (Gramm-Leach-Bliley Act)
  - **eIDAS (AES) (Level 2)** (European Union)
  - **Singapore’s ETA** (Electronic Transactions Act)
  - **AU Electronic Transactions Act 1999** (Australia)
  - **Electronic Communications Act 2000** (UK)
- **📅 Interactive Demo Booking**: Modal with reCAPTCHA verification, Salesforce lead creation, and automated email notifications.
- **🎨 Brand Design System**: Styled with **Plus Jakarta Sans** typography, `oklch` theme tokens, dark/light surface aesthetics, and smooth Framer Motion animations.

---

## 🛠️ Technology Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (Full-stack React with SSR & TanStack Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with Vanilla CSS custom properties
- **Components**: Radix UI Primitives, Lucide React Icons, Framer Motion
- **Form & Security**: Google reCAPTCHA v2, FormSubmit Integration

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd "SignAny 2.0 Upgrade"
   ```

2. Install dependencies via **npm**:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` (or the port specified in terminal) in your browser.

---

## 📜 Available Scripts

- **`npm run dev`**: Starts the development server with live reload.
- **`npm run build`**: Compiles the application for production deployment.
- **`npm run preview`**: Serves the compiled production build locally.

---

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── site/         # Core marketing & product page sections (Header, Footer, SignAnyHome, SalesforceHome, etc.)
│   │   └── ui/           # Reusable Radix UI & design system components (BookDemoModal, BookDemoHandler, dialog, etc.)
│   ├── lib/              # Site data, mode state management, and email services (emailService.ts)
│   ├── routes/           # TanStack file-based routes (__root.tsx, index.tsx, terms-and-conditions.tsx, privacy-policy.tsx)
│   ├── main.tsx          # Application entry point
│   └── styles.css        # Tailwind CSS v4 setup and design system tokens
├── public/               # Static assets (favicons, robots.txt)
├── package.json          # Dependency manifest
└── tsconfig.json         # TypeScript configuration
```

---

## 🏢 License & Copyright

© 2026 **MV Clouds Private Limited**. All Rights Reserved. Operator of SignAny 2.0.
