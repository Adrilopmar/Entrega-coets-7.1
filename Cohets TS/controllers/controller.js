"use strict";
var rock1 = document.getElementById('rocket'), littleRockets = [], hugeRockets = [], smallRocketSerial = 0, bigRocketSerial = 0, runner1 = document.getElementById('selectRunner0'), runner2 = document.getElementById('selectRunner1'), runner1Potency = 0, runner2Potency = 0, small, km = 0, mistakes = 0, selRun = document.getElementById('sel-runner'), rockName = document.getElementById('rocket-name'), showRockets = document.getElementById('show-rockets'), selectRunners = document.getElementById('selectRunners');
var smallRocket = /** @class */ (function () {
    function smallRocket(name) {
        this.propulsors = [10, 30, 80];
        this.nom = name;
        this.id = 'S' + smallRocketSerial;
    }
    return smallRocket;
}());
var bigRocket = /** @class */ (function () {
    function bigRocket(name) {
        this.propulsors = [30, 40, 50, 50, 30, 10];
        this.nom = name;
        this.id = 'B' + bigRocketSerial;
    }
    return bigRocket;
}());
function nextStep() {
    selRun.classList.add('d-none');
    rockName.classList.remove('d-none');
    selectRunners.classList.remove('d-none');
    showRockets.classList.remove('d-none');
}
function NewRocket() {
    var _a;
    validateName();
    if (mistakes == 0) {
        selRun.classList.remove('d-none');
        rockName.classList.add('d-none');
        (_a = document.getElementById('selectPlayer')) === null || _a === void 0 ? void 0 : _a.classList.add('d-none');
    }
}
function createLittleRocket() {
    small = true;
    var rocket1 = new smallRocket(rock1.value);
    littleRockets.push(rocket1);
    saveRocket();
    nextStep();
}
function createBigRocket() {
    small = false;
    var BigRocket = new bigRocket(rock1.value);
    hugeRockets.push(BigRocket);
    saveRocket();
    nextStep();
}
function saveRocket() {
    var seleccio = document.getElementById('selectRunner0'), seleccio2 = document.getElementById('selectRunner1'), Option = document.createElement('option');
    if (small) {
        Option.value = littleRockets[smallRocketSerial].nom;
        Option.textContent = littleRockets[smallRocketSerial].nom;
        smallRocketSerial++;
    }
    else {
        Option.value = hugeRockets[bigRocketSerial].nom;
        Option.textContent = hugeRockets[bigRocketSerial].nom;
        bigRocketSerial++;
    }
    var Option2 = Option.cloneNode(true);
    seleccio.add(Option);
    seleccio2.appendChild(Option2);
}
var big = true, targetRocket, times = 0, times0 = 0, times1 = 0, timing0 = 0, timing1 = 0, able = true;
function isAble(e) {
    if (e == 0) {
        if (timing0 === 0) {
            able = true;
        }
        else {
            able = false;
        }
    }
    if (e == 1) {
        if (timing1 === 0) {
            able = true;
        }
        else {
            able = false;
        }
    }
}
function accelerate(e) {
    isAble(e);
    if (able) {
        GOO(e);
        BorS(e);
        if (e == 0) {
            times = times0;
        }
        if (e == 1) {
            times = times1;
        }
        if (big) {
            for (var i = 0; i < 6; i++) {
                if (times < hugeRockets[targetRocket].propulsors[i]) {
                    if (e == 0) {
                        runner1Potency += 10;
                    }
                    else {
                        runner2Potency += 10;
                    }
                }
            }
        }
        if (!big) {
            for (var i = 0; i < 3; i++) {
                if (times < littleRockets[targetRocket].propulsors[i]) {
                    if (e == 0) {
                        runner1Potency += 10;
                    }
                    else {
                        runner2Potency += 10;
                    }
                }
            }
        }
        if (e == 0) {
            times0 += 10;
            if (big == false) {
                if (times0 > 80) {
                    times0 = 80;
                }
            }
            else {
                if (times0 > 50) {
                    times0 = 50;
                }
            }
        }
        else {
            times1 += 10;
            if (!big) {
                if (times1 > 80) {
                    times1 = 80;
                }
            }
            else {
                if (times1 > 50) {
                    times1 = 50;
                }
            }
        }
        times = 0;
        CoolDown(big, e);
        GOROCKET(e, true);
        points(e);
        big = true;
        if (timing0 == 6 || timing0 == 3) {
            clearInterval(timer);
            timer = setInterval(CD, 500);
        }
        if (timing1 == 6 || timing1 == 3) {
            clearInterval(timer2);
            timer2 = setInterval(CD2, 500);
        }
    }
}
function CD() {
    if (timing0 == 0) {
        clearInterval(timer);
    }
    else {
        timing0--;
    }
}
function CD2() {
    if (timing1 == 0) {
        clearInterval(timer2);
    }
    else {
        timing1--;
    }
}
function slower(e) {
    isAble(e);
    if (able) {
        Less(e);
        BorS(e);
        if (big) {
            potBig(e);
        }
        if (!big) {
            potLit(e);
        }
        if (e == 0) {
            CoolDown(false, e);
            if (timing0 == 6 || timing0 == 3) {
                clearInterval(timer);
                timer = setInterval(CD, 500);
            }
            if (runner1Potency >= 0) {
                times0 -= 10;
                if (times0 <= 0) {
                    times0 = 0;
                    runner1Potency = 0;
                }
            }
        }
        if (e == 1) {
            CoolDown(false, e);
            if (timing1 == 6 || timing1 == 3) {
                clearInterval(timer2);
                timer2 = setInterval(CD2, 500);
            }
            if (runner2Potency >= 0) {
                times1 -= 10;
                if (times1 <= 0) {
                    times1 = 0;
                    runner2Potency = 0;
                }
            }
        }
        times = 0;
    }
}
function potLit(e) {
    if (e == 0) {
        times = times0;
    }
    else {
        times = times1;
    }
    for (var i = 0; i < 3; i++) {
        if (times <= littleRockets[targetRocket].propulsors[i]) {
            if (e == 0) {
                if (runner1Potency !== 0) {
                    runner1Potency -= 10;
                }
            }
            else {
                if (runner2Potency !== 0) {
                    runner2Potency -= 10;
                }
            }
        }
    }
}
function potBig(e) {
    if (e == 0) {
        times = times0;
    }
    else {
        times = times1;
    }
    for (var i = 0; i < 6; i++) {
        if (times <= hugeRockets[targetRocket].propulsors[i]) {
            if (e == 0) {
                if (runner1Potency !== 0) {
                    runner1Potency -= 10;
                }
            }
            else {
                if (runner2Potency !== 0) {
                    runner2Potency -= 10;
                }
            }
        }
    }
}
function GOROCKET(e, s) {
    var coorLeft = document.getElementById('rocket-up');
    if (e == 0) {
        if (timing0 !== 0) {
            if (big) {
                if (s && runner1Potency >= 0 && times0 > 0 && coorLeft.getBoundingClientRect().x < 500) {
                    $('#rocket-up').animate({
                        left: '+=100', easing: "easein"
                    }, 3000);
                }
            }
            if (!big) {
                if (runner1Potency >= 0 && s && times0 > 0 && coorLeft.getBoundingClientRect().x < 542) {
                    $('#rocket-up').animate({
                        left: '+=75', easing: "easein"
                    }, 1500);
                }
            }
        }
    }
    if (e == 1) {
        var coorLeft2 = document.getElementById('rocket-down');
        if (timing1 !== 0) {
            if (big) {
                if (runner2Potency >= 0 && times1 > 0 && coorLeft2.getBoundingClientRect().x < 500) {
                    $('#rocket-down').animate({
                        left: '+=100', easing: "easein"
                    }, 3000);
                }
            }
            if (!big) {
                if (runner2Potency >= 0 && times1 > 0 && coorLeft2.getBoundingClientRect().x < 542) {
                    $('#rocket-down').animate({
                        left: '+=75', easing: "easein"
                    }, 1500);
                }
            }
        }
    }
}
function Less(e) {
    isAble(e);
    if (able) {
        BorS(e);
        if (e == 0) {
            var coorLeft = document.getElementById('rocket-up');
            if (runner1Potency !== 0 && coorLeft.getBoundingClientRect().x > 20) {
                if (!big) {
                    $('#rocket-up').animate({
                        left: '-=75', easing: "easein"
                    }, 1500);
                }
                else {
                    $('#rocket-up').animate({
                        left: '-=100', easing: "easeout"
                    }, 2000);
                }
            }
        }
        var coorLeft2 = document.getElementById('rocket-down');
        if (e == 1) {
            if (runner2Potency !== 0 && coorLeft2.getBoundingClientRect().x > 20) {
                if (big) {
                    $('#rocket-down').animate({
                        left: '-=100', easing: "easeout"
                    }, 2000);
                }
                else {
                    $('#rocket-down').animate({
                        left: '-=75', easing: "easeout"
                    }, 2000);
                }
            }
        }
        big = true;
    }
}
function GOO(e) {
    if (e == 0) {
        if (timing0 == 0) {
            if (runner1Potency >= 0) {
                $(function () {
                    function loop() {
                        km = times0 * 80;
                        $('#backloop').stop();
                        $('#backloop').animate({ backgroundPositionX: '-=' + km,
                            easing: "easeinout" }, 2500, 'linear', loop);
                    }
                    loop();
                });
            }
        }
    }
    if (e == 1) {
        if (timing1 == 0) {
            if (runner2Potency >= 0) {
                $(function () {
                    function loop() {
                        km = times1 * 80;
                        $('#backloop2').stop();
                        $('#backloop2').animate({ backgroundPositionX: '-=' + km,
                            easing: "easeinout" }, 2500, 'linear', loop);
                    }
                    loop();
                });
            }
        }
    }
}
var timer;
var timer2;
function CoolDown(a, b) {
    if (!a) {
        if (b == 0) {
            timing0 = 3;
        }
        else {
            timing1 = 3;
        }
    }
    else {
        if (b == 0) {
            timing0 = 6;
        }
        else {
            timing1 = 6;
        }
    }
}
function BorS(e) {
    var participant = document.getElementById('selectRunner' + e);
    for (var i = 0; i < littleRockets.length; i++) {
        if (littleRockets[i].nom == participant.value) {
            targetRocket = littleRockets.indexOf(littleRockets[i]);
            big = false;
        }
    }
    if (big) {
        for (var i = 0; i < hugeRockets.length; i++) {
            if (hugeRockets[i].nom == participant.value) {
                targetRocket = hugeRockets.indexOf(hugeRockets[i]);
            }
        }
    }
}
var punt0 = 0, punt = 0;
function points(e) {
    var points0 = document.getElementById('points-0');
    var points1 = document.getElementById('points-1');
    function punctuation() {
        BorS(e);
        if (big) {
            if (e == 0) {
                var punts0 = times0 * 2.3 * 6;
                punt0 += punts0;
                points0.textContent = 'Score: ' + punt0;
            }
            if (e == 1) {
                var punts1 = times1 * 2.3 * 6;
                punt += punts1;
                points1.textContent = 'Score: ' + punt;
            }
        }
        if (!big) {
            if (e == 0) {
                var punts0 = times0 * 2.9 * 3;
                punt0 += punts0;
                points0.textContent = 'Score: ' + punt0;
            }
            if (e == 1) {
                var punts1 = times1 * 2.9 * 3;
                punt += punts1;
                points1.textContent = 'Score: ' + punt;
            }
        }
        big = true;
    }
    if (e == 0 && punt0 == 0) {
        setInterval(punctuation, 100);
    }
    if (e == 1 && punt == 0) {
        setInterval(punctuation, 100);
    }
}
function validateName() {
    mistakes = 0;
    if (rock1.value == '') {
        var empty = document.getElementById('name-error');
        empty.textContent = 'Pleasse insert a valid Rocket name';
        mistakes++;
    }
    else {
        var empty = document.getElementById('name-error');
        empty.textContent = "Rocket's name already in use";
    }
    for (var i = 0; i < littleRockets.length; i++) {
        if (rock1.value == littleRockets[i].nom) {
            mistakes++;
        }
    }
    for (var i = 0; i < hugeRockets.length; i++) {
        if (rock1.value == hugeRockets[i].nom) {
            mistakes++;
        }
    }
    if (mistakes == 0) {
        rock1.classList.remove('is-invalid');
    }
    else {
        rock1.classList.add('is-invalid');
    }
}
function selecting() {
    var _a, _b;
    (_a = document.getElementById('selectPlayer')) === null || _a === void 0 ? void 0 : _a.classList.remove('d-none');
    (_b = document.getElementById('selectRunners')) === null || _b === void 0 ? void 0 : _b.classList.add('d-none');
}
function runnerImg(e) {
    var _a, _b;
    BorS(e);
    var img = document.createElement('img');
    if (!big) {
        img.src = "images/3-rocket.png";
        img.classList.add('rocket-3');
    }
    if (big) {
        if (e == 0 && runner1.value !== '') {
            img.src = "images/6-rocket.png";
            img.classList.add('rocket-6');
        }
        if (e == 1 && runner2.value !== '') {
            img.src = "images/6-rocket.png";
            img.classList.add('rocket-6');
        }
        else {
            img.remove();
        }
    }
    if (e == 0) {
        (_a = document.getElementById('img-0')) === null || _a === void 0 ? void 0 : _a.remove();
        img.id = 'img-0';
        var DEED = document.getElementById('select-0');
        DEED.appendChild(img);
    }
    if (e == 1) {
        (_b = document.getElementById('img-1')) === null || _b === void 0 ? void 0 : _b.remove();
        img.id = 'img-1';
        var DEED = document.getElementById('select-1');
        DEED.appendChild(img);
    }
    big = true;
    validateRunners();
}
function letGo() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    validateRunners();
    if (mistakes == 0) {
        selRun.classList.add('d-none');
        rockName.classList.add('d-none');
        (_a = document.getElementById('stadium')) === null || _a === void 0 ? void 0 : _a.classList.remove('d-none');
        (_b = document.getElementById('selectPlayer')) === null || _b === void 0 ? void 0 : _b.classList.add('d-none');
        if (runner1.value !== '') {
            (_c = document.getElementById('player1')) === null || _c === void 0 ? void 0 : _c.classList.remove('d-none');
            BorS(0);
            if (big) {
                var img1 = document.createElement('img');
                img1.src = "images/6-rocket.png";
                img1.classList.add('runner-6-engines');
                img1.id = 'rocket-up';
                (_d = document.getElementById('backloop')) === null || _d === void 0 ? void 0 : _d.appendChild(img1);
            }
            else {
                var img1 = document.createElement('img');
                img1.src = "images/3-rocket.png";
                img1.classList.add('runner-3-engines');
                img1.id = 'rocket-up';
                (_e = document.getElementById('backloop')) === null || _e === void 0 ? void 0 : _e.appendChild(img1);
            }
            big = true;
        }
        if (runner2.value !== '') {
            (_f = document.getElementById('player2')) === null || _f === void 0 ? void 0 : _f.classList.remove('d-none');
            BorS(1);
            if (big) {
                var img2 = document.createElement('img');
                img2.src = "images/6-rocket.png";
                img2.classList.add('runner-6-engines');
                img2.id = 'rocket-down';
                (_g = document.getElementById('backloop2')) === null || _g === void 0 ? void 0 : _g.appendChild(img2);
            }
            else {
                var img2 = document.createElement('img');
                img2.src = "images/3-rocket.png";
                img2.classList.add('runner-3-engines');
                img2.id = 'rocket-down';
                (_h = document.getElementById('backloop2')) === null || _h === void 0 ? void 0 : _h.appendChild(img2);
            }
            big = true;
        }
    }
    gene = setInterval(countDown, 600);
}
function validateRunners() {
    var _a, _b, _c, _d;
    mistakes = 0;
    if (runner1.value == '' && runner2.value == '') {
        (_a = document.getElementById('noRunnerFeedback')) === null || _a === void 0 ? void 0 : _a.classList.remove('d-none');
        mistakes++;
    }
    else if (runner1.value == runner2.value) {
        (_b = document.getElementById('sameRunnerFeedback')) === null || _b === void 0 ? void 0 : _b.classList.remove('d-none');
        mistakes++;
    }
    else {
        (_c = document.getElementById('sameRunnerFeedback')) === null || _c === void 0 ? void 0 : _c.classList.add('d-none');
        (_d = document.getElementById('noRunnerFeedback')) === null || _d === void 0 ? void 0 : _d.classList.add('d-none');
    }
}
var gene;
var matt = Math.floor(Math.random() * 50) + 10;
function countDown() {
    var countee = document.getElementById("count-down"), results = document.getElementById("results"), results2 = document.getElementById("results2");
    if (matt == 0) {
        results.innerHTML = '';
        results2.innerHTML = '';
        clearInterval(gene);
        $('#endingModal').modal('show');
        var fail1 = false;
        var fail2 = false;
        if (runner1Potency >= 10) {
            results.innerHTML = "<p>Player 1... You haven't brake on time! </p>";
            fail1 = true;
        }
        if (runner2Potency >= 10) {
            results.innerHTML = "<p>Player 2... You haven't brake on time!</p>";
            fail2 = true;
        }
        if (fail1 && fail2) {
            results.innerHTML = "<p>You both haven't brake on time! it's a... draw?</p>";
        }
        if (!fail1 && fail2 && punt0 !== 0) {
            results2.innerHTML += "<h3><strong>Player 1 WINS!</strong></h3>";
        }
        if (fail1 && !fail2 && punt !== 0) {
            results2.innerHTML += "<h3><strong>Player 2 WINS!</strong></h3>";
        }
        if (!fail1 && !fail2) {
            if (punt0 > punt) {
                results2.innerHTML = "<h3><strong>Player 1 WINS!</strong></h3>";
            }
            else if (punt0 == 0 && punt == 0) {
                results.innerHTML = "<p>Can there be a winner if you didn't even start to run?</p>";
            }
            else {
                results2.innerHTML = "<h3><strong>Player 2 WINS!</strong></h3>";
            }
        }
        runner1Potency = 0;
        runner2Potency = 0;
        times0 = 0;
        times1 = 0;
    }
    else {
        matt--;
    }
    countee.innerHTML = 'Time: ' + matt;
}
function rocketsList() {
    var plantilla = document.getElementById('plantilla'), garage = document.getElementById('rocket-garage'), allRockets = littleRockets.concat(hugeRockets);
    for (var i = 0; i < allRockets.length; i++) {
        var clone = plantilla.cloneNode(false), infoImg = document.createElement('img'), info = document.createElement('div');
        garage.appendChild(clone);
        clone.id = 'number' + i;
        clone.classList.remove('d-none');
        info.id = 'shownInfo' + i;
        info.classList.add('shown-info', 'col-5');
        if (allRockets[i].propulsors.length > 5) {
            infoImg.src = "images/6-rocket.png";
        }
        else {
            infoImg.src = "images/3-rocket.png";
        }
        clone.appendChild(infoImg);
        clone.appendChild(info);
        infoImg.classList.add('mini');
        info.innerHTML = '<p><strong>Rocket Name: </strong>' + allRockets[i].nom + '</p> <p><strong>Engines: </strong>' + allRockets[i].propulsors + '</p>';
    }
}
$('#exampleModal').on('hidden.bs.modal', function () {
    var garage = document.getElementById('rocket-garage');
    while (garage.firstChild) {
        garage.removeChild(garage.lastChild);
    }
});
$('#endingModal').on('hidden.bs.modal', function () {
    var _a, _b, _c, _d, _e;
    (_a = document.getElementById('rocket-down')) === null || _a === void 0 ? void 0 : _a.remove();
    (_b = document.getElementById('rocket-up')) === null || _b === void 0 ? void 0 : _b.remove();
    punt0 = 0;
    punt = 0;
    runner1Potency = 0;
    runner2Potency = 0;
    times0 = 0;
    times1 = 0;
    big = true;
    matt = Math.floor(Math.random() * 50) + 10;
    clearInterval(gene);
    nextStep();
    selecting();
    (_c = document.getElementById('stadium')) === null || _c === void 0 ? void 0 : _c.classList.add('d-none');
    (_d = document.getElementById('player1')) === null || _d === void 0 ? void 0 : _d.classList.add('d-none');
    (_e = document.getElementById('player2')) === null || _e === void 0 ? void 0 : _e.classList.add('d-none');
});
