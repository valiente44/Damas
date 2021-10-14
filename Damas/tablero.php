<!DOCTYPE html>
<html lang="en">

<head>
    <?php include 'partials/head.html'; ?>
</head>

<body>
    <?php include 'partials/modals/modal-user.html'; ?>
    <div class="checker white_checker" style="display:none"> </div>
    <div class="checker black_checker" style="display:none"> </div>
    <div class="square" style="display: none" id="ht"> </div>

    <div class="black_background" id="black_background"> </div>
    <div class="score" id="score">
        <div class="table_game" id="table"></div>
    </div>
    <br>
    </div>
</body>

<?php include 'partials/js/scripts.js'; ?>

<script>
    $(function(){
        $("#usersModal").modal('show');
        initializeBoard();
    });

    function initializeBoard() {
        var board = '';
        var swap = true;
        for(var i = 0; i < 8; i++) {
            for(var f = 0; f < 8; f++) {
                if(swap) {
                    board += '<div class="square black_square"></div>';
                } else {
                    board += '<div class="square white_square"></div>';
                }
                swap = !swap;
            }
            swap = !swap;
        }

        $('#table').html(board);
    }
</script>

</html>