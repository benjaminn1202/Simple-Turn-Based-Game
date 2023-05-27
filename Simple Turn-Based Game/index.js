
/*
hahaha
this program is created using js, css, at html
bale laro 'to
more specifically, a turn based game
meaning, halinhinan o palitan sila ng turn para gumalaw o umattack
ganun
yun
ganun nga
gege
*/












const menuBtn = document.querySelector('#menu-btn');
const settingsBtn = document.querySelector('#settings-btn');
const restartBtn = document.querySelector('#restart-btn');
const aboutBtn = document.querySelector('#about-btn');

const p1pic = document.querySelector('p1-img');
const p1bar = document.querySelector('#p1-hp-bar');
const ctxp1bar = p1bar.getContext('2d');
const p1name = document.querySelector('#p1-name');
const p1hp = document.querySelector('#p1-hp');
const p1sp = document.querySelector('#p1-sp');
const p1class = document.querySelector('#p1-class');

const actBox = document.querySelector('#act-box');

const p1Avatar = document.querySelector('#p1-avatar');
const p2Avatar = document.querySelector('#p2-avatar');

const p2pic = document.querySelector('p2-img');
const p2bar = document.querySelector('#p2-hp-bar');
const ctxp2bar = p2bar.getContext('2d');
const p2name = document.querySelector('#p2-name');
const p2hp = document.querySelector('#p2-hp');
const p2sp = document.querySelector('#p2-sp');
const p2class = document.querySelector('#p2-class');

const p1Txt = document.querySelector('#dmgTxt1');
const p2Txt = document.querySelector('#dmgTxt2');

const events = document.querySelector('#events');

function Brawler(name) {
    this.name = name;
    this.maxhp = 80;
    this.hp = 80;
    this.sp = 0;
    this.moves = [
        {name:'Jab', type:'physicalDmg', effect:7, cd:0},
        {name:'Uppercut', type:'physicalDmg', effect:11, cd:2},
        {name:'Counter Dodge', type:'physicalDmgDodge', effect:0, cd:3}
    ];
    
    this.cd1 = 0;
    this.cd2 = 0;
    this.dodge = false;

    this.setAva = function() {
        p1Avatar.src = 'brawler.png';
        document.querySelector('#p1-img').src = 'brawler.png';
        p1name.innerHTML = this.name;
        p1class.innerHTML = 'Class: Brawler';
    };

    this.turn = function() {
        update();
        actBox.innerHTML = `
            <input type="button" id="m0" value="${this.moves[0].name} (${p1.moves[0].cd})">
            <input type="button" id="m1" value="${this.moves[1].name} (${p1.cd1})">
            <input type="button" id="m2" value="${this.moves[2].name} (${p1.cd2})">
        `;

        if(this.cd1 > 0) {
            document.querySelector('#m1').disabled = true;
            this.cd1 -= 1;
        }
        else document.querySelector('#m1').disabled = false;

        if(this.cd2 > 0) {
            document.querySelector('#m2').disabled = true;
            this.cd2 -= 1;
        }
        else document.querySelector('#m2').disabled = false;

        document.querySelector('#m0').onmouseup = function() {
                actBox.innerHTML = '';
                removeClass();
                p1Avatar.classList.add('p1AvaAtt');
                let msg = `Bare handed, you delivered a fast yet reliable jab. Dealing ${p1.moves[0].effect} damage to your enemy.`;
                setTimeout(function() {p2.takeDmg(p1.moves[0],msg)},400);
        };

        document.querySelector('#m1').onmouseup = function() {
            actBox.innerHTML = '';
            p1.cd1 = p1.moves[1].cd;
            removeClass();
            p1Avatar.classList.add('p1AvaAtt');
            let msg = `You gave your enemy sweet goodnight uppercut. It dealt ${p1.moves[1].effect} damage.`;
            setTimeout(function() {p2.takeDmg(p1.moves[1],msg)},400);
        };

        document.querySelector('#m2').onmouseup = function() {
            actBox.innerHTML = '';
            p1.cd2 = p1.moves[2].cd;
            p1.dodge = true;
            removeClass();
            p1Avatar.classList.add('pAvaBuff');
            update('You focused your mind and begin watching every movement your enemy makes.');
            setTimeout(function() {p2.turn()},1500);
        };
    }

//double check kung nagdadodge. ilagay yung counter attack after dodging.

    this.takeDmg = function(move,msg) {
        removeClass();

        if(p1.dodge === true) {
            p1Txt.style.color = 'darkgreen';
            p1Txt.innerHTML = 'Dodge!';
            p1Txt.classList.add('pTxt');
            p1Avatar.classList.add('p1AvaDodge');
            setTimeout(function() {
                removeClass();
                p1Avatar.classList.add('p1AvaAtt')},400);
            setTimeout(function() {
                removeClass();
                p2Txt.innerHTML = `-${move.effect}`;
                p2Txt.classList.add('pTxt');
                p2Avatar.classList.add('pAvaHurt');
                p2.hp -= move.effect;
                update(`You successfully dodged your enemy's attack and immediately performed a counter attack. It dealt ${move.effect} damage.`)},800);
            p1.dodge = false;
            console.log('dodge');
        }
        else {
            p1Avatar.classList.add('pAvaHurt');
            p1Txt.style.color = 'darkred';
            p1Txt.innerHTML = `-${move.effect}`;
            p1Txt.classList.add('pTxt');
            p1.hp -= move.effect;
            update(msg);
        }
        checkVictor();
        setTimeout(function() {p1.turn()},1500);
    };
}
/////
function GiantRat(name) {
    this.name = name;
    this.maxhp = 80;
    this.hp = 80;
    this.sp = 0;
    this.moves = [
        {name:'Claw Scratch', type:'physicalDmg', effect:10, cd:0},
        {name:'Feral Bite', type:'physicalDmgHeal', effect:14, cd:2}
    ];
    this.cd1 = 0;

    this.setAva = function() {
        p2Avatar.src = 'rat.png';
        document.querySelector('#p2-img').src = 'rat.png';
        p2name.innerHTML = this.name;
        p2class.innerHTML = 'Type: Monster';
    };

    this.turn = function() {
        removeClass();
        p2Avatar.classList.add('p2AvaAtt');
        if(p2.cd1 > 0) {
            p2.cd1 -= 1;
            let msg = `The giant rat used its claw to scratch you! It dealt ${p2.moves[0].effect} damage.`;
            setTimeout(function() {p1.takeDmg(p2.moves[0],msg)},400);
        }
        else {
            p2.cd1 = p2.moves[1].cd;
            let msg = `With the sharpest fangs you've ever seen, the giant rat bits you! You lost ${p2.moves[1].effect} health points.`;
            setTimeout(function() {p1.takeDmg(p2.moves[1],msg)},400);
        }
    };
    this.takeDmg = function(move,msg) {
        p2Avatar.classList.add('pAvaHurt');
        p2Txt.innerHTML = `-${move.effect}`;
        p2Txt.classList.add('pTxt');
        p2.hp -= move.effect;
        update(msg);
        checkVictor();
        setTimeout(function() {p2.turn()},1500);
    };
}

