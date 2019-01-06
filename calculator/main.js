


$('form').on('submit', function(e){
	e.preventDefault();
	var $input = $('.kv').val();
	var $tarifBelow = $('.tarif_below').val();
	var $tarifOver = $('.tarif_over').val();

	var result;

	if($input<=100 && $input>0){
		result = ($input * $tarifBelow).toFixed(2);
		calculate(result);
		$('.kv').val('');

	}
	else if($input>100 && $input>0){
		var stepOne = 100 * $tarifBelow;
		result = ((($input - 100) * $tarifOver) + stepOne).toFixed(2);
		calculate(result);
	}
})

function calculate(value){
		$('.result').remove();
		var $resContainer = $('<div class ="result"></div>');

	$('form').append($resContainer.text(value + ' грн'));
}