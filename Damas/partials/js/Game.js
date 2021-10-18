class Game  {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.start = true;
        this.whitePuntuation = 12;
        this.blackPuntuation = 12;
        //If turn == true, white
        //If turn == false, black
        this.turn = true;
    }
     
    initializeBoard() {
        var board = '';
        var swap = true;
        for(var i = 0; i < 8; i++) {
            for(var f = 0; f < 8; f++) {
                if(swap) {
                    board += '<div class="square white_square"></div>';
                } else {
                    if(i >= 0 && i < 3) {
                        board += '<div class="square black_square"><div class="checker black_checker"></div></div>';
                    } else if(i >= 5 && i < 9) {
                        board += '<div class="square black_square"><div class="checker white_checker"></div></div>';
                    } else {
                        board += '<div class="square black_square"></div>';
                    }
                }
                swap = !swap;
            }
            swap = !swap;
        }
    
        this.white_cheekers = document.getElementsByClassName("white_checker");
        this.black_cheekers = document.getElementsByClassName("black_cheekers");
    
        $('#table').html(board);
    }
}
