## Step 1

The `Board` class will have a 2D array containing the tiles. The `Tile` class will have a list of 8 elements (one per direction) to define the adjacencies.

What should we do if we try to access a tile that is out of bounds? Depending on external requirements, we could return a default value (such as null or None) or raise an exception. For consistency, we expect the same behavior with the functions `Board.get_tile(x, y)` and `Tile.get_adjacent(direction)`.

We choose to raise an exception when a tile is out of bounds.

This solution can be implemented in any language, but we will use Python. Some specific exceptions are already defined. Can we reuse one of them? Maybe `IndexError`, which is raised when we try to access an element from a list with an incorrect index? Or perhaps `KeyError`, which is raised when we fail to access an element from a dictionary?

Neither of these exceptions is appropriate. However, both derive from `LookupError`. We will derive our own exception from `LookupError`. Let's call it `TilePosError`.

The tile adjacencies are initialized at board creation. The border tiles will have `None` values for their invalid adjacencies in order to detect when to raise the exception.

To be explicit, we will define the 8 directions as an enum.

Let's code all this!

```python
from enum import Enum

class TilePosError(LookupError): pass

class Direction(Enum):
    UP = 0
    UP_RIGHT = 1
    RIGHT = 2
    DOWN_RIGHT = 3
    DOWN = 4
    DOWN_LEFT = 5
    LEFT = 6
    UP_LEFT = 7

ALL_DIRS = [Direction(d) for d in range(8)]
CARDINAL_DIRS = ALL_DIRS[::2]
DIAGONAL_DIRS = ALL_DIRS[1::2]


class Tile():

    def __init__(self, char_data=" "):
        self.char_data = char_data
        self.adjacencies = [None] * 8

    def get_adjacent(self, direction):
        """
        This function works with numbers, from 0 to 7,
        and also with the Enum Direction.
        """
        adj_tile = self.adjacencies[
            Direction(direction).value
        ]
        if adj_tile is None:
            raise TilePosError()
        return adj_tile

    def set_adjacencies(self, board_owner, x, y):
        direction_offset_coords = (
            (Direction.UP, 0, -1),
            (Direction.UP_RIGHT, 1, -1),
            (Direction.RIGHT, 1, 0),
            (Direction.DOWN_RIGHT, 1, 1),
            (Direction.DOWN, 0, 1),
            (Direction.DOWN_LEFT, -1, 1),
            (Direction.LEFT, -1, 0),
            (Direction.UP_LEFT, -1, -1),
        )
        for direc, offset_x, offset_y in direction_offset_coords:
            try:
                adj_tile = board_owner.get_tile(x + offset_x, y + offset_y)
            except TilePosError:
                pass
            else:
                self.adjacencies[direc.value] = adj_tile


class Board():

    def __init__(self, width, height):
        self.width = width
        self.height = height
        self._tiles = [
            [Tile() for _ in range(self.width)]
            for __ in range(self.height)
        ]
        for y in range(self.height):
            for x in range(self.width):
                tile = self._tiles[y][x]
                tile.set_adjacencies(self, x, y)

    def get_tile(self, x, y):
        if x < 0 or x >= self.width or y < 0 or y >= self.height:
            raise TilePosError()
        return  self._tiles[y][x]

    def render(self):
        str_rendered_board = []
        for y in range(self.height):
            line = "".join(
                [tile.char_data for tile in self._tiles[y]]
            )
            str_rendered_board.append(line)
        return "\n".join(str_rendered_board)

    def __getitem__(self, key):
        """
        Overriding the operator square brackets [].
        This is not always possible in every language,
        but we have the fortune to be able to do it in python.
        """
        x, y = key
        return self.get_tile(x, y)
```


## Testing step 1

We create a chess board and we place a queen and a rook on it. We use utf-8 characters, which should correctly print in your console.

We put arrows on the chess board, going from the queen, in the 8 directions, to show all the tiles where the queen could move.

```python
chess_board = Board(8, 8)
chess_board[7, 2].char_data = "♖"
chess_board[3, 4].char_data = "♛"
arrows = "↑↗→↘↓↙←↖"
for direc, char_arrow in zip(ALL_DIRS, arrows):
    tile = chess_board[3, 4]
    try:
        while True:
            tile = tile.get_adjacent(direc)
            tile.char_data = char_arrow
    except TilePosError:
        pass

render_reference = "\n".join(
    (
        "   ↑   ↗",
        "↖  ↑  ↗ ",
        " ↖ ↑ ↗ ♖",
        "  ↖↑↗   ",
        "←←←♛→→→→",
        "  ↙↓↘   ",
        " ↙ ↓ ↘  ",
        "↙  ↓  ↘ ",
    )
)
render_test = chess_board.render()
print(render_test)
assert render_test == render_reference
```


