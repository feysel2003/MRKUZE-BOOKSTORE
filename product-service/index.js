const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();

const port = process.env.PORT || 5002;

// middleware
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}));

// --- ROUTES ---
const bookRoutes = require('./src/books/book.route');

// Gateway forwards "/api/books" here.
app.use("/", bookRoutes);

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

app.get('/', (req, res) => {
  res.send('Product Service (Books) is Running!');
})

main()
  .then(() => console.log("Product Service DB Connected!"))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Product Service listening on port ${port}`);
})