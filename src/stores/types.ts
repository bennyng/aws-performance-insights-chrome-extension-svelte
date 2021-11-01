export type AppData = {
	sourceUrl: string;
};

export type AppState =
	| { status: 'loading' }
	| { status: 'loaded'; data: AppData }
	| { status: 'error'; error: string };

export type DateRange = {
	startTime: string;
	endTime: string;
};

export type ResultData = {
	resultUrl: string;
};

export type ResultState =
	| { status: 'loading' }
	| { status: 'success'; data: ResultData }
	| { status: 'error'; error: string };