## Step 2

We need a `Board.extend` method, which requires two parameters: the extension direction and the number of lines/columns to add (default is 1).

 - Extending up or down will add some lines of tiles at the beginning or end of the 2D array.
 - Extending left or right will add some tiles at the beginning or end of each line of the 2D array.
 - Extending diagonally will be equivalent to extending vertically, then horizontally, in the corresponding directions.

This new function causes an edge case. Until now, the size of the board was initially fixed and never changed. It was possible to have an empty board (width = height = 0), even if it was useless. What could we expect when extending an empty board?

An empty board is like a board with no lines, and if it had any lines, they wouldn't have any tiles.

 - Extending vertically adds some lines, but these lines don't have tiles!
 - Extending horizontally adds some tiles to every line, but there are no lines!

It's rather strange, but if we want tiles in an empty board, we have to extend it once vertically and once horizontally, or just once diagonally. It comes from the "2-dimensionality" of a board. To contain something, it must be extended in both dimensions.

To prevent any confusion, we will forbid creating empty boards. An exception will be raised if either of the sizes is not strictly positive.

After extending the board, we compute the adjacencies of the added tiles and the border tiles in the corresponding direction.

```python
class Board():

    def __init__(self, width=1, height=1):
        if width <= 0 or height <= 0:
            raise Exception("The width and height must be strictly positive.")
        self.width = width
        self.height = height
        self._tiles = [
            [Tile() for _ in range(self.width)]
            for __ in range(self.height)
        ]
        for y in range(self.height):
            for x in range(self.width):
                tile = self._tiles[y][x]
                tile.set_adjacencies(self, x, y)

    # Functions get_tile, render and __getitem__ are the same
    # as the previous Board class.
    # Don't forget to copy-paste them if you want to test this code.

    def extend(self, direction, length=1):
        direction = Direction(direction)

        if direction in (Direction.UP, Direction.DOWN):
            for _ in range(length):
                new_line = [Tile() for __ in range(self.width)]
                if direction == Direction.UP:
                    self._tiles.insert(0, new_line)
                else:
                    self._tiles.append(new_line)
            self.height += length
            if direction == Direction.UP:
                y_start = 0
                y_end = length + 1
            else:
                y_start = self.height - length - 1
                y_end = self.height
            for y in range(y_start, y_end):
                for x in range(self.width):
                    self._tiles[y][x].set_adjacencies(self, x, y)

        elif direction in (Direction.LEFT, Direction.RIGHT):
            for y in range(self.height):
                tiles_to_add = [Tile() for _ in range(length)]
                if direction == Direction.LEFT:
                    self._tiles[y][0:0] = tiles_to_add
                else:
                    self._tiles[y].extend(tiles_to_add)
            self.width += length
            if direction == Direction.LEFT:
                x_start = 0
                x_end = length + 1
            else:
                x_start = self.width - length - 1
                x_end = self.width
            for y in range(self.height):
                for x in range(x_start, x_end):
                    self._tiles[y][x].set_adjacencies(self, x, y)

        else:
            D = Direction
            cardinal_dirs_from_diag_dir = {
                D.UP_RIGHT: (D.UP, D.RIGHT),
                D.DOWN_RIGHT: (D.DOWN, D.RIGHT),
                D.DOWN_LEFT: (D.DOWN, D.LEFT),
                D.UP_LEFT: (D.UP, D.LEFT),
            }
            dir_vertic, dir_horiz = cardinal_dirs_from_diag_dir[direction]
            self.extend(dir_vertic, length)
            self.extend(dir_horiz, length)
```


## Testing step 2

We start with a one-tile board that we extend progressively. While extending it, we place characters representing a snake on some tiles that are referenced by a cursor. The cursor is moved using `get_adjacent` to validate that the adjacency indexes are correctly updated.

At the end, we place the head of the snake and compare the drawn board with a reference.

