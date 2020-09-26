// ==UserScript==
// @name         Auto Recruit
// @version      1.0
// @description  Queue troops
// @author       Igor Martins
// @include     https://*&screen=train*
// @include     https://*&screen=barracks*
// @include     https://*&screen=stable*
// @include     https://*&screen=garage*
// ==/UserScript==

// ======== Config ========
//Time to: (min time, max time (in minutes))
var verifyTroops = timeBetween(0.5, 1); // Min
var reloadPage = timeBetween(5, 10); // Min

// Add the ID of village (found in URL /game.php?village=<****>&screen=overview) separeted by "," e.g.: ["0001", "0002"]
var attack = ["9837", "16353", "9263"];
var defense = ["9901", "1625", "2639", "5794"];

// How many troops to add in queue
// 0 means that you dont want that troop
// 1+ means that troop will be added into queue the quantity selectec
var troops = [];
function createTroops() {
    troops = [
        { unitName: "spear", recruitAtt: 0, recruitDef: 300, cssClassSelector: classEnum.lanca },
        { unitName: "sword", recruitAtt: 0, recruitDef: 300, cssClassSelector: classEnum.espada },
        { unitName: "axe", recruitAtt: 300, recruitDef: 0, cssClassSelector: classEnum.barbaro },
        { unitName: "archer", recruitAtt: 0, recruitDef: 100, cssClassSelector: classEnum.arqueiro },
        { unitName: "spy", recruitAtt: 0, recruitDef: 0, cssClassSelector: classEnum.explorador },
        { unitName: "light", recruitAtt: 150, recruitDef: 0, cssClassSelector: classEnum.cavalariaLeve },
        { unitName: "marcher", recruitAtt: 0, recruitDef: 0, cssClassSelector: classEnum.cavalariaArco },
        { unitName: "heavy", recruitAtt: 0, recruitDef: 1, cssClassSelector: classEnum.cavalariaPesada },
        { unitName: "ram", recruitAtt: 0, recruitDef: 0, cssClassSelector: classEnum.ariete },
        { unitName: "catapult", recruitAtt: 0, recruitDef: 0, cssClassSelector: classEnum.catapulta }
    ];
}
// ======== Config ========

var classEnum = Object.freeze({
    lanca: ".unit_sprite_smaller.spear",
    espada: ".unit_sprite_smaller.sword",
    barbaro: ".unit_sprite_smaller.axe",
    arqueiro: ".unit_sprite_smaller.archer",
    explorador: ".unit_sprite_smaller.spy",
    cavalariaLeve: ".unit_sprite_smaller.light",
    cavalariaArco: ".unit_sprite_smaller.marcher",
    cavalariaPesada: ".unit_sprite_smaller.heavy",
    ariete: ".unit_sprite_smaller.ram",
    catapulta: ".unit_sprite_smaller.catapult"
});

$(document).ready(setInterval(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const village = urlParams.get('village')
    var tipoVillage;
    if (attack.includes(village)) {
        console.log("Verificando Tropas [" + village + "] - attack");
        tipoVillage = "attack";
    } else if (defense.includes(village)) {
        console.log("Verificando Tropas [" + village + "] - defense");
        tipoVillage = "defense";
    } else {
        console.log("[" + village + "] - Aldeia não configurada. Não recrutando!");
    }

    var retorno = false;
    troops.forEach(element => {
        var response = validarPreencher(element, tipoVillage);
        if (!retorno) {
            retorno = response;
        }
    });

    if (retorno) {
        $(".btn-recruit").click();
    }
}, verifyTroops));

function validarPreencher(singleObject, village) {
    if ("attack" == (village)) {
        if (singleObject.recruitAtt > 0) {
            if ($(singleObject.cssClassSelector).length <= 1) {
                $("input[name=" + singleObject.unitName + "]").val(singleObject.recruitAtt);
                return true;
            }
        }
    } else if ("defense" == (village)) {
        if (singleObject.recruitDef > 0) {
            if ($(singleObject.cssClassSelector).length <= 1) {
                $("input[name=" + singleObject.unitName + "]").val(singleObject.recruitDef);
                return true;
            }
        }
    }
    return false;
}

function timeBetween(inferior, superior) {
    var numPosibilidades = (superior * 60 * 1000) - (inferior * 60 * 1000);
    var aleat = Math.random() * numPosibilidades;
    return Math.round(parseInt(inferior * 60 * 1000) + aleat);
}

createTroops();
function pular_aldeia() {
    if ($(document).find("#village_switch_right").get()["0"]) {
        jQuery.event.trigger({ type: 'keydown', which: 68 });
    } else {
        location.reload();
    }
}
setTimeout(pular_aldeia, reloadPage);