var colors = ['yellow', 'orange', 'red', 'pink', 'blue', 'purple', 'aqua', 'green'];
var chosenNumbers = [];

document.getElementById('numbersTable').addEventListener('click', function (event) {
    if(event.target.localName === 'td' && chosenNumbers.length < 10) {
        var number = parseInt(event.target.id.substring(1));

        if(duplicatedNumber(number)) {
            return;
        }

        var numberColor;
        var chosenNumberHtml;
        if(number > 48) {
            if (chosenNumbers.length + 6 > 10) {
                return;
            }

            for (var i = 1; i < 48; i++) {
                if (i % colors.length === number % colors.lengths && !duplicatedNumber(i)) {
                    document.getElementById('n' + i).style.opacity = '0.5';
                    numberColor = colors[(number - 1) % colors.length];
                    chosenNumbers.push(i);
                    chosenNumberHtml = `<span class='${numberColor}'>${i} </span>`;
                    document.getElementById('output').innerHTML += chosenNumberHtml;
                }
            }
        } else {     
            document.getElementById('n' + number).style.opacity = '0.5';
            numberColor = colors[(number - 1) % colors.length];
            chosenNumbers.push(number);
            chosenNumberHtml = `<span class='${numberColor}'>${number} </span>`;
            document.getElementById('output').innerHTML += chosenNumberHtml;
        }
    }
});

function duplicatedNumber(number) {
    for(var i = 0; i < chosenNumbers.length; i++) {
        if(chosenNumbers[i] === number) {
            return true;
        }
    
        return false;
    }
}

function shuffle() {
    var o = [];
    for (var i = 1; i < 48; i++) {
        o.push(i);
    }

    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function random6() {
    reset();
    var o = shuffle();

    for (var i = 0; i < 6; i++) {
        var number = o[i];
        var numberColor = colors[(number - 1) % colors.length];
        var chosenNumberHtml = `<span class='${numberColor}'>${number} </span>`;
        document.getElementById('n' + i).style.opacity = '0.5';
        document.getElementById('output').innerHTML += chosenNumberHtml;
    }
}

document.getElementById('random6').addEventListener('click', random6);

function reset() {
    document.getElementById('output').innerHTML = '';
    chosenNumbers = [];
    for (var i = 1; i <= 48; i++) {
        document.getElementById('n' + i).style.opacity = '1';
    }
}

document.getElementById('reset').addEventListener('click', reset);