```python
snake_board = Board()
tile_snake = snake_board[0, 0]
tile_snake.char_data = "─"
snake_board.extend(Direction.UP_LEFT, 2)
tile_snake = tile_snake.get_adjacent(Direction.LEFT)
tile_snake.char_data = "╰"
tile_snake = tile_snake.get_adjacent(Direction.UP)
tile_snake.char_data = "╮"
tile_snake = tile_snake.get_adjacent(Direction.LEFT)
tile_snake.char_data = "─"
snake_board.extend(Direction.LEFT)
tile_snake = tile_snake.get_adjacent(Direction.LEFT)
tile_snake.char_data = "╰"
tile_snake = tile_snake.get_adjacent(Direction.UP)
tile_snake.char_data = "╮"
snake_board.extend(Direction.DOWN_LEFT)
tile_snake = tile_snake.get_adjacent(Direction.LEFT)
tile_snake.char_data = "╭"
tile_snake = tile_snake.get_adjacent(Direction.DOWN)
tile_snake.char_data = "│"
tile_snake = tile_snake.get_adjacent(Direction.DOWN)
tile_snake.char_data = "│"
tile_snake = tile_snake.get_adjacent(Direction.DOWN)
tile_snake.char_data = "╰"
tile_snake = tile_snake.get_adjacent(Direction.RIGHT)
tile_snake.char_data = "☻"
snake_board.extend(Direction.RIGHT, 2)
snake_board[5, 2].char_data = "─"
snake_board[6, 2].char_data = "╴"
render_reference = "\n".join(
    (
        "╭╮     ",
        "│╰─╮   ",
        "│  ╰──╴",
        "╰☻     ",
    )
)
render_test = snake_board.render()
print(render_test)
assert render_test == render_reference
```


## Step 3

We need to know where to place the sub-boards on the final board. The function will require a list containing the sub-boards and their coordinates (upper-left corner). It's like copy-pasting images to form a larger image.

To associate a sub-board with its coordinates, we may need a small class or struct, depending on your language. In Python, we will just use a tuple.

The size of the main board must be computed from the sub-boards' arrangement. It's the greatest coordinates of the right and bottom borders.

We create the 2D array, but we do not immediately fill it with new tiles. We get them from the sub-boards by reference. We do not add a `clone` method to the Tile class because it is supposed to be overridden. Creating and maintaining a `clone` method for all the inherited Tile classes may pose too many risks.

Copying by reference means we must use each sub-board only once. Otherwise, it would result in unexpected behavior with tiles being modified on multiple boards simultaneously.

Once all the sub-boards are copied, we fill the empty spaces of the main board by instantiating default tiles. Finally, we build all the adjacency indexes.

What should we do if sub-boards overlap? Raise an exception? We choose not to detect this case. The final overlapped tiles will be the ones from the latest sub-boards.


```python
class Board():

    def __init__(self, width=1, height=1, coords_and_sub_boards=None):
        if width <= 0 or height <= 0:
            raise Exception("The width and height must be strictly positive.")

        if coords_and_sub_boards is None:
            self.width = width
            self.height = height
            self._tiles = [
                [Tile() for _ in range(self.width)]
                for __ in range(self.height)
            ]
        else:
            self.width, self.height = self._compute_dim(coords_and_sub_boards)
            self._tiles = [
                [None] * self.width
                for _ in range(self.height)
            ]
            for coords, sub_board in coords_and_sub_boards:
                self._get_tiles_from_sub_board(coords, sub_board)
            for y in range(self.height):
                for x in range(self.width):
                    if self._tiles[y][x] is None:
                        self._tiles[y][x] = Tile()

        for y in range(self.height):
            for x in range(self.width):
                tile = self._tiles[y][x]
                tile.set_adjacencies(self, x, y)

    def _compute_dim(self, coords_and_sub_boards):
        x_main = max(
            coords[0] + sub_board.width
            for coords, sub_board
            in coords_and_sub_boards
        )
        y_main = max(
            coords[1] + sub_board.height
            for coords, sub_board
            in coords_and_sub_boards
        )
        return x_main, y_main

    def _get_tiles_from_sub_board(self, coords, sub_board):
        offset_x, offset_y = coords
        for sub_y in range(sub_board.height):
            main_y = sub_y + offset_y
            for sub_x in range(sub_board.width):
                main_x = sub_x + offset_x
                self._tiles[main_y][main_x] = sub_board._tiles[sub_y][sub_x]

    # Functions get_tile, render, __getitem__ and extend are the same
    # as the previous Board class.
```


## Testing step 3

We create some sub-boards and we assemble them into a nice map. What does it represent? A cursed temple? A cyberpunk fortress? It's up to you!

