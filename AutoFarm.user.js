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
var moveVillage = false;

var usePresetA = true;
var usePresetB = false;
var usePresetC = false;
// ===== Config =====

function aleatorio(inferior, superior) {
    var numPosibilidades = superior - inferior;
    var aleat = Math.random() * numPosibilidades;
    return Math.round(parseInt(inferior) + aleat);
}

if(usePresetA){
    console.log("Farming: A Preset");
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
    setTimeout(function (){
        console.log("Farming: B Preset");
        var menuB = $('#am_widget_Farm a.farm_icon_b');
        menuB.each(function (button){
            if(!menuB[button].classList.contains("farm_icon_disabled")){
                setTimeout(function (){
                    menuB[button].click();
                }, (1000 * button) + aleatorio(200, 1000), this)
            }
        });
    }, aleatorio(20000, 30000));
}

if(usePresetC){
    setTimeout(function (){
        console.log("Farming: C Preset");
        var menuC = $('#am_widget_Farm a.farm_icon_c');
        menuC.each(function (button){
            if(!menuC[button].classList.contains("farm_icon_disabled")){
                setTimeout(function (){
                    menuC[button].click();
                }, (1000 * button) + aleatorio(200, 1000), this)
            }
        });
    }, aleatorio(50000, 60000));
}

function NextVillage() {
    if ($(document).find("#village_switch_right").get()["0"] && moveVillage) {
        jQuery.event.trigger({ type: 'keydown', which: 68 });
    } else {
        location.reload();
    }
}
setTimeout(NextVillage, (60000 * reloadPage) + aleatorio(200, 60000));
