# 🥬 BuyOrganix

BuyOrganix is a full-stack MERN-based organic grocery marketplace platform that connects farmers directly with customers. The platform allows users to purchase fresh organic fruits, vegetables, and dairy products while enabling farmers to sell products at fair market prices.

The application includes secure authentication, online payments, product management, cloud image uploads, order tracking, and role-based dashboards for Admins, Volunteers, and Customers.

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Redux
- Axios
- React Router DOM
- CSS
- Stripe Integration

## Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt Encryption
- Cloudinary
- Stripe Payment Gateway

---

# ✨ Key Features

## 👤 User Authentication
- User signup and login
- JWT-based authentication
- Password encryption using bcrypt
- Protected routes

---

# 🛒 E-Commerce Features

- Browse organic fruits, vegetables, and dairy products
- Add products to cart
- Update product quantity
- Checkout and order placement
- Online payment integration
- Order tracking system

---

# 🌱 Farmer Marketplace System

- Farmers can sell products directly
- Fair pricing model
- Organic product listing
- Fresh product delivery support

---

# 💳 Payment Integration

Integrated with Stripe Payment Gateway.

Supports:
- Credit/Debit Cards
- Secure online payments
- Order confirmation after successful transaction

---

# ☁️ Cloudinary Integration

- Upload and manage product images
- Optimized cloud-based media storage

---

# 📦 Product Management

## Admin Features
- Add products
- Edit products
- Delete products
- Manage users
- Manage orders

## Volunteer Features
- Product pickup coordination
- Delivery support
- Order assistance

---

# 📞 Customer Support

- Contact Us support section
- Query management support
- Order assistance

---

# 📁 Folder Structure

```bash
BuyOrganix/
├── api/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── .env
│
├── admin/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── volunteer/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── README.md
└── MakeFile
```

---

# ⚙️ Installation and Setup

## 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd BuyOrganix
```

## 2️⃣ Install Backend Dependencies

```bash
cd api
npm install
```

## 3️⃣ Install Frontend Dependencies

```bash
cd ../client
npm install
```

## 4️⃣ Install Admin Dependencies

```bash
cd ../admin
npm install
```

## 5️⃣ Install Volunteer Dependencies

```bash
cd ../volunteer
npm install
```

---

# 🔑 Environment Variables

## Backend `.env`

```env
MONGO_URL=

PASS_SEC=

JWT_SEC=

STRIPE_KEY=

CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

## Frontend `.env`

```env
REACT_APP_STRIPE=
```

---

# ▶️ Running the Application

## Start Backend

```bash
cd api
npm start
```

## Start Frontend

```bash
cd client
npm start
```

## Start Admin Panel

```bash
cd admin
npm start
```

## Start Volunteer Panel

```bash
cd volunteer
npm start
```

---

# 🗄️ Database Schemas

## User Schema

Includes:
- username
- email
- password
- profilePicture
- isAdmin
- address
- phoneNumber

## Product Schema

Includes:
- productName
- category
- price
- description
- image
- quantity

## Order Schema

Includes:
- products
- amount
- address
- orderStatus
- paymentStatus

---

# 👥 User Roles

## Customer
- Browse products
- Add to cart
- Place orders
- Track orders

## Admin
- Manage products
- Manage users
- Manage orders
- Update inventory

## Volunteer
- Pickup and delivery coordination
- Delivery status updates

---

# 🔒 Security Features

- Password hashing with bcrypt
- JWT authentication
- Protected API routes
- Environment variables for secrets
- Secure payment processing

---

# 🎨 Styling

- Responsive UI design
- Mobile-friendly interface
- Clean grocery marketplace layout

---

# 🚚 Order Workflow

1. Farmer provides organic products
2. Volunteer collects products
3. Admin updates products on platform
4. Customer places order
5. Payment is completed
6. Order is delivered to customer

---

# 🚀 Future Improvements

- AI-based product recommendations
- Real-time delivery tracking
- Mobile application
- Subscription plans
- Multi-language support
- Farmer analytics dashboard

---

# 👨‍💻 Contributors

This is a collaborative MERN stack development project developed by the project team.

---

# 📄 Copyright Status

Copyright registration for this project has been applied for.

All rights are reserved by the project authors. Unauthorized copying, distribution, or use of this project, in whole or in part, is prohibited without prior written permission from the authors.
