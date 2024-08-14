<script lang="ts">
    type Size = "small" | "medium"
    type Shadow = "none" |"light" | "dark"
    export let size: Size = "medium"
    export let shadow: Shadow = "light"
    export let id: string = "";
    export let extraClass: string ="";

    const sizeMap = {
        small: "w-6 h-6",
        medium: "w-8 h-8"
    }

    const shadowMap = {
        none: "",
        light: "hover:bg-gray-100",
        dark: "hover:bg-gray-200"
    }
</script>

<div
    id={id}
	class={`${sizeMap[size]} inline-flex justify-center items-center ${shadowMap[shadow]} cursor-pointer rounded-lg select-none shrink-0 inline-block ${extraClass}`}
    on:click
    role="none"
>
	<slot></slot>
</div>
