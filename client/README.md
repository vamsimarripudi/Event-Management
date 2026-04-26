# Event Management System (MERN)

A production-oriented Event Management platform enabling users to discover events, manage registrations, and track participation status in real time. Built with a focus on clean architecture, scalable APIs, and consistent UI/UX.

---

## 🚀 Live Demo

* Frontend: https://event.vamsimarripudi.tech
* Backend API: https://backend.vamsimarripudi.tech

---

## 🎯 Key Highlights

* Designed and implemented a full-stack MERN application with authentication and event lifecycle management
* Built RESTful APIs with proper route structuring and middleware-based authorization
* Implemented dynamic event status (Upcoming / Ongoing / Ended) using date-time logic
* Ensured persistent registration state via backend-driven `isRegistered` flag
* Developed responsive UI with reusable components and clean layout hierarchy

---

## ✨ Features

* 🔐 Secure Authentication (JWT-based)
* 📅 Event CRUD operations (Create, Update, Delete)
* 🔍 Event listing and detailed view
* ✅ Register / ❌ Cancel participation
* 📊 Real-time event status handling
* 📱 Fully responsive design (mobile + desktop)
* ⚡ Optimized API integration with error handling

---

## 🏗️ Architecture Overview

```text id="arch1"
Client (React)
   ↓
API Layer (Fetch/Axios)
   ↓
Node.js + Express Server
   ↓
MongoDB (Mongoose Models)
```

* Separation of concerns between UI, API, and data layer
* Stateless authentication using JWT
* Backend-driven UI state (registration status)

---

## 🛠️ Tech Stack

**Frontend**

* React.js
* Styled Components
* React Router

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB (Mongoose)

**Other**

* JWT Authentication
* REST API Design

---

## 📂 Project Structure

```bash id="struct1"
client/
  ├── components/
  ├── pages/
  ├── utils/
  └── App.jsx

server/
  ├── controllers/
  ├── models/
  ├── routes/
  └── server.js
```

---

## ⚙️ Setup Instructions

### Clone Repository

```bash id="clone1"
git clone https://github.com/your-username/event-management.git
cd event-management
```

### Install Dependencies

**Frontend**

```bash id="front1"
cd client
npm install
npm start
```

**Backend**

```bash id="back1"
cd server
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create `.env` in `/server`:

```env id="env1"
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

---

## 📡 Core API Endpoints

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| POST   | /api/auth/register         | Register user       |
| POST   | /api/auth/login            | Login user          |
| GET    | /api/event/events          | Fetch all events    |
| GET    | /api/event/events/:id      | Fetch event details |
| POST   | /api/registration/register | Register for event  |
| POST   | /api/registration/cancel   | Cancel registration |

---

## 🧠 Engineering Insights

* Handled UI consistency by syncing frontend state with backend responses
* Avoided stale UI states by deriving registration status from server
* Implemented defensive coding (error states, loading skeletons)
* Structured components for reusability and scalability

---

## 📈 Future Enhancements

* Advanced filtering and category
* Role-based access control (Admin/User)
* Notification system (email / in-app)
* Media uploads for events
* Analytics dashboard

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Vamsi Marripudi
GitHub: https://github.com/vamsimarripudi
