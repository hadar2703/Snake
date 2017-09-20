/****************SETTING AREA***************/
var table_Width = 30;
var table_Height = 30;
var speed = 100; // Higher = Slower
var maxSpeed = 50; // Lower = Faster
/*******************************************/

var headSnake = 4;
var bodySize = [3, 2, 1, 0];
var max_Cells = table_Width * table_Height;
var cell_Id = 0; // Counter ID For tableCreate()
var arr = [];
var loopMovement;
var direction;
var appelScore = 0;
var appel = Math.ceil(Math.random() * max_Cells);

function tableCreate() {
	document.getElementById("tabl").innerHTML = "";
	var tab = document.getElementById("tabl");

	for (i = 0; i < table_Height; i++) {
		var trtr = document.createElement("tr");

		for (j = 0; j < table_Width; j++) {
			var a = document.createElement("td");
			a.setAttribute("id", "ta" + cell_Id);
			arr.push(a);
			cell_Id++;
			trtr.appendChild(a);
		}
		tab.appendChild(trtr);
	}
}

function rese() {
	cell_Id = 0;
	headSnake = 4;
	arr = [];
	bodySize = [3, 2, 1, 0];
	appelScore = 0;
	speed = 100;
	appel = Math.ceil(Math.random() * max_Cells);

	tableCreate();
}

function movement(side) {
	if (side + direction == 0) {
		return;
	}
	clearInterval(loopMovement);
	arr[appel].style.backgroundColor = "red";

	loopMovement = setInterval(function () {
		arr[headSnake].style.backgroundColor = "white";
		for (i = 0; i < bodySize.length; i++) {
			arr[bodySize[i]].style.backgroundColor = "white";
		}

		for (i = bodySize.length - 1; i > 0; i--) {
			bodySize[i] = bodySize[i - 1];
		}

		bodySize[0] = headSnake;
		headSnake += side;

		if (headSnake % table_Width == 0 && side == 1) {
			headSnake -= table_Width;
		} else if ((headSnake + 1) % table_Width == 0 && side == -1) {
			headSnake += table_Width;
		} else if (headSnake < 0) {
			headSnake += max_Cells;
		} else if (headSnake > max_Cells) {
			headSnake -= max_Cells;
		}

		// Check Eating
		if (appel == headSnake) {
			appelScore++;
			if (speed >= maxSpeed) {
				speed -= 10;
			}
			document.getElementById('score').innerHTML = "Apple Score: " + appelScore;
			bodySize.push(0);
			bodySize.push(0);
			appel = Math.ceil(Math.random() * max_Cells);
			arr[appel].style.backgroundColor = "red";
		}

		for (i = 0; i < bodySize.length; i++) {
			if (headSnake == bodySize[i]) {
				clearInterval(loopMovement);
				rese();
				return;
			}
		}

		arr[headSnake].style.backgroundColor = "green";
		for (i = 0; i < bodySize.length; i++) {
			arr[bodySize[i]].style.backgroundColor = "yellow";
		}

	}, speed);
	direction = side;
}

function keyListen(event) {
	switch (event.keyCode) {
		case 37: //left
			movement(-1);
			break;
		case 38: //up
			movement(-table_Width);
			break;
		case 39: //right
			movement(1);
			break;
		case 40: //down
			movement(table_Width);
			break;
	}
}

tableCreate();
