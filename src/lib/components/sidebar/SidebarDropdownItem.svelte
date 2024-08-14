<script lang="ts">
	import { page } from '$app/stores';
	import { SidebarDropdownItem } from 'flowbite-svelte';

    export let href: string;
    export let label: string;
    $: activeUrl = $page.url.pathname;

</script>

<SidebarDropdownItem {href} active={activeUrl === href} {label} />
