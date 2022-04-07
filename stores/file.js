// File store for Sicoma

const fs = require("fs");
const path = require("path");

// Function for comparing objects and applying changes to full object based on comparer object
function change(object, comparer) {
  let newObject = { ...object };

  for (const key in newObject) {
    if (comparer[key]) {
      // If object/comparer key is not the same type, skip
      if (typeof newObject[key] !== typeof comparer[key]) continue;

      // Make change
      if (newObject[key].toString() == "[object Object]") {
        // If current item that's being changed is an object, run this function again
        newObject[key] = change(newObject[key], comparer[key]);
      } else {
        // Otherwise, just change the value
        newObject[key] = comparer[key];
      }
    }
  }

  return newObject;
}

module.exports = () => {
  // Create store files
  const PagePath = path.join(__dirname, "./file/Page.json");
  const MenuItemPath = path.join(__dirname, "./file/MenuItem.json");
  const ConfigPath = path.join(__dirname, "./file/Config.json");
  if (!fs.existsSync(PagePath)) fs.writeFileSync(PagePath, "[]", "utf-8");
  if (!fs.existsSync(MenuItemPath)) fs.writeFileSync(MenuItemPath, "[]", "utf-8");
  if (!fs.existsSync(ConfigPath)) fs.writeFileSync(ConfigPath, "{}", "utf-8");

  return {
    Page: {
      // Create page
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
      },

      edit: (changes, uri) => {
        // Get current Page store
        let currentPageStore = JSON.parse(fs.readFileSync(PagePath, "utf-8"));
        
        // Get the document index
        const documentIndex = currentPageStore.findIndex((i) => i.uri == uri);

        // Get the document object
        if (documentIndex == -1) return null;
        let document = { ...currentPageStore[documentIndex] };
        
        // Edit it
        document = change(document, changes);

        // Replace the document
        currentPageStore[documentIndex] = document;

        // Save
        fs.writeFileSync(PagePath, JSON.stringify(currentPageStore), "utf-8");

        return true;
      },

      delete: (uri) => {
        // Get current Page store
        let currentPageStore = JSON.parse(fs.readFileSync(PagePath, "utf-8"));

        // Filter the item out
        currentPageStore = currentPageStore.filter((i) => i.uri !== uri);

        // Save
        fs.writeFileSync(PagePath, JSON.stringify(currentPageStore), "utf-8");

        return true;
      }
    },

    MenuItem: {
      // Create menu item
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
        // Get current MenuItem store
        const currentMenuItemStore = JSON.parse(fs.readFileSync(MenuItemPath, "utf-8"));

        // Filter it
        const filteredDocuments = currentMenuItemStore.filter((i) => i.id == id);

        if (filteredDocuments.length > 0) return filteredDocuments[0];
        else return null;
      },

      edit: (changes, id) => {
        // Get current MenuItem store
        let currentMenuItemStore = JSON.parse(fs.readFileSync(MenuItemPath, "utf-8"));
        
        // Get the document index
        const documentIndex = currentMenuItemStore.findIndex((i) => i.id == id);

        // Get the document object
        if (documentIndex == -1) return null;
        let document = { ...currentMenuItemStore[documentIndex] };
        
        // Edit it
        document = change(document, changes);

        // Replace the document
        currentMenuItemStore[documentIndex] = document;

        // Save
        fs.writeFileSync(MenuItemPath, JSON.stringify(currentMenuItemStore), "utf-8");

        return true;
      },

      delete: (id) => {
        // Get current MenuItem store
        let currentMenuItemStore = JSON.parse(fs.readFileSync(MenuItemPath, "utf-8"));

        // Filter the item out
        currentMenuItemStore = currentMenuItemStore.filter((i) => i.id !== id);

        // Save
        fs.writeFileSync(MenuItemPath, JSON.stringify(currentMenuItemStore), "utf-8");

        return true;
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
      },

      edit: (changes) => {
        // Get current config
        let currentConfig = JSON.parse(fs.readFileSync(ConfigPath, "utf-8"));
        
        // Edit it
        currentConfig = change(currentConfig, changes);

        // Save
        fs.writeFileSync(ConfigPath, JSON.stringify(currentConfig), "utf-8");

        return true;
      }
    }
  }
}