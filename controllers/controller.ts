let rock1 = <HTMLInputElement>document.getElementById('rocket'),
    littleRockets:any=[],
    hugeRockets:any=[],
    smallRocketSerial:number=0,
    bigRocketSerial:number=0,
    runner1=<HTMLSelectElement>document.getElementById('selectRunner0'),
    runner2=<HTMLSelectElement>document.getElementById('selectRunner1'),
    runner1Potency=0,
    runner2Potency=0,
    small:boolean,
    km=0,
    mistakes=0,
    selRun = <HTMLElement>document.getElementById('sel-runner'),
    rockName=  <HTMLElement>document.getElementById('rocket-name'),
    showRockets=  <HTMLElement>document.getElementById('show-rockets'),
    selectRunners=  <HTMLElement>document.getElementById('selectRunners');
class smallRocket{
    nom:string;
    id:string;
    propulsors=[10,30,80]
    constructor(name:string){
        this.nom=name 
        this.id='S'+smallRocketSerial
    }
}
class bigRocket{
    nom:string;
    id:string
    propulsors=[30,40,50,50,30,10];  
    constructor(name:string){
         this.nom = name
         this.id='B'+bigRocketSerial
    }
}
function nextStep(){
    selRun.classList.add('d-none')
    rockName.classList.remove('d-none') 
    selectRunners.classList.remove('d-none')  
    showRockets.classList.remove('d-none')
}
function NewRocket(){
    validateName()
    if(mistakes==0){
        selRun.classList.remove('d-none')
        rockName.classList.add('d-none')
        document.getElementById('selectPlayer')?.classList.add('d-none') 
    }
}
function createLittleRocket(){
    small=true
    let rocket1 = new smallRocket(rock1.value)
    littleRockets.push(rocket1);
    saveRocket()
    nextStep() 
}
function createBigRocket(){
    small=false
    let BigRocket = new bigRocket(rock1.value)
    hugeRockets.push(BigRocket);
    saveRocket()
    nextStep()
}
function saveRocket(){
    let seleccio = <HTMLSelectElement>document.getElementById('selectRunner0'),
        seleccio2 = <HTMLSelectElement>document.getElementById('selectRunner1'),
        Option = <HTMLOptionElement>document.createElement('option');
    if (small){
        Option.value=littleRockets[smallRocketSerial].nom;
        Option.textContent=littleRockets[smallRocketSerial].nom; 
        smallRocketSerial ++
    }
    else{
        Option.value=hugeRockets[bigRocketSerial].nom;
        Option.textContent=hugeRockets[bigRocketSerial].nom; 
        bigRocketSerial ++
    }
    let Option2= Option.cloneNode(true);
    seleccio.add(Option)
    seleccio2.appendChild(Option2)
}
let big:boolean=true,
    targetRocket:number,
    times:number=0,
    times0:number=0,
    times1:number=0,
    timing0:number=0,
    timing1:number=0,
    able:boolean =true;
