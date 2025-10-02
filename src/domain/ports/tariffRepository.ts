import db from "@/infrastructure/database/connection";
import { DBTariffInsertType } from "@/shared/types/dbTariffsTypes";

export async function upsertTariffs(
	tariffsData: DBTariffInsertType[]
): Promise<void> {
	try {
		await db("tariffs")
			.insert(tariffsData)
			.onConflict(["warehouse_name", "tariff_date"])
			.merge([
				"box_delivery_base",
				"box_delivery_coef_expr",
				"box_delivery_liter",
				"box_delivery_marketplace_base",
				"box_delivery_marketplace_coef_expr",
				"box_delivery_marketplace_liter",
				"box_storage_base",
				"box_storage_coef_expr",
				"box_storage_liter",
				"updated_at",
			]);

		console.log(`Upserted ${tariffsData.length} tariffs`);
	} catch (error) {
		console.error("Failed to upsert tariffs: \n", error);
		throw error;
	}
}

export async function getTariffsByDate(
	date: string
): Promise<DBTariffInsertType[]> {
	return db("tariffs")
		.select("*")
		.where("tariff_date", date)
		.orderBy("warehouse_name", "asc");
}

export async function getTodayTariffs(): Promise<DBTariffInsertType[]> {
	const today = new Date().toISOString().split("T")[0];
	return getTariffsByDate(today);
}
