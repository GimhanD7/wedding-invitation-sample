<?php
// api/wishes.php - Guestbook & blessings wall API

require_once __DIR__ . '/db.php';
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM wishes WHERE is_approved = 1 ORDER BY created_at DESC");
        $wishes = $stmt->fetchAll();
        echo json_encode([
            'success' => true,
            'count' => count($wishes),
            'wishes' => $wishes
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit();
}

if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true) ?: $_POST;

    $action = $data['action'] ?? 'add';

    if ($action === 'like') {
        $id = (int)($data['id'] ?? 0);
        if ($id > 0) {
            $stmt = $pdo->prepare("UPDATE wishes SET likes = likes + 1 WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true, 'message' => 'Liked!']);
            exit();
        }
    }

    $name = trim($data['name'] ?? '');
    $relationship = trim($data['relationship'] ?? 'Friend & Well-wisher');
    $message = trim($data['message'] ?? '');

    if (empty($name) || empty($message)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Please provide both your name and blessing message.']);
        exit();
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO wishes (name, relationship, message) VALUES (?, ?, ?)");
        $stmt->execute([$name, $relationship, $message]);
        $newId = $pdo->lastInsertId();

        $newWishStmt = $pdo->prepare("SELECT * FROM wishes WHERE id = ?");
        $newWishStmt->execute([$newId]);
        $newWish = $newWishStmt->fetch();

        echo json_encode([
            'success' => true,
            'message' => 'Subha Mangalam! Your blessing has been added to our guestbook.',
            'wish' => $newWish
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit();
}
