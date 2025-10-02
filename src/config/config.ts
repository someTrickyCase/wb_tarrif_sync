import * as dotenv from "dotenv";
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV;

export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;

export const API_URL = process.env.WB_API_URL;
export const API_KEY = process.env.WB_API_KEY;
export const API_FETCH_TIMEOUT = 10 * 1000; /* ms */

export const GOOGLE_SERVICE_ACCOUNT_EMAIL =
	process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
export const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(
	/\\n/g,
	"\n"
);
export const GOOGLE_SHEETS_IDS =
	process.env.GOOGLE_SHEETS_IDS?.split(",").map((id) => id.trim()) || [];
export const GOOGLE_SHEETS_AUTH_URL =
	"https://www.googleapis.com/auth/spreadsheets";
