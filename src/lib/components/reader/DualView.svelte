<script lang="ts">
	import {
	getDepth,
		getDualDepth,
		type KeyedLevelSummary,
	} from "$lib/data/utils";
	import Paragraph from "./Paragraph.svelte";
	import { mostSimilar } from "$lib/similarity/mostSimilar";
	import Summary from "./Summary.svelte";
	import { afterUpdate } from "svelte";
	export let leveledSummaries: KeyedLevelSummary[];
	export let levels: (1 | 2 | 3)[];

	interface KeyedLevelSummaryWithSelection extends KeyedLevelSummary {
		selection?: string;
	}

    export let setRefs: (refs: HTMLElement[][]) => void

	$: currDepthLeveledSummaries = getDualDepth(
		leveledSummaries,
		levels,
		1
	) as KeyedLevelSummaryWithSelection[];

    $: sourceLeveledSummaries = getDepth(currDepthLeveledSummaries, 2);

    afterUpdate(() => {
        const refs = [currDepthLeveledSummaries.map(({ref}) => ref as HTMLElement), sourceLeveledSummaries.map(({ref}) => ref as HTMLElement)]
        setRefs(refs)
    })


    let toHighlight: string | null = null;

	async function handleClick(selection: string | undefined, source: KeyedLevelSummary[]) {
        if (!selection) return;

		const { embedding } = await fetch("/embeddings", {
			method: "POST",
			body: JSON.stringify({ snippet: selection }),
		}).then((res) => res.json());

		toHighlight = mostSimilar(embedding, source);
	}

	$: {
		if (toHighlight) {
            const ref = sourceLeveledSummaries.find((ls) => ls.key === toHighlight)?.ref as HTMLElement;

            ref.querySelector("p")?.scrollIntoView({ behavior: "smooth" });
            ref.querySelector("p")?.classList.add("bg-neutral-200");


			setTimeout(() => {
				ref.querySelector("p")?.classList.remove("bg-neutral-200");
			}, 1000);
		}
	}

</script>

<div class="flex flex-col">
	{#each currDepthLeveledSummaries as leveledSummary (leveledSummary.key)}
		<div class="flex gap-8">
			<div class="sticky top-0 self-start text-xs w-[20vw] flex flex-col items-start">
				<Summary {leveledSummary} {handleClick}/>
			</div>
            <div class="flex flex-col w-[40vw]">
                {#each leveledSummary.source as sourceLeveledSummary (sourceLeveledSummary.key)}
                    <Paragraph leveledSummary={sourceLeveledSummary} />
                {/each}
            </div>
		</div>
	{/each}
</div>
