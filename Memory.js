const cards=document.querySelectorAll(".pycls");
const time=document.getElementById("time");

cards.forEach(card=>{card.addEventListener("click",flipcard)});
let lockboard=false;
let hasflipped=false;
let first,second;
const total=0;
let matchedPairs = new Set();
let matched=0;
let ia=0;
let attempt=0;
let timeinterval;
let timelimit=60;
let timeremains=timelimit;

function count(){
	timeinterval=setInterval(()=>{
		timeremains--;
		updatetime();
		if(timeremains<=0){
			clearInterval(timeinterval);
			showloss();
		}
	},1000);
}

function updatetime(){
	time.textContent=`The Remaining Time is ${timeremains}`;
	time.style="position:relative;right:10px;";
}
function addMatchedPair() {
	
	const pairIdentifier = first.dataset.s;
	if (!matchedPairs.has(pairIdentifier)) {
		matchedPairs.add(pairIdentifier);
	}
}


let istime=false;

function flipcard(){
	playflip();
	if(!istime){
		count();
		istime=true;
	}	
	if(lockboard) return;
	if(this===first) return;
	this.classList.add("flip");

	if(!hasflipped){
		hasflipped=true;
		first=this;

		}
	else{
		hasflipped=false;
		second=this;
		attempt++;
		check();
		

	}
		
	
}
function reshuffle(){
	cards.forEach(card=>{
		let random1=Math.floor(Math.random()*cards.length);
		card.style.order=random1;
	})

}
function check(){
	let match=first.dataset.s===second.dataset.s;
	
	if(match){
		playmatch();
		addMatchedPair();
		disable();
		if(match){
		matched++;
		checkwin();
		ia=0;
	}
	
	}
	else{
		unflip();
		ia++;
		
	}
	if(ia===2){
			reshuffleall();

			ia=0;

		}


	
}
function checkwin(){
	if(matchedPairs.size===cards.length/2){

		clearInterval(timeinterval);
		const msg=document.createElement("h1");
		msg.textContent=`You won and attempt is ${attempt}` ;
		msg.style="text-align:center;position:relative;top:50px;font-size:50px";
		msg.classList.add("win-msg");
		document.body.appendChild(msg);
		playwin();

	}

}
function disable(){
	first.removeEventListener("click",flipcard);
	second.removeEventListener("click",flipcard);
	resetboard();
}
function unflip(){
	lockboard=true;
	setTimeout(()=>{
		first.classList.remove("flip");
		second.classList.remove("flip");
		resetboard();
	},300);
}

function resetboard(){
	[hasflipped,lockboard]=[false,false];
	[first,second]=[null,null];
}
(function shuffle(){
	cards.forEach(card=>{
		let random=Math.floor(Math.random()*12);
		card.style.order=random;
	})
})();

function won(){
	
	const msg=document.createElement("h1");
	msg.textContent=`You won and attempt is ${attempt}` ;
	msg.style="text-align:center;position:relative;top:50px;font-size:50px;";
	
	document.body.appendChild(msg);
	
}
function showloss(){
	playlose();
	const mesg=document.createElement("h1");
	mesg.textContent=`Times Up`;
	cards.forEach(card=>{
		card.removeEventListener("click",flipcard);
	})
	mesg.style="font-style:italic;position:relative;top:60px;text-align:center";
	document.body.appendChild(mesg);
}

function reshuffleall(){
	matchedPairs.clear();
	cards.forEach(card=>{
		card.classList.remove("flip");
	});
	cards.forEach(card=>card.addEventListener("click",flipcard));
	cards.forEach(card=>{
		let random2=Math.floor(Math.random()*cards.length);
		card.style.order=random2;
	})
}

const flips=new Audio("Audio/flip.mp3");
const match=new Audio("Audio/match.mp3");
const lose=new Audio("Audio/lose.mp3");
const win=new Audio("Audio/win.mp3");

function playflip(){
	flips.currentTime=0;
	flips.play();

}
function playmatch(){
	match.currentTime=0;
	match.play();

}
function playlose(){
	lose.currentTime=0;
	lose.play();

}
function playwin(){
	win.currentTime=0;
	win.play();

}

const drk=document.getElementById("drk");
drk.addEventListener("click",()=>{
	drk.classList.toggle("active");
	document.body.classList.toggle("drk-thm");
})

console.log(matchedPairs);