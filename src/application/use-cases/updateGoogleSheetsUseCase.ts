import { getTodayTariffs } from "@/domain/ports/tariffRepository";
import { updateAllSheets } from "@/infrastructure/googleSheets/googleSheetsService";
import { GOOGLE_SHEETS_IDS } from "@/config/config";

export type UpdateGoogleSheetsUseCase = () => Promise<void>;

export const updateGoogleSheetsUseCase: UpdateGoogleSheetsUseCase =
	async () => {
		try {
			console.log("Starting Google Sheets update...");

			if (!GOOGLE_SHEETS_IDS || GOOGLE_SHEETS_IDS.length === 0) {
				console.log("No Google Sheets configured");
				return;
			}

			const tariffs = await getTodayTariffs();

			if (tariffs.length === 0) {
				console.log("No tariffs data available for today");
				return;
			}

			const sortedTariffs = tariffs.sort(
				(a, b) => a.box_delivery_coef_expr - b.box_delivery_coef_expr
			);

			console.log(
				`Processing ${sortedTariffs.length} tariffs for ${GOOGLE_SHEETS_IDS.length} sheets`
			);

			await updateAllSheets(GOOGLE_SHEETS_IDS, sortedTariffs);
			console.log(`Google Sheets update completed`);
		} catch (error) {
			console.error("Google Sheets update failed:", error);
			throw error;
		}
	};

export default updateGoogleSheetsUseCase;
