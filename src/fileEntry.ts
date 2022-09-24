enum fileTypes {
	Folder,
	Media,
	Subtitle,
	Other
}

interface fileEntry {
	type: fileTypes,
	name: string 
}

interface dirResponse {
	path: string,
	contents: fileEntry[]
}

const playableFormats: string[] = ['mkv', 'mp4', 'mp3', 'avi', 'mov', 'wav'];
const subtitleFormats: string[] = ['srt', 'ass'];

export type { fileEntry, dirResponse };
export { fileTypes, playableFormats, subtitleFormats };