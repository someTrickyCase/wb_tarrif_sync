export interface DBTariffType {
	id?: number;
	warehouse_name: string;
	geo_name: string;
	box_delivery_base: number;
	box_delivery_coef_expr: number;
	box_delivery_liter: number;
	box_delivery_marketplace_base: number;
	box_delivery_marketplace_coef_expr: number;
	box_delivery_marketplace_liter: number;
	box_storage_base: number;
	box_storage_coef_expr: number;
	box_storage_liter: number;
	tariff_date: string; // YYYY-MM-DD
	created_at?: Date;
	updated_at?: Date;
}
export type DBTariffInsertType = Omit<
	DBTariffType,
	"id" | "created_at" | "updated_at"
>;
