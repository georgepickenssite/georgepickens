import { DataStore } from "aws-amplify";

export async function saveItem(model, item) {
  try {
    await DataStore.save(new model(item));
    console.log("Item saved:", item);
  } catch (error) {
    console.error("Error saving item:", error);
  }
}

export async function fetchItems(model) {
  try {
    const items = await DataStore.query(model);
    console.log("Items fetched:", items);
    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}

export async function deleteItem(model, id) {
  try {
    const itemToDelete = await DataStore.query(model, id);
    await DataStore.delete(itemToDelete);
    console.log("Item deleted:", itemToDelete);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}