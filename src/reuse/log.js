require("colors");

module.exports = {
  normal(message) {
    console.log(`${`[Sicoma]`.bold} ${message}`.white);
  },

  notice(message) {
    console.log(`${`[Notice]`.bold} ${message}`.blue);
  },

  failure(message) {
    console.log(`${`[Failure]`.bold} ${message}`.red);
  },

  success(message) {
    console.log(`${`[Success]`.bold} ${message}`.green);
  }
}