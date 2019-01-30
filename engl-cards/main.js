
class Vocabulary{
	constructor(word, translation, transcription){
		if ((word == '') || (translation == '')) {
			return
		}
		this.word = word;
		this.translation = translation;
		this.transcription = transcription;
		this.array = [];
		
	}

}


var sources = {
	globalArray:[],
	currentArr:[],

	part:{
		mainArr:[]
		
	},
	alpha: {
		mainArr:[]
	}
}


// var sources.globalArray;

// var xhr = new XMLHttpRequest();

// xhr.open('GET','text.json', true);
// xhr.send();
	
// var sources.globalArray;

// xhr.onreadystatechange = function(){


// 	if(xhr.readyState === 4){
// 		var page = (xhr.responseText);
// 		// console.log(page);
// 		// document.body.innerHTML = page;	

// 		sources.globalArray = buildObject(page);

// 		makeRandom(sources.globalArray);
		
// 		console.log(xhr.readyState);
// 	}

// }

	
var page = $('#list').text();    						 //получаем исоодный словарь
sources.globalArray = buildObject(page);
makeRandom(sources.globalArray,);


function buildObject(text){
	var arr = [];
	let newArray = [];
	var vocab;

	text.split(' ')										//форматируем исходный словарь
	.map(function(item){

		return item.trim();})

	.forEach(function(item ,index) {
		
		if(!(item === '')){
			newArray.push(item);
		}
		
	});
	 	
	for(var i = 0; i < newArray.length; i++){							// в цикле отдельно вытягиваем латинские и кирилические слова через конструктор в массив
		var j;

	 	j===undefined ? '': i = j ;											// проверка на второе (и далее) вхождение цикла
	 	if (i >= newArray.length) {
	 		break
	 	}

		let eng = /\w+/;
		var word = '';
		var sumStringTranslation = '';
		var trancript = '';

		if(eng.test(newArray[i])){											//вытягиваем латинские слова

			word = newArray[i].toLowerCase();

			// console.log(word);

		if( (newArray[i+1][0] === '[')){
			trancript = newArray[i+1];
		}
		
		 j = i+2;	
		
			for(; !(eng.test(newArray[j])) ;j++){							//вытягиваем и конкатенируем кирилические слова (перевод)
								
				sumStringTranslation += newArray[j] + ' ';
			
			}	
		}

		vocab = new Vocabulary(word, sumStringTranslation, trancript);
				
		arr.push(vocab); 														 //добавляем объект конструктора в массив
			
	}
	return arr;
}	


function mainRender(obj){

			var changeWord = '';

			for(var i = 0; i<(obj.word).length; i++){
				if (i === 0) {
					changeWord = obj.word[i].toUpperCase();
					i++;
				}
				changeWord += obj.word[i];
			}
	$('.origin').text(changeWord);
	$('.translate').text(obj.translation);
	$('.transcript').text(obj.transcription);
}


function makeRandom(arr){					//работает по умолчанию
	var rand = randomizer(0, arr.length);

	arr.forEach(function(item, index){
		if(index === rand){

			mainRender(item);
		}
	});
}

function makePartition(arr){									//разбиваем массив объектов на части

	var numbOfPieces = 10;
	var rangeValue = arr.length/numbOfPieces;	
	var arrayForArrays = [];
		var newArr = [];
		var i = 0;
	
		for (var j = 0 ; j < arr.length; j+=rangeValue) {
			newArr[i] = arr.slice(j, j + rangeValue);
			i++;
		}
		
		
		sources.part.mainArr = newArr;


		var ponyArr = newArr.slice();
		
		console.log(ponyArr);
		elemenCreator(sources.part.mainArr, 'partition')
}


function randomizer(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  function elemenCreator(arr ,type){

  		if (type === 'partition') {
  			$('.alpha').remove();
  		
  			arr.forEach(function(item, index){
  				$('<button class="part_number">'+(index+1)+'</button>')
  				.on('click',function(){

  					sources.currentArr = arr[(this.innerText) - 1];
  					if($('button:has(check)')){
  						$('.contain_parts button').removeClass('check');
  					}
  					$(this).toggleClass('check');
  					console.log((this.innerText))
  				})
  				.appendTo($('.contain_parts'));
  				
  			})
  		}
  		else if(type === 'alphabet'){
  			$('.part_number').remove();
  			
  			arr.forEach(function(item, index){
  				$('<button class="alpha">'+(item[0].word[0])+'</button>')
  				.attr('numb',index)
  				.on('click',function(){
  					sources.currentArr = arr[(this.getAttribute('numb'))];

  					if($('button:has(check)')){
  						$('.contain_alphabet button').removeClass('check');
  					}
  					$(this).toggleClass('check');

  					console.log(this.getAttribute('numb'))
  				})
  				.appendTo($('.contain_alphabet'));
  			})
  		}
  }




//EVENTS
	
	var isPart = false;
	var isAlphabet = false;

  	var rotateValue = 0;


  $('.container-card').	on('click', function(e){

  	e.currentTarget.style = ('transform: rotateY(0deg)');

  	const START = 360;
  	rotateValue += START;

  		e.currentTarget.style = ('transform: rotateY('+rotateValue+'deg)')	;
	
	  	setTimeout(function(){
	  		if (isPart) {
	  			makeRandom(sources.currentArr);
	  		}
	  		else if(isAlphabet){
	  			makeRandom(sources.currentArr);
	  		}
	  		else{

	  		makeRandom(sources.globalArray);
	  		}
		  		
			},100);
	  	// console.log(e.target)
  })


$('.part').on('click', function(e){
	makePartition(sources.globalArray);
	if (isPart) {isPart = false ;$('.part_number').remove()}
	else{isPart = true;}


});

$('.alphabet').on('click', function(e){
	makeAlphabet(sources.globalArray);
	if (isAlphabet) {isAlphabet = false ;$('.alpha').remove()}
	else{isAlphabet = true;}
})