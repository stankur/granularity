<script lang="ts">
    import Page from '$lib/components/Page.svelte';
    import {key} from "$lib/data/utils";
    import {page} from '$app/stores'
    import { Spinner} from "flowbite-svelte"

    export let data;
</script>

{#await data.content}
<div class="h-[100vh] flex justify-center items-center">
    <Spinner color="gray" />
</div>
{:then content} 
    {#key $page.url.pathname}
        <Page leveledSummaries={key(content, "")} />
    {/key}
{/await}


