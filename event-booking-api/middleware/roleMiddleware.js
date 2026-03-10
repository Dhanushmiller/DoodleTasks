exports.authorizeAdmin = (req, res, next) => {

  // Check if user exists from auth middleware
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized. Please login."
    });
  }

  // Check admin role
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only"
    });
  }
  

  next();
};

exports.authorizeUser = (req, res, next) => {

  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  if (req.user.role !== "user") {
    return res.status(403).json({
      message: "Only users can book events"
    });
  }

  next();
};