import { WBApiResponseData } from "@/shared/types/wbApiTypes";
import { DBTariffInsertType } from "@/shared/types/dbTariffsTypes";

function normilizeToDecimal(value: string): number {
	return Number(value.replace(",", "."));
}

export function adaptWBToDB(
	wbData: WBApiResponseData,
	date: Date
): DBTariffInsertType[] {
	const tariffDate = date.toISOString().split("T")[0];

	return wbData.warehouseList.map((warehouse) => ({
		warehouse_name: warehouse.warehouseName,
		geo_name: warehouse.geoName,
		box_delivery_base: normilizeToDecimal(warehouse.boxDeliveryBase),
		box_delivery_coef_expr: normilizeToDecimal(warehouse.boxDeliveryCoefExpr),
		box_delivery_liter: normilizeToDecimal(warehouse.boxDeliveryLiter),
		box_delivery_marketplace_base: normilizeToDecimal(
			warehouse.boxDeliveryMarketplaceBase
		),
		box_delivery_marketplace_coef_expr: normilizeToDecimal(
			warehouse.boxDeliveryMarketplaceCoefExpr
		),
		box_delivery_marketplace_liter: normilizeToDecimal(
			warehouse.boxDeliveryMarketplaceLiter
		),
		box_storage_base: normilizeToDecimal(warehouse.boxStorageBase),
		box_storage_coef_expr: normilizeToDecimal(warehouse.boxStorageCoefExpr),
		box_storage_liter: normilizeToDecimal(warehouse.boxStorageLiter),
		tariff_date: tariffDate,
	}));
}
