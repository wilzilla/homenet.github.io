jQuery(document).ready(function() {

    "use strict";

    /***********************************************
    Custom js here
    ************************************************/

    // sticky hover fix in iOS //
    (function(l){var i,s={touchend:function(){}};for(i in s)l.addEventListener(i,s)})(document);

    // Input group custom file customization //
    $(".input-group").each(function(){
        var $this = $(this),
            inputGroupFileInput = $this.find(".custom-file-input"),
            inputGroupFocusBg = $this.find(".input-focus-bg");

        inputGroupFileInput.blur(function() {
            inputGroupFocusBg.toggleClass("custom-file-focus-bg");
        });
    });

    $(".custom-file-input:disabled").parent(".custom-file").addClass("input-group-file-disabled");

    // Remove text "x" from close utility //
    $('.close > span').empty();

    // Info box hover settings //
    setTimeout(function(){
        $('.info-box-1').each(function(){
            var infoBoxOneBtn = $(this).find('.info-box-btn'),
                infoBoxOneBtnHeight = infoBoxOneBtn.height();

            infoBoxOneBtn.css("margin-bottom", -infoBoxOneBtnHeight);
        });
        $('.info-box-2').each(function(){
            var infoBoxTwoBtn = $(this).find('.info-box-btn'),
                infoBoxTwoBtnHeight = infoBoxTwoBtn.outerHeight();

            infoBoxTwoBtn.css("margin-bottom", -infoBoxTwoBtnHeight);
        });
        $('.info-box-3').each(function(){
            var infoBoxFourDesc = $(this).find('.info-box-desc'),
                infoBoxFourDescHeight = infoBoxFourDesc.height();

            infoBoxFourDesc.css("margin-bottom", -infoBoxFourDescHeight);
        });
    }, 400);

});