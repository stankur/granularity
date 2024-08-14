<script lang="ts">
	import { getDepth, type KeyedLevelSummary } from "$lib/data/utils";
	import { afterUpdate } from "svelte";
	import Paragraph from "./Paragraph.svelte";

	export let leveledSummaries: KeyedLevelSummary[];
    export let setRefs: (refs: HTMLElement[][]) => void
	export let level: 1 | 2 | 3;
    
	$: currDepthLeveledSummaries = getDepth(leveledSummaries, level);

    afterUpdate(() => {
        setRefs([currDepthLeveledSummaries.map(({ref}) => ref as HTMLElement)])
    })

</script>

<div class="flex flex-col w-[40vw]">
	{#each currDepthLeveledSummaries as leveledSummary (leveledSummary.key)}
		<Paragraph {leveledSummary} />
	{/each}
</div>
