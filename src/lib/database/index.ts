import { MongoClient, Db } from "mongodb";

class MongoDatabase {
  private static instance: MongoDatabase | null = null;
  private client: MongoClient;
  private database: Db;

  private constructor() {
    const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@iamgabe.alllehj.mongodb.net/?retryWrites=true&w=majority`;
    this.client = new MongoClient(uri);
    this.database = this.client.db("YOUR_DB_NAME");
  }

  public static async getInstance(): Promise<MongoDatabase> {
    if (!this.instance) {
      this.instance = new MongoDatabase();
      await this.instance.connect();
    }
    return this.instance;
  }

  private async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.database = this.client.db(process.env.MONGODB_DB_NAME);
      console.log("Connected successfully to MongoDB");
    } catch (e) {
      console.error("Failed to connect to MongoDB", e);
      throw e;
    }
  }

<<<<<<< Updated upstream
  public getDb(): Db {
=======
  public getDatabase(): Db {
>>>>>>> Stashed changes
    return this.database;
  }

  public async closeConnection(): Promise<void> {
    if (this.client) {
      await this.client.close();
      MongoDatabase.instance = null;
      console.log("MongoDB connection closed");
    }
  }
}

export default MongoDatabase;
