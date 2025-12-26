const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());

// --- DOCKER SERVICE DISCOVERY ---
// Use the internal Docker names (e.g., http://auth-service:5001)
// If running locally without Docker, fallback to localhost
const authUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:5001';
const productUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002';
const orderUrl = process.env.ORDER_SERVICE_URL || 'http://localhost:5003';

console.log(`Gateway targets: Auth->${authUrl}, Product->${productUrl}, Order->${orderUrl}`);

// 1. Auth Service
app.use('/api/auth', proxy(authUrl));

// 2. Product Service
app.use('/api/books', proxy(productUrl));

// 3. Order Service (Path Resolver for /orders)
app.use('/api/orders', proxy(orderUrl, {
    proxyReqPathResolver: (req) => {
        return '/orders' + req.url; 
    }
}));

// 4. Admin Stats (Path Resolver for /admin)
app.use('/api/admin', proxy(orderUrl, {
    proxyReqPathResolver: (req) => {
        return '/admin' + req.url; 
    }
}));

app.get('/', (req, res) => {
    res.send('API Gateway is Running!');
});

app.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
});