var count = 0;
var _count = 4;
var arr = [];
var x;
var direction;
var bodySize = [3, 2, 1, 0];
var r = 0;
var speed = 100;
var appel = Math.ceil(Math.random() * 749);

function tableCreate() {
	document.getElementById("tabl").innerHTML = "";
	var tab = document.getElementById("tabl");

	for (i = 0; i < 25; i++) {
		var trtr = document.createElement("tr");

		for (j = 0; j < 30; j++) {
			var a = document.createElement("td");
			a.setAttribute("id", "ta" + count);
			arr.push(a);
			count++;
			trtr.appendChild(a);
		}
		tab.appendChild(trtr);
	}
}

function rese() {
	count = 0;
	_count = 5;
	arr = [];
	direction;
	bodySize = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	r = 0;
	speed = 100;
	appel = Math.ceil(Math.random() * 749);

	tableCreate()
}

function move2(side) {
	if (side + direction == 0) {
		return;
	}
	clearInterval(x);
	arr[appel].style.backgroundColor = "red";

	x = setInterval(function () {
		arr[_count].style.backgroundColor = "white";
		for (i = 0; i < bodySize.length; i++) {
			arr[bodySize[i]].style.backgroundColor = "white";
		}

		for (i = bodySize.length - 1; i > 0; i--) {
			bodySize[i] = bodySize[i - 1];
		}

		bodySize[0] = _count;
		_count += side;

		if (_count % 30 == 0 && side == 1) {
			_count -= 30;
		} else if ((_count + 1) % 30 == 0 && side == -1) {
			_count += 30;
		} else if (_count < 0) {
			_count += 750;
		} else if (_count > 749) {
			_count -= 750;
		}

		// Check Eating
		if (appel == _count) {
			r++;
			speed -= 10;
			document.getElementById('score').innerHTML = "appels " + r;
			bodySize.push(0);
			appel = Math.ceil(Math.random() * 749);
			arr[appel].style.backgroundColor = "red";
		}

		for (i = 0; i < bodySize.length; i++) {
			if (_count == bodySize[i]) {
				clearInterval(x);
				rese();
				return;
			}
		}

		arr[_count].style.backgroundColor = "black";
		for (i = 0; i < bodySize.length; i++) {
			arr[bodySize[i]].style.backgroundColor = "black";
		}

	}, speed);
	direction = side;
}

function movement(event) {
	switch (event.keyCode) {
		case 37: //left
			move2(-1);
			break;
		case 38: //up
			move2(-30);
			break;
		case 39: //right
			move2(1);
			break;
		case 40: //down
			move2(30);
			break;
	}
}

tableCreate();
