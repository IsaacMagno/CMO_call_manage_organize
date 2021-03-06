const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://localhost:27017/CMO';
// Call, Manage, Organize
const DB_NAME = 'CMO';

let db = null;

const connection = () => (
  db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((conn) => {
        db = conn.db(DB_NAME);
        return db;
      })
      .catch((err) => {
        console.error(err);
        process.exit();
      })
);

module.exports = connection;
