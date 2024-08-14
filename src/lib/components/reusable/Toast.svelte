<script lang="ts">
	import { Toast } from "flowbite-svelte";
    import { slide } from "svelte/transition";
    export let message: string;

	let counter = 3;
	let toastStatus = false;

	export function trigger() {
		toastStatus = true;
		counter = 3;
		timeout();
	}

	function timeout() {
		if (--counter > 0) return setTimeout(timeout, 1000);
		toastStatus = false;
	}

</script>

<Toast
	divClass="fixed top-2 bg-neutral-100 p-4 left-[50vw] -translate-x-2/4 border-neutral-200 border-solid border-[1px] rounded z-30"
	transition={slide}
	{toastStatus}>{message}</Toast
>

