<script lang="ts">
	import { ArrowRightOutline } from "flowbite-svelte-icons";
    import { Button } from "flowbite-svelte";
    import type { KeyedLevelSummary } from "$lib/data/utils";
    import Paragraph from "$lib/components/reader/Paragraph.svelte";

    export let leveledSummary: KeyedLevelSummary;
    export let handleClick: (selection: string | undefined, source: KeyedLevelSummary[]) => Promise<void>
    let selection: string;

</script>

<Paragraph {leveledSummary} bind:selection small />

{#if selection}
	<Button
		class="bg-neutral-100"
		size="sm"
		outline
		on:click={(e) => {
            e.stopPropagation()
            handleClick(selection, leveledSummary.source)
        }
			}
	>
		<span>Go to source paragraph</span>
		<ArrowRightOutline class="w-4 h-4" />
	</Button>
{/if}

<svelte:window on:click={() => { selection = ""}} />
