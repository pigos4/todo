const PouchDB = require("pouchdb");
const db = new PouchDB("my_db");
// db.destroy(function (err:any, response:any) {
//   if (err) {
//     return console.log(err);
//   } else {
//     console.log('deleted')
//     // success
//   }
// });
const postInDatabase = async (data: any) => {
  try {
    return await db.put({ ...data, _id: new Date().toISOString() });
  } catch (err) {
    return await err;
  }
};
const dateteSingleItem=async (id:string)=>{
  try {
    const doc = await db.get(id);
    
    return await db.remove(doc._id, doc._rev);
    
  } catch (err) {
    console.log(err);
  }
}


const allDocs = async () => {
  try {
    
    return await db.allDocs({
      include_docs: true,
      attachments: true,
    });
  } catch (err) {
    return await err;
  }
};

module.exports = {
  post: postInDatabase,
  allDocs: allDocs,
  deleteItem: dateteSingleItem,
};
