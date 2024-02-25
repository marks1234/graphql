import type { Skill } from '$lib/types';

export function _addSkills(skill_arr: Skill[]) {
	const skill_tag = /skill_/;
	const splitter = /[ _-]/;

	skill_arr.forEach((skill) => {
		// Remove 'skill_' prefix and then split the string into words
		const words = skill.type.replace(skill_tag, '').split(splitter);

		// Capitalize the first letter of each word and join them back together
		const formattedType = words
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join('-');

		// Update the type property of the skill object
		skill.type = formattedType;
	});

	return skill_arr;
}
