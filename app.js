const express = require('express');
const path = require('path'); // To handle file paths
const adminRoutes = require('./routes/admin/adminRoutes');
const commonRoutes = require('./routes/common/commonRoutes');
const bodyParser = require('body-parser'); // To parse form data
const session = require('express-session'); // Import the session middleware
const mongoose = require('mongoose'); 
const Helper = require('./helper/Helper'); // Import Helper class
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for views (EJS templates)
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const dbURI = 'mongodb://localhost:27017/wasender'; // Change this to your MongoDB URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB:', err);
    });

// const helper = new Helper();

app.use(session({
    secret: 'your-secret-key', // Secret key for signing the session ID
    resave: false,             // Don't resave the session if it's not modified
    saveUninitialized: true,   // Save the session even if it's not initialized
    cookie: { secure: false }  // Use 'true' if you're using https (not for development with http)
}));

app.use((req, res, next) => {
    res.locals.session = req.session; // Attach session data to res.locals, accessible in all views
    res.locals.helper = new Helper(req);
    next();
});

app.use('/admin', (req, res, next) => {
    // If the URL is '/admin/login', skip the middleware
    if (req.url === '/login') {
        return next();
    }

    // Check if user is logged in by verifying session
    if (!req.session.username || req.session.role !== 1) {
        req.session.destroy();
        return res.redirect('/admin/login'); // Redirect to login page if not logged in
    }

    // Proceed to the next middleware/route if logged in
    next();
});

// Define the root route
app.get('/', (req, res) => {
    res.send('Hello');
});

// Define the /login route to render the login page
app.get('/login', (req, res) => {
    //   res.render('login'); // This will render views/login.ejs
    res.send("login")
});


app.use('/admin', adminRoutes);
app.use('/', commonRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
