<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { EditorView } from "prosemirror-view";
	import { schema, defaultMarkdownParser } from "prosemirror-markdown";
	import { EditorState, Plugin } from "prosemirror-state";
	import { exampleSetup } from "prosemirror-example-setup";
	import type { KeyedLevelSummary } from "$lib/data/utils";

	export let leveledSummary: KeyedLevelSummary;
	export let selection: string = "";
	export let small: boolean = false;

	let getSelectionPlugin = new Plugin({
		view(editorView) {
			return new SelectionUpdate(editorView);
		},
	});

	class SelectionUpdate {
		constructor(view: EditorView) {
			this.update(view, null);
		}

		update(view: EditorView, lastState: EditorState | null) {
			let state = view.state;

            if (
				lastState &&
				lastState.doc.eq(state.doc) &&
				lastState.selection.eq(state.selection)
			) {
				return;
			}

			const newString = state.selection
				.content()
				.content.textBetween(
					0,
					state.selection.content().content.size,
					"\n"
				);
			selection = newString;
		}
	}

	let view: EditorView;
	let state = EditorState.create({
		schema,
		doc: defaultMarkdownParser.parse(leveledSummary.content),
		plugins: exampleSetup({ schema, menuBar: false }),
	});

	onMount(() => {
		view = new EditorView(leveledSummary.ref as Element, {
			state,
			dispatchTransaction(transaction) {
				const newState = view.state.apply(transaction);
				view.updateState(newState);
				state = newState;
			},
			editable: () => false,
			plugins: [getSelectionPlugin],
		});
	});

	onDestroy(() => {
		if (view) {
			view.destroy();
		}
	});
</script>

<div
	bind:this={leveledSummary.ref}
    data-flip-id={leveledSummary.key}
	class={`prose prose-stone max-w-none text-s leading-5 prose-p:mt-3 prose-p:mb-3 ${small && "prose-gray text-xs leading-4"}`}
    on:click={(e) => e.stopPropagation()}
/>
