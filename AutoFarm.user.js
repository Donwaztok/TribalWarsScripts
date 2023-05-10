// ==UserScript==
// @name        Auto Farm
// @version     1.0
// @description  Farma utilizando o Assistente de Saque
// @author       Igor Martins
// @include     http*://*.*game.php?*screen=am_farm*
// @require     https://code.jquery.com/jquery-2.2.4.min.js
// ==/UserScript==

// ===== Config =====
var reloadPage = 10; // 10 min

var usePresetA = true;
var usePresetB = true;
var usePresetC = false;
// ===== Config =====

function aleatorio(inferior, superior) {
    var numPosibilidades = superior - inferior;
    var aleat = Math.random() * numPosibilidades;
    return Math.round(parseInt(inferior) + aleat);
}

if(usePresetA){
    var menuA = $('#am_widget_Farm a.farm_icon_a');
    menuA.each(function (button){
        if(!menuA[button].classList.contains("farm_icon_disabled")){
            setTimeout(function (){
                menuA[button].click();
            }, (1000 * button) + aleatorio(200, 1000), this)
        }
    });
}

if(usePresetB){
    var menuB = $('#am_widget_Farm a.farm_icon_b');
    menuB.each(function (button){
        if(!menuB[button].classList.contains("farm_icon_disabled")){
            setTimeout(function (){
                menuB[button].click();
            }, (1000 * button) + aleatorio(200, 1000), this)
        }
    });
}

if(usePresetA){
    var menuC = $('#am_widget_Farm a.farm_icon_c');
    menuC.each(function (button){
        if(!menuC[button].classList.contains("farm_icon_disabled")){
            setTimeout(function (){
                menuC[button].click();
            }, (1000 * button) + aleatorio(200, 1000), this)
        }
    });
}

function pular_aldeia() {
    if ($(document).find("#village_switch_right").get()["0"]) {
        jQuery.event.trigger({ type: 'keydown', which: 68 });
    } else {
        location.reload();
    }
}
setTimeout(pular_aldeia, (60000 * reloadPage) + aleatorio(200, 60000));
