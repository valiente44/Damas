class Checker {
    /**
     * 
     * @param {*} piece 
     * @param {*} color 
     * @param {*} square 
     */
    constructor(piece, color, square = '0-0') {
        this.id = piece;
        this.color = color;
        this.queen = false;
        this.status = 0;
        this.position = square;
    }
    /**
     * 
     * @param {*} position 
     */
    setPosition(position) {
        this.position = position;
    }
    /**
     * 
     */
    kill() {
        this.status = 1;
        this.position = null;
    }
    /**
     * 
     */
    transform() {
        this.queen = true;
    }
    /**
     * 
     * @returns true or false
     */
    isQueen() {
        return this.queen;
    }
} 
