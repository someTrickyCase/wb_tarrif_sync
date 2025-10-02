import { DBTariffInsertType } from "@/shared/types/dbTariffsTypes";

export default function adaptDBtoGoogleSheets(
	tariffs: DBTariffInsertType[]
): any[][] {
	const headers = [
		"Warehouse Name",
		"Geo Name",
		"Box Delivery Base",
		"Box Delivery Coef Expr",
		"Box Delivery Liter",
		"Box Delivery Marketplace Base",
		"Box Delivery Marketplace Coef Expr",
		"Box Delivery Marketplace Liter",
		"Box Storage Base",
		"Box Storage Coef Expr",
		"Box Storage Liter",
		"Tariff Date",
	];

	const rows = tariffs.map((tariff) => [
		tariff.warehouse_name,
		tariff.geo_name,
		tariff.box_delivery_base,
		tariff.box_delivery_coef_expr,
		tariff.box_delivery_liter,
		tariff.box_delivery_marketplace_base,
		tariff.box_delivery_marketplace_coef_expr,
		tariff.box_delivery_marketplace_liter,
		tariff.box_storage_base,
		tariff.box_storage_coef_expr,
		tariff.box_storage_liter,
		tariff.tariff_date,
	]);

	return [headers, ...rows];
}
