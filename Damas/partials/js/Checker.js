class Checker {
    constructor(piece, color, square = '0-0') {
        this.id = piece;
        this.color = color;
        this.queen = false;
        this.position = square;
        this.x = this.position.split('-')[0];
        this.y = this.position.split('-')[1];
    }

} 
