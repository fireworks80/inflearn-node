const { odd, even } = require('./var');

function checkValues(num) {
  return num % 2 ? odd : even;
}

module.exports = checkValues;
