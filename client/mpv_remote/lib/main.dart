import 'package:flutter/material.dart';

import 'file_view/file_explorer_view.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MPV/VLC Remote',
      theme: ThemeData(
        colorScheme: const ColorScheme.dark(
          surface: Color(0xff8e44ad),
        ),
        scaffoldBackgroundColor: const Color(0xff2c3e50),
        progressIndicatorTheme: const ProgressIndicatorThemeData(
          color: Color(0xff9b59b6),
          linearTrackColor: Color(0xff7f8c8d),
        ),
      ),
      home: const FileExplorerView(),
    );
  }
}

