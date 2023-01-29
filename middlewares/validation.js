const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log("this is an error catcher: ", error);
    if (error) {
      return res
        .status(400)
        .json({ message: "тут додати той меседж, як по ТЗ" });
    }
    next();
  };
};

module.exports = validateBody;
