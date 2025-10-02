import { google } from "googleapis";
import {
	GOOGLE_SERVICE_ACCOUNT_EMAIL,
	GOOGLE_PRIVATE_KEY,
	GOOGLE_SHEETS_AUTH_URL,
} from "@/config/config";
import { DBTariffInsertType } from "@/shared/types/dbTariffsTypes";
import adaptDBtoGoogleSheets from "@/shared/utils/adapters/adaptBDtoGoogleSheets";

interface GoogleSheetsConfig {
	spreadsheetId: string;
	sheetName?: string;
}

type UpdateTariffsSheet = (
	config: GoogleSheetsConfig,
	tariffs: DBTariffInsertType[]
) => Promise<void>;

type CheckSheetAccess = (spreadsheetId: string) => Promise<boolean>;

type ClearSheet = (config: GoogleSheetsConfig) => Promise<void>;

export function createSheetsClient() {
	const auth = new google.auth.JWT({
		email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
		key: GOOGLE_PRIVATE_KEY,
		scopes: [GOOGLE_SHEETS_AUTH_URL],
	});

	return google.sheets({ version: "v4", auth });
}

export const updateTariffsSheet: UpdateTariffsSheet = async (
	config,
	tariffs
) => {
	const sheets = createSheetsClient();

	try {
		const data = adaptDBtoGoogleSheets(tariffs);

		await sheets.spreadsheets.values.update({
			spreadsheetId: config.spreadsheetId,
			range: `${config.sheetName || "stocks_coefs"}!A1`,
			valueInputOption: "RAW",
			requestBody: {
				values: data,
			},
		});

		console.log(`Updated Google Sheet: ${config.spreadsheetId}`);
	} catch (error) {
		console.error(
			`Failed to update Google Sheet ${config.spreadsheetId}:`,
			error
		);
		throw error;
	}
};

export const checkSheetAccess: CheckSheetAccess = async (spreadsheetId) => {
	const sheets = createSheetsClient();

	try {
		await sheets.spreadsheets.get({
			spreadsheetId,
		});
		return true;
	} catch (error) {
		console.error(`No access to spreadsheet: ${spreadsheetId}`);
		return false;
	}
};

export const clearSheet: ClearSheet = async (config) => {
	const sheets = createSheetsClient();

	try {
		await sheets.spreadsheets.values.clear({
			spreadsheetId: config.spreadsheetId,
			range: `${config.sheetName || "stocks_coefs"}!A:Z`,
		});
		console.log(`Cleared sheet: ${config.spreadsheetId}`);
	} catch (error) {
		console.error(`Failed to clear sheet ${config.spreadsheetId}:`, error);
		throw error;
	}
};

export const updateAllSheets = async (
	spreadsheetIds: string[],
	tariffs: DBTariffInsertType[]
): Promise<void> => {
	const updatePromises = spreadsheetIds.map((spreadsheetId) =>
		updateTariffsSheet(
			{
				spreadsheetId,
				sheetName: "wb_tariffs",
			},
			tariffs
		)
	);

	await Promise.all(updatePromises);
	console.log(`Updated ${spreadsheetIds.length} Google Sheets`);
};
