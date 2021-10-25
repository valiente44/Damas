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
        $('#player1_name').html(this.player1);
        $('#player2_name').html(this.player2);
        $('#blackPuntuation').html(this.blackPuntuation);
        $('#whitePuntuation').html(this.whitePuntuation);
    }
     
    initializeBoard() {
        this.board.initializeBoard();
    }

    getTurn() {
        return this.turn;
    }

    changeTurn() {
        this.turn = !this.turn;
        $('.activeTurn').removeClass('activeTurn');
        if(this.turn) {
            $('#whiteTurn').addClass('activeTurn');
        } else {
            $('#blackTurn').addClass('activeTurn');
        }
    }

    removeAvailablePositions() {
        //Remove all the available positions
        $('.available_position').off('click');
        $('.available_position').removeClass('available_position');
    }

    highlightAvailablePositions(isWhite, position, checkerArray) {
        this.removeAvailablePositions();

        //Calculate origin position
        var positions = position.split('-');
        var X = '';
        var Y = '';

        if(isWhite) {
            X = parseInt(positions[0]) - 1;
            Y = [parseInt(positions[1]) - 1, parseInt(positions[1]) + 1];
        } else {
            X = parseInt(positions[0]) + 1;
            Y = [parseInt(positions[1]) + 1, parseInt(positions[1]) - 1];
        }

        for(var i = 0; i < 2; i++) {
            if(!checkerArray.some(el => el.position == X + '-' + Y[i])) {
            console.log(X + '-' + Y[i]);
                $('#' + X + '-' + Y[i]).addClass('available_position');
                this.allowMovement(X, Y[i], position, checkerArray);
            }
        }
    }

    allowMovement(X, Y, position, checkerArray) {
        var outside = this;

        $('#' + X + '-' + Y).click(function() {
            outside.makeMovement(position, X + '-' + Y, checkerArray);
        });
    }

    makeMovement(origin, destiny, checkerArray) {
        this.removeAvailablePositions();
        
        var index = checkerArray.findIndex(el => el.position == origin);
        checkerArray[index].position = destiny;

        $('#' + origin).html(''); 
        $('#' + destiny).html('<div class="checker white_checker"></div>'); 

        this.changeTurn();
    }
}
