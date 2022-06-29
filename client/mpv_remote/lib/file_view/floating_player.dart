import 'package:flutter/material.dart';
import 'package:mpv_remote/player_view/player_view.dart';

class FloatingPlayer extends StatefulWidget {
  const FloatingPlayer({Key? key}) : super(key: key);

  @override
  State<FloatingPlayer> createState() => _FloatingPlayerState();
}

class _FloatingPlayerState extends State<FloatingPlayer> {
  @override
  Widget build(BuildContext context) {
    return Hero(
      tag: 'floating_player',
      child: Padding(
        padding: const EdgeInsets.only(bottom: 20, right: 30, left: 30),
        child: Container(
          height: 80,
          clipBehavior: Clip.hardEdge,
          decoration: const BoxDecoration(
              borderRadius: BorderRadius.all(Radius.circular(30))),
          child: Material(
            color: const Color(0xff496684),
            child: InkWell(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const PlayerView()),
                );
              },
              child: Column(children: [
                Expanded(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      const Expanded(
                        child: Center(
                          child: Text('Raised by Wolves S01E05',
                              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                              textAlign: TextAlign.center,
                              overflow: TextOverflow.clip,
                              ),
                        ),
                      ),
                      IconButton(
                        iconSize: 65,
                        icon: const Icon(
                          Icons.play_arrow,
                        ),
                        onPressed: () {
                          debugPrint("Button");
                        },
                      )
                    ],
                  ),
                ),
                const LinearProgressIndicator(
                  value: 0.5,
                )
              ]),
            ),
          ),
        ),
      ),
    );
  }
}
