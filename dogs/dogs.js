var indeksSlike = 1;

function prethodna() {
    if (indeksSlike == 1) {
        indeksSlike = 7;
    } else {
        indeksSlike--;
    }
    document.getElementById('dog').src = 'images/dog0' + indeksSlike + '.jpg';
}

function sledeca() {
    if (indeksSlike == 7) {
        indeksSlike = 1;
    } else {
        indeksSlike++;
    }
    document.getElementById('dog').src = 'images/dog0' + indeksSlike + '.jpg';
}
