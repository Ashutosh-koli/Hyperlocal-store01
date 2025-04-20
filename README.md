
# 🛒 Hyperlocal Store App

A full-stack web application where users can:
- View nearby stores
- Browse fruits/vegetables by store
- Add items to a cart
- Place an order by entering their name

## 📦 Tech Stack

**Frontend:** React (Vite) + Vanilla CSS  
**Backend:** Node.js + Express.js  
**Database:** MongoDB

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone (https://github.com/Ashutosh-koli/Hyperlocal-store01).git
cd hyperlocal-store01
```

### 2. Backend Setup

```bash
cd backend
npm install
node sample-data/seed.js  # seed the database
node server.js            # start the backend server
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev               # start the frontend
```

Make sure `.env` is set with your backend URL, e.g.

```
VITE_API_URL=http://localhost:5000/api
```

---

## 📋 Features

- 🔍 View all nearby stores
- 🛒 View and add products to cart
- ✅ Checkout and place order
- 📦 Order confirmation page

---

## 🧪 Sample Data

Sample products and stores are added via `sample-data/seed.js`.  
MongoDB must be running locally or via Atlas.

---

## 🙌 Author

Built with ❤️ for assignment & learning.
