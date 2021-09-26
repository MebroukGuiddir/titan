/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

$(document).ready(function() {

    $('#registration').on('submit', function(e) {

        var first_name = $('#firstName').val();
        var last_name = $('#lastName').val();
        var email = $('#email').val();
        var accept = $('#accept').is(":checked");
        var isValid= true;
        $(".error").remove();

        if (first_name.length < 1) {
            $('#firstName').after('<span class="error">This field is required</span>');
            isValid=false;
        }
        if (last_name.length < 1) {
            $('#lastName').after('<span class="error">This field is required</span>');
            isValid=false;
        }
        if (email.length < 1) {
            $('#email').after('<span class="error">This field is required</span>');
            isValid=false;
        } else {
            var regEx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
            var validEmail = regEx.test(email);
            if (!validEmail) {
                $('#email').after('<span class="error">Enter a valid email</span>');
                isValid=false;
            }
        }
        console.log(accept);
        if ( isValid && !accept) {
            $('.checkbox-group label').after('<span class="error">Please accept the terms</span>');
            isValid=false;
        }
        if(!isValid){
            e.preventDefault();
        }
    });

});