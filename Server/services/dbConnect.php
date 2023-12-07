<?php
header("Access-Control-Allow-Origin: *");
// get request method
//$method = $_SERVER['REQUEST_METHOD'];

$host = "localhost";
$username = "root";
$password = "";
$dnName = "petsClinic";

$conn = mysqli_connect($host, $username, $password, $dnName);

if(!$conn){
	die("Error In Connection:" . mysqli_connect_error() );
}
?>
