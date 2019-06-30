var start = document.getElementById('start');
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 'q', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var randomNumbers = shuffle();
var letter = document.getElementById('letter');

var hit = 0;
var missed = 0;
var left = 26;

function shuffle() {
    var o = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function getTimeout() {
    var level = document.querySelector('#control input[name="level"]:checked').value;

    if (level === 'easy') {
        return 5000;
    } else if (level === 'medium') {
        return 3500;
    } else {
        return 2000;
    }
}

function startGame() {
    var i = 0;
    start.innerHTML = 'Stop';
    var timeout = getTimeout();
    letter.focus();

    document.addEventListener('keypress', function(event) {
        if (left > 0) {
            letterTyped(event);
        }
    });

    document.addEventListener('keyup', function(event) {
        letter.value = '';
    });

    document.getElementById('number').innerHTML = '<b>' + randomNumbers[i] + '</b>';
    var timer = setTimeout(printAndWait, timeout);

    function printAndWait() {
        if (left !== 0) {
            document.getElementById('number').innerHTML = '<b>' + randomNumbers[++i] + '</b>';
            letter.value = '';
        } else {
            document.getElementById('number').innerHTML = 'Game Over';
        }
    }

    function letterTyped(event) {
        var typedLetter = event.key;

        if (typedLetter.toLowerCase() === alphabet[randomNumbers[i] - 1]) {
            hit++;
            left--;
        } else {
            missed++;
            left--;
        }

        printScore();

        clearTimeout(timer);
        printAndWait();
        timer = setTimeout(printAndWait, timeout);
    }
}

function printScore() {
    document.getElementById('hit').innerHTML = 'Hit: ' + hit;
    document.getElementById('miss').innerHTML = 'Miss: ' + missed;
    document.getElementById('left').innerHTML = 'Left: ' + left;
}

start.addEventListener('click', startGame);