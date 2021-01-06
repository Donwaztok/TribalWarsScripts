// ==UserScript==
// @name                Auto Scavenge
// @version             1.0
// @description 	    Script for AutoScavenge
// @author              Igor Martins
// @include             https://*/game.php?village=*&screen=place&mode=scavenge*
// ==/UserScript==

// ============== Config ==============
//var timeInScavenge = [400000,183000,91515,61015] // 23h
//var timeInScavenge = [360000,151450,75770,50490] // 22h
//var timeInScavenge = [273000,113789,56910,37920] // 15h
//var timeInScavenge = [255000,99900,50800, 34100] // 14h
//var timeInScavenge = [225000,84600,42800, 28240] // 12h
//var timeInScavenge = [200000,79000,39400, 26240] // 11h
//var timeInScavenge = [135000,54000,27000,18000] // 8h
//var timeInScavenge = [170000,68000,34000, 22660] // 10h
//var timeInScavenge = [85000,34000,17000, 11330] // 5h
var timeInScavenge = [17500, 7000, 3490, 2330] // 2h
//var timeInScavenge = [10000, 4000, 2000, 1330] // 1:30h
//var timeInScavenge = [4200, 1700, 870, 580] // 1:00h
//var timeInScavenge = [3000,1000,500, 430] // 5h

var reloadPage = 10; // 10 min

// Units to use
var spear = true;
var sword = true;
var axe = true;
var archer = true;
var light = false;
var marcher = true;
var heavy = true;
var knight = false;
// ============== Config ==============

var timeoutReload = 0;

var Lanceiro = 0;
var Espadachim = 1;
var Barbaro = 2;
var Arqueiro = 3;
var Cavalaria_leve = 4;
var Arqueiro_a_cavalo = 5;
var Cavalaria_pesada = 6;
var Paladino = 7;

var UNIT_INEX = 0;
var Final = 1;
var iniciar = 2;
var Capacidade_Armazem = 3;
var INPUT = 4;

var Unidades_Coletando = [
    [Lanceiro, "a.units-entry-all[data-unit='spear']", spear, 25, "input.unitsInput[name='spear']"],
    [Espadachim, "a.units-entry-all[data-unit='sword']", sword, 15, "input.unitsInput[name='sword']"],
    [Barbaro, "a.units-entry-all[data-unit='axe']", axe, 10, "input.unitsInput[name='axe']"],
    [Arqueiro, "a.units-entry-all[data-unit='archer']", archer, 10, "input.unitsInput[name='archer']"],
    [Cavalaria_leve, "a.units-entry-all[data-unit='light']", light, 80, "input.unitsInput[name='light']"],
    [Arqueiro_a_cavalo, "a.units-entry-all[data-unit='marcher']", marcher, 50, "input.unitsInput[name='marcher']"],
    [Cavalaria_pesada, "a.units-entry-all[data-unit='heavy']", heavy, 50, "input.unitsInput[name='heavy']"],
    [Paladino, "a.units-entry-all[data-unit='knight']", knight, 100, "input.unitsInput[name='knight']"],
];

function mecanismo_inteligencia(el) {
    try {
        return parseInt(el[0].innerText.replace("(", "").replace(")", ""))
    } catch (e) {
        return 0;
    }
}

var tabela = $(document).find(".candidate-squad-widget.vis").get()[0];

function calculadora(cap_index) {
    var unidades = []
    var aperte = []
    for (var u in Unidades_Coletando) {
        unidades.push(0)
        aperte.push(0)
    }

    for (var i = 0; i < Unidades_Coletando.length; i++) {
        if (Unidades_Coletando[i][iniciar]) {
            unidades[i] = mecanismo_inteligencia($(tabela).find(Unidades_Coletando[i][Final]).get())
        }
    }
    var coletar_recursos = timeInScavenge[cap_index]

    for (i = 0; i < unidades.length; i++) {
        if (unidades[i] != 0) {
            if (unidades[i] * Unidades_Coletando[i][Capacidade_Armazem] > coletar_recursos) {
                aperte[i] = Math.floor(coletar_recursos / Unidades_Coletando[i][Capacidade_Armazem])
                break;
            } else {
                aperte[i] = unidades[i];
                coletar_recursos -= Math.floor(unidades[i] * Unidades_Coletando[i][Capacidade_Armazem]);
            }
        }
    }
    return aperte;
}

function fill(aperte) {
    for (var i = 0; i < aperte.length; i++) {
        var el = $(tabela).find(Unidades_Coletando[i][INPUT])
        el.trigger('focus');
        el.trigger('keydown');
        el.val(aperte[i])
        el.trigger('keyup');
        el.trigger('change');
    }
}
var botao = $(document).find(".btn.btn-default.free_send_button").get();

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function pular_aldeia() {
    if ($(document).find("#village_switch_right").get()["0"]) {
        jQuery.event.trigger({ type: 'keydown', which: 68 });
    } else {
        timeoutReload++;
        if (timeoutReload == reloadPage) {
            location.reload();
            timeoutReload = 0;
        }
        setTimeout(pular_aldeia, 60000);
    }
}

sleep(10).then(() => {
    fill(calculadora(3));
    $(botao[3]).click();
}).then(sleep(3000).then(() => {
    fill(calculadora(2));
    $(botao[2]).click();
}).then(sleep(6000).then(() => {
    fill(calculadora(1));
    $(botao[1]).click();
}).then(sleep(9000).then(() => {
    fill(calculadora(0));
    $(botao[0]).click();
}).then())))


setTimeout(pular_aldeia, 60000);
