require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const {HoldingsModel} = require("../backend/model/HoldingsModel");
const {PositionsModel} = require("../backend/model/PositionsModel");
const {OrdersModel} = require("../backend/model/OrdersModel");
const {UserModel} = require("../backend/model/UserModel");
const { auth, JWT_SECRET } = require("../backend/middleware/auth");

const PORT = process.env.PORT || 3002;
const DBURL = process.env.MONGO_URL || "mongodb://localhost:27017/laksharth";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Test endpoint
app.get("/test", (req, res) => {
    res.json({ 
        message: "Backend is working!", 
        timestamp: new Date().toISOString(),
        auth: "Authentication system is ready"
    });
});

// Authentication Routes
app.post("/auth/register", async (req, res) => {
    try {
        console.log('Registration request received:', req.body);
        const { username, email, password, firstName, lastName, phone } = req.body;

        // Validate required fields
        if (!username || !email || !password || !firstName || !lastName) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided'
            });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: existingUser.email === email ? 
                    'Email already registered' : 'Username already taken'
            });
        }

        // Create new user
        const user = new UserModel({
            username,
            email,
            password,
            firstName,
            lastName,
            phone
        });

        console.log('Saving user to database...');
        await user.save();
        console.log('User saved successfully');

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        console.log('Registration successful for user:', username);
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: user.toJSON()
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message
        });
    }
});

app.post("/auth/login", async (req, res) => {
    try {
        console.log('Login request received:', { email: req.body.email });
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            console.log('User not found for email:', email);
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        console.log('User found, checking password...');
        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            console.log('Invalid password for user:', email);
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check if account is active
        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Account is deactivated'
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        console.log('Login successful for user:', user.username);
        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: user.toJSON()
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
});

// Get current user profile
app.get("/auth/profile", auth, async (req, res) => {
    try {
        res.json({
            success: true,
            user: req.user.toJSON()
        });
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch profile'
        });
    }
});

app.get("/addHoldings", async(req,res) => {
    let tempHoldings = [
  {
    name: "BHARTIARTL",
    qty: 2,
    avg: 538.05,
    price: 541.15,
    net: "+0.58%",
    day: "+2.99%",
  },
  {
    name: "HDFCBANK",
    qty: 2,
    avg: 1383.4,
    price: 1522.35,
    net: "+10.04%",
    day: "+0.11%",
  },
  {
    name: "HINDUNILVR",
    qty: 1,
    avg: 2335.85,
    price: 2417.4,
    net: "+3.49%",
    day: "+0.21%",
  },
  {
    name: "INFY",
    qty: 1,
    avg: 1350.5,
    price: 1555.45,
    net: "+15.18%",
    day: "-1.60%",
    isLoss: true,
  },
  {
    name: "ITC",
    qty: 5,
    avg: 202.0,
    price: 207.9,
    net: "+2.92%",
    day: "+0.80%",
  },
  {
    name: "KPITTECH",
    qty: 5,
    avg: 250.3,
    price: 266.45,
    net: "+6.45%",
    day: "+3.54%",
  },
  {
    name: "M&M",
    qty: 2,
    avg: 809.9,
    price: 779.8,
    net: "-3.72%",
    day: "-0.01%",
    isLoss: true,
  },
  {
    name: "RELIANCE",
    qty: 1,
    avg: 2193.7,
    price: 2112.4,
    net: "-3.71%",
    day: "+1.44%",
  },
  {
    name: "SBIN",
    qty: 4,
    avg: 324.35,
    price: 430.2,
    net: "+32.63%",
    day: "-0.34%",
    isLoss: true,
  },
  {
    name: "SGBMAY29",
    qty: 2,
    avg: 4727.0,
    price: 4719.0,
    net: "-0.17%",
    day: "+0.15%",
  },
  {
    name: "TATAPOWER",
    qty: 5,
    avg: 104.2,
    price: 124.15,
    net: "+19.15%",
    day: "-0.24%",
    isLoss: true,
  },
  {
    name: "TCS",
    qty: 1,
    avg: 3041.7,
    price: 3194.8,
    net: "+5.03%",
    day: "-0.25%",
    isLoss: true,
  },
  {
    name: "WIPRO",
    qty: 4,
    avg: 489.3,
    price: 577.75,
    net: "+18.08%",
    day: "+0.32%",
  },
];

    tempHoldings.forEach((item) => {
        let newHolding = new HoldingsModel({
            name: item.name,
            qty: item.qty,
            avg: item.avg,
            price: item.price,
            net: item.net,
            day: item.day,
        })

        newHolding.save();
    });

    res.send("Done");
});

// app.get("/addPositions", async(req,res) => {
//     let tempPositions = [
//         {
//             product: "CNC",
//             name: "EVEREADY",
//             qty: 2,
//             avg: 316.27,
//             price: 312.35,
//             net: "+0.58%",
//             day: "-1.24%",
//             isLoss: true,
//         },
//         {
//             product: "CNC",
//             name: "JUBLFOOD",
//             qty: 1,
//             avg: 3124.75,
//             price: 3082.65,
//             net: "+10.04%",
//             day: "-1.35%",
//             isLoss: true,
//         },
//     ];

