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
        InkWell(
          onTap: () {debugPrint('Button');},
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 5),
            child: Row(
              children: const [
                Padding(
                  padding: EdgeInsets.only(left: 20),
                  child: Icon(
                    Icons.folder,
                    size: 40,
                  ),
                ),
                Padding(
                  padding: EdgeInsets.only(left: 10),
                  child: Text('Raised by Wolves',
                      style: TextStyle(fontSize: 20)),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