function isAble(e:number){
    if(e==0){
        if(timing0===0){
            able =true}
        else{
            able=false}
    }
    if(e==1){
        if(timing1===0){
            able =true }
        else{
            able=false}
    }
}
function accelerate(e:number){
    isAble(e)
    if(able){
        GOO(e)
        BorS(e)
        if(e==0){
            times =times0}
        if(e==1){
            times =times1}
        if (big){
            for(let i=0;i<6;i++){
                if(times<hugeRockets[targetRocket].propulsors[i]){
                    if(e==0){
                    runner1Potency +=10}
                    else{
                    runner2Potency +=10}
                }
            }
        }
        if(!big){
            for(let i=0;i<3;i++){
                if(times<littleRockets[targetRocket].propulsors[i]){
                    if(e==0){
                        runner1Potency +=10}
                    else{
                        runner2Potency +=10}
                }
            }
        }
        if(e==0){
            times0 +=10
            if(big ==false){
                if(times0>80){
                    times0=80}
            }
            else{
                if(times0>50){
                    times0=50}
            }
        }
        else{
            times1 +=10
            if(!big){
                if(times1>80){
                    times1=80}
            }
            else{
                if(times1>50){
                    times1=50}
            }
        }
        times =0
        CoolDown(big,e)
        GOROCKET(e,true)
        points(e)
        big=true
        if(timing0==6 || timing0==3){
            clearInterval(timer)
            timer= setInterval(CD,500);
        }
        if(timing1==6 ||timing1==3){
            clearInterval(timer2)
            timer2= setInterval(CD2,500); 
        }
    }
}
function CD(){
    if (timing0==0){
        clearInterval(timer)}
    else{
        timing0 --}
}
function CD2(){
    if (timing1==0){
        clearInterval(timer2)
    }
    else{
        timing1 --
    }
}
function slower(e:number){
    isAble(e)
    if(able){
        Less(e)
        BorS(e)
        if(big){
            potBig(e)
        }
        if (!big){
            potLit(e)
        }
        if (e==0){
            CoolDown(false,e)
            if(timing0==6 || timing0==3){
                clearInterval(timer)
               timer= setInterval(CD,500)
            }
            if(runner1Potency>=0){
                times0 -=10
                if(times0<=0){
                    times0 = 0
                    runner1Potency =0
                }
            }
        }
        if(e==1){
            CoolDown(false,e)
            if(timing1==6 || timing1==3){
                clearInterval(timer2)
                timer2= setInterval(CD2,500)
            }
            if(runner2Potency>=0){
                times1 -=10
                if(times1<=0){
                    times1 = 0
                    runner2Potency=0
                }
            } 
        }
        times =0 
    }
}
function potLit(e:number){
    if(e==0){
        times = times0
    }
    else{
        times= times1
    }
    for(let i=0;i<3;i++){
        if(times<=littleRockets[targetRocket].propulsors[i]){
            if(e==0){
                if(runner1Potency!==0){
                    runner1Potency -=10}
            }
            else{
                if(runner2Potency!==0){
                    runner2Potency -=10}
            }
        }
    } 
}
function potBig(e:number){ 
    if(e==0){
        times = times0 }
    else{
        times= times1}
    for(let i=0;i<6;i++){
        if(times<=hugeRockets[targetRocket].propulsors[i]){
            if(e==0){
                if(runner1Potency!==0){
                runner1Potency -=10}
            }
            else{
                if(runner2Potency!==0){
                runner2Potency -=10}
            }
        }
    }
} 
function GOROCKET(e:number,s:boolean){
    var coorLeft = <HTMLElement>document.getElementById('rocket-up');
    if (e==0){
        if (timing0 !==0){
            if (big){
                if(s && runner1Potency>=0 && times0> 0 && coorLeft.getBoundingClientRect().x<500){
                    $('#rocket-up').animate({
                        left: '+=100',easing:"easein" },3000);
                }
            }
            if (!big){
                if(runner1Potency>=0 && s && times0> 0 && coorLeft.getBoundingClientRect().x<542){
                    $('#rocket-up').animate({
                        left: '+=75', easing:"easein"},1500);
                }      
            } 
        }
    }
    if (e==1){
        var coorLeft2 = <HTMLElement>document.getElementById('rocket-down');
        if (timing1 !==0){
            if (big){
                if(runner2Potency>=0 && times1> 0 && coorLeft2.getBoundingClientRect().x<500){
                    $('#rocket-down').animate({
                        left: '+=100',easing:"easein"},3000);
                }     
            }
            if (!big){
                if(runner2Potency>=0 && times1> 0 && coorLeft2.getBoundingClientRect().x<542){
                    $('#rocket-down').animate({
                        left: '+=75', easing:"easein"},1500);
                }     
            } 
        }
    }
}
function Less(e:number) {
    isAble(e)
    if (able){
        BorS(e)
        if(e==0 ){
        var coorLeft = <HTMLElement>document.getElementById('rocket-up');
            if(runner1Potency!==0 && coorLeft.getBoundingClientRect().x>20){
                if(!big){
                    $('#rocket-up').animate({
                        left: '-=75',easing:"easein"},1500);
                }
                else {
                    $('#rocket-up').animate({
                        left: '-=100',easing:"easeout"},2000); 
                }
            } 
        }
        var coorLeft2 = <HTMLElement>document.getElementById('rocket-down');
        if(e==1 ){
            if(runner2Potency!==0 && coorLeft2.getBoundingClientRect().x>20){
                if(big){
                    $('#rocket-down').animate({
                        left: '-=100', easing:"easeout"},2000);
                }
                else{
                    $('#rocket-down').animate({
                        left: '-=75',easing:"easeout"},2000);
                }
            }  
        }
        big=true
    }
}
function GOO(e:number){
    if(e==0){
        if (timing0 ==0){
            if(runner1Potency>=0){
                $(function() {
                    function loop(){
                        km= times0*80
                        $('#backloop').stop()
                        $('#backloop').animate({backgroundPositionX: '-='+km,
                       easing:"easeinout"},2500,'linear', loop);
                    }loop();
                }); 
            }
        }
    }
    if(e==1){
        if (timing1 ==0 ){
            if(runner2Potency>=0 ){
               $(function() {
                    function loop(){
                       km= times1*80
                        $('#backloop2').stop()
                        $('#backloop2').animate({backgroundPositionX: '-='+km,
                        easing:"easeinout"},2500, 'linear', loop);
                    }loop();
                });
            }
        }
    }
}
var timer:any;
var timer2:any;
function CoolDown(a:boolean, b:number){
    if(!a){
        if(b==0){
            timing0=3}
        else{
            timing1=3}
    }
    else{
        if(b==0){
            timing0=6}
        else{
            timing1=6}
    }  
}
function BorS(e:number){
    let participant =<HTMLSelectElement>document.getElementById('selectRunner'+e);
    for(let i=0;i<littleRockets.length;i++){
        if(littleRockets[i].nom == participant.value){
            targetRocket = littleRockets.indexOf(littleRockets[i])
            big = false;
        }
     }
     if(big){
        for(let i=0;i<hugeRockets.length;i++){
            if(hugeRockets[i].nom == participant.value){
                targetRocket= hugeRockets.indexOf(hugeRockets[i])
            }
        }
    }
}
var punt0=0,
    punt=0;
