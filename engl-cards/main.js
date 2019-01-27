
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
	set grub(value){
		[this.word, this.translation ] = value;
		
	}
	get grub(){
		return `${this.word} ${this.translation}`
	}
}



var globalArray;

// var xhr = new XMLHttpRequest();

// xhr.open('GET','text.json', true);
// xhr.send();
	
// var globalArray;

// xhr.onreadystatechange = function(){


// 	if(xhr.readyState === 4){
// 		var page = (xhr.responseText);
// 		// console.log(page);
// 		// document.body.innerHTML = page;	

// 		globalArray = buildObject(page);

// 		render(globalArray);
		
// 		console.log(xhr.readyState);
// 	}

// }


var page = $('#list').text();
globalArray = buildObject(page);
render(globalArray);


function buildObject(text){
	var arr = [];
	let newArray = [];
	var vocab;

	text.split(' ')					//форматируем исходный словарь
	.map(function(item){

		return item.trim();})

	.forEach(function(item ,index) {
		

		if(!(item === '')){
			newArray.push(item);
		}
		
	});
	 	
	for(var i = 0; i < newArray.length; i++){		// в цикле отдельно вытягиваем латинские и кирилические слова через конструктор в массив
		var j;

	 	j===undefined ? '': i = j ;						// проверка на второе (и далее) вхождение цикла
	 	if (i >= newArray.length) {
	 		break
	 	}

		let eng = /\w+/;
		var word = '';
		var sumStringTranslation = '';
		var trancript = '';	

		if(eng.test(newArray[i])){		//вытягиваем латинские слова

			word = newArray[i];

			// console.log(word);

		if( (newArray[i+1][0] === '[')){
			trancript = newArray[i+1];
		}
		
		 j = i+2;	
		

			for(; !(eng.test(newArray[j])) ;j++){		//конкатенируем кирилические слова (перевод)
				
				
				sumStringTranslation += newArray[j] + ' ';
			
			}	
		}

		vocab = new Vocabulary(word, sumStringTranslation, trancript);
				
		arr.push(vocab);  //добавляем объект конструктора в массив
			
	}
	return arr;
}	



function render(arr){
	var rand = randomizer(0, arr.length);



	arr.forEach(function(item, index){
		if(index === rand){
			$('.origin').text(item.word);
			$('.translate').text(item.translation);
			$('.transcript').text(item.transcription);	

			getImg(item.word);		
		}
	})
}

function randomizer(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }


  	var rotateValue = 0;
  $('.container-card').	on('click', function(e){

  	e.currentTarget.style = ('transform: rotateY(0deg)');

  	const START = 360;
  	rotateValue += START;

  		e.currentTarget.style = ('transform: rotateY('+rotateValue+'deg)')	;
	
	  	setTimeout(function(){
	  		render(globalArray);
		  		
			},100);
	  	// console.log(e.target)
  })

//   
// 



function getImg(key){
	// var xhr2 = new XMLHttpRequest();

	// xhr2.open('GET','text.json', true);
	// xhr2.send();
	// xhr2.onreadystatechange = function(){
	// 	console.log(xhr2.responseText, 'xhr2');
	// }
}