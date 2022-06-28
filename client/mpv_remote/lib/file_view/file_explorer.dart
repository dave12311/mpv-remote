import 'package:flutter/material.dart';

class FileExplorer extends StatefulWidget {
  const FileExplorer({Key? key}) : super(key: key);

  @override
  State<FileExplorer> createState() => _FileExplorerState();
}

class _FileExplorerState extends State<FileExplorer> {
  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      shrinkWrap: true,
      children: <Widget>[
        Row(
          children: const [
            Icon(
              Icons.folder,
              size: 20,
            ),
          ],
        ),
      ],
    );
  }
}
