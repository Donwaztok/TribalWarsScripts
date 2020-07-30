// ==UserScript==
// @name                Captcha Clicker
// @version             1.0
// @description         Clica automatimente no verificador Captcha
// @author              Igor Martins
// @include             http*://*.*game.php*
// ==/UserScript==

(function () {
    'use strict';
    if (document.getElementsByClassName("recaptcha-checkbox-checkmark") !== undefined)
        setTimeout(function () {
            document.getElementsByClassName("recaptcha-checkbox-checkmark")[0].click();
        }, 5311);
})();