const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log("this is an error catcher: ", error);
    if (error) {
      const { message } = error.details[0];
      return res.status(400).json({ message });
    }
    next();
  };
};

module.exports = validateBody;
