const responseErrors = {
  unauthorized: { status: 401, message: 'Not authorized' },
  notFound: { status: 404, message: 'Not found' },
};

module.exports = { responseErrors };
