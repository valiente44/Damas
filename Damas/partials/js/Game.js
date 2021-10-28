class Game  {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.start = true;
        this.whitePuntuation = 12;
        this.blackPuntuation = 12;
        this.board = new Board(this);
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
            //Remove all the available positions
            $('.available_position').off('click');
            $('.available_position').removeClass('available_position');
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
    // <!-- End Utility functions Game -->

    highlightAvailablePositions(checker, checkerArray) {
        this.removeAvailablePositions();
        
        //Calculate origin position
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

            if(!filled) {
                this.initializeMovement(X, Y[i], checker);
            } else {
                if(filled.color != checker.color) {
                    this.checkIfCanKill(checker, filled);
                }
            }
        }
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

        if(killedChecker) {
            this.killEnemyChecker(killedChecker);
        }
        
        $('#' + checker.position).html(''); 

        checker.setPosition(destiny);
        
        if(checker.color) {
            var color = 'white';
        } else {
            var color = 'black';
        }

        $('#' + destiny).html('<div class="checker ' + color + '_checker"></div>');

        this.changeTurn();
    }

    killEnemyChecker(killedChecker) {
        $('#' + killedChecker.position).html(''); 
        killedChecker.kill(); 
        
        this.adjustPuntuation();
    }
}
