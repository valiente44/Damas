class Checker {
    constructor(piece, color, square = '0-0') {
        this.id = piece;
        this.color = color;
        this.queen = false;
        this.status = 0;
        this.position = square;
        this.x = this.position.split('-')[0];
        this.y = this.position.split('-')[1];
    }

    setPosition(position) {
        this.position = position;
    }

    kill() {
        this.status = 1;
        this.position = null;
    }

} 
