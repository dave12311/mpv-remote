<script lang="ts">
	import Icon from 'svelte-awesome';
	import { levelUp, chevronRight, chevronLeft, file as faFile, folder, film, externalLink } from 'svelte-awesome/icons';
	import { faClosedCaptioning } from '@fortawesome/free-regular-svg-icons';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import type { fileEntry, dirResponse } from '../../shared/fileEntry';
	import { fileTypes } from '../../shared/fileEntry';

	const host: string = ((process.env.prod === 'dev') ? 'http://localhost:8080' : location.origin) + '/api';

	let path: string = '/media/D/Downloads/TORRENT';
	let pathText: string = '';
	let files: fileEntry[];

	onMount(() => {
		changeFolder(path);
	});

	function updatePath(newPath: string) {
		path = newPath;
		pathText = path.substring(1, path.length) + '/';
	}

	function changeFolder(p: string) {
		if (!p) { p = '/' }
        axios.get(host + '/dir', {
            headers: {
                'path': p
            }
        })
		.then(res => {
			const data = res.data as dirResponse;

			files = data.contents;
			updatePath(data.path);
		})
	}

	function onListSelect(e: any) {
		if (e.target) {
			let selected = files.find(o => o.name === e.target.innerText);
			if (selected.type === fileTypes.Folder) {
				changeFolder(path === '/' ? path + selected.name : path + '/' + selected.name);
			} else if(selected.type === fileTypes.Media) {
				// Play
			}
		}
	}

	function onUpDirectory() {
		changeFolder(path.substring(0, path.lastIndexOf('/')));
    }
</script>

<div class="flex flex-col flex-grow overflow-clip">
	<!-- Path field -->
	<i class="text-zinc-300 text-sm mt-3 ml-5">Path</i>
	<input class="bg-zinc-700 rounded-sm text-zinc-300 text-left p-1 px-3 mx-3" style="direction: rtl;" disabled value={pathText} id="pathInput"/>

	<!-- File browser -->
	<div class="border-2 rounded-md border-zinc-700 m-3 flex flex-grow overflow-y-auto mb-16">
		{#if files}
			<ul class="m-3 flex-grow">
				{#each files as file}
					<li class="flex flex-row items-center pb-3" on:click={onListSelect}>
						{#if file.type === fileTypes.Folder}
							<Icon data={folder} scale={2} class="text-zinc-400"/>
						{:else if file.type === fileTypes.Media}
							<Icon data={film} scale={2} class="text-zinc-400"/>
						{:else if file.type === fileTypes.Subtitle}
							<Icon data={faClosedCaptioning} scale={2} class="text-zinc-400"/>
						{:else}
							<Icon data={faFile} scale={2} class="text-zinc-400"/>
						{/if}
						<span class="ml-5 text-zinc-400">{file.name}</span>
					</li>
				{/each}
			</ul>
		{:else}
			<div class="grid flex-grow items-center">
				<h1 class="text-center text-zinc-500 text-3xl">No files</h1>
			</div>
		{/if}
	</div>

	<!-- Control buttons -->
	<div class="h-14 flex flex-row items-center justify-center absolute bottom-0 w-screen">
		<button class="w-12 h-12 text-zinc-400">
			<Icon data={chevronLeft} scale={3}/>
		</button>
		<button class="w-12 h-12 text-zinc-400 mx-10" on:click="{onUpDirectory}">
			<Icon data={levelUp} scale={3}/>
		</button>
		<button class="w-12 h-12 text-zinc-400">
			<Icon data={chevronRight} scale={3}/>
		</button>
	</div>
</div>