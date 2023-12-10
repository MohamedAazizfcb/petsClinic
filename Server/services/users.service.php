<?php
require 'dbConnect.php';
include ('echos.service.php');
header('Content-Type: image/jpeg');

define ('SITE_ROOT', realpath(dirname(__FILE__)));
function generateRandomString($length = 20) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%^&*';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $charactersLength - 1)];
    }
    return $randomString;
}
function usernameOREmailExists($username, $email){
    global $conn;
    $query = "Select *  From users where username=\"".$username."\" or email = \"".$email."\"";
    $query_result = mysqli_query($conn, $query);
    if($query_result && mysqli_num_rows($query_result) > 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}
function uploadImage($username, $imageData)
{
    global $conn;
    $targetDir = SITE_ROOT."\usersImages\\"; 
    $fileName = basename($imageData["name"]); 
    $filePath = $targetDir . $fileName; 
    $fileType = pathinfo($filePath,PATHINFO_EXTENSION); 
    $newFileName = $username. "." .$fileType;
    $newFilePath = $targetDir.$newFileName;
    $allowTypes = array('jpg','png','jpeg','gif'); 
    if(in_array($fileType, $allowTypes))
    {
        if(move_uploaded_file($imageData["tmp_name"], $newFilePath))
        { 
            $query = "INSERT INTO usersimages (username, imgName) 
                     VALUES (\"".$username."\",\"".$newFileName."\")";
            $query_result = mysqli_query($conn, $query);
            if($query_result)
            { 
                return true;
            }
            else
            { 
                return false;
            }  
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}
function deleteImage($username)
{
    global $conn;
    $query = "SELECT imgName FROM usersimages WHERE username = \"".$username."\"";
    $query_result = mysqli_query($conn, $query);
    if($query_result && mysqli_num_rows($query_result) > 0)
    {
        $targetDir = SITE_ROOT."\usersImages\\"; 
        $imgName = mysqli_fetch_all($query_result, MYSQLI_ASSOC)[0]["imgName"];
        $fileName = basename($imgName); 
        $targetFilePath = $targetDir . $fileName; 
        if(unlink($targetFilePath))
        {
            $query = "DELETE FROM usersImages WHERE username = \"".$username."\"";
            $query_result = mysqli_query($conn, $query);
            if($query_result)
            {
                return true;
            }
            else
            {
                return false;
            } 
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}



function login($inputData){
    global $conn;
    if (!isset($inputData['username']) || !isset($inputData['pass']))
    {
        $data = resultBuilder(500, "Incomplete Data!", []);
        return $data;
    }
    $username = trim(mysqli_real_escape_string($conn, $inputData['username']));
    $password = trim(mysqli_real_escape_string($conn, $inputData['pass']));
    
    $query = "SELECT * from users WHERE username = \"".$username."\" AND pass = \"".$password."\"";
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
function signup($inputData){
    global $conn;
    if (!isset($inputData['username']) || !isset($inputData['email']) ||
        !isset($inputData['pass']) || !isset($inputData['fullname']) ||
        !isset($_FILES["imageData"]) || !isset($inputData['accountType']))
    {
        $data = resultBuilder(500, "Incomplete Data!", []);
        return $data;
    }
    $username = trim(mysqli_real_escape_string($conn, $inputData['username']));
    $email = trim(mysqli_real_escape_string($conn, $inputData['email']));
    $password = trim(mysqli_real_escape_string($conn, $inputData['pass']));
    $fullname = trim(mysqli_real_escape_string($conn, $inputData['fullname']));
    $accountType = trim(mysqli_real_escape_string($conn, $inputData['accountType']));
    $imageData = $_FILES["imageData"];

    if (usernameOREmailExists($username,$email))
    {
        $data = resultBuilder(500, "Invalid username or email", []);
        return $data;
    }

    if(uploadImage($username,$imageData))
    {
        $query = "INSERT INTO users ( username, email, pass, fullname, accountType) VALUES 
        (\"".$username."\",\"".$email."\",\"".$password."\",\"".$fullname."\",\"".$accountType."\")";

        $query_result = mysqli_query($conn, $query);
        if($query_result)
        {
            $data = resultBuilder(200, "SUCESS", []);
            return $data;
        }
        else
        {
            deleteImage($username);
            $data = resultBuilder(500, "Internal Server Error", []);
            return $data;
        }
    }
    else
    {
        $data = resultBuilder(500, "Can't upload image", []);
        return $data;
    }
    
}
function deleteUser($inputData){
    global $conn;
    if (!isset($inputData['username']))
    {
        $data = resultBuilder(500, "Incomplete Data!", []);
        return $data;
    }
    $username = trim(mysqli_real_escape_string($conn, $inputData['username']));
    $InvMail = 'INVALIDMAIL';
    if (!usernameOREmailExists($username,$InvMail))
    {
        $data = resultBuilder(500, "Invalid username", []);
        return $data;
    }
    $query = "DELETE FROM users WHERE username = \"".$username."\"";
    $query_result = mysqli_query($conn, $query);
    deleteImage($username);
    if($query_result)
    {
        $data = resultBuilder(200, "SUCESS", []);
        return $data;
    }
    else
    {
        $data = resultBuilder(500, "Internal Server Error", []);
        return $data;
    }
}
function editUser($inputData){
    global $conn;
    if (!isset($inputData['username']) || !isset($inputData['email']) ||
        !isset($inputData['pass']) || !isset($inputData['fullname']) ||
        !isset($_FILES["imageData"]) || !isset($inputData['accountType']))
    {
        $data = resultBuilder(500, "Incomplete Data!", []);
        return $data;
    }
    $username = trim(mysqli_real_escape_string($conn, $inputData['username']));
    $email = trim(mysqli_real_escape_string($conn, $inputData['email']));
    $password = trim(mysqli_real_escape_string($conn, $inputData['pass']));
    $fullname = trim(mysqli_real_escape_string($conn, $inputData['fullname']));
    $accountType = trim(mysqli_real_escape_string($conn, $inputData['accountType']));
    $imageData = $_FILES["imageData"];

    if (!usernameOREmailExists($username,$email))
    {
        $data = resultBuilder(500, "Invalid username or email", []);
        return $data;
    }

    deleteImage($username);
    if(uploadImage($username,$imageData))
    {
        $query = "UPDATE users SET pass = \"" .$password. "\", fullname=\"".$fullname."\",accountType=\""
                    .$accountType."\" WHERE username = \"".$username."\"";
        $query_result = mysqli_query($conn, $query);
        if($query_result)
        {
            $data = resultBuilder(200, "SUCESS", []);
            return $data;
        }
        else
        {
            deleteImage($username);
            $data = resultBuilder(500, "Internal Server Error", []);
            return $data;
        }
    }
    else
    {
        $data = resultBuilder(500, "Can't upload image", []);
        return $data;
    }
    
}
function myUser($inputData){
    global $conn;
    $targetDir = SITE_ROOT."\usersImages\\"; 
    if (!isset($inputData['token']))
    {
        $data = resultBuilder(500, "Incomplete Data!", []);
        return $data;
    }
    $token = trim(mysqli_real_escape_string($conn, $inputData['token']));
    $query = "SELECT * from users WHERE userToken = \"".$token."\"";
    $query_result = mysqli_query($conn, $query);
    if($query_result)
    {
        if(mysqli_num_rows($query_result) > 0)
        {
            $records = mysqli_fetch_all($query_result, MYSQLI_ASSOC)[0];
            $username = $records['username'];
            $query = "SELECT * from usersImages WHERE username = \"".$username."\"";
            $query_result = mysqli_query($conn, $query);
            if($query_result)
            {
                $data = resultBuilder(200, "Success!", $records);
                return $data;
            }

            
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
function userImage($inputData){
    global $conn;
    $targetDir = SITE_ROOT."\usersImages\\"; 
    if (!isset($inputData['token']))
    {
        $data = resultBuilder(500, "Incomplete Data!", []);
        return $data;
    }
    $token = trim(mysqli_real_escape_string($conn, $inputData['token']));
    $query = "SELECT * from users WHERE userToken = \"".$token."\"";
    $query_result = mysqli_query($conn, $query);
    if($query_result)
    {
        if(mysqli_num_rows($query_result) > 0)
        {
            $records = mysqli_fetch_all($query_result, MYSQLI_ASSOC)[0];
            $username = $records['username'];
            $query = "SELECT * from usersImages WHERE username = \"".$username."\"";
            $query_result = mysqli_query($conn, $query);
            if($query_result)
            {
                $imgName = mysqli_fetch_all($query_result, MYSQLI_ASSOC)[0]['imgName'];
                $imgPath = $targetDir.$imgName;
                $im = readfile($targetDir.$imgName);
                return $im;
            }

            
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
function isLoggedIn($inputData){
    global $conn;
    if (!isset($inputData['token']))
    {
        $data = resultBuilder(500, "Incomplete Data!", []);
        return $data;
    }
    $token = trim(mysqli_real_escape_string($conn, $inputData['token']));
    
    $query = "SELECT userToken from users WHERE userToken = \"".$token."\"";
    $query_result = mysqli_query($conn, $query);
    if($query_result)
    {
        if(mysqli_num_rows($query_result) > 0)
        {
            $records = mysqli_fetch_all($query_result, MYSQLI_ASSOC)[0];
            if($token == $records['userToken'])
            {
                $data = resultBuilder(200, "Success!", $token);
                return $data;
            }
            else
            {
                $data = resultBuilder(500, "Not LoggedIn!",[]);
                return $data;
            }
        }
        else
        {
            $data = resultBuilder(500, "Not LoggedIn!", []);
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