```python
def set_board_from_string(str_lines, dest_board):
    for y, line in enumerate(str_lines):
        for x, char_data in enumerate(line):
            dest_board[x, y].char_data = char_data

corridor_vertic = Board(3, 4)
set_board_from_string(
    ("║.║", "║.║", "║.║", "║.║"),
    corridor_vertic,
)
str_lines_horiz = ("════", "....", "════")
corridor_horiz_1 = Board(4, 3)
set_board_from_string(str_lines_horiz, corridor_horiz_1)
corridor_horiz_2 = Board(4, 3)
set_board_from_string(str_lines_horiz, corridor_horiz_2)
little_room_up = Board(5, 5)
set_board_from_string(
    ("╔╩─╩╗", "║...║", "║...║", "║...║", "╚═══╝"),
    little_room_up,
)
little_room_right = Board(5, 5)
set_board_from_string(
    ("╔═══╗", "║...╠", "║...│", "║...╠", "╚═══╝"),
    little_room_right,
)
big_room = Board(7, 7)
set_board_from_string(
    (
        "╔═╩─╩═╗", "║.o.o.║", "╣.....╠", "│.....│",
        "╣.....╠", "║.o.o.║", "╚═╦─╦═╝"),
    big_room,
)
space_hulk_main_board = Board(
    coords_and_sub_boards=(
        ((0, 1), little_room_right),
        ((5, 2), corridor_horiz_1),
        ((9, 2), corridor_horiz_2),
        ((13, 0), big_room),
        ((15, 7), corridor_vertic),
        ((14, 11), little_room_up),
    )
)
render_reference = "\n".join(
    (
        "             ╔═╩─╩═╗",
        "╔═══╗        ║.o.o.║",
        "║...╠════════╣.....╠",
        "║...│........│.....│",
        "║...╠════════╣.....╠",
        "╚═══╝        ║.o.o.║",
        "             ╚═╦─╦═╝",
        "               ║.║  ",
        "               ║.║  ",
        "               ║.║  ",
        "               ║.║  ",
        "              ╔╩─╩╗ ",
        "              ║...║ ",
        "              ║...║ ",
        "              ║...║ ",
        "              ╚═══╝ ",
    )
)
render_test = space_hulk_main_board.render()
print(render_test)
assert render_test == render_reference
```










class Tile {
    constructor(charData = " ") {
        this.charData = charData;
        this.adjacencies = new Array(8).fill(null);
    }

    getAdjacent(direction) {
        /**
         * This function works with numbers, from 0 to 7,
         * and also with the Enum Direction.
         */
        const adjTile = this.adjacencies[direction];
        if (adjTile === null) {
            throw new TilePosError();
        }
        return adjTile;
    }

    setAdjacencies(boardOwner, x, y) {
        const directionOffsetCoords = [
            [Direction.UP, 0, -1],
            [Direction.UP_RIGHT, 1, -1],
            [Direction.RIGHT, 1, 0],
            [Direction.DOWN_RIGHT, 1, 1],
            [Direction.DOWN, 0, 1],
            [Direction.DOWN_LEFT, -1, 1],
            [Direction.LEFT, -1, 0],
            [Direction.UP_LEFT, -1, -1],
        ];
        for (const [direc, offsetX, offsetY] of directionOffsetCoords) {
            try {
                const adjTile = boardOwner.getTile(x + offsetX, y + offsetY);
                this.adjacencies[direc] = adjTile;
            } catch (e) {
                if (e instanceof TilePosError) {
                    continue;
                } else {
                    throw e;
                }
            }
        }
    }
}

class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this._tiles = new Array(this.height).fill(0).map(() =>
            new Array(this.width).fill(0).map(() => new Tile())
        );
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const tile = this._tiles[y][x];
                tile.setAdjacencies(this, x, y);
            }
        }
    }

    getTile(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            throw new TilePosError();
        }
        return this._tiles[y][x];
    }

    render() {
        const strRenderedBoard = [];
        for (let y = 0; y < this.height; y++) {
            const line = this._tiles[y].map(tile => tile.charData).join('');
            strRenderedBoard.push(line);
        }
        return strRenderedBoard.join('\n');
    }

    get(x, y) {
        /**
         * Overriding the operator square brackets [].
         * This is not always possible in every language,
         * but we have the fortune to be able to do it in JavaScript.
         */
        return this.getTile(x, y);
    }
}

