import { writable } from 'svelte/store';
import type { UserProfile } from '$lib/types';

export const token = writable<string | undefined>();
export const userProfileStore = writable<UserProfile>({
	id: 0,
	userName: 'John Doe',
	level: -1,
	xp: 0,
	totalUp: -1,
	totalDown: -1,
	skills: []
});
