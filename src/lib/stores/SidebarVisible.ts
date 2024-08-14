import { writable } from "svelte/store";

function createSidebarVisibleStore() {
  const { subscribe, update } = writable(true);

  return {
		subscribe,
		toggle: () => update((state) => !state)
	};
}

export default createSidebarVisibleStore();
