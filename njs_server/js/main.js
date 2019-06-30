$(document).ready(function () {

    let token = localStorage.getItem("token");
    let payments = [];
    let dateOfBirthSortingOrder;

    if (!token) {
        location.assign("/");
        return;
    }

    alert('Uspesno ste ulogovani!');

    getPayments();

    function getPayments() {
        $.ajax({
            url: 'http://localhost:8080/MOCK_DATA.json',
            type: 'GET',
            data: {},
            success: function (result, status, xhr) {
                payments = result;
                printPayments();
            },
            error: function () {
                handleError('Error during reading payments from server');
            }
        });
    }

    function printPayments() {
        console.log(payments);
        $('#payments tbody').empty();

        for (let i = 0; i < payments.length; i++) {
            let id = payments[i].id;
            let firstName = payments[i].first_name;
            let lastName = payments[i].last_name;
            let address = payments[i].address;
            let dateOfBirth = payments[i].date_of_birth;
            let payment = payments[i].payment;

            $('#payments tbody').append(`<tr id="payment${id}"></tr>`);
            $('#payment' + id)
                .append(`<td>${id}</td>
                                <td>${firstName}</td>
                                <td>${lastName}</td>
                                <td>${address}</td>
                                <td>${dateOfBirth}</td>
                                <td>${payment}</td>`);
        }

        $('#payments').show();
    }

    $('#date-of-birth').click(function () {
        if (!dateOfBirthSortingOrder || dateOfBirthSortingOrder === 'DESC') {
            dateOfBirthSortingOrder = "ASC";
            payments.sort(function (p1, p2) {
                let dateArray = p1.date_of_birth.split('/');
                let day1 = parseInt(dateArray[0]);
                let month1 = parseInt(dateArray[1]);
                let year1 = parseInt(dateArray[2]);
                let d1 = new Date(year1, month1 - 1, day1);
                let dateArray2 = p2.date_of_birth.split('/');
                let day2 = parseInt(dateArray2[0]);
                let month2 = parseInt(dateArray2[1]);
                let year2 = parseInt(dateArray2[2]);
                let d2 = new Date(year2, month2 - 1, day2);
                return d1.getTime() - d2.getTime();
            });
        } else {
            dateOfBirthSortingOrder = "DESC";
            payments.sort(function (p1, p2) {
                let dateArray = p1.date_of_birth.split('/');
                let day1 = parseInt(dateArray[0]);
                let month1 = parseInt(dateArray[1]);
                let year1 = parseInt(dateArray[2]);
                let d1 = new Date(year1, month1 - 1, day1);
                let dateArray2 = p2.date_of_birth.split('/');
                let day2 = parseInt(dateArray2[0]);
                let month2 = parseInt(dateArray2[1]);
                let year2 = parseInt(dateArray2[2]);
                let d2 = new Date(year2, month2 - 1, day2);
                return d2.getTime() - d1.getTime();
            });
        }

        printPayments();
    });
});