// ==UserScript==
// @name                Auto Constructor
// @version             1.0
// @description         Automatic build for villages
// @author              Igor Martins
// @include             http*://*.*game.php?*screen=main*
// ==/UserScript==

/*##############################################
Based in
https://forum.tribalwars.com.br/index.php?threads/os-5-primeiros-dias-modo-novato.334845/#post-3677800
##############################################*/
const BuildMethods = {Ordered: 1, Resources: 2, Random: 3};

//*************************** Init Config ***************************//
// Time between actions (em milissegundos)
const minTime = 800;
const maxTime = 2500;
// Change the current village or reload page (in minutes)
const reloadPage = 10;
// move to new village?
const moveVillage = true;
// BuildMethods.Ordered: Build in order,
// BuildMethods.Resources: Build first with resources available,
// BuildMethods.Random: build in a random order,
const buildingMethod = BuildMethods.Ordered;
//*************************** End Config ***************************//

setInterval(function () {
    var text = "";
    var tr = $('[id="buildqueue"]').find('tr').eq(1);
    text = tr.find('td').eq(1).find('span').eq(0).text().split(" ").join("").split("\n").join("");
    var timeSplit = text.split(':');

    if (timeSplit[0] * 60 * 60 + timeSplit[1] * 60 + timeSplit[2] * 1 < 3 * 60) {
        console.log("Completar Grátis");
        tr.find('td').eq(2).find('a').eq(2).click();
    }
    // Finish Missions
    $('[class="btn btn-confirm-yes status-btn quest-complete-btn"]').click();
}, 1000);

let delay = Math.floor(Math.random() * (maxTime - minTime) + minTime);
setInterval(function () {
    if (document.getElementById("buildqueue") == null || document.getElementById("buildqueue").rows.length < 7) {
        let nextBuilding = GetNextBuilding();
        if (nextBuilding !== undefined) {
            nextBuilding.click();
            console.log("Clicked on " + nextBuilding.id);
        }
    }
}, delay);

function GetNextBuilding() {
    let buttons = document.getElementsByClassName("btn btn-build");
    let buildingsList = GetNextBuildingList();
    let nextBuildingButton;
    while (nextBuildingButton === undefined && buildingsList.length > 0) {
        var next = buildingsList.shift();
        if (buttons.hasOwnProperty(next)) {
            let nextBuilding = document.getElementById(next);
            var enabled = nextBuilding.offsetWidth > 0 || nextBuilding.offsetHeight > 0;
            if (enabled) {
                nextBuildingButton = nextBuilding;
            }
            if (buildingMethod == BuildMethods.Ordered) {
                break;
            }
        }
    }
    return nextBuildingButton;
}

function NextVillage() {
    if ($(document).find("#village_switch_right").get()["0"] && moveVillage) {
        jQuery.event.trigger({ type: 'keydown', which: 68 });
    } else {
        location.reload();
    }
}
setTimeout(NextVillage, 60000 * reloadPage);

