<script lang="ts">
	import FileBrowser from "./components/FileBrowser/FileBrowser.svelte";
	import MediaController from "./components/MediaController.svelte";
</script>

<main class="flex flex-col flex-grow">
	<div class="top-0 left-0 w-screen h-14 bg-fuchsia-900 grid content-center">
		<h1 class="text-slate-300 text-center text-2xl font-bold">MPV Remote</h1>
	</div>
	
	<FileBrowser/>
</main>
  
<style lang="postcss" global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
	html, body {
		@apply bg-zinc-800;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>