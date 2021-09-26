

const $ = require('jquery');
$( document ).ready(function() {
    console.log( "ready!" );
    $( "form" ).submit(function( event ) {
        console.log($( "lastName" ).first().val());
        if ( $( "lastName" ).first().val() === "correct" ) {
            $( "span" ).text( "Validated..." ).show();
            return;
        }
        if ( $( "firstName" ).first().val() === "correct" ) {
            $( "span" ).text( "Validated..." ).show();
            return;
        }
        if ( $( "email" ).first().val() === "correct" ) {
            $( "span" ).text( "Validated..." ).show();
            return;
        }
        if ( $( "accept" ).first().val() === "correct" ) {
            $( "span" ).text( "Validated..." ).show();
            return;
        }

        $( "span" ).text( "Not valid!" ).show().fadeOut( 1000 );
        event.preventDefault();
    });
});