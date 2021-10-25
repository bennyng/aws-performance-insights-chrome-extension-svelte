export type DateRange = {
	startTime: string;
	endTime: string;
};

export type SourceData = {
	sourceUrl: string;
};

export type SourceState =
	| { status: 'loading' }
	| { status: 'success'; data: SourceData }
	| { status: 'error'; error: string };

export type ResultData = {
	resultUrl: string;
};

export type ResultState =
	| { status: 'loading' }
	| { status: 'success'; data: ResultData }
	| { status: 'error'; error: string };
