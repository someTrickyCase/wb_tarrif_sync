import { API_FETCH_TIMEOUT } from "@/config/config";
import syncTariff from "@/domain/tariffs/tariffSync";
import getTariffsData from "@/infrastructure/http/wbApi";
import retryDecorator from "@/shared/utils/decorators/retryDecorator";

export default async function syncTariffUseCase(
	date: Date = new Date()
): Promise<void> {
	try {
		const result = await retryDecorator(() =>
			getTariffsData(date, API_FETCH_TIMEOUT)
		);

		if (!result.data || result.data.status !== "success" || !result.data.data) {
			throw new Error(result.error || "Failed to fetch tariffs");
		}

		await syncTariff(result.data.data, date);
		console.log(`Use case completed for ${date.toISOString().split("T")[0]}`);
	} catch (error) {
		console.log("Use case tariff sync failed: \n", error);
		throw error;
	}
}
