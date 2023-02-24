const responseErrors = {
  unauthorized: { status: 401, message: 'Not authorized' },
  notFound: { status: 404, message: 'Not found' },
  emailUsed: {
    status: 409,
    message: 'Email in use',
  },
  notImage: { status: 400, message: 'The file must be an image' },
  avatarSizeTooLarge: {
    status: 400,
    message: 'The file size should not exceed 2MB',
  },
};

module.exports = { responseErrors };
