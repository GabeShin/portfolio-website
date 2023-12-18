import { MongoClient, Db } from "mongodb";

class MongoDatabase {
  private static instance: MongoDatabase | null = null;
  private client: MongoClient;
  private database: Db;

  private constructor() {
    const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@iamgabe.alllehj.mongodb.net/?retryWrites=true&w=majority`;
    console.log({ uri });
    this.client = new MongoClient(uri);
    console.log("MongoDB client created");
    this.database = this.client.db("documents");
    console.log("MongoDB database created");
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
      console.log("Connected successfully to MongoDB");
    } catch (e) {
      console.error("Failed to connect to MongoDB", e);
      throw e;
    }
  }

  public getDatabase(): Db {
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
