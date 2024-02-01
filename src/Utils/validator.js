const mongoose = require('mongoose');


const isValid = function (value) {
  if (typeof value == undefined || value == null || value.length == 0 ) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidBody = function (data) {
  return Object.keys(data).length > 0;
};


const isValidPassword = function (password) {
    const length = password.length;
    if (length < 9 || length > 14) {
        return false;
      }
      return true;
};


const isValidName = function (name) {
// a string that can consist of one or more of the specified characters, including lowercase and uppercase letters, spaces, commas, periods, apostrophes, and hyphens.
  if (/^[a-z ,.'-]+$/i.test(name)) return true;
  // i at the end makes the regular expression case-insensitive
  return false;
};

const isValidEmail = function (mail) {
  if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
};

const isValidNumbers = function (value){
  let user = /^[0-9]+$/.test(value)
  return user
}


module.exports = {
  isValid,
  isValidBody,
  isValidPassword,
  isValidName,
  isValidEmail,
  isValidNumbers
};