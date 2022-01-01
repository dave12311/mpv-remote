import { Router, Request, Response } from 'express';
import { readdir, lstatSync } from 'fs';
import { homedir } from 'os';
import logger from '../../log';
import { fileEntry, dirResponse, fileTypes, playableFormats, subtitleFormats } from '../../../shared/fileEntry';

const router = Router();
const home: string = homedir();

router.get('/', (req: Request, res: Response) => {
	const path: string = req.header('path') || home;
	logger.debug('Readdir requested: ' + path);

	readdir(path, (err, files) => {
		if(!err) {
			const dir: fileEntry[] = [];

			files.forEach(file => {
				// Ignore dotfiles
				if(file.charAt(0) !== '.') {
					// Check if directory
					if(lstatSync(path + '/' + file).isDirectory()) {
						dir.push({type: fileTypes.Folder, name: file});
					} else {
						if(file.charAt(file.length - 4) === '.') {
							if(playableFormats.includes(file.slice(-3))) {
								dir.push({type: fileTypes.Media, name: file});
							} else if(subtitleFormats.includes(file.slice(-3))) {
								dir.push({type: fileTypes.Subtitle, name: file});
							}
						} else {
							dir.push({type: fileTypes.Other, name: file});
						}
					}
				}
			});

			const resData: dirResponse = {path: path, contents: dir};
			res.json(resData);
		} else {
			res.status(500).send('Path could not be opened!');
			logger.error('Error during readdir: ' + err.name);
			logger.error(err.message);
		}
	});
});

export default router;
