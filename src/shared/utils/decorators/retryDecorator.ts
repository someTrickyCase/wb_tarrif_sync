interface RetryResult<T> {
	data: T | null;
	error?: string;
}

interface RetryConfig {
	retries: number;
	delay: number;
}

const defaultConfig = {
	retries: 3,
	delay: 100,
};

export default async function retryDecorator<T>(
	operation: () => Promise<T>,
	config: RetryConfig = defaultConfig
): Promise<RetryResult<T>> {
	const { retries, delay } = config;

	for (let attempts = 1; attempts <= retries; attempts++) {
		try {
			const result = await operation();
			return { data: result };
		} catch (error) {
			await new Promise((resolve) => setTimeout(resolve, delay));
			if (attempts === retries)
				return {
					data: null,
					error:
						error instanceof Error ? error.message : "unknown error occured",
				};
		}
	}

	return {
		data: null,
		error: "unknown error occured",
	};
}
