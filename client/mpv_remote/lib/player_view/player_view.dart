import 'package:flutter/material.dart';

class PlayerView extends StatefulWidget {
  const PlayerView({Key? key}) : super(key: key);

  @override
  State<PlayerView> createState() => _PlayerViewState();
}

class _PlayerViewState extends State<PlayerView> {
  double _time = 0;
  double _volume = 1;
  final double _length = 100;

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
          child: Material(
            child: Padding(
              padding: const EdgeInsets.only(top: 8, left: 8, right: 8),
              child: Container(
                decoration: const BoxDecoration(
                    color: Color(0xff496684),
                    borderRadius:
                        BorderRadius.vertical(top: Radius.circular(30))),
                child: Padding(
                    padding: const EdgeInsets.all(20),
                    child: Wrap(
                      alignment: WrapAlignment.center,
                      children: [
                        const Text('Raised by Wolves S01E05',
                            textAlign: TextAlign.center,
                            maxLines: 3,
                            softWrap: true,
                            style: TextStyle(
                                fontSize: 20, fontWeight: FontWeight.bold)),
                        Column(
                          children: [
                            Slider(
                              max: _length.toDouble(),
                              value: _time.toDouble(),
                              onChanged: (value) {
                                setState(() {
                                  _time = value;
                                });
                              },
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: const [
                                Text('0:00'),
                                Text('30:00'),
                              ],
                            )
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: const [
                            IconButton(
                                onPressed: null,
                                iconSize: 60,
                                icon: Icon(Icons.skip_previous)),
                            IconButton(
                                onPressed: null,
                                iconSize: 80,
                                icon: Icon(Icons.pause)),
                            IconButton(
                                onPressed: null,
                                iconSize: 60,
                                icon: Icon(Icons.skip_next)),
                          ],
                        ),
                        Row(
                          children: [
                            const IconButton(
                                onPressed: null,
                                iconSize: 30,
                                icon: Icon(Icons.volume_down)),
                            Expanded(
                              child: Slider(
                                value: _volume,
                                onChanged: (value) {
                                  setState(() {
                                    _volume = value;
                                  });
                                },
                              ),
                            ),
                            const IconButton(
                                onPressed: null,
                                iconSize: 30,
                                icon: Icon(Icons.volume_up)),
                          ],
                        ),
                        Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: const [
                              IconButton(
                                  onPressed: null,
                                  iconSize: 30,
                                  icon: Icon(Icons.subtitles)),
                              IconButton(
                                  onPressed: null,
                                  iconSize: 30,
                                  icon: Icon(Icons.crop_free)),
                              IconButton(
                                  onPressed: null,
                                  iconSize: 30,
                                  icon: Icon(Icons.tune)),
                            ]),
                      ],
                    )),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
