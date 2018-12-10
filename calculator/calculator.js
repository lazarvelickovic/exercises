
document.getElementById('btn1').addEventListener('click', function() {
    document.getElementById('result').value += '1';
});

document.getElementById('btn2').addEventListener('click', function() {
    document.getElementById('result').value += '2';
});

document.getElementById('btn3').addEventListener('click', function() {
    document.getElementById('result').value += '3';
});

document.getElementById('plus').addEventListener('click', function() {
    document.getElementById('result').value += '+';
});

document.getElementById('btn4').addEventListener('click', function() {
    document.getElementById('result').value += '4';
});

document.getElementById('btn5').addEventListener('click', function() {
    document.getElementById('result').value += '5';
});

document.getElementById('btn6').addEventListener('click', function() {
    document.getElementById('result').value += '6';
});

document.getElementById('minus').addEventListener('click', function() {
    document.getElementById('result').value += '-';
});

document.getElementById('btn7').addEventListener('click', function() {
    document.getElementById('result').value += '7';
});

document.getElementById('btn8').addEventListener('click', function() {
    document.getElementById('result').value += '8';
});

document.getElementById('btn9').addEventListener('click', function() {
    document.getElementById('result').value += '9';
});

document.getElementById('multiple').addEventListener('click', function() {
    document.getElementById('result').value += '*';
});

document.getElementById('btn0').addEventListener('click', function() {
    document.getElementById('result').value += '0';
});

document.getElementById('div').addEventListener('click', function() {
    document.getElementById('result').value += '/';
});


document.getElementById('btnc').addEventListener('click', function() {
    document.getElementById('result').value = '';
});

document.getElementById('equal').addEventListener('click', function() {
    document.getElementById('result').value = eval(document.getElementById('result').value);
});