function points(e:number) {
    var points0= <HTMLElement>document.getElementById('points-0');
    var points1= <HTMLElement>document.getElementById('points-1');
    function punctuation(){
        BorS(e)
        if(big){
            if(e==0){
                var punts0:number = times0*2.3*6;
                punt0  +=punts0
                points0.textContent= 'Score: ' +punt0
            }
            if(e==1){
                var punts1:number = times1*2.3*6;
                punt  +=punts1
                points1.textContent= 'Score: ' +punt
            }
        }
        if(!big){
            if(e==0){
                var punts0:number = times0*2.9*3;
                punt0  +=punts0
                points0.textContent= 'Score: ' +punt0
            }
            if(e==1){
                var punts1:number = times1*2.9*3;
                punt  +=punts1
                points1.textContent= 'Score: ' +punt
            }
        }  
        big=true
    }  
    if(e==0 && punt0 ==0){
        setInterval(punctuation,100)} 
    if(e==1 && punt ==0){
        setInterval(punctuation,100)}
}
function validateName(){
    mistakes=0
    if(rock1.value==''){
        var empty= <HTMLElement>document.getElementById('name-error')
        empty.textContent='Pleasse insert a valid Rocket name';
        mistakes++
    }
    else{
        var empty= <HTMLElement>document.getElementById('name-error')
        empty.textContent="Rocket's name already in use"; 
    }
    for(let i=0;i<littleRockets.length;i++){
        if(rock1.value ==littleRockets[i].nom){
            mistakes ++
        }
    }
    for(let i=0;i<hugeRockets.length;i++){
        if(rock1.value ==hugeRockets[i].nom){
            mistakes ++
        }
    }
    if(mistakes==0){
        rock1.classList.remove('is-invalid')
    } 
    else{
        rock1.classList.add('is-invalid')
    } 
}
function selecting(){
    document.getElementById('selectPlayer')?.classList.remove('d-none')
    document.getElementById('selectRunners')?.classList.add('d-none')
}
function runnerImg(e:number){
    BorS(e)
    var img = document.createElement('img'); 
    if(!big){
        img.src="images/3-rocket.png";
        img.classList.add('rocket-3'); 
    }
    if(big){
        if(e==0 && runner1.value!==''){
            img.src="images/6-rocket.png";
            img.classList.add('rocket-6');
        }
        if(e==1 && runner2.value!==''){
            img.src="images/6-rocket.png";
            img.classList.add('rocket-6');
        }
        else{
            img.remove()
        }
    }
    if(e==0){
        document.getElementById('img-0')?.remove()
        img.id='img-0';
        var DEED = <HTMLElement>document.getElementById('select-0');
        DEED.appendChild(img)
    }
    if(e==1){
        document.getElementById('img-1')?.remove()
        img.id='img-1';
        var DEED= <HTMLElement>document.getElementById('select-1')
        DEED.appendChild(img)
    }
    big=true
    validateRunners()
}
function letGo(){
    validateRunners()
    if (mistakes==0){
            selRun.classList.add('d-none')
            rockName.classList.add('d-none')
            document.getElementById('stadium')?.classList.remove('d-none')
            document.getElementById('selectPlayer')?.classList.add('d-none')
        if(runner1.value !==''){
            document.getElementById('player1')?.classList.remove('d-none');
            BorS(0);
            if (big){
                var img1= document.createElement('img');
                img1.src="images/6-rocket.png"
                img1.classList.add('runner-6-engines')
                img1.id='rocket-up'
                document.getElementById('backloop')?.appendChild(img1)
            }
            else {
                var img1= document.createElement('img');
                img1.src="images/3-rocket.png"
                img1.classList.add('runner-3-engines')
                img1.id='rocket-up'
                document.getElementById('backloop')?.appendChild(img1)
            }
            big=true
        }
        if(runner2.value!==''){
            document.getElementById('player2')?.classList.remove('d-none')  
            BorS(1);
            if (big){
                var img2= document.createElement('img');
                img2.src="images/6-rocket.png"
                img2.classList.add('runner-6-engines')
                img2.id='rocket-down'
                document.getElementById('backloop2')?.appendChild(img2)
            }
            else {
                var img2= document.createElement('img');
                img2.src="images/3-rocket.png"
                img2.classList.add('runner-3-engines')
                img2.id='rocket-down'
                document.getElementById('backloop2')?.appendChild(img2)
            }
            big=true
        }
    }
    gene= setInterval(countDown,600);
}
function validateRunners(){
    mistakes=0
    if(runner1.value =='' && runner2.value==''){
        document.getElementById('noRunnerFeedback')?.classList.remove('d-none')
        mistakes++
    }
    else if(runner1.value == runner2.value ){
        document.getElementById('sameRunnerFeedback')?.classList.remove('d-none')
        mistakes++
    }
    else{
        document.getElementById('sameRunnerFeedback')?.classList.add('d-none')
        document.getElementById('noRunnerFeedback')?.classList.add('d-none')
    }
}
var gene:any;
var matt= Math.floor(Math.random() * 50)+10;
function countDown(){
    var countee = <HTMLElement>document.getElementById("count-down"),
        results = <HTMLElement>document.getElementById("results"),
        results2 = <HTMLElement>document.getElementById("results2");
    if (matt==0){
        results.innerHTML='';
        results2.innerHTML='';
        clearInterval(gene)
        $('#endingModal').modal('show')
        var fail1= false
        var fail2= false
         if(runner1Potency>=10){
             results.innerHTML ="<p>Player 1... You haven't brake on time! </p>";
             fail1= true
         }
         if(runner2Potency>=10){
            results.innerHTML ="<p>Player 2... You haven't brake on time!</p>";
            fail2= true
         }
         if(fail1 && fail2){
            results.innerHTML="<p>You both haven't brake on time! it's a... draw?</p>";
         }
         if(!fail1 && fail2 && punt0!==0){
            results2.innerHTML+="<h3><strong>Player 1 WINS!</strong></h3>";
         }
         if(fail1 && !fail2 && punt!==0){
            results2.innerHTML+="<h3><strong>Player 2 WINS!</strong></h3>";
         }
         if(!fail1 && !fail2){
             if (punt0>punt){
                results2.innerHTML="<h3><strong>Player 1 WINS!</strong></h3>";
             }
             else if(punt0 ==0 && punt==0){
                results.innerHTML="<p>Can there be a winner if you didn't even start to run?</p>"
             }
             else{
                results2.innerHTML="<h3><strong>Player 2 WINS!</strong></h3>";
             }
        }
        runner1Potency=0
        runner2Potency=0
        times0=0
        times1=0
    }
    else{
        matt --
    }
    countee.innerHTML= 'Time: '+matt ;
}
function rocketsList(){
    var plantilla= <HTMLElement>document.getElementById('plantilla'),
        garage= <HTMLElement>document.getElementById('rocket-garage'),
        allRockets= littleRockets.concat(hugeRockets);
    for(let i=0; i<allRockets.length;i++){
        var clone:any = plantilla.cloneNode(false),
            infoImg = document.createElement('img'),
            info= document.createElement('div');
        garage.appendChild(clone);
        clone.id='number'+i;
        clone.classList.remove('d-none')
        info.id='shownInfo'+i;
        info.classList.add('shown-info', 'col-5')
        if(allRockets[i].propulsors.length>5){
            infoImg.src="images/6-rocket.png"
        }
        else{
            infoImg.src="images/3-rocket.png"
        }
        clone.appendChild(infoImg)
        clone.appendChild(info)
        infoImg.classList.add('mini')
        info.innerHTML='<p><strong>Rocket Name: </strong>' + allRockets[i].nom +'</p> <p><strong>Engines: </strong>'+ allRockets[i].propulsors + '</p>';
    }
}
$('#exampleModal').on('hidden.bs.modal',function(){
    var garage:any= <HTMLElement>document.getElementById('rocket-garage');
    while(garage.firstChild){
        garage.removeChild(garage.lastChild);
    }
})
$('#endingModal').on('hidden.bs.modal',function(){
    document.getElementById('rocket-down')?.remove()
    document.getElementById('rocket-up')?.remove()
    punt0= 0
    punt=0
    runner1Potency=0
    runner2Potency=0
    times0=0
    times1=0
    big=true
   matt= Math.floor(Math.random() * 50)+10
   clearInterval(gene)
   nextStep()
   selecting()
   document.getElementById('stadium')?.classList.add('d-none')
   document.getElementById('player1')?.classList.add('d-none')
   document.getElementById('player2')?.classList.add('d-none')
})