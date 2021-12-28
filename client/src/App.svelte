<script>
	import MediaController from "./components/MediaController.svelte";
</script>

<main>
	<div class="top-0 left-0 w-screen h-14 bg-fuchsia-900 grid content-center">
		<h1 class="text-slate-300 text-center text-2xl font-bold">MPV Remote</h1>
	</div>
	
	<MediaController/>
</main>
  
<style lang="postcss" global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
	:global(body) {
		@apply bg-zinc-800
	}
</style>