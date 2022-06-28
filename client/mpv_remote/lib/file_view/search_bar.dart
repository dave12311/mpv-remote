import 'package:flutter/material.dart';

class FileSearchBar extends StatefulWidget {
  const FileSearchBar({Key? key}) : super(key: key);

  @override
  State<FileSearchBar> createState() => _FileSearchBarState();
}

class _FileSearchBarState extends State<FileSearchBar> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      child: TextField(
        controller: TextEditingController(
            text:
                "C:\\Downloads\\Movies\\Raised by wolves\\Season 1\\Raised.By.Wolves.S01E01.mkv"),
        maxLines: 1,
      ),
    );
  }
}