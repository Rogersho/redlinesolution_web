<?php
// php-backend/functions.php

function sendResponse($data, $status = 200) {
    header('Content-Type: application/json');
    http_response_code($status);
    echo json_encode($data);
    exit;
}

function getRequestBody() {
    return json_decode(file_get_contents('php://input'), true);
}

function getParam($name, $default = null) {
    return $_GET[$name] ?? $default;
}

function getDirectorySize($path) {
    $size = 0;
    if (is_dir($path)) {
        foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path)) as $file) {
            $size += $file->getSize();
        }
    }
    return $size;
}
?>
