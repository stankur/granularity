<script>
	import '../app.css';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import SidebarIcon from '$lib/components/SidebarIcon.svelte';
	import FeedbackIcon from '$lib/components/FeedbackIcon.svelte';
	import Icon from '$lib/components/reusable/Icon.svelte';
	import SidebarVisible from '$lib/stores/SidebarVisible';
	import { Button } from 'flowbite-svelte';
</script>

{#if $SidebarVisible}
	<Sidebar />
{/if}

<div class={'flex flex-col p-4 fixed'}>
	<div class="flex gap-3 items-center">
		<Icon on:click={SidebarVisible.toggle} id="sidebaricon">
			<SidebarIcon />
		</Icon>
		<Button class="bg-neutral-100 gap-2" color="green" on:click={(e) => {
            e.stopPropagation();

            if (window) {
                window.open("https://docs.google.com/forms/d/e/1FAIpQLSdHdKzfdV198G7eiEigM4S1pAP-ftC_9DCyUotUlF3A9OMlbA/viewform?usp=sf_link", '_blank')?.focus();

            }
        }} size="sm" outline>
			<FeedbackIcon /> <span> Feedback </span>
		</Button>
	</div>
</div>

<slot />
