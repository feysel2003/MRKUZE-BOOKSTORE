const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();

const port = process.env.PORT || 5003;

// middleware
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}));

// --- ROUTES ---
const orderRoutes = require('./src/orders/order.route');
const adminRoutes = require('./src/stats/admin.stats');

// FIX: Match the paths set in the Gateway
app.use("/orders", orderRoutes); 
app.use("/admin", adminRoutes);

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

app.get('/', (req, res) => {
  res.send('Order Service is Running!');
})

main()
  .then(() => console.log("Order Service DB Connected!"))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Order Service listening on port ${port}`);
})