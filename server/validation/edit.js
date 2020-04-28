const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.ign = !isEmpty(data.ign) ? data.ign : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  // Name checks
  if (Validator.isEmpty(data.firstname)) {
    errors.name = "First Name field is required";
  }
  if (Validator.isEmpty(data.lastname)) {
    errors.name = "First Name field is required";
  }
  if (Validator.isEmpty(data.ign)) {
    errors.ign = "IGN field is required";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};