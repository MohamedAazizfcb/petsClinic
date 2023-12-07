<?php
function resultBuilder($status, $message, $records)
{
    $data = [
                "status" => $status,
                "message" => $message,
                "data" => $records,
            ];
            header("HTTP/1.0".$status.$message);
    return json_encode($data);
}
?>