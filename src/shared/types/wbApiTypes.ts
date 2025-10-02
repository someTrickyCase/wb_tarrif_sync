export interface WBWarehouseTariff {
	warehouseName: string;
	geoName: string;
	boxDeliveryBase: string;
	boxDeliveryCoefExpr: string;
	boxDeliveryLiter: string;
	boxDeliveryMarketplaceBase: string;
	boxDeliveryMarketplaceCoefExpr: string;
	boxDeliveryMarketplaceLiter: string;
	boxStorageBase: string;
	boxStorageCoefExpr: string;
	boxStorageLiter: string;
}

export interface WBApiResponseData {
	dtNextBox: string;
	dtTillMax: string;
	warehouseList: WBWarehouseTariff[];
}

export interface WBApiResponse {
	response: {
		data: WBApiResponseData;
	};
}

export function isWBWarehouseTariff(obj: unknown): obj is WBWarehouseTariff {
	return (
		typeof obj === "object" &&
		obj !== null &&
		"warehouseName" in obj &&
		"geoName" in obj &&
		"boxDeliveryBase" in obj &&
		"boxDeliveryCoefExpr" in obj &&
		"boxDeliveryLiter" in obj &&
		"boxDeliveryMarketplaceBase" in obj &&
		"boxDeliveryMarketplaceCoefExpr" in obj &&
		"boxDeliveryMarketplaceLiter" in obj &&
		"boxStorageBase" in obj &&
		"boxStorageCoefExpr" in obj &&
		"boxStorageLiter" in obj
	);
}

export function isWBApiResponseData(obj: unknown): obj is WBApiResponseData {
	return (
		typeof obj === "object" &&
		obj !== null &&
		"dtNextBox" in obj &&
		obj.dtNextBox !== null &&
		typeof obj.dtNextBox === "string" &&
		"dtTillMax" in obj &&
		obj.dtTillMax !== null &&
		typeof obj.dtTillMax === "string" &&
		"warehouseList" in obj &&
		Array.isArray(obj.warehouseList) &&
		obj.warehouseList.every(isWBWarehouseTariff)
	);
}

export function isWBApiResponse(obj: unknown): obj is WBApiResponse {
	return (
		typeof obj === "object" &&
		obj !== null &&
		"response" in obj &&
		typeof obj.response === "object" &&
		obj.response !== null &&
		"data" in obj.response &&
		isWBApiResponseData(obj.response.data)
	);
}
