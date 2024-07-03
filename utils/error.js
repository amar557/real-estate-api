const handlError = (statusCode, message) => {
  let error = new Error();
  error.message = message;
  error.statucCode = statusCode;
  return error;
};
export default handlError;