function GetNextBuildingList() {
    var buildingList = [];
    buildingList.push("main_buildlink_wood_1");
    buildingList.push("main_buildlink_stone_1");
    buildingList.push("main_buildlink_iron_1");
    buildingList.push("main_buildlink_wood_2");
    buildingList.push("main_buildlink_stone_2");
    buildingList.push("main_buildlink_main_2");
    buildingList.push("main_buildlink_main_3");
    buildingList.push("main_buildlink_barracks_1");
    buildingList.push("main_buildlink_wood_3");
    buildingList.push("main_buildlink_stone_3");
    buildingList.push("main_buildlink_barracks_2");
    buildingList.push("main_buildlink_storage_2");
    buildingList.push("main_buildlink_iron_2");
    buildingList.push("main_buildlink_storage_3");
    buildingList.push("main_buildlink_barracks_3");
    buildingList.push("main_buildlink_statue_1");
    buildingList.push("main_buildlink_farm_2");
    buildingList.push("main_buildlink_iron_3");
    buildingList.push("main_buildlink_main_4");
    buildingList.push("main_buildlink_main_5");
    buildingList.push("main_buildlink_storage_4");
    buildingList.push("main_buildlink_smith_1");
    buildingList.push("main_buildlink_wood_4");
    buildingList.push("main_buildlink_stone_4");
    buildingList.push("main_buildlink_wall_1");
    buildingList.push("main_buildlink_hide_2");
    buildingList.push("main_buildlink_hide_3");
    buildingList.push("main_buildlink_wood_5");
    buildingList.push("main_buildlink_stone_5");
    buildingList.push("main_buildlink_storage_5");
    buildingList.push("main_buildlink_market_1");
    buildingList.push("main_buildlink_wood_6");
    buildingList.push("main_buildlink_stone_6");
    buildingList.push("main_buildlink_wood_7");
    buildingList.push("main_buildlink_stone_7");
    buildingList.push("main_buildlink_iron_4");
    buildingList.push("main_buildlink_iron_5");
    buildingList.push("main_buildlink_iron_6");
    buildingList.push("main_buildlink_storage_6");
    buildingList.push("main_buildlink_wood_8");
    buildingList.push("main_buildlink_stone_8");
    buildingList.push("main_buildlink_iron_7");
    buildingList.push("main_buildlink_wood_9");
    buildingList.push("main_buildlink_stone_9");
    buildingList.push("main_buildlink_wood_10");
    buildingList.push("main_buildlink_stone_10");
    buildingList.push("main_buildlink_wood_11");
    buildingList.push("main_buildlink_stone_11");
    buildingList.push("main_buildlink_wood_12");
    buildingList.push("main_buildlink_stone_12");
    buildingList.push("main_buildlink_storage_7");
    buildingList.push("main_buildlink_iron_8");
    buildingList.push("main_buildlink_storage_8");
    buildingList.push("main_buildlink_iron_9");
    buildingList.push("main_buildlink_iron_10");
    buildingList.push("main_buildlink_wood_13");
    buildingList.push("main_buildlink_stone_13");
    buildingList.push("main_buildlink_iron_11");
    buildingList.push("main_buildlink_storage_9");
    buildingList.push("main_buildlink_storage_10");
    buildingList.push("main_buildlink_farm_3");
    buildingList.push("main_buildlink_farm_4");
    buildingList.push("main_buildlink_farm_5");
    buildingList.push("main_buildlink_iron_12");
    buildingList.push("main_buildlink_main_6");
    buildingList.push("main_buildlink_main_7");
    buildingList.push("main_buildlink_barracks_4");
    buildingList.push("main_buildlink_barracks_5");
    buildingList.push("main_buildlink_farm_6");
    buildingList.push("main_buildlink_farm_7");
    buildingList.push("main_buildlink_wall_2");
    buildingList.push("main_buildlink_wall_3");
    buildingList.push("main_buildlink_wall_4");
    buildingList.push("main_buildlink_wall_5");
    buildingList.push("main_buildlink_iron_13");
    buildingList.push("main_buildlink_iron_14");
    buildingList.push("main_buildlink_farm_8");
    buildingList.push("main_buildlink_farm_9");
    buildingList.push("main_buildlink_smith_2");
    buildingList.push("main_buildlink_smith_3");
    buildingList.push("main_buildlink_smith_4");
    buildingList.push("main_buildlink_smith_5");
    buildingList.push("main_buildlink_market_2");
    buildingList.push("main_buildlink_market_3");
    buildingList.push("main_buildlink_main_8");
    buildingList.push("main_buildlink_main_9");
    buildingList.push("main_buildlink_main_10");
    buildingList.push("main_buildlink_stable_1");
    buildingList.push("main_buildlink_stable_2");
    buildingList.push("main_buildlink_stable_3");
    buildingList.push("main_buildlink_storage_11");
    buildingList.push("main_buildlink_farm_10");
    buildingList.push("main_buildlink_farm_11");
    buildingList.push("main_buildlink_farm_12");
    buildingList.push("main_buildlink_storage_12");
    buildingList.push("main_buildlink_wood_14");
    buildingList.push("main_buildlink_stone_14");
    buildingList.push("main_buildlink_wood_15");
    buildingList.push("main_buildlink_stone_15");
    buildingList.push("main_buildlink_storage_13");
    buildingList.push("main_buildlink_main_11");
    buildingList.push("main_buildlink_wall_6");
    buildingList.push("main_buildlink_wall_7");
    buildingList.push("main_buildlink_wall_8");
    buildingList.push("main_buildlink_wall_9");
    buildingList.push("main_buildlink_storage_14");
    buildingList.push("main_buildlink_barracks_6");
    buildingList.push("main_buildlink_barracks_7");
    buildingList.push("main_buildlink_barracks_8");
    buildingList.push("main_buildlink_barracks_9");
    buildingList.push("main_buildlink_storage_15");
    buildingList.push("main_buildlink_farm_13");
    buildingList.push("main_buildlink_smith_6");
    buildingList.push("main_buildlink_smith_7");
    buildingList.push("main_buildlink_smith_8");
    buildingList.push("main_buildlink_main_12");
    buildingList.push("main_buildlink_storage_16");
    buildingList.push("main_buildlink_storage_17");
    buildingList.push("main_buildlink_main_13");
    buildingList.push("main_buildlink_farm_14");
    buildingList.push("main_buildlink_market_4");
    buildingList.push("main_buildlink_market_5");
    buildingList.push("main_buildlink_market_6");
    buildingList.push("main_buildlink_main_14");
    buildingList.push("main_buildlink_wood_16");
    buildingList.push("main_buildlink_stone_16");
    buildingList.push("main_buildlink_main_15");
    buildingList.push("main_buildlink_wood_17");
    buildingList.push("main_buildlink_stone_17");
    buildingList.push("main_buildlink_main_16");
    buildingList.push("main_buildlink_barracks_10");
    buildingList.push("main_buildlink_smith_9");
    buildingList.push("main_buildlink_smith_10");
    buildingList.push("main_buildlink_garage_1");
    buildingList.push("main_buildlink_garage_2");
    buildingList.push("main_buildlink_garage_3");
    buildingList.push("main_buildlink_stable_4");
    buildingList.push("main_buildlink_stable_5");
    buildingList.push("main_buildlink_stable_6");
    buildingList.push("main_buildlink_stable_7");
    buildingList.push("main_buildlink_farm_15");
    buildingList.push("main_buildlink_storage_18");
    buildingList.push("main_buildlink_storage_19");
    buildingList.push("main_buildlink_farm_16");
    buildingList.push("main_buildlink_barracks_11");
    buildingList.push("main_buildlink_barracks_12");
    buildingList.push("main_buildlink_farm_17");
    buildingList.push("main_buildlink_iron_15");
    buildingList.push("main_buildlink_iron_16");
    buildingList.push("main_buildlink_wall_10");
    buildingList.push("main_buildlink_smith_11");
    buildingList.push("main_buildlink_wall_11");
    buildingList.push("main_buildlink_farm_18");
    buildingList.push("main_buildlink_wall_12");
    buildingList.push("main_buildlink_farm_19");
    buildingList.push("main_buildlink_market_7");
    buildingList.push("main_buildlink_market_8");
    buildingList.push("main_buildlink_market_9");
    buildingList.push("main_buildlink_smith_12");
    buildingList.push("main_buildlink_market_10");
    buildingList.push("main_buildlink_farm_20");
    buildingList.push("main_buildlink_wood_18");
    buildingList.push("main_buildlink_stone_18");
    buildingList.push("main_buildlink_smith_13");
    buildingList.push("main_buildlink_wood_19");
    buildingList.push("main_buildlink_stone_19");
    buildingList.push("main_buildlink_smith_14");
    buildingList.push("main_buildlink_wall_13");
    buildingList.push("main_buildlink_iron_16");
    buildingList.push("main_buildlink_iron_17");
    buildingList.push("main_buildlink_smith_15");
    buildingList.push("main_buildlink_main_17");
    buildingList.push("main_buildlink_main_18");
    buildingList.push("main_buildlink_main_19");
    buildingList.push("main_buildlink_main_20");
    buildingList.push("main_buildlink_farm_21");
    buildingList.push("main_buildlink_storage_20");
    buildingList.push("main_buildlink_storage_21");
    buildingList.push("main_buildlink_storage_22");
    buildingList.push("main_buildlink_storage_23");
    buildingList.push("main_buildlink_wood_20");
    buildingList.push("main_buildlink_farm_22");
    buildingList.push("main_buildlink_stone_20");
    buildingList.push("main_buildlink_smith_16");
    buildingList.push("main_buildlink_smith_17");
    buildingList.push("main_buildlink_smith_18");
    buildingList.push("main_buildlink_smith_19");
    buildingList.push("main_buildlink_smith_20");
    buildingList.push("main_buildlink_snob_1");
    buildingList.push("main_buildlink_farm_23");
    buildingList.push("main_buildlink_iron_18");
    buildingList.push("main_buildlink_wood_21");
    buildingList.push("main_buildlink_stone_21");
    buildingList.push("main_buildlink_barracks_13");
    buildingList.push("main_buildlink_barracks_14");
    buildingList.push("main_buildlink_garage_4");
    buildingList.push("main_buildlink_stable_8");
    buildingList.push("main_buildlink_garage_5");
    buildingList.push("main_buildlink_stable_9");
    buildingList.push("main_buildlink_wall_14");
    buildingList.push("main_buildlink_wall_15");
    buildingList.push("main_buildlink_storage_24");
    buildingList.push("main_buildlink_farm_24");
    buildingList.push("main_buildlink_iron_19");
    buildingList.push("main_buildlink_wood_21");
    buildingList.push("main_buildlink_stone_21");
    buildingList.push("main_buildlink_wood_22");
    buildingList.push("main_buildlink_stone_22");
    buildingList.push("main_buildlink_farm_25");
    buildingList.push("main_buildlink_storage_25");
    buildingList.push("main_buildlink_wood_23");
    buildingList.push("main_buildlink_stone_23");
    buildingList.push("main_buildlink_iron_20");
    buildingList.push("main_buildlink_iron_21");
    buildingList.push("main_buildlink_iron_22");
    buildingList.push("main_buildlink_stable_10");
    buildingList.push("main_buildlink_stable_11");
    buildingList.push("main_buildlink_barracks_15");
    buildingList.push("main_buildlink_barracks_16");
    buildingList.push("main_buildlink_wood_24");
    buildingList.push("main_buildlink_stone_24");
    buildingList.push("main_buildlink_iron_23");
    buildingList.push("main_buildlink_wood_25");
    buildingList.push("main_buildlink_stone_25");
    buildingList.push("main_buildlink_iron_24");
    buildingList.push("main_buildlink_wall_16");
    buildingList.push("main_buildlink_wall_17");
    buildingList.push("main_buildlink_wall_18");
    buildingList.push("main_buildlink_market_11");
    buildingList.push("main_buildlink_market_12");
    buildingList.push("main_buildlink_market_13");
    buildingList.push("main_buildlink_market_14");
    buildingList.push("main_buildlink_storage_26");
    buildingList.push("main_buildlink_wall_19");
    buildingList.push("main_buildlink_storage_27");
    buildingList.push("main_buildlink_storage_28");
    buildingList.push("main_buildlink_wall_20");
    buildingList.push("main_buildlink_wood_26");
    buildingList.push("main_buildlink_stone_26");
    buildingList.push("main_buildlink_iron_25");
    buildingList.push("main_buildlink_storage_29");
    buildingList.push("main_buildlink_storage_30");
    buildingList.push("main_buildlink_farm_26");
    buildingList.push("main_buildlink_farm_27");
    buildingList.push("main_buildlink_farm_28");
    buildingList.push("main_buildlink_farm_29");
    buildingList.push("main_buildlink_farm_30");
    buildingList.push("main_buildlink_stable_12");
    buildingList.push("main_buildlink_stable_13");
    buildingList.push("main_buildlink_stable_14");
    buildingList.push("main_buildlink_stable_15");
    buildingList.push("main_buildlink_barracks_17");
    buildingList.push("main_buildlink_barracks_18");
    buildingList.push("main_buildlink_barracks_19");
    buildingList.push("main_buildlink_barracks_20");
    buildingList.push("main_buildlink_wood_27");
    buildingList.push("main_buildlink_stone_27");
    buildingList.push("main_buildlink_iron_26");
    buildingList.push("main_buildlink_wood_28");
    buildingList.push("main_buildlink_stone_28");
    buildingList.push("main_buildlink_barracks_21");
    buildingList.push("main_buildlink_iron_27");
    buildingList.push("main_buildlink_wood_29");
    buildingList.push("main_buildlink_stone_29");
    buildingList.push("main_buildlink_barracks_22");
    buildingList.push("main_buildlink_iron_28");
    buildingList.push("main_buildlink_wood_30");
    buildingList.push("main_buildlink_stone_30");
    buildingList.push("main_buildlink_barracks_23");
    buildingList.push("main_buildlink_iron_29");
    buildingList.push("main_buildlink_iron_30");
    buildingList.push("main_buildlink_market_15");
    buildingList.push("main_buildlink_barracks_24");
    buildingList.push("main_buildlink_barracks_25");
    buildingList.push("main_buildlink_stable_16");
    buildingList.push("main_buildlink_stable_17");
    buildingList.push("main_buildlink_stable_18");
    buildingList.push("main_buildlink_stable_19");
    buildingList.push("main_buildlink_stable_20");
    buildingList.push("main_buildlink_market_16");
    buildingList.push("main_buildlink_market_17");
    //buildingList.push("main_buildlink_market_18");
    //buildingList.push("main_buildlink_market_19");
    //buildingList.push("main_buildlink_market_20");
    buildingList.push("main_buildlink_main_21");
    buildingList.push("main_buildlink_main_22");
    //buildingList.push("main_buildlink_main_23");
    //buildingList.push("main_buildlink_main_24");
    //buildingList.push("main_buildlink_main_25");
    //buildingList.push("main_buildlink_main_26");
    //buildingList.push("main_buildlink_main_27");
    //buildingList.push("main_buildlink_main_28");
    //buildingList.push("main_buildlink_main_29");
    //buildingList.push("main_buildlink_main_30");
    //buildingList.push("main_buildlink_market_21");
    //buildingList.push("main_buildlink_market_22");
    //buildingList.push("main_buildlink_hide_4");
    //buildingList.push("main_buildlink_market_23");
    //buildingList.push("main_buildlink_hide_5");
    //buildingList.push("main_buildlink_market_24");
    //buildingList.push("main_buildlink_market_25");
    //buildingList.push("main_buildlink_hide_6");
    //buildingList.push("main_buildlink_hide_7");
    //buildingList.push("main_buildlink_hide_8");
    //buildingList.push("main_buildlink_hide_9");
    //buildingList.push("main_buildlink_hide_10");
    buildingList.push("main_buildlink_garage_6");
    buildingList.push("main_buildlink_garage_7");
    buildingList.push("main_buildlink_garage_8");
    buildingList.push("main_buildlink_garage_9");
    buildingList.push("main_buildlink_garage_10");
    buildingList.push("main_buildlink_garage_11");
    buildingList.push("main_buildlink_garage_12");
    buildingList.push("main_buildlink_garage_13");
    buildingList.push("main_buildlink_garage_14");
    buildingList.push("main_buildlink_garage_15");

    if (buildingMethod == BuildMethods.Random) {
        for (let i = buildingList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [buildingList[i], buildingList[j]] = [buildingList[j], buildingList[i]];
        }
    }

    return buildingList;
}
