import { upsertTariffs } from "@/domain/ports/tariffRepository";
import { WBApiResponseData } from "@/shared/types/wbApiTypes";
import { adaptWBToDB } from "@/shared/utils/adapters/adaptWBtoDB";

export default async function syncTariff(
	wbTariffs: WBApiResponseData,
	date: Date
): Promise<void> {
	try {
		const adaptedTariffs = adaptWBToDB(wbTariffs, date);
		await upsertTariffs(adaptedTariffs);
	} catch (error) {
		console.error("Failed to sync tariffs");
		throw error;
	}
}
