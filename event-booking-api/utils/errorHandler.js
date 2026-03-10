exports.errorHandler = (res, error, status = 500) => {

  console.error(error);

  res.status(status).json({
    success: false,
    message: error.message || "Internal server error"
  });

};