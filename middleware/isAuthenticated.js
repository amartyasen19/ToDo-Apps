 

module.exports.isAuthenticated = (req, res, next) => {
    // Check if the user is authenticated by verifying the session
    if (req.session.userId) {
      return next(); // If the user is authenticated, proceed to the next middleware or route
    } else {
      // If not authenticated, redirect to the sign-in page
      res.redirect('/signin');
    }
  };