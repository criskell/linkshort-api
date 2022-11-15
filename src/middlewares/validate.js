export default (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });

  if (! error) return next();

  res.status(400).json({
    errors: error.details.reduce((groupedErrors, error) => {
      const group = error.path.join(".");
      
      groupedErrors[group] ||= error.message;

      return groupedErrors;
    }, {})
  });
};