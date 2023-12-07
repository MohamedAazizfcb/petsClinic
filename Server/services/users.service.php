<?php
require 'dbConnect.php';
include ('echos.service.php');
function generateRandomString($length = 20) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%^&*';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $charactersLength - 1)];
    }
    return $randomString;
}

function login($inputData){
    global $conn;
    $username = mysqli_real_escape_string($conn, $inputData['username']);
    $password = mysqli_real_escape_string($conn, $inputData['password']);

    $query = "SELECT * from users WHERE username = \"".$username."\" AND password = \"".$password."\"";
    $query_result = mysqli_query($conn, $query);
    if($query_result)
    {
        if(mysqli_num_rows($query_result) > 0)
        {
            $records = mysqli_fetch_all($query_result, MYSQLI_ASSOC);
            while(true)
            {
                try 
                {
                    $token = generateRandomString();
                    $query = "UPDATE users SET userToken=\"".$token."\" WHERE username =\"".$username."\"";
                    $query_result = mysqli_query($conn, $query);
                    if($query_result)
                    {
                        break;
                    }
                }
                catch(Exception $e) {}
            }
            $data = resultBuilder(200, "Success!", $token);
            return $data;
        }
        else
        {
            $data = resultBuilder(404, "Not Found!", []);
            return $data;
        }
    }
    else
    {
        $data = resultBuilder(500, "Internal Server Error", []);
        return $data;
    }
}
?>
