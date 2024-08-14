export interface LeveledSummary {
	content: string;
	source: LeveledSummary[];
	embedding: number[] | null;
}
