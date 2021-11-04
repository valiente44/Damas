class Game  {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.start = true;
        this.whitePuntuation = 12;
        this.blackPuntuation = 12;
        this.board = new Board(this);
        this.isMultiKilling = false;
        //If turn == true, white
        //If turn == false, black
        this.turn = true;

        //Initialize view
        this.initializeView();
    }
     
    // <!-- Utility functions Game -->
        initializeBoard() {
            this.board.initializeBoard();
        }

        initializeView() {
            $('#player1_name').html(this.player1);
            $('#player2_name').html(this.player2);
            $('#blackPuntuation').html(this.blackPuntuation);
            $('#whitePuntuation').html(this.whitePuntuation);
        }

        getTurn() {
            return this.turn;
        }

        changeTurn() {
            this.turn = !this.turn;
            
            $('#whiteTurn').toggleClass('activeTurn');
            $('#blackTurn').toggleClass('activeTurn');
        }

        removeAvailablePositions() {
            //Remove all the available positions if the selected checker isn't multikilling
            if(!this.isMultiKilling) {
                $('.available_position').off('click');
                $('.available_position').removeClass('available_position');
            }
        }

        checkTurn() {
            return this.turn;
        }

        checkFilledRow(position) {
            return this.board.rowFilled(position);
        }

        adjustPuntuation() {
            if(this.turn) {
                this.blackPuntuation--;
            } else {
                this.whitePuntuation--;
            }

            this.initializeView();
        }

        isStarted() {
            return this.start;
        }

        endGame(winner) {
            this.removeAvailablePositions();
            this.start = false;
            var winner_string = '';
            if(winner) {
                winner_string = 'The white checkers won!!';
            } else {
                winner_string = 'The black checkers won!!';
            }

            Swal.fire(
                'A winner has been decided!',
                winner_string,
                'success'
            );
        }
    // <!-- End Utility functions Game -->

    highlightAvailablePositions(checker) {
        this.removeAvailablePositions();
    
        this.loadMovements(checker);
    }

    initializeMovement(X, Y, checker, killedChecker = null) {
        $('#' + X + '-' + Y).addClass('available_position');
        this.allowMovement(X, Y, checker, killedChecker);
    }

    checkIfCanKill(clicked_checker, posible_victim) {
        var clicked_positions = clicked_checker.position.split('-');
        var victim_positions = posible_victim.position.split('-');

        var final_X = '';
        var final_Y = '';

        if(clicked_checker.color) {
            final_X = (parseInt(victim_positions[0]) - 1);
        } else {
            final_X = (parseInt(victim_positions[0]) + 1);
        }

        if(parseInt(clicked_positions[1]) < parseInt(victim_positions[1])) {
            //Can kill right
            final_Y = (parseInt(victim_positions[1]) + 1);
        } else if(parseInt(clicked_positions[1]) > parseInt(victim_positions[1])) {
            //Can kill left
            final_Y = (parseInt(victim_positions[1]) - 1);
        }

        if(!this.checkFilledRow(final_X + '-' + final_Y)) {
            this.initializeMovement(final_X, final_Y, clicked_checker, posible_victim);
        }
    }

    allowMovement(X, Y, checker, killedChecker) {
        var outside = this;

        $('#' + X + '-' + Y).click(function() {
            outside.makeMovement(checker, X + '-' + Y, killedChecker);
        });
    }

    makeMovement(checker, destiny, killedChecker) {
        this.removeAvailablePositions();

        var oldPosition = checker.position;

        checker.setPosition(destiny);

        if(killedChecker) {
            this.killEnemyChecker(killedChecker);
            this.removeAvailablePositions();
            this.loadMovements(checker, true);
        }

        $('#' + oldPosition).html(''); 

        if(checker.color) {
            var color = 'white';
            var extra_classes = 'fas fa-crown d-flex align-items-center';
        } else {
            var color = 'black';
            var extra_classes = 'fas fa-crown text-white d-flex align-items-center';
        }

        var final_position = checker.position.split('-');

        if(final_position[0] == 0 || final_position[0] == 7) {
            checker.transform();
        }

        if(checker.isQueen()) {
            $('#' + destiny).html('<div class="checker ' + color + '_checker ' + extra_classes + '"></div>');
        } else {
            $('#' + destiny).html('<div class="checker ' + color + '_checker"></div>');
        }

        if($('.available_position').length == 0) {
            this.changeTurn();
            this.isMultiKilling = false;
        } else {
            this.isMultiKilling = true;
        }
    }

    killEnemyChecker(killedChecker) {
        $('#' + killedChecker.position).html(''); 
        killedChecker.kill(); 
        
        this.adjustPuntuation();

        this.isMultiKilling = false;

        if(this.blackPuntuation <= 0) {
            this.endGame(true);
        } else if(this.whitePuntuation <= 0){
            this.endGame(false);
        }
    }

    loadMovements(checker, keepKilling = false) {
        //Calculate origin position
        if(!this.isMultiKilling) {
            var positions = checker.position.split('-');
            var X = '';
            var Y = '';

            if(checker.color) {
                X = parseInt(positions[0]) - 1;
                Y = [parseInt(positions[1]) - 1, parseInt(positions[1]) + 1];
            } else {
                X = parseInt(positions[0]) + 1;
                Y = [parseInt(positions[1]) + 1, parseInt(positions[1]) - 1];
            }

            for(var i = 0; i < 2; i++) {
                var filled = this.checkFilledRow(X + '-' + Y[i]);

                if(!filled && !keepKilling) {
                    this.initializeMovement(X, Y[i], checker);
                } else {
                    if(filled && filled.color != checker.color) {
                        this.checkIfCanKill(checker, filled);
                    }
                }
            }
        }
    }
}
