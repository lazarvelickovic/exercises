//HTML elms
var unosBtn = document.getElementById("unos");
var prikazBtn = document.getElementById("prikaz")
var forma = document.getElementById("forma");
var sacBtn = document.getElementById("sac");
var dnevnik = document.getElementById("dnevnik");

var inputIme = document.getElementById("ime");
var inputMat = document.getElementById("mat");
var inputSrp = document.getElementById("srp");
var inputRac = document.getElementById("rac");

//array uceniic!!!!!!
var ucenici = [];

//EVENTS
var unosVecKliknut = false;
var prikazVecKliknut = false;
//event unos
unosBtn.addEventListener("click", function () {
    if (!unosVecKliknut) {
        unosVecKliknut = true;
        prikazVecKliknut = false;
        //prikazuje formu
        forma.classList.remove("hidden");
        //sakriva dnevnik
        dnevnik.classList.add("hidden");
    }
});
//event prikaz
prikazBtn.addEventListener("click", function () {
    if (!prikazVecKliknut) {
        unosVecKliknut = false;
        prikazVecKliknut = true;
        //sakrije formu
        forma.classList.add("hidden");
        //prikazuje dnevnik
        dnevnik.classList.remove("hidden");
    }
});

//prikupi podatke na sacuvaj btn i sacuvaj u ucenici array
forma.addEventListener("submit", function (event) {
    event.preventDefault();
    //pokupi podatke
    var imeIprezime = inputIme.value;
    var matis = inputMat.value;
    var srpski = inputSrp.value;
    var racun = inputRac.value;
    //ako je neki prazan
    if (!imeIprezime || imeIprezime == "" || !matis || matis == "" || !srpski || srpski == "" || !racun || racun == "") {
        alert("Molimo vas da unesete ispravne podatke!!!");
    } else {
        //ucenikov prosek
        var ucPros = parseFloat((parseInt(matis) + parseInt(srpski) + parseInt(racun)) / 3);
        ucPros = ucPros.toFixed(2);
        //smestamo u objekat
        var ucenik = {
            ime: imeIprezime,
            mat: matis,
            srp: srpski,
            rac: racun,
            prosek: ucPros
        };
        //append obj to array
        ucenici.push(ucenik);
        alert("Uspesno snimljen ucenik!");
        //isprazni unose
        inputIme.value = "";
        inputMat.value = "";
        inputSrp.value = "";
        inputRac.value = "";

        //sort table
        urediTabelu();
    }
});

//uredi tabelu
function urediTabelu() {
    var preuredjeniUcenici = ucenici.slice(0);

    preuredjeniUcenici.sort(function (a, b) {
        return b.prosek - a.prosek;
    });

    //kreiraj tabelu
    //occisti staru tabelu
    var tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    //upisi nove elemente
    preuredjeniUcenici.forEach(function (el) {
        //tr
        var tr = document.createElement("TR");
        //td /> .innerhtml -> el.name
        var td1 = document.createElement("TD");
        td1.innerHTML = el.ime;
        //td /> .innerhtml -> el.mat
        var td2 = document.createElement("TD");
        td2.innerHTML = el. mat;
        //td /> .innerhtml -> el.srp
        var td3 = document.createElement("TD");
        td3.innerHTML = el.srp;
        //td /> .innerhtml -> el.rac
        var td4 = document.createElement("TD");
        td4.innerHTML = el.rac;
        //td /> .innerhtml -> el.prosek
        var td5 = document.createElement("TD");
        td5.innerHTML = el.prosek;
        //tr => td
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        //tr => tbody
        tbody.appendChild(tr);

    });

}

