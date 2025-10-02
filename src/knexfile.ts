import type { Knex } from "knex";
import {
	DB_HOST,
	DB_NAME,
	DB_PASSWORD,
	DB_PORT,
	DB_USER,
} from "./config/config";

function vlidateDBConfig() {
	if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASSWORD || !DB_NAME)
		throw new Error("DB connection data is missing");
}

vlidateDBConfig();
const config: { [key: string]: Knex.Config } = {
	development: {
		client: "postgresql",
		connection: {
			host: DB_HOST!,
			port: parseInt(DB_PORT!),
			user: DB_USER!,
			password: DB_PASSWORD!,
			database: DB_NAME!,
		},
		migrations: {
			directory: "./src/infrastructure/persistence/migrations",
			extension: "ts",
		},
	},
	production: {
		client: "postgresql",
		connection: {
			host: DB_HOST!,
			port: parseInt(DB_PORT!),
			user: DB_USER!,
			password: DB_PASSWORD!,
			database: DB_NAME!,
		},
		migrations: {
			directory: "./src/infrastructure/persistence/migrations",
			extension: "ts",
		},
	},
};
export default config;
