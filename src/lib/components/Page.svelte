<script lang="ts">
	import { getDepth, type KeyedLevelSummary } from "$lib/data/utils";
	import { tick } from "svelte";
	import FloatingControl from "./FloatingControl.svelte";
	import DualView from "./reader/DualView.svelte";
	import SingleView from "./reader/SingleView.svelte";

    import { gsap } from "gsap";
	import Flip from "gsap/dist/Flip";
	import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
	import { countWordsInMarkdown } from "$lib/utils/countWords";

	gsap.registerPlugin(Flip);
	gsap.registerPlugin(ScrollToPlugin);


    export let leveledSummaries: KeyedLevelSummary[];

    // refs is segmented per level
    // so if you have 2 levels, it will be [HTMLElement[], HTMLElement[]]
    // but if you have 1 level, it will be [HTMLElement[]]
	let refs: HTMLElement[][];

	function setRefs(newRefs: HTMLElement[][]) {
		refs = newRefs;
	}

    let detailLevels: (1|2|3)[] = [3];

	async function animateViewChange(changeState: () => void) {
        const flattened = refs.flat();
        const before = document.documentElement.scrollTop;
        const initialDetailLevels = detailLevels;
        console.log(`initialDetailLevels: ${initialDetailLevels}`);

    
		const initialState = Flip.getState(flattened, {
			props: "fontSize, lineHeight",
		});

		const initialTopIndex = refs.map((levelRefs) => levelRefs.findIndex(
			(ref) => ref.getBoundingClientRect().top >= 0
		));
        const initialOffsetY = refs.map((levelRefs, i) => levelRefs[initialTopIndex[i]].getBoundingClientRect().top);

        changeState();
		await tick();

        const finalDetailLevels = detailLevels;
        console.log(`finalDetailLevels: ${finalDetailLevels}`);
        const finalRefs = refs

        let finalTopRef = finalRefs[0][initialTopIndex[0]];
        let finalTopOffset = initialOffsetY[0];

        if (finalDetailLevels.length === 1 && Math.max(...initialDetailLevels) === finalDetailLevels[0]) {
            // switching from dual view to single view, but the longest content is the same

            // before switch: second level
            // after switch: first level

            console.log("goes here!!")
            
            finalTopRef = finalRefs[0][initialTopIndex[1]];
            finalTopOffset = initialOffsetY[1];
        }

        if (finalDetailLevels.length === 2 && initialDetailLevels[0] === Math.max(...finalDetailLevels)) {
            // switching from single view to dual view, but the longest content is the same

            // before switch: first level
            // after switch: second level

            finalTopRef = finalRefs[1][initialTopIndex[0]];
            finalTopOffset = initialOffsetY[0];
        }

		Flip.from(initialState, {
			targets: refs.flat(),
			props: "fontSize, lineHeight",
			duration: 0.5,
			ease: "expo.inOut",
			// absolute: true,
			onStart: () => {
				gsap.set(document.documentElement, { scrollTop: before });
			},
			onUpdate: () => {
                console.log("updating");
				gsap.set(window, {
					scrollTo: { y: finalTopRef, offsetY: finalTopOffset },
				});
			},
		});
	}


    function toggle(level: 1|2|3) {
        if (detailLevels.includes(level)) {
            animateViewChange(() => {
                detailLevels = detailLevels.filter((l) => l !== level);
            });
        } else {
            animateViewChange(() => {
            detailLevels = [...detailLevels, level];
            });
        }
    }

    function count(level: (1|2|3)) {
        return getDepth(leveledSummaries, level).map(({content}) => countWordsInMarkdown(content)).reduce((partialSum, a) => partialSum + a, 0);;
    }

</script>

<FloatingControl {detailLevels} {toggle} lengths={[count(1), count(2), count(3)]} />

<div class="w-full flex justify-center pt-16">
    {#if detailLevels.length === 1}
        <SingleView {setRefs} {leveledSummaries} level={detailLevels[0]} />
    {:else}
        <DualView {setRefs} {leveledSummaries} levels={detailLevels} />
    {/if}
</div>
