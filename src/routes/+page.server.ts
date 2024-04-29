import { counter_state_actions, counter_state_key } from "$lib/counter_state"
import type { Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load = (async ({ cookies }) => {
	return { [counter_state_key]: cookies.get(counter_state_key) }
}) satisfies PageServerLoad

export const actions = {
	...counter_state_actions,
} satisfies Actions
