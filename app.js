const express = require('express');
const path = require('path'); // To handle file paths
const adminRoutes = require('./routes/adminRoutes');
const bodyParser = require('body-parser'); // To parse form data
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for views (EJS templates)
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

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
