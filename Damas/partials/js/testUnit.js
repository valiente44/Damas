import class Game{};
import class Checker{};
import class Board{};

var game = new Game("player1", "player2")
var checker = new Checker("piece, color, square = '0-0'")
var killedChecker = new Checker("piece, color, square = '0-0'")
game.makeMovement(checker, '4-2', killedChecker)