// ==UserScript==
// @name                Captcha Clicker
// @version             1.0
// @description         Clica automatimente no verificador Captcha
// @author              Igor Martins
// @include             http*://*.*game.php*
// @include      *
// @grant               GM_getResourceText
// @grant               GM_addStyle
// @grant               GM_getValue
// @grant               unsafeWindow
// ==/UserScript==

(function () {
    'use strict';
    setTimeout(function () {
        if (document.getElementsByClassName("recaptcha-checkbox-checkmark") !== undefined && document.getElementsByClassName("recaptcha-checkbox-checkmark")[0] !== undefined) {
            document.getElementsByClassName("recaptcha-checkbox-checkmark")[0].click();
        }
    }, 800);
})();