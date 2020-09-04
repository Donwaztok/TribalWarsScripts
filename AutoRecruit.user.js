// ==UserScript==
// @name         Auto Recruit
// @version      1.0
// @description  Mantém a fila de recrutamento cheia no TribalWars
// @author       Igor Martins
// @include     https://*&screen=train*
// @include     https://*&screen=barracks*
// @include     https://*&screen=stable*
// @include     https://*&screen=garage*
// ==/UserScript==

// ======== CONFIGURAÇÃO ========
var verificarTropas = minAleatorio(0.5, 1); // Min
var recarregarPagina = minAleatorio(40, 120); // Min

// Adicione o id das suas vilas (Encontradas na URL /game.php?village=<****>&screen=overview) separados por virgula ["0001", "0002"]
var ataque = ["9837","16353"];
var defesa = ["9901","1625","337"];

// Adicionar a quantidade de tropas deseja para unidade e o tipo da aldeia
// 0 significa que a tropa não será recrutada
// 1 ou mais significa que a tropa será recrutada na quantidade selecionada
var objetoTropas = [];
function geraTropas() {
    objetoTropas = [
        { nomeUnidade: "spear", recrutarAtt: 0, recrutarDef: 10, cssClassSelector: classEnum.lanca },
        { nomeUnidade: "sword", recrutarAtt: 0, recrutarDef: 10, cssClassSelector: classEnum.espada },
        { nomeUnidade: "axe", recrutarAtt: 10, recrutarDef: 0, cssClassSelector: classEnum.barbaro },
        { nomeUnidade: "archer", recrutarAtt: 0, recrutarDef: 5, cssClassSelector: classEnum.arqueiro },
        { nomeUnidade: "spy", recrutarAtt: 1, recrutarDef: 0, cssClassSelector: classEnum.explorador },
        { nomeUnidade: "light", recrutarAtt: 5, recrutarDef: 0, cssClassSelector: classEnum.cavalariaLeve },
        { nomeUnidade: "marcher", recrutarAtt: 0, recrutarDef: 0, cssClassSelector: classEnum.cavalariaArco },
        { nomeUnidade: "heavy", recrutarAtt: 0, recrutarDef: 0, cssClassSelector: classEnum.cavalariaPesada },
        { nomeUnidade: "ram", recrutarAtt: 0, recrutarDef: 0, cssClassSelector: classEnum.ariete },
        { nomeUnidade: "catapult", recrutarAtt: 0, recrutarDef: 0, cssClassSelector: classEnum.catapulta }
    ];
}
// ======== CONFIGURAÇÃO ========

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
    if (ataque.includes(village)) {
        console.log("Verificando Tropas [" + village + "] - Ataque");
        tipoVillage = "Ataque";
    } else if (defesa.includes(village)) {
        console.log("Verificando Tropas [" + village + "] - Defesa");
        tipoVillage = "Defesa";
    } else {
        console.log("[" + village + "] - Aldeia não configurada. Não recrutando!");
    }

    var retorno = false;
    objetoTropas.forEach(element => {
        var response = validarPreencher(element, tipoVillage);
        if (!retorno) {
            retorno = response;
        }
    });

    if (retorno) {
        $(".btn-recruit").click();
    }
}, verificarTropas));

function validarPreencher(singleObject, village) {
    if ("Ataque" == (village)) {
        if (singleObject.recrutarAtt > 0) {
            if ($(singleObject.cssClassSelector).length <= 1) {
                $("input[name=" + singleObject.nomeUnidade + "]").val(singleObject.recrutarAtt);
                return true;
            }
        }
    } else if ("Defesa" == (village)) {
        if (singleObject.recrutarDef > 0) {
            if ($(singleObject.cssClassSelector).length <= 1) {
                $("input[name=" + singleObject.nomeUnidade + "]").val(singleObject.recrutarDef);
                return true;
            }
        }
    }
    return false;
}

function minAleatorio(inferior, superior) {
    var numPosibilidades = (superior * 60 * 1000) - (inferior * 60 * 1000);
    var aleat = Math.random() * numPosibilidades;
    return Math.round(parseInt(inferior * 60 * 1000) + aleat);
}

geraTropas();
console.log("Verificando tropas a cada " + (verificarTropas / 1000 / 60).toFixed(2) + " min.");
console.log("Recarregar Pagina em: " + (recarregarPagina / 1000 / 60).toFixed(2) + " min.");
setInterval(function () { location.reload(true); }, recarregarPagina);