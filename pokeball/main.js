
var $field = document.querySelector('.playground');
var $pokeBall = document.querySelector('.item');
$field.addEventListener('click', function someEvent(e){
	var coords = $field.getBoundingClientRect();

	console.log(coords.left, coords.right, coords.top, coords.bottom);
	var x = e.screenX;
	var y = e.screenY;
	// console.log(x, y);
	$pokeBall.style.left = (e.offsetX - 20) + 'px';
	$pokeBall.style.top = (e.offsetY - 20) + 'px';


	setInterval(function bounceBall(){
		for(var i = 0; i < 10; i++){
		var rx = getRandom(0, ((coords.right-coords.left) - 40));
		
		var ry =getRandom(0, ((coords.bottom - coords.top)- 40)); 

		$pokeBall.style.left = (rx) + 'px';
		$pokeBall.style.top = (ry) + 'px';
		}
		// console.log(rx+'x', ry+'y');
	}, 170);
	
}, {once:true});

$field.addEventListener('click', function(e){
	var x = e.screenX;
	var y = e.screenY;
	// console.log(x, y);
	$pokeBall.style.left = (e.offsetX - 20) + 'px';
	$pokeBall.style.top = (e.offsetY - 20) + 'px';
});


function getRandom(min, max){
	var rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
}