p1bar.width = document.body.clientWidth*0.20;
p1bar.height = document.body.clientHeight*0.04;
p2bar.width = document.body.clientWidth*0.20;
p2bar.height = document.body.clientHeight*0.04;

let p1 = new Brawler('BENJAMIN');
let p2 = new GiantRat('GIANT RAT');

p1.turn();
p1.setAva();
p2.setAva();

let count = 1;

function update(msg) {
    let computedp2Bar = (p2.hp/p2.maxhp) * p2bar.width;
    let computedp1Bar = (p1.hp/p1.maxhp) * p1bar.width;

    ctxp2bar.clearRect(0,0,p2bar.width,p2bar.height);
    ctxp2bar.beginPath();
    ctxp2bar.fillStyle = 'red';
    ctxp2bar.fillRect(0,0,computedp2Bar,p2bar.height);
    
    ctxp1bar.clearRect(0,0,p1bar.width,p1bar.height);
    ctxp1bar.beginPath();
    ctxp1bar.fillStyle = 'red';
    ctxp1bar.fillRect(0,0,computedp1Bar,p1bar.height);

    p2hp.innerHTML = `Health: ${p2.hp}/${p2.maxhp}`;
    p1hp.innerHTML = `Health: ${p1.hp}/${p1.maxhp}`;

    if(msg != null) {
        events.value += `${count}: ${msg}\r\n\r\n`;
        events.scrollTop = events.scrollHeight;
        count++;
    }
} update(); 

function removeClass() {
    p1Avatar.classList.remove('p1AvaAtt');
    p1Avatar.classList.remove('pAvaHurt');
    p1Avatar.classList.remove('p1AvaDodge');
    p1Avatar.classList.remove('pAvaBuff');

    p2Avatar.classList.remove('p2AvaAtt');
    p2Avatar.classList.remove('pAvaHurt');

    p1Txt.classList.remove('pTxt');
    p2Txt.classList.remove('pTxt');
}


////////////////////////////////////////////////
// Palitan yung window.location to replace() ///
////////////////////////////////////////////////
function checkVictor() {
    if(p1.hp <= 0 && p2.hp > 0) {
        removeClass;
        p1Avatar.classList.add('pAvaDeath');
        p1Avatar.style.opacity = '0%';
        update('Your enemy delivered the final blow. Your coniciousness fades to darkness. Forever.');
        setTimeout(function() {window.location.replace('p2Win.html')},1500);
    }
    else if(p2.hp <= 0 && p1.hp > 0) {
        removeClass;
        p2Avatar.classList.add('pAvaDeath');
        p2Avatar.style.opacity = '0%';
        update('The battle ended as you delivered the final blow to your enemy. You won.');
        setTimeout(function() {window.location.replace('p1Win.html')},1500);
    }
    else {
        return;
    }

};

let battle = new Audio('battle.mp3');

function playmusic() {
    battle.play();
    console.log('music played');
    document.body.removeChild(document.querySelector('#menu-window'));
}

battle.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
},false);

//Update yung pag nanalo. ilagay si message dun. something catchy tapos may gif pag namatay yung character. lagyan din ng restart button.