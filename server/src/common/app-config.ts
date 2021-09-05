import { AppConfig } from "./interfaces";
import dotenv from "dotenv";

dotenv.config();

class Config implements AppConfig {
  public mongoDbConnString: string;
  public mongoDbName: string;
  public appPort: number;
  public appHost: string;
  constructor() {
    this.mongoDbConnString = process.env.MONGO_DB_CONN_STRING as string;
    this.mongoDbName = process.env.MONGO_DB_NAME as string;
    this.appPort = parseInt((process.env.PORT as string) || "8080");
  }
}

export default new Config();
