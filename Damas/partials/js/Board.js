class Board {
    /**
     * 
     * @param {*} game 
     */
    constructor(game) { // Create the constructor for the game
        this.white_cheekers = []; // Create the White Checkers Array
        this.black_cheekers = []; // Create the Black Checkers Array
        this.all_cheekers = []; // Create the Array of all checkers
        this.game = game; // Create the game variable
        this.removeEventListeners(); //
    }

    /**
     * Function to initialize the board
     * Fill the board whit squares and checkers
     * Swap the boolean variable called swap
     * Print on .html the variable board and call the initializeCheckers() function
     * @param  {null}
     * @return  {null}
     */
    initializeBoard() {
        $('#table').html('');
        var board = '';
        var swap = true;
        for (var fil = 0; fil < 8; fil++) {
            for (var col = 0; col < 8; col++) {
                if (swap) {
                    board += '<div class="square white_square" id="' + fil + '-' + col + '"></div>';
                } else {
                    if (fil >= 0 && fil < 3) {
                        board += '<div class="square black_square" id="' + fil + '-' + col + '"><div class="checker black_checker"></div></div>';
                        // fas fa-crown text-white d-flex align-items-center
                    } else if (fil >= 5 && fil < 9) {
                        board += '<div class="square black_square" id="' + fil + '-' + col + '"><div class="checker white_checker"></div></div>';
                        //fas fa-crown d-flex align-items-center
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

    /**
     * Check if the clicked cheeker match the current turn
     * Call the game method to highlight all available positions
     * @param {*} isWhite 
     * @param {*} checker 
     */
    showAvailablePositions(isWhite, checker) {

        if (this.game.checkTurn() == isWhite && this.game.isStarted()) {

            this.game.highlightAvailablePositions(checker);
        }
    }

    /**
    * Remove the listener for white Checkers
    * Remove the listener for black Checkers
    * @param  {null}
    * @return  {null}
    */
    removeEventListeners() {
        $(document).off('click', '.white_checker');
        $(document).off('click', '.black_checker');
    }

    /**
     * 
     * @param {*} position 
     * @returns the element has the same position as we passed it
     */
    rowFilled(position) {
        return this.all_cheekers.find(el => el.position == position)
    }

    /**
    * Initialize white checkers
    * Initialize black checkers
    * @param  {null}
    * @return  {null}
    */
    initializeCheckers() {
        var arrayWhiteCheckers = [];
        var arrayBlackCheckers = [];
        this.white_cheekers = [];
        this.black_cheekers = [];
        this.all_cheekers = [];

        var id = 1;
        var outside = this;


        $("#table .white_checker").each(function (e) {
            var checker = new Checker((id + '-w'), true, $(this).parent().attr('id'));
            arrayWhiteCheckers.push(checker);
            id++;
        });

        this.white_cheekers = arrayWhiteCheckers;

        $(document).on('click', '.white_checker', function () {
            var checker = outside.white_cheekers.find(el => el.position == $(this).parent().attr('id'));
            outside.showAvailablePositions(true, checker);
        });


        $("#table .black_checker").each(function (e) {
            var checker = new Checker((id + '-b'), false, $(this).parent().attr('id'));
            arrayBlackCheckers.push(checker);
            id++;
        });

        this.black_cheekers = arrayBlackCheckers;

        $(document).on('click', '.black_checker', function () {
            var checker = outside.black_cheekers.find(el => el.position == $(this).parent().attr('id'));
            outside.showAvailablePositions(false, checker);
        });

        this.all_cheekers = this.white_cheekers.concat(this.black_cheekers);
    }
}