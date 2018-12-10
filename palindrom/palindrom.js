function checkIfPalindrom() {
    var originalText = document.getElementById('palindrom').value;
    var text = originalText.toLowerCase().replace(/ /g, '');

    if(text === text.split('').reverse().join('')) {
        alert(`String ${originalText} je palindrom!`);
    } else {
        alert(`String ${originalText} nije palindrom!`);
    }
}