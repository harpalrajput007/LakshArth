# LakshArth

A full‑stack monorepo containing:
- **frontend**: Public marketing/landing website built with React (CRA)
- **dashboard**: Authenticated client dashboard built with React (CRA), Material UI, and Chart.js
- **backend**: Node/Express REST API with MongoDB (Mongoose) and JWT authentication

---

## Repository Structure
```
LakshArth/
├─ backend/
│  ├─ index.js
│  ├─ package.json
│  ├─ .env (not committed)
│  ├─ middleware/
│  │  └─ auth.js
│  ├─ model/
│  │  ├─ HoldingsModel.js
│  │  ├─ OrdersModel.js
│  │  ├─ PositionsModel.js
│  │  └─ UserModel.js
│  └─ schemas/
│     ├─ HoldingsSchema.js
│     ├─ OrdersSchema.js
│     ├─ PositionsSchema.js
│     └─ UserSchema.js
├─ dashboard/
│  ├─ public/
│  │  ├─ index.html (title: "TARK by LakshArth", favicon: TARK.png)
│  │  └─ TARK.png
│  ├─ src/
│  └─ package.json (PORT=3001)
├─ frontend/
│  ├─ public/
│  │  ├─ index.html (title: "LakshArth", favicon: assets/LAKSHARTH.png)
│  │  └─ assets/
│  │     ├─ LAKSHARTH.png (logo)
│  │     └─ ...
│  ├─ src/
│  │  └─ landing_page/
│  │     └─ Navbar.js (reduced logo size)
│  └─ package.json
├─ .gitignore (node_modules, build outputs, backend/.env, OS files)
├─ LICENSE
└─ README.md (this file)
```

---

## Tech Stack

