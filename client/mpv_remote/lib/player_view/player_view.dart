import 'package:flutter/material.dart';

class PlayerView extends StatefulWidget {
  const PlayerView({Key? key}) : super(key: key);

  @override
  State<PlayerView> createState() => _PlayerViewState();
}

class _PlayerViewState extends State<PlayerView> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onVerticalDragEnd: (details) {
        if (details.primaryVelocity! > 0) {
          Navigator.pop(context);
        }
      },
      child: Container(
        color: const Color(0xff2c3e50),
        child: Hero(
          tag: 'floating_player',
          child: Container(
            decoration: const BoxDecoration(
                color: Color(0xff496684),
                borderRadius: BorderRadius.vertical(top: Radius.circular(30))),
            child: Column(children: const [
              Text('Raised by Wolves S01E05',
              maxLines: 3,
                  softWrap: true, style: TextStyle(fontSize: 30)),
    
            ]),
          ),
        ),
      ),
    );
  }
}
