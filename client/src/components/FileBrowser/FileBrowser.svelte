<script lang="ts">
	import Icon from 'svelte-awesome';
	import { levelUp, chevronRight, chevronLeft } from 'svelte-awesome/icons';
	import { onMount } from 'svelte';
	import type { fileEntry } from '../../../../shared/fileEntry'

	let path: string = '';
	let files: fileEntry;

	onMount(() => {

	});
</script>

<div class="flex flex-col flex-grow">
	<!-- Path field -->
	<i class="text-zinc-300 text-sm mt-3 ml-5">Path</i>
	<input class="bg-zinc-700 rounded-sm text-zinc-300 text-left p-1 px-3 mx-3 text-ellipsis" style="direction: rtl;" disabled value="C:\Users\Hello World\This\Is\A\Very\Very\Long\Path"/>

	<!-- File browser -->
	<div class="border-2 rounded-md border-zinc-700 m-3 flex flex-grow">
		{#if files}
			<h1>Hello</h1>
		{:else}
			<div class="grid flex-grow items-center">
				<h1 class="text-center text-zinc-500 text-3xl">No files</h1>
			</div>
		{/if}
	</div>

	<!-- Control buttons -->
	<div class="h-14 bg-zinc-700 flex flex-row items-center justify-center">
		<button class="bg-zinc-800 w-12 h-12 rounded-full">
			<Icon data={chevronLeft} scale={2}/>
		</button>
		<button class="bg-zinc-800 w-12 h-12 rounded-full">
			<Icon data={levelUp} scale={2}/>
		</button>
		<button class="bg-zinc-800 w-12 h-12 rounded-full">
			<Icon data={chevronRight} scale={2}/>
		</button>
	</div>
</div>