const Direction = {
    UP: 0,
    UP_RIGHT: 1,
    RIGHT: 2,
    DOWN_RIGHT: 3,
    DOWN: 4,
    DOWN_LEFT: 5,
    LEFT: 6,
    UP_LEFT: 7
};

class Tile {
    constructor(charData) {
        this.charData = charData;
        this.adjacent = new Array(8).fill(null);
    }

    getAdjacent(direction) {
        let adjTile = this.adjacent[direction];
        if (!adjTile) {
            throw new Error("TilePosError")
        }
        return adjTile;
    }

    setAdjacencies(board, x, y) {
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

        for (let [direc, offSetX, offSetY] of directionOffsetCoords) {
            try {
                const adjTile = board.getTile(x + offSetX, y + offSetY);
                this.adjacent[direc] = adjTile;
            } catch (err) {
                if (err.message === "TilePosError") {
                    // console.log("TilePosError", x + offSetX, y + offSetY);
                } else {
                    console.log(err);
                }
            }
        }
    }
}

class Board {

    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.tile = [...new Array(this.height)]
            .map(_ => new Array(this.width)
                .fill(new Tile()));

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.tile[i][j].setAdjacencies(this, i, j);
            }
        }
    }

    getTile(x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            throw new Error("TilePosError")
        }
        return this.tile[x][y];
    }

    render() {
        let renderString = "";
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                renderString += this.getTile(i, j);
            }
            renderString += "\n";
        }
        return renderString;
    }

    get(x, y) {
        return this.getTile(x, y);
    }

    set(x, y, char) {
        this.tile[x][y] = char;
    }


    // Functions get_tile, render and __getitem__ are the same
// as the previous Board class.
// Don't forget to copy-paste them if you want to test this code.

class Direction {
    static UP = 'UP';
    static DOWN = 'DOWN';
    static LEFT = 'LEFT';
    static RIGHT = 'RIGHT';
    static UP_RIGHT = 'UP_RIGHT';
    static DOWN_RIGHT = 'DOWN_RIGHT';
    static DOWN_LEFT = 'DOWN_LEFT';
    static UP_LEFT = 'UP_LEFT';
}

class Tile {
    constructor() {
        this.adjacencies = new Map();
    }

    set_adjacencies(board, x, y) {
        this.adjacencies.set('up', board.get_tile(x, y - 1));
        this.adjacencies.set('down', board.get_tile(x, y + 1));
        this.adjacencies.set('left', board.get_tile(x - 1, y));
        this.adjacencies.set('right', board.get_tile(x + 1, y));
    }
}

class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this._tiles = Array.from({ length: height }, () =>
            Array.from({ length: width }, () => new Tile())
        );
    }

    get_tile(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return null;
        }
        return this._tiles[y][x];
    }

    render() {
        let output = '';
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                output += this._tiles[y][x].adjacencies.size.toString();
            }
            output += '\n';
        }
        return output;
    }

    [Symbol.iterator]() {
        let x = 0, y = 0;
        return {
            next: () => {
                if (y >= this.height) {
                    return { done: true, value: undefined };
                }
                const value = this._tiles[y][x];
                x++;
                if (x >= this.width) {
                    x = 0;
                    y++;
                }
                return { done: false, value };
            }
        };
    }

    extend(direction, length = 1) {
        direction = Direction[direction];

        if (direction === Direction.UP || direction === Direction.DOWN) {
            for (let _ = 0; _ < length; _++) {
                const newLine = Array.from({ length: this.width }, () => new Tile());
                if (direction === Direction.UP) {
                    this._tiles.unshift(newLine);
                } else {
                    this._tiles.push(newLine);
                }
            }
            this.height += length;
            const yStart = direction === Direction.UP ? 0 : this.height - length;
            const yEnd = direction === Direction.UP ? length : this.height;
            for (let y = yStart; y < yEnd; y++) {
                for (let x = 0; x < this.width; x++) {
                    this._tiles[y][x].set_adjacencies(this, x, y);
                }
            }
        } else if (direction === Direction.LEFT || direction === Direction.RIGHT) {
            for (let y = 0; y < this.height; y++) {
                const tilesToAdd = Array.from({ length: length }, () => new Tile());
                if (direction === Direction.LEFT) {
                    this._tiles[y].unshift(...tilesToAdd);
                } else {
                    this._tiles[y].push(...tilesToAdd);
                }
            }
            this.width += length;
            const xStart = direction === Direction.LEFT ? 0 : this.width - length;
            const xEnd = direction === Direction.LEFT ? length : this.width;
            for (let y = 0; y < this.height; y++) {
                for (let x = xStart; x < xEnd; x++) {
                    this._tiles[y][x].set_adjacencies(this, x, y);
                }
            }
        } else {
            const cardinalDirsFromDiagDir = {
                [Direction.UP_RIGHT]: [Direction.UP, Direction.RIGHT],
                [Direction.DOWN_RIGHT]: [Direction.DOWN, Direction.RIGHT],
                [Direction.DOWN_LEFT]: [Direction.DOWN, Direction.LEFT],
                [Direction.UP_LEFT]: [Direction.UP, Direction.LEFT],
            };
            const [dirVertic, dirHoriz] = cardinalDirsFromDiagDir[direction];
            this.extend(dirVertic, length);
            this.extend(dirHoriz, length);
        }
    }
}

function main() {
    let chessBoard = new Board(8, 8);
    chessBoard.set(7, 2, "♖");
    chessBoard.set(3, 4, "♛");
}

main();