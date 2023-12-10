<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: *");
//header("Content-Type: application/json"); // data we send from backend
header("Access-Control-Allow-Method: POST"); // only allow get calls from outside
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-With");

include('../services/users.service.php');

$requestMethod = $_SERVER['REQUEST_METHOD'];

if($requestMethod == "POST")
{
    $inputData = $_POST;
    $img = userImage($inputData);
    echo $img;
}
else
{
    
    $data = resultBuilder(405, $requestMethod. "Method Not Allowed", []);
    echo $data;

}

?>
