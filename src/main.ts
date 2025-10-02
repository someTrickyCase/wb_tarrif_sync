import runMigrations from "./infrastructure/database/migrate";
import syncTariffUseCase from "./application/use-cases/syncTariffUseCase";
import updateGoogleSheetsUseCase from "./application/use-cases/updateGoogleSheetsUseCase";

async function main() {
	try {
		await runMigrations();
		await syncTariffUseCase();
		await updateGoogleSheetsUseCase();
		console.log("🚀 Application started successfully");
	} catch (error) {
		console.error("Application failed to start:", error);
		process.exit(1);
	}
}

main();