//     tempPositions.forEach((item) => {
//         let newPosition = new PositionsModel({
//             product: item.product,
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//             isLoss: item.isLoss,
//         })

//         newPosition.save();
//     });

//     res.send("Done");
// });

app.get("/allHoldings", auth, async(req,res) => {
    try {
        let allHoldings = await HoldingsModel.find({ userId: req.user._id });
        res.json(allHoldings);
    } catch (error) {
        console.error("Error fetching holdings:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching holdings"
        });
    }
});

app.get("/allPositions", async(req,res) => {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
});

// Get all orders
app.get("/allOrders", auth, async(req,res) => {
    try {
        let allOrders = await OrdersModel.find({ userId: req.user._id }).sort({ _id: -1 }); // Sort by newest first
        res.json(allOrders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching orders"
        });
    }
});

// Get holdings for a specific stock
app.get("/getHolding/:stockName", auth, async(req,res) => {
    try {
        const stockName = req.params.stockName;
        const holding = await HoldingsModel.findOne({ userId: req.user._id, name: stockName });
        
        if (!holding) {
            return res.json({ 
                exists: false, 
                message: "No holdings found for this stock" 
            });
        }
        
        res.json({
            exists: true,
            holding: holding
        });
    } catch (error) {
        console.error("Error fetching holding:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

app.post("/newOrder", async(req,res) => {
    let newOrder = new OrdersModel({
        name: req.body.name,
        qty: req.body.qty,
        price: req.body.price,
        mode: req.body.mode,
    });

    newOrder.save();

    res.send("Order Saved!")
});

// New endpoint for validating sell orders
app.post("/validateSellOrder", auth, async(req,res) => {
    try {
        const { name, qty } = req.body;
        console.log("Sell order request:", { name, qty, price: req.body.price });
        
        // Check if user has holdings for this stock
        const holding = await HoldingsModel.findOne({ userId: req.user._id, name: name });
        console.log("Found holding:", holding);
        
        if (!holding) {
            console.log("No holding found for:", name);
            return res.status(400).json({
                success: false,
                message: "You don't own any shares of this stock"
            });
        }
        
        // Check if user has enough quantity to sell
        if (holding.qty < qty) {
            console.log("Insufficient quantity:", { owned: holding.qty, requested: qty });
            return res.status(400).json({
                success: false,
                message: `You only own ${holding.qty} shares of ${name}, but trying to sell ${qty} shares`
            });
        }
        
        // If validation passes, create the order
        let newOrder = new OrdersModel({
            userId: req.user._id,
            name: name,
            qty: qty,
            price: req.body.price,
            mode: "SELL",
        });

        await newOrder.save();
        console.log("Order saved successfully");
        
        // Update holdings (reduce quantity)
        const newQty = holding.qty - qty;
        if (newQty === 0) {
            // If quantity becomes 0, remove the holding
            await HoldingsModel.deleteOne({ userId: req.user._id, name: name });
            console.log("Holding removed (quantity became 0)");
        } else {
            // Update the holding with new quantity
            await HoldingsModel.updateOne(
                { userId: req.user._id, name: name },
                { qty: newQty }
            );
            console.log("Holding updated, new quantity:", newQty);
        }

        const response = {
            success: true,
            message: "Sell order placed successfully!",
            remainingQty: newQty
        };
        console.log("Sending response:", response);
        res.json(response);
        
    } catch (error) {
        console.error("Error validating sell order:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// New endpoint for validating buy orders
app.post("/validateBuyOrder", auth, async(req,res) => {
    try {
        const { name, qty, price } = req.body;
        
        // Check if user already has holdings for this stock
        let holding = await HoldingsModel.findOne({ userId: req.user._id, name: name });
        
        if (holding) {
            // Update existing holding
            const totalQty = holding.qty + qty;
            const totalValue = (holding.avg * holding.qty) + (price * qty);
            const newAvg = totalValue / totalQty;
            
            await HoldingsModel.updateOne(
                { userId: req.user._id, name: name },
                { 
                    qty: totalQty,
                    avg: newAvg
                }
            );
        } else {
            // Create new holding
            let newHolding = new HoldingsModel({
                userId: req.user._id,
                name: name,
                qty: qty,
                avg: price,
                price: price,
                net: "0.00%",
                day: "0.00%"
            });
            await newHolding.save();
        }
        
        // Create the order
        let newOrder = new OrdersModel({
            userId: req.user._id,
            name: name,
            qty: qty,
            price: price,
            mode: "BUY",
        });

        await newOrder.save();

        res.json({
            success: true,
            message: "Buy order placed successfully!"
        });
        
    } catch (error) {
        console.error("Error validating buy order:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

mongoose.connect(DBURL)
    .then(() => {
        console.log("Connected to MongoDB successfully");
        console.log("Database URL:", DBURL);
        console.log("Ready to handle authentication requests");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
        console.log("Please make sure MongoDB is running or check your connection string");
        process.exit(1);
    });

app.listen(PORT, () => {
    console.log("Server is running on port 3002");
    console.log("Visit http://localhost:3002/addHoldings to add sample data");
});