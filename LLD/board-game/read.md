Do you like board games?
I love tile-based board games so much that I want to recreate some of them as video games.

Step 1: generic classes
First, I need some generic classes. Let’s call them Tile and Board.

A board will be initialized with a specified width and height and will have a method get_tile(x, y) that returns a Tile object.

Many board games have elements that impact adjacent tiles. I want to handle that easily, without those “x-1”, “x+1” operations. So the class Tile will have a method get_adjacent(direction) that returns a Tile object. The parameter direction is an integer from 0 to 7, with adjacencies according to this diagram:

|------|------|------|
|   7  |   0  |   1  |
|------|------|------|
|   6  | Tile |   2  |
|------|------|------|
|   5  |   4  |   3  |
|------|------|------|
schema board and tile classes

The Tile class will also contain a member char_data, which will be a single character. Then, the Board could have a method render(), printing these char_datas in a square of width*height characters. It’s rather simplistic, but we need it for debugging.

The tiles should contain a lot of other information, depending on the board game I’m currently implementing. But we don’t have to care about that for the moment; I will override the class when needed.

Could you help me code this? With these classes, I could implement chess, draughts, minesweeper, and many other games!

Step 2: extending the board
Hey, I discovered some neat games: Carcassonne and Isle of Skye. Their boards do not have a fixed size. They extend in any of the 4 directions when players add new tiles during the game. I want that feature!

It would be even cooler if it could work in all 8 directions. Extending the board to the up-left diagonal would be the same as extending it up, then to the left.

While you are at it, the board could extend by many tiles at once: 2 columns leftward, 3 lines downward, …

Don’t forget to update the tile adjacencies. The method get_adjacent(direction) should still work properly even after an extension.

board Carcassonne

Photo from Wikipedia. CC-BY-SA

Step 3: composing a board from sub-boards
You know what? I discovered more great games: Space Crusade and Space Hulk. Their boards are built from smaller boards. I want that feature too!

The smaller boards are not necessarily arranged in a perfect rectangular shape. We must produce the board that contains all of them. The holes will be filled by default tiles.

board Space Hulk

Photo from Toomuchlead. CC-BY-SA

Step 4: optional bonuses
I may need to insert a line or a column in the middle of a board, like we do with Excel sheets. And I may need to extract sub-boards, given a range of x and y coordinates.

Board games are not enough, I want to recreate video games, like Tetris. How could we handle objects with arbitrary shapes laying on multiple tiles?

Some board games, like Full Metal Planet or Twilight Imperium, use hexagons. Is it possible to modify our classes from squares to hexagons? What would be the behavior of the get_adjacent method?

Heard about Minecraft? 3D! I want 3D boards!

board Twilight Imperium