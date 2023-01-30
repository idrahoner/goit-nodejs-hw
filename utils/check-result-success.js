const checkResultSuccess = (response) => {
  if (!response) {
    throw new Error('error');
  }
};

module.exports = checkResultSuccess;
