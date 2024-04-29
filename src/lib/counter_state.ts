import { type Actions, redirect } from "@sveltejs/kit"
import { maxAge, set_cookie } from "./set_cookie"
import { browser } from "$app/environment"
import { writable } from "svelte/store"

const DEFAULT_STATE = 0

export const counter_state_key = "counter_state"
export const counter_state_decrement_key = "counter_state_decrement"
export const counter_state_increment_key = "counter_state_increment"
const cookie_settings = {
	httpOnly: false,
	maxAge,
	path: "/",
	sameSite: "lax",
	secure: true,
} // need to find a way to import CookieSerializeOptions from "cookie"
export const counter_state_actions = {
	[counter_state_decrement_key]: async ({ cookies }) => {
		// This validation is not good just for demonstration purposes
		if (!cookies.get(counter_state_key) || isNaN(Number(cookies.get(counter_state_key)))) {
			// @ts-ignore
			cookies.set(counter_state_key, String(DEFAULT_STATE - 1), cookie_settings)
			// TODO return a message if the cookie was reset because it was a not a number
		} else {
			// @ts-ignore
			cookies.set(counter_state_key, (Number(cookies.get(counter_state_key)) - 1).toString(), cookie_settings)
		}
		throw redirect(303, "/")
	},
	[counter_state_increment_key]: async ({ cookies }) => {
		// This validation is not good just for demonstration purposes
		if (!cookies.get(counter_state_key) || isNaN(Number(cookies.get(counter_state_key)))) {
			// @ts-ignore
			cookies.set(counter_state_key, String(DEFAULT_STATE + 1), cookie_settings)
			// TODO return a message if the cookie was reset because it was a not a number
		} else {
			// @ts-ignore
			cookies.set(counter_state_key, (Number(cookies.get(counter_state_key)) + 1).toString(), cookie_settings)
		}
		throw redirect(303, "/")
	},
} satisfies Actions

function create_counter_state() {
	const { subscribe, set, update } = writable(DEFAULT_STATE)
	function increment() {
		update((previous_value) => {
			const new_value = previous_value + 1
			set_cookie(counter_state_key, new_value.toString())
			return new_value
		})
	}
	function decrement() {
		update((previous_value) => {
			const new_value = previous_value - 1
			set_cookie(counter_state_key, new_value.toString())
			return new_value
		})
	}
	function reset() {
		set_cookie(counter_state_key, DEFAULT_STATE.toString())
		set(DEFAULT_STATE)
	}
	function set_state(cookie: string) {
		const value = Number(cookie)
		if (isNaN(value)) {
			if (browser) set_cookie(counter_state_key, DEFAULT_STATE.toString())
			return console.warn(`${counter_state_key} was set to default state because cookie was not a number`)
		}
		set(value)
	}
	return {
		decrement,
		increment,
		reset,
		set_state,
		subscribe,
	}
}

export const counter_state = create_counter_state()
