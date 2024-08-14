<script lang="ts">
	import { page } from '$app/stores';
	import {
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		SidebarDropdownWrapper
	} from 'flowbite-svelte';
    import SidebarDropdownItem from '$lib/components/sidebar/SidebarDropdownItem.svelte';
	import pg from '$lib/assets/paul_graham.png';
	import sa from '$lib/assets/sam_altman.png';
	import tesla from '$lib/assets/tesla.png';
    import me from '$lib/assets/me.png';

    $: activeUrl = $page.url.pathname;
    $: {
        console.log(activeUrl);
    }
</script>

<div class="fixed left-4 top-32 shadow-lg z-10">
	<Sidebar {activeUrl}>
		<SidebarWrapper>
			<SidebarGroup>
				<SidebarItem href="/" label="About" />
				<SidebarDropdownWrapper label="Paul Graham">
					<svelte:fragment slot="icon">
						<img src={pg} alt="Paul Graham" class="h-6" />
					</svelte:fragment>
					<SidebarDropdownItem href="/pg-google" label="How to Start Google" />
					<SidebarDropdownItem href="/pg-greatwork" label="How to Do Great Work" />
					<SidebarDropdownItem href="/pg-superlinear" label="Superlinear Returns" />
				</SidebarDropdownWrapper>
				<SidebarDropdownWrapper label="Sam Altman">
					<svelte:fragment slot="icon">
						<img src={sa} alt="Sam Altman" class="h-6" />
					</svelte:fragment>
					<SidebarDropdownItem href="/sa-successful" label="How To Be Successful" />
					<SidebarDropdownItem href="/sa-productivity" label="Productivity" />
				</SidebarDropdownWrapper>
				<SidebarDropdownWrapper label="Nikola Tesla">
					<svelte:fragment slot="icon">
						<img src={tesla} alt="Nikola Tesla" class="h-6 ml-2 mr-4" />
					</svelte:fragment>
					<SidebarDropdownItem href="/nt-firstefforts" label="First Efforts At Invention" />
				</SidebarDropdownWrapper>
                <SidebarDropdownWrapper label="Yours Truly">
					<svelte:fragment slot="icon">
						<img src={me} alt="Yours Truly" class="h-6 mr-2" />
					</svelte:fragment>
					<SidebarDropdownItem href="/yt-background" label="Background" />
				</SidebarDropdownWrapper>
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
</div>
