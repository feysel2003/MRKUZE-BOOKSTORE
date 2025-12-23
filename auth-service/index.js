const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();

const port = process.env.PORT || 5001;

// middleware
app.use(express.json());
app.use(cors({
    origin: true, // Allows frontend to verify tokens if needed
    credentials: true
}));

// --- ROUTES ---
const userRoutes = require('./src/users/user.route');

// CRITICAL CONFIGURATION:
// The Gateway strips '/api/auth' from the URL before sending it here.
// Example: Gateway receives '/api/auth/login' -> Sends '/login' to this service.
// So we must mount routes at '/' to catch them correctly.
app.use("/", userRoutes);

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

app.get('/', (req, res) => {
  res.send('Auth Service is Running!');
})

main()
  .then(() => console.log("Auth Service DB Connected (MongoDB)!"))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Auth Service listening on port ${port}`);
})