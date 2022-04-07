// File store for Sicoma

const fs = require("fs");
const path = require("path");

module.exports = () => {
  // Create store files
  const PagePath = path.join(__dirname, "./file/Page.json");
  const MenuItemPath = path.join(__dirname, "./file/MenuItem.json");
  const ConfigPath = path.join(__dirname, "./file/Config.json");
  if (!fs.existsSync(PagePath)) fs.writeFileSync(PagePath, "[]", "utf-8");
  if (!fs.existsSync(MenuItemPath)) fs.writeFileSync(MenuItemPath, "[]", "utf-8");
  if (!fs.existsSync(ConfigPath)) fs.writeFileSync(ConfigPath, "{}", "utf-8");

  return {
    // Create page
    Page: {
      create: (document) => {
        // Get current Page store
        let currentPageStore = JSON.parse(fs.readFileSync(PagePath, "utf-8"));

        // Check if the item already exists
        if (currentPageStore.filter((i) => i.uri == document.uri).length > 0) return { err: "EXISTS" };

        // Append current document
        currentPageStore.push(document);

        // Save
        fs.writeFileSync(PagePath, JSON.stringify(currentPageStore), "utf-8");

        return true;
      },

      get: (uri) => {
        // Get current Page store
        const currentPageStore = JSON.parse(fs.readFileSync(PagePath, "utf-8"));

        // Filter it
        const filteredDocuments = currentPageStore.filter((i) => i.uri == uri);

        if (filteredDocuments.length > 0) return filteredDocuments[0];
        else return null;
      }
    },

    // Create menu item
    MenuItem: {
      create: (document) => {
        // Get current MenuItem store
        let currentMenuItemStore = JSON.parse(fs.readFileSync(MenuItemPath, "utf-8"));

        // Check if the item already exists
        if (currentMenuItemStore.filter((i) => i.id == document.id).length > 0) return { err: "EXISTS" };

        // Append current document
        currentMenuItemStore.push(document);

        // Save
        fs.writeFileSync(MenuItemPath, JSON.stringify(currentMenuItemStore), "utf-8");

        return true;
      },

      get: (id) => {
        // Get current Page store
        const currentMenuItemStore = JSON.parse(fs.readFileSync(MenuItemPath, "utf-8"));

        // Filter it
        const filteredDocuments = currentMenuItemStore.filter((i) => i.id == id);

        if (filteredDocuments.length > 0) return filteredDocuments[0];
        else return null;
      }
    },

    Config: {
      set: (document) => {
        // Save current document
        fs.writeFileSync(ConfigPath, JSON.stringify(document), "utf-8");
      },

      get: () => {
        // Get config document
        const document = fs.readFileSync(ConfigPath, "utf-8");

        if (document) return document;
        else return null;
      }
    }
  }
}