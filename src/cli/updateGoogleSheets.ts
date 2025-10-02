import updateGoogleSheetsUseCase from "@/application/use-cases/updateGoogleSheetsUseCase";

async function main() {
	try {
		console.log("Starting Google Sheets update...");
		await updateGoogleSheetsUseCase();
		console.log("Google Sheets update completed successfully");
		process.exit(0);
	} catch (error) {
		console.error("Google Sheets update failed:", error);
		process.exit(1);
	}
}

if (require.main === module) {
	main();
}
