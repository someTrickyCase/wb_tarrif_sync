import { API_KEY, API_URL } from "@/config/config";
import { isWBApiResponse, WBApiResponseData } from "@/shared/types/wbApiTypes";

interface Response {
	status: "success" | "failed";
	message: string;
	data: null | WBApiResponseData;
}

export default async function getTariffsData(
	date: Date,
	timeout: number
): Promise<Response> {
	const controller = new AbortController();
	const fetchTimeout = setTimeout(() => controller.abort(), timeout);

	try {
		if (!API_URL || !API_KEY) throw new Error(`API key or url is missing`);
		const fetchResponse = await fetch(
			API_URL + `?date=${date.toLocaleDateString("en-CA")}`,
			{
				headers: {
					Authorization: `Bearer ${API_KEY}`,
					"Content-Type": "application/json",
				},
				signal: controller.signal,
			}
		);

		if (!fetchResponse.ok)
			throw new Error(`HTTP Error: ${fetchResponse.status}`);

		const response: unknown = await fetchResponse.json();

		if (!isWBApiResponse(response))
			return {
				status: "failed",
				message: "Invalid API response structure: missing required fields",
				data: null,
			};

		return {
			status: "success",
			message: "",
			data: response.response.data,
		};
	} catch (error) {
		return {
			status: "failed",
			message:
				error instanceof Error
					? error.message
					: "WB API service is unavailable",
			data: null,
		};
	} finally {
		clearTimeout(fetchTimeout);
	}
}
