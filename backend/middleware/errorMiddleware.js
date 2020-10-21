const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);       // set the status code to the res before its sent
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack     // provide stack trace if we are not in production
  });
};

export { notFound, errorHandler }