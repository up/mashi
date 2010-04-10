<?php
header("Cache-Control: no-cache");

switch ($_GET['action']) {
    case "one":
        echo one();
        break;
    case "two":
        echo two();
        break;
    case "three":
        echo three();
        break;
}

function one() {
	echo '<p>';
	echo 'Hello from function one!';
	echo '</p>';
}

function two() {
	sleep(3);
	echo '<p>';
	echo 'Hello from function two!';
	echo '</p>';
}

function three() {
	sleep(0.5);
	echo '<p>';
	echo 'Hello from function three!';
	echo '</p>';
}

?>