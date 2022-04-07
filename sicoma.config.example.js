// Configuration file for Sicoma

module.exports = {
  server: {
    port: 1090 // Port for the server to listen on
  },

  store: require("./stores/file")(), // In what way your pages and menus will be stores.
  // The store that is currently selected will store data in files.
}