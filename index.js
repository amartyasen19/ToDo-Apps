const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config(); // For environment variables

// Import routes
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/index");

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session middleware
app.use(
  session({
    secret:
      process.env.SESSION_SECRET ||
      "7d92bc47ab234f348fc3b4d760ba9a3f7f1d6821b283f5e02d4a9fba12c0f54d", // Keep this secret safe
    resave: false,
    saveUninitialized: true,
  })
);

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "assets")));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the directory for EJS templates
app.set("views", path.join(__dirname, "views"));

// Use routes for authentication and home
app.use("/", authRoutes);
app.use('/', homeRoutes);


// Default route for unauthenticated users (redirect to sign-in page)
app.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect('/'); // Redirect to home page if authenticated
  } else {
    res.redirect('/signin'); // Redirect to sign-in page if not authenticated
  }
});


// Handle 404 errors (Page Not Found)
app.use((req, res) => {
  res.status(404).send("Page not found");
});

 

 

// Global error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).send("Something went wrong!");
});

// Start the server
const port = process.env.PORT || 3000; // Use port from .env or default to 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
