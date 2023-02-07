const prepareResponse = (obj) => {
  const { _id, ...rest } = obj.toObject();

  return { id: _id.valueOf(), ...rest };
};

module.exports = {
  prepareResponse,
};
