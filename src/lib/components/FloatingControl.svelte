<script lang="ts">
	import { SvelteComponent } from 'svelte';
	import { Checkbox, ArrowKeyLeft, ArrowKeyRight, Kbd, Popover } from 'flowbite-svelte';
	import Toast from '$lib/components/reusable/Toast.svelte';
	import { shortcut } from '@svelte-put/shortcut';
    import { fade } from 'svelte/transition';


    export let detailLevels: (1 | 2 | 3)[];
    export let toggle: (level: 1 | 2 | 3) => void;

    export let lengths: [number, number, number];

	$: firstChecked = detailLevels.includes(1);
	$: secondChecked = detailLevels.includes(2);
	$: thirdChecked = detailLevels.includes(3);

	let ToastNonzero: SvelteComponent;
	let ToastTwoLevels: SvelteComponent;

	const handleCheck = (level: 1 | 2 | 3) => (event: Event) => {
		const oldChecked = (event.target as HTMLInputElement).checked;

		if (!oldChecked) {
			console.log(detailLevels);

			if (detailLevels.length === 2) {
				ToastTwoLevels.trigger();
				return;
			}
		}

		if (oldChecked) {
			if (detailLevels.length === 1) {
				ToastNonzero.trigger();
				return;
			}
		}

		toggle(level);
	};

	type OrientationMap = Record<1 | 2 | 3, 1 | 2 | 3>;
	const left: OrientationMap = {
		1: 3,
		2: 1,
		3: 2
	};
	const right: OrientationMap = {
		1: 2,
		2: 3,
		3: 1
	};
	function handleArrowLeft() {
		const curr = detailLevels;

		console.log(curr);

		if (curr.length === 1) {
			toggle(left[curr[0]]);
			return;
		}

		if (curr.length === 2) {
			toggle(Math.max(curr[0], curr[1]) as 2 | 3);
		}
	}
	function handleArrowRight() {
		const curr = detailLevels;

		if (curr.length === 1) {
			toggle(right[curr[0]]);
			return;
		}

		if (curr.length === 2) {
			toggle(Math.min(curr[0], curr[1]) as 1 | 2);
		}
	}

</script>

<svelte:window
	use:shortcut={{
		trigger: {
			key: 'ArrowLeft',
			callback: handleArrowLeft
		}
	}}
	use:shortcut={{
		trigger: {
			key: 'ArrowRight',
			callback: handleArrowRight
		}
	}}
/>

<Toast bind:this={ToastTwoLevels} message={'You can only pick at most two levels'} />
<Toast bind:this={ToastNonzero} message={'You must pick at least one level'} />

<div class="fixed top-0 right-0 z-20 p-4 flex flex-col gap-3">
	<div>
		<span class="inline-flex gap-2" id="floating-control">
			<Checkbox class="flex-col" id="checkbox1" bind:checked={firstChecked} on:change={handleCheck(1)}
				><span class="me-2 text-xs font-normal">1</span></Checkbox
			>
            <Popover class="fixed" placement="bottom-start" transition={fade} params={{ duration: 100 }} triggeredBy="#checkbox1" offset={40}>
                {lengths[0]} words
            </Popover>
			<Checkbox class="flex-col" id="checkbox2" bind:checked={secondChecked} on:change={handleCheck(2)}
				><span class="me-2 text-xs font-normal">2</span></Checkbox
			>
            <Popover class="fixed" placement="bottom" transition={fade} params={{ duration: 100 }} triggeredBy="#checkbox2" offset={40}>
                {lengths[1]} words
            </Popover>

			<Checkbox class="flex-col" id="checkbox3" bind:checked={thirdChecked} on:change={handleCheck(3)}
				><span class="me-2 text-xs font-normal">3</span></Checkbox
			>
            <Popover class="fixed" placement="bottom-end" transition={fade} params={{ duration: 100 }} triggeredBy="#checkbox3" offset={40}>
                {lengths[2]} words
            </Popover>

		</span>
	</div>
	<Popover triggeredBy="#floating-control" placement={'right'} transition={fade} params={{ duration: 100 }}  class="fixed" offset={20}>
		<div class="text-sm flex items-center gap-1">
			Use <Kbd class="p-0 inline-flex items-center rounded-sm"
				><ArrowKeyLeft svgClass="w-3 h-3" /></Kbd
			>
			<Kbd class="p-0 inline-flex items-center rounded-sm"><ArrowKeyRight svgClass="w-3 h-3" /></Kbd
			> to switch detail levels
		</div>
	</Popover>
</div>
