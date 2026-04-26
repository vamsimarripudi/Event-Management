# Event Management System (MERN)

A production-oriented Event Management platform enabling users to discover events, manage registrations, and track participation status in real time.

---

## 🚀 Live Demo

* Frontend: https://event.vamsimarripudi.tech
* Backend API: https://backend.vamsimarripudi.tech

---

## 🎯 Key Highlights

* Full-stack MERN application with authentication and event lifecycle management
* Backend-driven registration state (`isRegistered`)
* RESTful API design with protected routes
* Responsive UI with clean component architecture

---

## 📸 Screenshots

### 🔹 Home Page
<img src="./public/screenshots/home.png" alt="Home Page" width="100%" />
### 🔹 Events Dashboard
<img src="./public/screenshots/events.png" alt="Events Dashboard" width="100%" />
### 🔹 Event Details
<img src="./public/screenshots/details.png" alt="Event Details" width="100%" />
---

## ✨ Features

* 🔐 JWT Authentication (Login/Register)
* 📅 Event CRUD operations
* 🔍 Event listing & details view
* ✅ Register / ❌ Cancel participation
* 📊 Event status (Upcoming / Ongoing / Ended)
* 📱 Mobile responsive design

---

## 🏗️ Architecture

```text
Client (React)
   ↓
API Layer
   ↓
Node.js + Express
   ↓
MongoDB
```

---

## 🛠️ Tech Stack

Frontend: React.js, Styled Components
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Auth: JWT

---

## ⚙️ Setup

```bash
git clone https://github.com/your-username/event-management.git
cd event-management
```

### Install

```bash
cd client && npm install && npm start
cd server && npm install && npm run dev
```

---

## 🔐 Environment Variables

```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
```

---

## 📡 API

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| POST   | /api/auth/register         | Register            |
| POST   | /api/auth/login            | Login               |
| GET    | /api/event/events          | All events          |
| GET    | /api/event/events/         | Event details       |
| POST   | /api/registration/register | Register event      |
| POST   | /api/registration/cancel   | Cancel registration |

---

## 📈 Future Improvements

* Search & filters
* Role-based access
* Notifications
* Dashboard analytics

---

## 👨‍💻 Author

Vamsi Marripudi
https://github.com/vamsimarripudi
