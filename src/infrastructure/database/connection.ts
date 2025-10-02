import knex from "knex";
import config from "@/knexfile";
import { NODE_ENV } from "@/config/config";

const environment = NODE_ENV || "development";
const db = knex(config[environment]);

export default db;
