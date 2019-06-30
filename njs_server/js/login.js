$(document).ready(function () {

    // SPANOVI ZA PORUKU AKO EMAIL/PIN/PASSWORD NE ODGOVARAJU ZAHTEVIMA

    let emailCheck = false;
    let pinCheck = false;
    let passwordCheck = false;
    
    let email = '';
    let pin = '';
    let pass = '';
    let token = localStorage.getItem("token");

    if (token) {
        location.assign("home.html");
    }

    $("#email").blur(function () {
        email = $('#email').val();
        const mailREG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (mailREG.test(email)) {
            $("#checkEmail").text('')
            emailCheck = true;
        } else {
            $("#checkEmail").text('Neispravan unos email adrese!')
        }
    });

    $("#pin").blur(function () {
        pin = $('#pin').val();

        if (pin.length >= 4 && pin.length <= 8) {
            $("#checkPin").text('')
            return pinCheck = true;
        } else {
            $("#checkPin").text('Neispravan unos pina!')
        }
    });

    $("#password").blur(function () {
        pass = $('#password').val();

        if (pass.length >= 8 && pass.length <= 32) {
            $("#checkPassword").text('')
            return passwordCheck = true;
        } else {
            $("#checkPassword").text('Neispravan unos Lozinke!')
        }
    });


    $('#submit').click(function () {
        if (!passwordCheck || !emailCheck || !pinCheck) {
            return;
        } else {
            login(email, pin, pass);
        }

    });

            //ovo radi i vraca token
     
    function login(email, pin, pass) {
        const data = {
            "email": email,
            "password": pass,
            "pin": pin
            };

        $.ajax({
            type: "POST",
            url: "https://reqres.in/api/login",
            data: data,
            success: function (result, status, xhr) {

                console.log(result);
                token = result.token;
                localStorage.setItem("token", token);
                location.assign("home.html");
            }
          });
    }



});



