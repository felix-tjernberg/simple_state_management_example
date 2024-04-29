import type { counter_state_key } from "./counter_state"

type cookie_keys = typeof counter_state_key

export const maxAge = 31536000 // 60 * 60 * 24 * 365 = 31536000 = 1 year

export function set_cookie(key: cookie_keys, value: string): void {
	document.cookie = `${key}=${value};maxAge=${maxAge};path=/;sameSite=lax;Secure;`
}