### Frontend (Landing)
- **React** ^19 (Create React App, react-scripts)
- **React Router** ^7
- **Axios** for HTTP
- Testing: @testing-library/*, jest-dom

### Dashboard
- **React** ^19 (CRA)
- **Material UI (MUI)** ^7 for components and theming
- **Chart.js** ^4 with **react-chartjs-2** for charts
- **React Router** ^7
- **Axios**

### Backend
- **Node.js / Express** (Express 5)
- **MongoDB / Mongoose** for persistence
- **JWT (jsonwebtoken)** for authentication
- **bcryptjs** for password hashing
- **cors**, **body-parser**, **dotenv**
- Dev: **nodemon**

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB running locally or a cloud MongoDB URI

### Environment Variables (backend/.env)
Create `backend/.env`:
```
PORT=3002
MONGO_URL=mongodb://localhost:27017/laksharth
JWT_SECRET=your-strong-secret
```

### Install Dependencies
Run these in three terminals or sequentially:
1) Backend
```
cd backend
npm install
```
2) Dashboard
```
cd dashboard
npm install
```
3) Frontend
```
cd frontend
npm install
```

### Run in Development
Open three terminals:
1) Backend (http://localhost:3002)
```
cd backend
npm start
```
2) Dashboard (http://localhost:3001)
```
cd dashboard
npm start
```
3) Frontend (http://localhost:3000)
```
cd frontend
npm start
```

---

## Application Workflow

- Users land on the **frontend** (3000). The navbar links to the **dashboard** for authentication.
- Frontend builds login/register URLs pointing to the dashboard (port 3001), passing a `redirect` back to the current frontend page.
- After a successful login on the dashboard, the app redirects back to the frontend with `token` and serialized `user` in the URL.
- Frontend parses those parameters, stores them in `localStorage` (`token`, `user`), and cleans the URL.
- Frontend then calls **backend** APIs using `Authorization: Bearer <token>`.

Notes:
- Frontend navbar logo has been resized for better visual balance.
- Dashboard HTML page title and favicon are set to: "TARK by LakshArth" and TARK.png respectively.

---

## Backend Overview

### Server
- Port: `process.env.PORT || 3002`
- DB: `process.env.MONGO_URL || mongodb://localhost:27017/laksharth`
- Key middleware: `cors`, `body-parser.json()`

### Auth Middleware
- File: `backend/middleware/auth.js`
- Reads JWT from `Authorization: Bearer <token>`
- Validates token using `JWT_SECRET`
- Loads `req.user`; rejects inactive or missing users

### Data Models
- User (`backend/schemas/UserSchema.js`)
  - username (unique, required)
  - email (unique, required)
  - password (hashed with bcrypt pre-save)
  - firstName, lastName, phone
  - isActive (default true), createdAt, lastLogin
  - Methods: `comparePassword(candidate)`, `toJSON()` (strips password)
- Holdings (`backend/schemas/HoldingsSchema.js`)
  - userId (ObjectId ref user, required)
  - name, qty, avg, price, net, day
- Orders (`backend/schemas/OrdersSchema.js`)
  - userId (ObjectId ref user, required)
  - name, qty, price, mode, timestamp (default now)
- Positions (`backend/schemas/PositionsSchema.js`)
  - product, name, qty, avg, price, net, day, isLoss

### API Endpoints (representative)
- GET `/test` — Basic health check
- POST `/auth/register` — Body: `{ username, email, password, firstName, lastName, phone? }`
  - Returns: `{ success, token, user }`
- POST `/auth/login` — Body: `{ email, password }`
  - Returns: `{ success, token, user }`
- GET `/auth/profile` — Auth required; returns current user
- GET `/allHoldings` — Auth required; returns holdings for `req.user._id`
- GET `/allPositions` — Public; returns all positions
- GET `/allOrders` — Auth required; returns orders for `req.user._id`
- GET `/getHolding/:stockName` — Auth required; returns holding for a given stock

Authorization header for protected routes:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## Frontend (Landing) Notes
- CRA scripts (`react-scripts`): `start`, `build`, `test`, `eject`
- Primary entry: `src/index.js`
- Styles: `src/index.css`
- Branding:
  - Title: `public/index.html` → `LakshArth`
  - Favicon: `public/assets/LAKSHARTH.png`
  - Navbar logo path: `src/landing_page/Navbar.js` → `assets\\LAKSHARTH.png` (width ~45%)

## Dashboard Notes
- Runs on port 3001 via `"start": "set PORT=3001 && react-scripts start"`
- MUI for UI components; Chart.js for charts via react-chartjs-2
- Branding:
  - Title: `TARK by LakshArth`
  - Favicon/Apple icon: `public/TARK.png`

---

## Scripts Summary
- Backend: `npm start` (nodemon index.js)
- Dashboard: `npm start` (CRA, PORT=3001)
- Frontend: `npm start` (CRA)

Build for production:
- `cd dashboard && npm run build`
- `cd frontend && npm run build`

---

## Dependencies

### Backend
- prod: bcryptjs, body-parser, cors, dotenv, express, jsonwebtoken, mongoose, passport, passport-local, passport-local-mongoose
- dev: nodemon

### Dashboard
- prod: @mui/material, @mui/icons-material, @emotion/react, @emotion/styled, chart.js, react-chartjs-2, react, react-dom, react-router-dom, react-scripts, axios, web-vitals
- dev/test: @testing-library/*, jest-dom

### Frontend
- prod: react, react-dom, react-router-dom, react-scripts, axios, web-vitals
- dev/test: @testing-library/*, jest-dom

---

## Environment & Security
- Do not commit `backend/.env` (ignored by .gitignore)
- Change `JWT_SECRET` for production
- Use a managed MongoDB for deployment and store all secrets in your hosting provider’s secret manager

---

## Deployment

You can deploy each app separately or behind a reverse proxy:
- Backend (Node/Express): Render, Railway, Fly.io, AWS Elastic Beanstalk, or Docker on your server
- Dashboard & Frontend (static): Netlify, Vercel, GitHub Pages (CRA build output), or any static hosting

Typical steps:
1) Build frontend and dashboard:
```
cd frontend && npm run build
cd dashboard && npm run build
```
2) Deploy backend service (expose ENV: MONGO_URL, JWT_SECRET, PORT)
3) Deploy dashboard and frontend builds to your static host(s)
4) Configure environment-specific API base URLs in clients (e.g., via .env or config)

---

## Development Tips
- Use separate terminals for each app during development
- Ensure MongoDB is running locally if using the default URI
- Check CORS policies if calling backend from deployed frontends

---

## License
See `LICENSE` in the repository.

---

## Credits
- Author (backend package.json): Harpal Rajput
- Branding: LakshArth / TARK
