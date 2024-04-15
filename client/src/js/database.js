//this imports the openDB function from the idb package and initializes the database.
import { openDB } from 'idb';

// This function initializes the database by creating an object store called jate. 
//The object store has a keyPath of id and is set to autoIncrement. 
//This means that each object added to the object store will have a unique id that is automatically generated.
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  
// This function takes a content object as an argument and adds it to the object store.
export const putDb = async (content) => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.put(content);
  await tx.done;
};



// This function retrieves all the content from the object store and returns it as an array.
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const content = await store.getAll();
  await tx.done;
  return content;
}

//call the initdb function to initialize the database when the file is loaded.
initdb();
