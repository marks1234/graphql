// src/lib/types.ts

export interface Grade {
	subject: string;
	score: number;
}

export interface Audit {
	date: string;
	action: string;
}

export interface Skill {
	type: string;
	amount: number;
}

export interface UserProfile {
	id: number;
	userName: string;
	level: number;
	xp: number;
	totalUp: number;
	totalDown: number;
	skills: Skill[];
}
