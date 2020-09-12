// ==UserScript==
// @name                Captcha Notifier
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
    Notification.requestPermission();
    setTimeout(function () {
        if (document.getElementsByClassName("recaptcha-checkbox-checkmark") !== undefined && document.getElementsByClassName("recaptcha-checkbox-checkmark")[0] !== undefined) {
            document.getElementsByClassName("recaptcha-checkbox-checkmark")[0].click();
            var n = new Notification('Porfavor resvola o Captcha');
            document.addEventListener('visibilitychange', function () {
                if (document.visibilityState === 'visible') {
                    n.close();
                }
            });
        }
    }, 800);
})();