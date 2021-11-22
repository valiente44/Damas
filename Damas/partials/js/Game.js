class Game {
    /**
     * 
     * @param {*} player1 
     * @param {*} player2 
     */
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.start = true;
        this.whitePuntuation = 12;
        this.blackPuntuation = 12;
        this.board = new Board(this);
        this.isMultiKilling = false;
        this.turn = true; // If turn == true, white , If turn == false, black

        // Initialize view
        this.initializeView();
    }

    // <!-- Utility functions Game -->
    initializeBoard() {
        this.board.initializeBoard();
    }

    /**
    * Reset the game, setting the parameters on default
    * Call the functions initializeBoard() and initializeView()
    * @param  {null}
    * @return  {null}
    */
    restartGame() {
        this.start = true;
        this.whitePuntuation = 12;
        this.blackPuntuation = 12;
        this.board = new Board(this);
        this.initializeBoard();
        this.isMultiKilling = false;
        this.turn = true;

        this.initializeView();
    }
    /**
     * 
     */
    initializeView() {
        $('#player1_name').html(this.player1);
        $('#player2_name').html(this.player2);
        $('#blackPuntuation').html(this.blackPuntuation);
        $('#whitePuntuation').html(this.whitePuntuation);
    }
    /**
     * 
     * @returns 
     */
    getTurn() {
        return this.turn;
    }
    /**
     * 
     */
    changeTurn() {
        this.turn = !this.turn;

        $('#whiteTurn').toggleClass('activeTurn');
        $('#blackTurn').toggleClass('activeTurn');
    }
    /**
     * Remove all the available positions if the selected checker isn't multikilling
     */
    removeAvailablePositions() {

        if (!this.isMultiKilling) {
            $('.available_position').off('click');
            $('.available_position').removeClass('available_position');
        }
    }
    /**
     * 
     * @returns the turn if its true or false
     */
    checkTurn() {
        return this.turn;
    }
    /**
     * 
     * @param {*} position 
     * @returns 
     */
    checkFilledRow(position) {
        return this.board.rowFilled(position);
    }
    /**
     * Subtract the pieces that have been eaten and initializeView to refresh the puntuation
     */
    adjustPuntuation() {
        if (this.turn) {
            this.blackPuntuation--;
        } else {
            this.whitePuntuation--;
        }

        this.initializeView();
    }
    /**
     * 
     * @returns the boolean to know if game was started or not
     */
    isStarted() {
        return this.start;
    }
    /**
     * 
     * @param {*} winner 
     */
    endGame(winner) {
        this.removeAvailablePositions();
        this.start = false;
        var winner_string = '';
        if (winner) {
            winner_string = this.player1 + ' (white checkers) won!!';
        } else {
            winner_string = this.player2 + ' (black checkers) won!!';
        }

        var self = this;

        Swal.fire({
            title: 'A winner has been decided!',
            html: winner_string,
            icon: 'success',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> New game!',
            cancelButtonText: '<i class="fa fa-thumbs-down"></i> End game!',
        }).then((result) => {
            if (result.isConfirmed) {
                self.reMatch();
            }
        });
    }
    // <!-- End Utility functions Game -->
    /**
     * 
     * @param {*} checker 
     */
    highlightAvailablePositions(checker) {
        this.removeAvailablePositions();

        this.loadMovements(checker);
    }
    /**
     * 
     */
    reMatch() {
        Swal.fire({
            title: 'New game!',
            html: 'Do you want to play with the same players, or change names?',
            icon: 'info',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Same!',
            cancelButtonText: '<i class="fa fa-thumbs-down"></i> Change!',
        }).then((result) => {
            if (result.isConfirmed) {
                this.restartGame();
            } else {
                location.reload();
            }
        });
    }
    /**
     * 
     * @param {*} X 
     * @param {*} Y 
     * @param {*} checker 
     * @param {*} killedChecker 
     */
    initializeMovement(X, Y, checker, killedChecker = null) {
        $('#' + X + '-' + Y).addClass('available_position');
        this.allowMovement(X, Y, checker, killedChecker);
    }
    /**
     * 
     * @param {*} clicked_checker 
     * @param {*} posible_victim 
     */
    checkIfCanKill(clicked_checker, posible_victim) {
        var clicked_positions = clicked_checker.position.split('-');
        var victim_positions = posible_victim.position.split('-');

        var final_X = '';
        var final_Y = '';

        if (clicked_checker.isQueen()) {
            if (parseInt(clicked_positions[1]) < parseInt(victim_positions[1])) {
                //Can kill right
                final_Y = (parseInt(victim_positions[1]) + 1);
            } else if (parseInt(clicked_positions[1]) > parseInt(victim_positions[1])) {
                //Can kill left
                final_Y = (parseInt(victim_positions[1]) - 1);
            }

            if (parseInt(clicked_positions[0]) < parseInt(victim_positions[0])) {
                //Can kill right
                final_X = (parseInt(victim_positions[0]) + 1);
            } else if (parseInt(clicked_positions[0]) > parseInt(victim_positions[0])) {
                //Can kill left
                final_X = (parseInt(victim_positions[0]) - 1);
            }
        } else {
            if (clicked_checker.color) {
                final_X = (parseInt(victim_positions[0]) - 1);
            } else {
                final_X = (parseInt(victim_positions[0]) + 1);
            }

            if (parseInt(clicked_positions[1]) < parseInt(victim_positions[1])) {
                //Can kill right
                final_Y = (parseInt(victim_positions[1]) + 1);
            } else if (parseInt(clicked_positions[1]) > parseInt(victim_positions[1])) {
                //Can kill left
                final_Y = (parseInt(victim_positions[1]) - 1);
            }
        }

        if (!this.checkFilledRow(final_X + '-' + final_Y)) {
            this.initializeMovement(final_X, final_Y, clicked_checker, posible_victim);
        }
    }
    /**
     * 
     * @param {*} X 
     * @param {*} Y 
     * @param {*} checker 
     * @param {*} killedChecker 
     */
    allowMovement(X, Y, checker, killedChecker) {
        var outside = this;

        $('#' + X + '-' + Y).click(function () {
            outside.makeMovement(checker, X + '-' + Y, killedChecker);
        });
    }
    /**
     * 
     * @param {*} checker 
     * @param {*} destiny 
     * @param {*} killedChecker 
     */
    makeMovement(checker, destiny, killedChecker) {
        this.removeAvailablePositions();

        var oldPosition = checker.position;

        checker.setPosition(destiny);

        if (killedChecker) {
            this.killEnemyChecker(killedChecker);
            this.removeAvailablePositions();
            this.loadMovements(checker, true);
        }

        $('#' + oldPosition).html('');

        if (checker.color) {
            var color = 'white';
            var extra_classes = 'fas fa-crown d-flex align-items-center';
        } else {
            var color = 'black';
            var extra_classes = 'fas fa-crown text-white d-flex align-items-center';
        }

        var final_position = checker.position.split('-');

        if (final_position[0] == 0 || final_position[0] == 7) {
            checker.transform();
        }

        if (checker.isQueen()) {
            $('#' + destiny).html('<div class="checker ' + color + '_checker ' + extra_classes + '"></div>');
        } else {
            $('#' + destiny).html('<div class="checker ' + color + '_checker"></div>');
        }

        if ($('.available_position').length == 0) {
            this.changeTurn();
            this.isMultiKilling = false;
        } else {
            this.isMultiKilling = true;
        }
    }
    /**
     * 
     * @param {*} killedChecker 
     */
    killEnemyChecker(killedChecker) {
        $('#' + killedChecker.position).html('');
        killedChecker.kill();

        this.adjustPuntuation();

        this.isMultiKilling = false;

        if (this.blackPuntuation <= 0) {
            this.endGame(true);
        } else if (this.whitePuntuation <= 0) {
            this.endGame(false);
        }
    }
    /**
     * Calculate origin position
     * @param {*} checker 
     * @param {*} keepKilling 
     */
    loadMovements(checker, keepKilling = false) {

        if (!this.isMultiKilling) {
            var positions = checker.position.split('-');
            var X = '';
            var Y = '';

            if (checker.isQueen()) {
                X = [parseInt(positions[0]) - 1, parseInt(positions[0]) + 1];
                Y = [parseInt(positions[1]) - 1, parseInt(positions[1]) + 1];

                for (var c = 0; c < 2; c++) {
                    for (var i = 0; i < 2; i++) {
                        var filled = this.checkFilledRow(X[c] + '-' + Y[i]);

                        if (!filled && !keepKilling) {
                            this.initializeMovement(X[c], Y[i], checker);
                        } else {
                            if (filled && filled.color != checker.color) {
                                this.checkIfCanKill(checker, filled);
                            }
                        }
                    }
                }
            } else {
                if (checker.color) {
                    X = parseInt(positions[0]) - 1;
                    Y = [parseInt(positions[1]) - 1, parseInt(positions[1]) + 1];
                } else {
                    X = parseInt(positions[0]) + 1;
                    Y = [parseInt(positions[1]) + 1, parseInt(positions[1]) - 1];
                }

                for (var i = 0; i < 2; i++) {
                    var filled = this.checkFilledRow(X + '-' + Y[i]);

                    if (!filled && !keepKilling) {
                        this.initializeMovement(X, Y[i], checker);
                    } else {
                        if (filled && filled.color != checker.color) {
                            this.checkIfCanKill(checker, filled);
                        }
                    }
                }
            }
        }
    }
}