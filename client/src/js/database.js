//this imports the openDB function from the idb package and initializes the database.
import { openDB } from 'idb';

// This function initializes the database by creating an object store called jate. 
//The object store has a keyPath of id and is set to autoIncrement. 
//This means that each object added to the object store will have a unique id that is automatically generated.
const initdb = async () =>
  openDB('textly', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('textly')) {
        console.log('textly database already exists');
        return;
      }
      db.createObjectStore('textly', { keyPath: 'id', autoIncrement: true });
      console.log('textly database created');
    },
  });

  
// // This function takes a content object as an argument and adds it to the object store.
export const putDb = async (content) => {
  console.log('Here is the',content);
  const db = await openDB('textly', 1);
  const tx = db.transaction('textly', 'readwrite');
  const store = tx.objectStore('textly');
  await store.put({ data: content.content, id: 1 }); // Fix content assignment
  await tx.done;
};

// This function retrieves all the content from the object store and returns it as an array.
export const getDb = async () => {
  const db = await openDB('textly', 1);
  const tx = db.transaction('textly', 'readonly');
  const store = tx.objectStore('textly');
  const data = await store.get(1);
  await tx.done;

  return data ? data.data : null; // Return data.data instead of data
};


//call the initdb function to initialize the database when the file is loaded.
initdb();