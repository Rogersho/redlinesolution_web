<?php
require_once 'config/db.php';

echo "Fixing image URLs in database...\n\n";

// Get all projects with image URLs
$stmt = $pdo->query("SELECT id, name, image_url FROM projects WHERE image_url IS NOT NULL");
$projects = $stmt->fetchAll();

$fixed = 0;
foreach ($projects as $project) {
    $oldUrl = $project['image_url'];
    $newUrl = $oldUrl;
    
    // Extract just the filename
    if (preg_match('/\/uploads\/(.+)$/', $oldUrl, $matches)) {
        $filename = $matches[1];
        $newUrl = "/api/uploads/$filename";  // Store as /api/uploads/... format
        
        if ($oldUrl !== $newUrl) {
            $updateStmt = $pdo->prepare("UPDATE projects SET image_url = ? WHERE id = ?");
            $updateStmt->execute([$newUrl, $project['id']]);
            echo "✓ Fixed: {$project['name']}\n";
            echo "  Old: $oldUrl\n";
            echo "  New: $newUrl\n\n";
            $fixed++;
        }
    }
}

echo "\nDone! Fixed $fixed URLs.\n";
?>
