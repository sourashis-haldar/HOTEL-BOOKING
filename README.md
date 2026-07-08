# 🏨 Hotel Booking Platform – Full MERN Stack

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Full%20Stack-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/Express.js-API-black?style=for-the-badge&logo=express" />
  <img src="https://img.shields.io/badge/Clerk-Authentication-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Razorpay-Payments-02042B?style=for-the-badge&logo=razorpay" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

<h1 align="center">🏨 Hotel Booking Platform</h1>

<p align="center">
A modern <strong>Full Stack Hotel Booking Web Application</strong> built with the <strong>MERN Stack</strong>. Users can search hotels, book rooms securely, make online payments using <strong>Razorpay</strong>, while hotel owners can manage hotels, rooms, and bookings through a powerful dashboard.
</p>

---

# 🌐 Live Demo

### 🚀 Frontend
👉 https://hotel-booking-nine-ochre.vercel.app


---

# ✨ Features

## 👤 User Features

- 🔐 Secure Authentication using Clerk
- 🏨 Browse Available Hotels
- 🔍 Search Hotels by City
- 🛏️ View Hotel & Room Details
- 📅 Book Rooms Instantly
- 💳 Online Payment with Razorpay
- 💰 Pay at Hotel Option
- 📜 View Booking History
- ❌ Cancel Bookings
- ❤️ Responsive Modern UI
- 🌙 Fast and Smooth Experience

---

## 🏨 Hotel Owner Features

- 🏨 Register as Hotel Owner
- ➕ Add New Hotels
- 🛏️ Add Multiple Rooms
- ✏️ Edit Room Details
- ❌ Delete Rooms
- 📷 Upload Room Images
- 📊 Dashboard Analytics
- 📋 Manage Bookings
- 💵 View Earnings
- ✅ Toggle Room Availability

---

## 🔑 Authentication

- Clerk Login
- Clerk Signup
- Protected Routes
- Role Based Access
- JWT Authentication
- Secure API Requests

---

## 💳 Payment Integration

- Razorpay Checkout
- Online Payments
- Payment Verification
- Secure Order Creation
- Booking Confirmation after Payment

---

## 📊 Admin Dashboard

- Dashboard Overview
- Hotel Registration
- Add Rooms
- Room Management
- Booking Management
- Earnings Summary
- Availability Control

---

# 🛠 Tech Stack

## Frontend

- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Clerk Authentication
- Context API

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer
- Cloudinary
- Razorpay
- Clerk Webhooks

---

## Database

- MongoDB Atlas

---

## Cloud Services

- Cloudinary (Image Upload)
- Razorpay (Payments)
- Clerk (Authentication)

---

# 📂 Project Structure

```
HOTEL-BOOKING/

├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── configs/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── app.js
│   └── package.json
│
├── README.md
└── .gitignore
```

---

# 🚀 Installation Guide

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/sourashis-haldar/HOTEL-BOOKING.git
```

Move into the project folder

```bash
cd HOTEL-BOOKING
```

---

# 📦 Install Dependencies

## Frontend

```bash
cd client
npm install
```

## Backend

```bash
cd ../server
npm install
```

---

# ⚙️ Environment Variables

## Client (.env)

```env
VITE_BACKEND_URL=http://localhost:5000

VITE_CLERK_PUBLISHABLE_KEY=YOUR_CLERK_PUBLISHABLE_KEY
VITE_RAZORPAY_KEY=YOUR_RAZORPAY_KEY
```

---

## Server (.env)

```env
PORT=3001

MONGODB_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY

CLERK_SECRET_KEY=YOUR_CLERK_SECRET_KEY

CLERK_WEBHOOK_SECRET=YOUR_WEBHOOK_SECRET

CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME

CLOUDINARY_API_KEY=YOUR_API_KEY

CLOUDINARY_API_SECRET=YOUR_API_SECRET

RAZORPAY_KEY_ID=YOUR_RAZORPAY_KEY

RAZORPAY_KEY_SECRET=YOUR_RAZORPAY_SECRET
```

---

# ▶️ Run the Project

## Start Backend

```bash
cd server
npm run dev
```

Server will run at

```
http://localhost:3001
```

---

## Start Frontend

Open another terminal

```bash
cd client
npm run dev
```

Frontend will run at

```
http://localhost:5173
```

---

# 📸 Application Screens

- 🏠 Home Page
- 🏨 Hotel Listing
- 🔍 Hotel Details
- 🛏️ Room Details
- 📅 Booking Page
- 💳 Razorpay Payment
- 📜 My Bookings
- 👨‍💼 Owner Dashboard
- ➕ Add Hotel
- ➕ Add Room
- 📊 Dashboard Analytics

> *(Add screenshots here later)*

---

# 🔒 Authentication Flow

```
User

   ↓

Clerk Authentication

   ↓

JWT Verification

   ↓

Protected Routes

   ↓

Database Access
```

---

# 💳 Payment Flow

```
Select Room

      ↓

Create Booking

      ↓

Create Razorpay Order

      ↓

Complete Payment

      ↓

Verify Payment

      ↓

Booking Confirmed
```

---

# 🚀 Future Improvements

- ❤️ Wishlist
- ⭐ Hotel Reviews
- ⭐ Ratings
- 📍 Google Maps Integration
- 📧 Email Notifications
- 📱 PWA Support
- 🌍 Multi-language Support
- 📈 Advanced Analytics
- 🎟️ Coupon System
- 🤖 AI Hotel Recommendations

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👨‍💻 Developer

## Sourashis Haldar

💼 MERN Stack Developer

- React.js
- Node.js
- Express.js
- MongoDB
- Clerk Authentication
- Razorpay Integration
- Tailwind CSS

GitHub:
https://github.com/sourashis-haldar

---

# ⭐ Support

If you like this project,

⭐ Star this repository

🍴 Fork it

💙 Share it with others

---

<p align="center">
Made with ❤️ using the MERN Stack by <strong>Sourashis Haldar</strong>
</p>
