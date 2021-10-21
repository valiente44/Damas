class Game  {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.start = true;
        this.whitePuntuation = 12;
        this.blackPuntuation = 12;
        this.white_cheekers = [];
        this.black_cheekers = [];
        //If turn == true, white
        //If turn == false, black
        this.turn = true;

        //Initialize view
        $('#player1_name').html(this.player1);
        $('#player2_name').html(this.player2);
        $('#blackPuntuation').html(this.blackPuntuation);
        $('#whitePuntuation').html(this.whitePuntuation);
    }
     
    initializeBoard() {
        var board = '';
        var swap = true;
        for(var fil = 0; fil < 8; fil++) {
            for(var col = 0; col < 8; col++) {
                if(swap) {
                    board += '<div class="square white_square" id="' + fil + '-' + col + '"></div>';
                } else {
                    if(fil >= 0 && fil < 3) {
                        board += '<div class="square black_square" id="' + fil + '-' + col + '"><div class="checker black_checker"></div></div>';
                    } else if(fil >= 5 && fil < 9) {
                        board += '<div class="square black_square" id="' + fil + '-' + col + '"><div class="checker white_checker"></div></div>';
                    } else {
                        board += '<div class="square black_square" id="' + fil + '-' + col + '"></div>';
                    }
                }
                swap = !swap;
            }
            swap = !swap;
        }
    
        $('#table').html(board);

        var arrayWhiteCheckers = this.white_cheekers;
        var arrayBlackCheckers = this.black_cheekers;

        var id = 1;
        var outside = this;

        $(".white_checker").each(function(e) {
            var checker = new Checker((id + '-w'), '#FFFFFF', $(this).parent().attr('id'));
            arrayWhiteCheckers.push(checker);
            id++;

            $(this).on('click', function(e) {
                outside.showAvailablePositions(true, checker.position);
            });
        });

        $(".black_checker").each(function(e) {
            var checker = new Checker((id + '-b'), '#000000', $(this).parent().attr('id'));
            arrayBlackCheckers.push(checker);
            id++;

            $(this).on('click', function(e) {
                outside.showAvailablePositions(false, checker.position);
            });
        });
    }

    showAvailablePositions(isWhite, position) {
        if(this.turn == isWhite) {
            alert('Is white? ' + isWhite + ', Position: ' + position);
        }
    }
}
