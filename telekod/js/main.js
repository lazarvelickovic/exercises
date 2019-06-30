$(document).ready(function () {

    let token = localStorage.getItem("token");
    let payments = [];
    let dateOfBirthSortingOrder;
    let paymentSortingOrder;

    if (!token) {
        location.assign("/");
        return;
    }

    $("#myModal").modal("show");

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
        
        $('#payments tbody').empty();

        for (let i = 0; i < payments.length; i++) {
            let id = payments[i].id;
            let firstName = payments[i].first_name;
            let lastName = payments[i].last_name;
            let address = payments[i].address;
            let dateOfBirth = payments[i].date_of_birth;
            let payment = payments[i].payment;
            let numPayment = parseFloat(payment.split('€')[1]);

            $('#payments tbody').append(`<tr id="payment${id}"></tr>`);
            $('#payment' + id)
                .append(`<td>${id}</td>
                                <td>${firstName}</td>
                                <td>${lastName}</td>
                                <td data-type="address" contenteditable="false">${address}</td>
                                <td>${dateOfBirth}</td>
                                <td data-type="payment" contenteditable="false">${payment}</td>
                                `);
        }

        $('#payments tbody').append(`<tr>
                <td colspan="4"></td>
                <td><b>Total:</b></td>
                <td id="sum">€${countSum().toFixed(2).toString().replace('.', ',')}</td>
            </tr>
        `);


        $('#payments').show();
    }

    $('#date-of-birth').click(function () {

        $(".arrowBirth").toggleClass("down");

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





    $('#payment').click(function () {

        $(".arrowPayment").toggleClass("down");
        
        if (!paymentSortingOrder || paymentSortingOrder === 'DESC') {
            paymentSortingOrder = "ASC";
            payments.sort(function (p1, p2) {
                let d1 = p1.payment.split('€');
                let d2 = p2.payment.split('€');
                return parseFloat(d1[1]) - parseFloat(d2[1]);

            });
        } else {
            paymentSortingOrder = "DESC";
            payments.sort(function (p1, p2) {
                let d1 = p1.payment.split('€');
                let d2 = p2.payment.split('€');
                return parseFloat(d2[1]) - parseFloat(d1[1]);

            });
        }
        printPayments();
    });

    // search in table

    $("#search").keyup(function () {
        let value = this.value.toLowerCase().trim();
    
        $("table tr").each(function (index) {
            if (!index) return;
            $(this).find("td").each(function () {
                let id = $(this).text().toLowerCase().trim();
                let not_found = (id.indexOf(value) == -1);
                $(this).closest('tr').toggle(!not_found);
                return not_found;
            });
        });
    });

    // Contenteditable
    $('#payments').on('dblclick', '[contenteditable]', function(event) {
        // event.preventDefault(); 
        const target = $(event.target);
        const oldValue = target.text();
  
        target.attr('contenteditable', 'true')
              .empty()
              .append(`<input type="text">`)
        
        target.children().val(oldValue).focus();
        
        target.children().on('blur', function() {
          const newValue = target.children().val();
          const id = parseInt(target.parent().attr('id').slice(7));
          for (let i = 0; i < payments.length; i++) {
              if (payments[i].id === id) {
                  if (target.attr('data-type') === 'address') {
                    payments[i].address = newValue;
                  } else if (target.attr('data-type') === 'payment') {
                    payments[i].payment = newValue;
                    $('#sum').text(`€${countSum().toFixed(2).toString().replace('.', ',')}`)
                  }
              }
          }
          target.text(newValue);
          target.attr('contenteditable', 'false');
        });
      });

      function countSum() {
        let sum = 0;
        
        for (let i = 0; i < payments.length; i++) {
            let numPayment = parseFloat(payments[i].payment.split('€')[1].replace(',', '.'));
            sum += numPayment;
        }

        return sum;
    }
});