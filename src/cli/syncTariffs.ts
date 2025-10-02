import syncTariffUseCase from "@/application/use-cases/syncTariffUseCase";

async function main() {
	try {
		console.log("Starting tariffs synchronization...");
		await syncTariffUseCase();
		console.log("Tariffs synchronization completed successfully");
		process.exit(0);
	} catch (error) {
		console.error("Tariffs synchronization failed:", error);
		process.exit(1);
	}
}

if (require.main === module) {
	main();
}
