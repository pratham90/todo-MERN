const express = require('express')
const {default:mongoose} = require('mongoose');
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

const DB_path = process.env.MONGODB_URI
const cors = require('cors')

// local imports
const itemsRouter = require('./routes/itemsRouter');

// using core
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));
app.use(express.json())
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
      ? process.env.CLIENT_URL
      : 'http://localhost:5173',
    credentials: true
}))

// using routes
app.use('/api/todo', itemsRouter)

// error handling
app.use((req, res, next) => {
    res.status(404).json({message: 'page not found'});
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: 'Something went wrong!'});
})

// running server
const PORT = process.env.PORT || 3000;

// MongoDB connection with retry logic
const connectDB = async () => {
    try {
        await mongoose.connect(DB_path);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        // Retry connection after 5 seconds
        setTimeout(connectDB, 5000);
    }
};
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"))
    })
}


    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    });


