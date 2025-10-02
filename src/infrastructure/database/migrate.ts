import db from "./connection";

export default async function runMigrations(): Promise<void> {
	try {
		console.log("Running database migrations...");
		await db.migrate.latest();
		console.log("Database migrations completed");
	} catch (error) {
		console.error("Database migrations failed: \n", error);
		throw error;
	}
}
