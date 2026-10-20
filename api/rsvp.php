<?php
// api/rsvp.php - Submit RSVP and view statistics

require_once __DIR__ . '/db.php';
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        // Compute summary statistics
        $statsStmt = $pdo->query("
            SELECT 
                COUNT(*) as total_responses,
                SUM(CASE WHEN attending = 'yes' THEN 1 ELSE 0 END) as attending_count,
                SUM(CASE WHEN attending = 'no' THEN 1 ELSE 0 END) as declined_count,
                SUM(CASE WHEN attending = 'yes' THEN guest_count + children_count ELSE 0 END) as total_headcount,
                SUM(CASE WHEN attending = 'yes' THEN children_count ELSE 0 END) as total_children
            FROM rsvps
        ");
        $stats = $statsStmt->fetch();

        // Dietary preferences breakdown
        $dietaryStmt = $pdo->query("
            SELECT dietary, COUNT(*) as count 
            FROM rsvps 
            WHERE attending = 'yes' AND dietary IS NOT NULL AND dietary != '' 
            GROUP BY dietary
        ");
        $dietaryStats = $dietaryStmt->fetchAll();

        // Optional: list all for admin
        $all = [];
        if (isset($_GET['admin']) && $_GET['admin'] === '1') {
            $allStmt = $pdo->query("SELECT * FROM rsvps ORDER BY created_at DESC");
            $all = $allStmt->fetchAll();
        }

        echo json_encode([
            'success' => true,
            'stats' => [
                'total_responses' => (int)($stats['total_responses'] ?? 0),
                'attending_count' => (int)($stats['attending_count'] ?? 0),
                'declined_count' => (int)($stats['declined_count'] ?? 0),
                'total_headcount' => (int)($stats['total_headcount'] ?? 0),
                'total_children' => (int)($stats['total_children'] ?? 0),
                'dietary_breakdown' => $dietaryStats,
            ],
            'rsvps' => $all
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit();
}

if ($method === 'POST') {
    // Read JSON payload
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);

    if (!$data) {
        // Fallback to $_POST form-data
        $data = $_POST;
    }

    $guest_name = trim($data['guest_name'] ?? '');
    if (empty($guest_name)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Please provide your full name.']);
        exit();
    }

    $attending = ($data['attending'] ?? 'yes') === 'no' ? 'no' : 'yes';
    $guest_count = max(1, (int)($data['guest_count'] ?? 1));
    $children_count = max(0, (int)($data['children_count'] ?? 0));
    
    // Events
    $events = $data['events'] ?? [];
    if (is_array($events)) {
        $events = implode(', ', $events);
    }
    
    $dietary = trim($data['dietary'] ?? 'Traditional Sri Lankan Buffet');
    $phone = trim($data['phone'] ?? '');
    $email = trim($data['email'] ?? '');
    $message = trim($data['message'] ?? '');

    try {
        $stmt = $pdo->prepare("
            INSERT INTO rsvps (guest_name, attending, guest_count, children_count, events, dietary, phone, email, message)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([$guest_name, $attending, $guest_count, $children_count, $events, $dietary, $phone, $email, $message]);
        $rsvp_id = $pdo->lastInsertId();

        // If the guest also included a message/blessing, also add it to wishes wall
        if (!empty($message)) {
            $wishStmt = $pdo->prepare("INSERT INTO wishes (name, relationship, message) VALUES (?, ?, ?)");
            $wishStmt->execute([$guest_name, 'Wedding Guest', $message]);
        }

        echo json_encode([
            'success' => true,
            'message' => 'Thank you! Your RSVP has been received with joy.',
            'rsvp_id' => $rsvp_id
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Could not save RSVP: ' . $e->getMessage()]);
    }
    exit();
}
