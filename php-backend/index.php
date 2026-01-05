<?php
// php-backend/index.php

// 1. CORS Headers (MUST BE AT THE VERY TOP)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// Allow built-in server to serve static files (like images in /uploads)
if (php_sapi_name() === 'cli-server') {
    $url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $file = __DIR__ . $url;
    if (is_file($file)) {
        return false;
    }
}

// 2. Error Handling (Return JSON instead of HTML)
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Load Utility Functions Early
require_once 'functions.php';

// Catch Fatal Errors
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error !== NULL && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        if (!headers_sent()) {
            header('Content-Type: application/json');
            http_response_code(500);
        }
        echo json_encode([
            'error' => 'Fatal Error: ' . $error['message'],
            'file' => $error['file'],
            'line' => $error['line']
        ]);
    }
});

set_error_handler(function($severity, $message, $file, $line) {
    if (!(error_reporting() & $severity)) return;
    if (!headers_sent()) {
        header('Content-Type: application/json');
    }
    echo json_encode(['error' => $message, 'file' => $file, 'line' => $line]);
    exit;
});

try {
    require_once 'config/db.php';

    $request_uri = $_SERVER['REQUEST_URI'];
    $base_path = '/api';

    // Simple Router
    $path = parse_url($request_uri, PHP_URL_PATH);
    $method = $_SERVER['REQUEST_METHOD'];

    // Remove leading /api if present
    if (strpos($path, $base_path) === 0) {
        $path = substr($path, strlen($base_path));
    }

// Routes
switch (true) {
    // --- EXAMPLE ---
    case ($path === '/example' && $method === 'GET'):
        sendResponse(['message' => 'Hello from the backend routes!']);
        break;

    // --- PROJECTS ---
    case ($path === '/projects' && $method === 'GET'):
        $stmt = $pdo->query("SELECT * FROM projects ORDER BY created_at DESC");
        sendResponse($stmt->fetchAll());
        break;

    case (preg_match('/^\/projects\/(\d+)$/', $path, $matches) && $method === 'GET'):
        $stmt = $pdo->prepare("SELECT * FROM projects WHERE id = ?");
        $stmt->execute([$matches[1]]);
        $project = $stmt->fetch();
        if ($project) {
            sendResponse($project);
        } else {
            sendResponse(['error' => 'Project not found'], 404);
        }
        break;

    case ($path === '/projects' && $method === 'POST'):
        $data = getRequestBody();
        $stmt = $pdo->prepare("INSERT INTO projects (name, client_name, description, image_url, completion_date) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['name'], 
            $data['client_name'], 
            $data['description'], 
            $data['image_url'], 
            $data['completion_date']
        ]);
        sendResponse(['id' => $pdo->lastInsertId(), 'message' => 'Project created'], 201);
        break;

    case (preg_match('/^\/projects\/(\d+)$/', $path, $matches) && $method === 'PUT'):
        $data = getRequestBody();
        $stmt = $pdo->prepare("UPDATE projects SET name = ?, client_name = ?, description = ?, image_url = ?, completion_date = ? WHERE id = ?");
        $stmt->execute([
            $data['name'] ?? '', 
            $data['client_name'] ?? '', 
            $data['description'] ?? '', 
            $data['image_url'] ?? '', 
            $data['completion_date'] ?? null,
            $matches[1]
        ]);
        sendResponse(['message' => 'Project updated']);
        break;

    case (preg_match('/^\/projects\/(\d+)$/', $path, $matches) && $method === 'DELETE'):
        // Get the image URL before deleting
        $stmt = $pdo->prepare("SELECT image_url FROM projects WHERE id = ?");
        $stmt->execute([$matches[1]]);
        $project = $stmt->fetch();
        
        // Delete the physical image file if it exists
        if ($project && $project['image_url']) {
            // Extract filename from URL (e.g., /api/uploads/12345.jpg -> 12345.jpg)
            if (preg_match('/\/uploads\/(.+)$/', $project['image_url'], $fileMatch)) {
                $filename = $fileMatch[1];
                $filePath = __DIR__ . '/uploads/' . $filename;
                if (file_exists($filePath)) {
                    unlink($filePath);
                }
            }
        }
        
        // Now delete the project from database
        $stmt = $pdo->prepare("DELETE FROM projects WHERE id = ?");
        $stmt->execute([$matches[1]]);
        sendResponse(['message' => 'Project deleted']);
        break;

    // --- CONTACT ---
    case ($path === '/contact' && $method === 'POST'):
        $data = getRequestBody();
        $subject = isset($data['service']) ? "Inquiry about " . $data['service'] : 'General Inquiry';
        $stmt = $pdo->prepare("INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['name'], 
            $data['email'], 
            $data['phone'], 
            $subject, 
            $data['message']
        ]);
        sendResponse(['message' => 'Message sent successfully!', 'id' => $pdo->lastInsertId()], 201);
        break;

    // --- SERVICE REQUESTS ---
    case ($path === '/service-requests' && $method === 'POST'):
        $data = getRequestBody();
        $stmt = $pdo->prepare("INSERT INTO service_requests (service_id, customer_name, customer_email, customer_phone, details, preferred_date, preferred_time, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')");
        $details = "Service: " . $data['service_name'] . ". Details: " . $data['details'];
        $stmt->execute([
            0, // Default int ID
            $data['customer_name'],
            $data['customer_email'],
            $data['customer_phone'],
            $details,
            $data['preferred_date'] ?? null,
            $data['preferred_time'] ?? null
        ]);
        sendResponse(['message' => 'Request submitted successfully!', 'id' => $pdo->lastInsertId()], 201);
        break;

    // --- ADMIN ---
    case ($path === '/admin/login' && $method === 'POST'):
        $data = getRequestBody();
        
        $columns = $pdo->query("SHOW COLUMNS FROM users")->fetchAll(PDO::FETCH_COLUMN);
        $passCol = in_array('password_hash', $columns) ? 'password_hash' : 'password';
        
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? OR username = ?");
        $stmt->execute([$data['email'], $data['email']]);
        $user = $stmt->fetch();

        if ($user && password_verify($data['password'], $user[$passCol])) {
            sendResponse([
                'success' => true,
                'token' => 'mock-token-' . $user['id'],
                'user' => [
                    'email' => $user['email'] ?? '', 
                    'name' => $user['username'], 
                    'role' => $user['role_id']
                ]
            ]);
        } else {
            sendResponse(['error' => 'Invalid credentials'], 401);
        }
        break;

    case ($path === '/admin/stats' && $method === 'GET'):
        $stats = [];
        $stats['totalMessages'] = $pdo->query("SELECT COUNT(*) FROM contact_messages")->fetchColumn();
        $stats['unreadMessages'] = $pdo->query("SELECT COUNT(*) FROM contact_messages WHERE is_read = 0")->fetchColumn();
        $stats['readMessages'] = $stats['totalMessages'] - $stats['unreadMessages'];
        $stats['totalRequests'] = $pdo->query("SELECT COUNT(*) FROM service_requests")->fetchColumn();
        $stats['pendingRequests'] = $pdo->query("SELECT COUNT(*) FROM service_requests WHERE status = 'pending'")->fetchColumn();
        $stats['completedRequests'] = $pdo->query("SELECT COUNT(*) FROM service_requests WHERE status = 'completed'")->fetchColumn();
        $stats['systemHealth'] = '98%';
        $stats['serverUptime'] = time(); // Simple mock
        $stats['storageUsed'] = getDirectorySize(__DIR__ . '/uploads');
        sendResponse($stats);
        break;

    case ($path === '/admin/messages' && $method === 'GET'):
        $stmt = $pdo->query("SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 100");
        sendResponse($stmt->fetchAll());
        break;

    case ($path === '/admin/service-requests' && $method === 'GET'):
        $stmt = $pdo->query("SELECT * FROM service_requests ORDER BY created_at DESC LIMIT 100");
        sendResponse($stmt->fetchAll());
        break;

    case (preg_match('/^\/admin\/messages\/(\d+)\/read$/', $path, $matches) && $method === 'PUT'):
        $stmt = $pdo->prepare("UPDATE contact_messages SET is_read = 1 WHERE id = ?");
        $stmt->execute([$matches[1]]);
        sendResponse(['message' => 'Message marked as read']);
        break;

    case (preg_match('/^\/admin\/service-requests\/(\d+)\/status$/', $path, $matches) && $method === 'PUT'):
        $data = getRequestBody();
        $stmt = $pdo->prepare("UPDATE service_requests SET status = ? WHERE id = ?");
        $stmt->execute([$data['status'], $matches[1]]);
        sendResponse(['message' => 'Request status updated']);
        break;

    case (preg_match('/^\/admin\/messages\/(\d+)$/', $path, $matches) && $method === 'DELETE'):
        $stmt = $pdo->prepare("DELETE FROM contact_messages WHERE id = ?");
        $stmt->execute([$matches[1]]);
        sendResponse(['message' => 'Message deleted']);
        break;

    case (preg_match('/^\/admin\/service-requests\/(\d+)$/', $path, $matches) && $method === 'DELETE'):
        $stmt = $pdo->prepare("DELETE FROM service_requests WHERE id = ?");
        $stmt->execute([$matches[1]]);
        sendResponse(['message' => 'Service request deleted']);
        break;

    case ($path === '/admin/messages/all' && $method === 'DELETE'):
        $pdo->exec("DELETE FROM contact_messages");
        sendResponse(['message' => 'All messages deleted']);
        break;

    case ($path === '/admin/service-requests/all' && $method === 'DELETE'):
        $pdo->exec("DELETE FROM service_requests");
        sendResponse(['message' => 'All service requests deleted']);
        break;

    // --- USER MANAGEMENT ---
    case ($path === '/admin/users' && $method === 'GET'):
        $stmt = $pdo->query("SELECT id, username, email, role_id, created_at FROM users WHERE username != 'Webmaster' ORDER BY created_at DESC");
        sendResponse($stmt->fetchAll());
        break;

    case ($path === '/admin/users' && $method === 'POST'):
        $data = getRequestBody();
        $hashed = password_hash($data['password'], PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password, role_id) VALUES (?, ?, ?, ?)");
        $stmt->execute([$data['username'], $data['email'], $hashed, $data['role_id'] ?? 1]);
        sendResponse(['id' => $pdo->lastInsertId(), 'message' => 'User created'], 201);
        break;

    case (preg_match('/^\/admin\/users\/(\d+)$/', $path, $matches) && $method === 'PUT'):
        $data = getRequestBody();
        $userId = $matches[1];
        
        $fields = ["username = ?", "email = ?"];
        $params = [$data['username'], $data['email']];
        
        if (!empty($data['password'])) {
            $fields[] = "password = ?";
            $params[] = password_hash($data['password'], PASSWORD_DEFAULT);
        }
        
        $params[] = $userId;
        $sql = "UPDATE users SET " . implode(", ", $fields) . " WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        sendResponse(['message' => 'User updated']);
        break;

    case (preg_match('/^\/admin\/users\/(\d+)$/', $path, $matches) && $method === 'DELETE'):
        $userId = $matches[1];
        $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        sendResponse(['message' => 'User deleted']);
        break;

    // --- UPLOAD ---
    case ($path === '/upload/project-image' && $method === 'POST'):
        if (!isset($_FILES['image'])) {
            sendResponse(['error' => 'Please upload a file'], 400);
        }
        $file = $_FILES['image'];
        $uploadDir = 'uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        $filename = time() . '-' . mt_rand(1000, 9999) . '.' . pathinfo($file['name'], PATHINFO_EXTENSION);
        $targetFile = $uploadDir . $filename;
        
        if (move_uploaded_file($file['tmp_name'], $targetFile)) {
            // Store as relative path /api/uploads/... for consistency
            $imageUrl = "/api/uploads/$filename";
            sendResponse(['imageUrl' => $imageUrl]);
        } else {
            sendResponse(['error' => 'Failed to upload file'], 500);
        }
        break;

    default:
        sendResponse(['error' => 'Endpoint not found: ' . $path], 404);
        break;
}
} catch (\Throwable $e) {
    sendResponse(['error' => $e->getMessage()], 500);
}
?>
