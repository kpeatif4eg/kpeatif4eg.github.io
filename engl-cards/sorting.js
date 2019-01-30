
function compare(obj1, obj2){

	if (obj1.word < obj2.word)
		return -1;
	if (obj1.word > obj2.word) 
		return 1;
	return 0; 
}

function makeAlphabet(arr){
	var collect;
	var newArr = [];
	var sortedAlphabetically = [];
	
		
	arr.sort(compare);
		
		var acumulate = collectArrays();
	
	arr.forEach(function(item, index, curArr){

		newArr.push(item);

		if(((index < curArr.length-1) && (item.word[0] !== curArr[index+1].word[0])) || index >= curArr.length -1){		//вызываем функцию которая собирает массивы слов начинающихся с одинаковых букв
			acumulate(newArr);
			newArr = [];
			
		}
		if (curArr.length-1 === index) {		//получаем массив массивов слов отсортированых по алфавиту

			sortedAlphabetically = acumulate();

			sources.alpha.mainArr = sortedAlphabetically;
			console.log(sortedAlphabetically,'sorts');
			elemenCreator(sources.alpha.mainArr, 'alphabet')

		}
		
	})


}
	

function collectArrays(){

	var collector = [];					//замыканием собираем в переменную массивы слов начинабщиеся с одинаковой буквы
		
		
		return function(arr){
			var array;

			if (Array.isArray(arr)) {
				array = arr.slice();
			}
			else{
				return collector;
			}
       	 	collector.push(array);

        return collector;	 
     }
}





