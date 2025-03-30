const express = require('express');
const path = require('path'); // To handle file paths
const adminRoutes = require('./routes/adminRoutes');
const bodyParser = require('body-parser'); // To parse form data
const session = require('express-session'); // Import the session middleware
const Helper = require('./helper/Helper'); // Import Helper class
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for views (EJS templates)
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
