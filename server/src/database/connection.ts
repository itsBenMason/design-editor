import { Db, MongoClient, MongoError } from "mongodb";
const connStr = "mongodb+srv://dev:dev@uibox-dev.wtl7h.mongodb.net/dev?retryWrites=true&w=majority";
const dbName = "uibox-dev";

class MongoDBConnection {
  private static isConnected: boolean = false;
  private static db: Db;
  public static getConnection(result: (connection: Db) => void) {
    if (this.isConnected) {
      return this.db;
    } else {
      this.connect((err, db) => {
        return result(db);
      });
    }
  }
  public static connect(result: (err: MongoError, db: Db) => void) {
    MongoClient.connect(connStr, { useUnifiedTopology: true }, (err, client) => {
      this.db = client.db(dbName);
      this.isConnected = true;
      return result(err, this.db);
    });
  }
}

export default MongoDBConnection;
