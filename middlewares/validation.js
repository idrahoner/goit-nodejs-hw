const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const { message } = error.details[0];
      return res.status(400).json({ message });
    }
    next();
  };
};

module.exports = validateBody;
