<script lang="ts">
	import { fade } from "svelte/transition";

	import IconSmile from "$lib/components/icons/IconSmile.svelte";

	export let message = "";
</script>

<div
	transition:fade|global={{ duration: 300 }}
	class="pointer-events-none fixed right-0 top-12 z-20 bg-gradient-to-bl from-green-500/20 via-green-500/0 to-green-500/0 pb-36 pl-36 pr-2 pt-2 md:top-0 md:pr-8 md:pt-5"
>
	<div
		class="pointer-events-auto flex items-center rounded-full bg-white/90 px-3 py-1 shadow-sm dark:bg-gray-900/80"
	>
		<IconSmile classNames="text-2xl mr-1" />
		<h2 class="font-semibold text-green-600">{message}</h2>
	</div>
</div>
