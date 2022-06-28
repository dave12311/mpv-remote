import 'package:flutter/material.dart';

import 'search_bar.dart';
import 'file_explorer.dart';
import 'floating_player.dart';

class FileExplorerView extends StatelessWidget {
  const FileExplorerView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('MPV/VLC Remote'),
        ),
        body: Column(
          children: const [
            FileSearchBar(),
            Expanded(
              child: FileExplorer(),
            ),
            FloatingPlayer(),
          ],
        ));
  }
}