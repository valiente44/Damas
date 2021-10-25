class Board {
    constructor(game) {
        this.white_cheekers = [];
        this.black_cheekers = [];
        this.game = game;
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

        this.initializeCheckers();
    }

    showAvailablePositions(isWhite, position) {
        //Check if the clicked cheeker match the current turn
        if(this.checkTurn() == isWhite) {
            var checkerArray = [];

            //Load the correct checker array so the game can check if the position is being used
            if(isWhite) {
                checkerArray = this.white_cheekers;
            } else {
                checkerArray = this.black_cheekers;
            }

            //Call the game method to highlight all available positions
            this.game.highlightAvailablePositions(isWhite, position, checkerArray);
        }
    }

    checkTurn() {
        return this.game.getTurn();
    }

    initializeCheckers() {
        var arrayWhiteCheckers = [];
        var arrayBlackCheckers = [];

        var id = 1;
        var outside = this;

        //Initialize white checkers
        $("#table .white_checker").each(function(e) {
            var checker = new Checker((id + '-w'), '#FFFFFF', $(this).parent().attr('id'));
            arrayWhiteCheckers.push(checker);
            id++;
        });

        this.white_cheekers = arrayWhiteCheckers;

        $(document).on('click', '.white_checker', function() {
            var checker = outside.white_cheekers.find(el => el.position == $(this).parent().attr('id'));
            outside.showAvailablePositions(true, checker.position);
        });

        //Initialize black checkers
        $("#table .black_checker").each(function(e) {
            var checker = new Checker((id + '-b'), '#000000', $(this).parent().attr('id'));
            arrayBlackCheckers.push(checker);
            id++;
        });

        this.black_cheekers = arrayBlackCheckers;

        $(document).on('click', '.black_checker', function() {
            var checker = outside.black_cheekers.find(el => el.position == $(this).parent().attr('id'));
            outside.showAvailablePositions(false, checker.position);
        });

    }
}