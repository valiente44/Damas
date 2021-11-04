class Checker {
    constructor(piece, color, square = '0-0') {
        this.id = piece;
        this.color = color;
        this.queen = false;
        this.status = 0;
        this.position = square;
    }

    setPosition(position) {
        this.position = position;
    }

    kill() {
        this.status = 1;
        this.position = null;
    }

    transform() {
        this.queen = true;
    }

    isQueen() {
        return this.queen;
    }
} 
