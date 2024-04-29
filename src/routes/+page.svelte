<script lang="ts">
	import {
		counter_state,
		counter_state_decrement_key,
		counter_state_increment_key,
		counter_state_key,
	} from "$lib/counter_state"
	export let data

	const FORM_ID = "form"

	if (data[counter_state_key]) counter_state.set_state(data[counter_state_key])
</script>

<!-- NOTE: we should use:enhance instead, but that is a more involved example, use:enhance is when a state is doing optimistic updates then waiting for a server to respond if the update was allowed or not then correcting if your optimistic update, if that happens you also need to inform the user -->
<form id={FORM_ID} method="post" on:submit|preventDefault>
	<!-- NOTE: in here we could have other state variables as input:hidden that could influence the result of the state update -->
</form>

<div>
	<button on:click={counter_state.increment} formaction="?/{counter_state_increment_key}" form={FORM_ID}>+</button>
	<p>{$counter_state}</p>
	<button on:click={counter_state.decrement} formaction="?/{counter_state_decrement_key}" form={FORM_ID}>-</button>
</div>

<style>
	div {
		display: flex;
	}
</style>
