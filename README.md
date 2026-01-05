# Red Line Solution Ltd - Official Website

![Red Line Solution Banner](public/og-image.png)

**Red Line Solution Ltd** is Rwanda’s premier provider of advanced fire safety, security systems, and building automation solutions. This repository contains the source code for the company's official web platform, featuring a modern, responsive public interface and a fully functional administrative dashboard.

## 🚀 Project Overview

This project is a full-stack web application designed to showcase Red Line Solution's services, portfolio, and contact information while providing a powerful backend for content management.

### Key Features

*   **Public Facing Website**:
    *   **Modern UI/UX**: Built with React and Tailwind CSS for a premium, responsive experience.
    *   **Service Showcase**: detailed pages for Fire Safety, Security Systems, and IT Solutions.
    *   **Project Portfolio**: Dynamic gallery of tailored projects.
    *   **Contact & Requests**: Integrated forms for general inquiries and specific service quotes.

*   **Admin Dashboard**:
    *   **Secure Authentication**: Role-based access with hashed password security.
    *   **User Management**: Create, edit, and manage administrator accounts.
    *   **Content Management**: Upload and manage project images and details.
    *   **Request Tracking**: Monitor and update status of service requests and messages.
    *   **System Analytics**: Real-time storage monitoring and activity stats.

## 🛠️ Technology Stack

*   **Frontend**:
    *   [React](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
    *   [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
    *   [Shadcn UI](https://ui.shadcn.com/) - Reusable accessible components
    *   [Lucide React](https://lucide.dev/) - Beautiful icons

*   **Backend**:
    *   **PHP** - Robust REST API handling
    *   **MySQL** - Relational database for data persistence

## 📦 Installation & Setup

### Prerequisites
*   Node.js (v18+)
*   PHP (v8.0+)
*   MySQL Server (e.g., via XAMPP)

### 1. Clone the Repository
```bash
git clone https://github.com/Rogersho/redlinesolution_web.git
cd redlinesolution_web
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
The frontend will run at `http://localhost:8080` (or similar).

### 3. Backend Setup
1.  Navigate to the `php-backend` directory.
2.  Copy `.env.example` to `.env` and configure your database settings.
3.  Import the `database.sql` (if provided) into your MySQL database.
4.  Start the PHP server:
    ```bash
    cd php-backend
    php -S localhost:8000 index.php
    ```

## 🔐 Security

This application implements several security best practices:
*   **Password Hashing**: All admin passwords are uniquely salted and hashed using `BCRYPT`.
*   **Input Sanitization**: Backend requests are validated to prevent SQL injection.
*   **Protected Routes**: Admin endpoints require valid authentication tokens.

## 📜 License

This project is proprietary software belonging to **Red Line Solution Ltd**. Unauthorized copying or distribution is strictly prohibited.

---
*Built with ❤️ for a Safer Rwanda.*
