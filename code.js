

$(document).ready(function() {
    $(".span").on('click', 'button', function() {
        $(this).next().slideToggle();

    });
});


var timesClicked = 0;

function btnClick(){
    timesClicked ++;

    document.getElementById('timesClicked').innerHTML = timesClicked;
    return true
}


// SHOPPING CART
// SHOPPING CART
// SHOPPING CART


/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 4.99;
var fadeTime = 300;



/* Assign actions */
$('.product-quantity input').change( function() {
    updateQuantity(this);
});

$('.product-removal button').click( function() {
    removeItem(this);
});

$('.product-reset button').click( function () {
    resetBody(this);
});

setShippingRate();

$('body').on( 'click', '.checkout', function() {
    $('.form-section').show(fadeTime);
});

$('body').on("click", "#submit", function(){                    // fick inte detta att funka som det ska. på grund av brist på tid kvar så skickar vi in projektet såhär
    $(".shopping-cart, .confirmation").toggle();
});

/*$('#submit button').click( function() {
    $('.shopping-cart').hide();
    $('.confirmation').show();
});*/


/* Set shipping rate */
function setShippingRate () {

    $('#home-delivery').on('click', function() {

        if ($(this).is(':checked')) {
            shippingRate = +$(this).val();
            $('#cart-shipping').text(shippingRate);
            recalculateCart();
        }
    });

    $('#express-delivery').on('click', function() {

        if ($(this).is(':checked')) {
            shippingRate = +$(this).val();
            $('#cart-shipping').text(shippingRate);
            recalculateCart();
        }
    });

    $('#pick-up').on('click', function() {

    if ($(this).is(':checked')) {
        shippingRate = +$(this).val();
        $('#cart-shipping').text(shippingRate);
        recalculateCart();
        }
    });
}

/* Recalculate cart */
function recalculateCart()
{
    var subtotal = 0;

    /* Sum up row totals */
    $('.product').each(function () {

        subtotal += +$(this).find('.product-line-price').text();
    });

    /* Calculate totals */
    var tax = subtotal * taxRate;
    var shipping = (subtotal > 0 ? shippingRate : 0);
    var total = subtotal + tax + shipping;

    /* Update totals display */
    $('.totals-value').fadeOut(fadeTime, function() {
        $('#cart-subtotal').html(subtotal.toFixed(2));
        $('#cart-tax').html(tax.toFixed(2));
        $('#cart-shipping').html(shippingRate.toFixed(2));
        $('#cart-total').html(total.toFixed(2));
        if(total == 0){
            $('.checkout').fadeOut(fadeTime);
        }else{
            $('.checkout').fadeIn(fadeTime);
        }
        $('.totals-value').fadeIn(fadeTime);
    });
}


/* Update quantity */
function updateQuantity(quantityInput)
{
    /* Calculate line price */
    var productRow = $(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.product-price').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;

    /* Update line price display and recalc cart totals */
    productRow.children('.product-line-price').each(function () {
        $(this).fadeOut(fadeTime, function() {
            $(this).text(linePrice.toFixed(2));
            recalculateCart();
            $(this).fadeIn(fadeTime);
        });
    });
}


var helaBody = $('body') .clone();

/* Remove item from cart */
function removeItem(removeButton)
{
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function() {
        productRow.remove();
        recalculateCart();
    });

}



function resetBody(resetButton) {

    var productRow = $(resetButton).parent().parent();
    productRow.slideDown(fadeTime, function () {
        $('body').replaceWith(helaBody) ;
        recalculateCart();
    });

}

/*POP-UP*/
/*POP-UP*/
/*POP-UP*/
//----- OPEN
$('[data-popup-open]').on('click', function(e)  {
    var targeted_popup_class = jQuery(this).attr('data-popup-open');
    $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

    e.preventDefault();
});

//----- CLOSE
$('[data-popup-close]').on('click', function(e)  {
    var targeted_popup_class = jQuery(this).attr('data-popup-close');
    $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

    e.preventDefault();
});