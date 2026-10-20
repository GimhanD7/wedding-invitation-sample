<?php
// api/db.php - Database connection and automatic schema migration

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$db_host = '127.0.0.1';
$db_user = 'root';
$db_pass = '';
$db_name = 'wedding_invitation_db';

try {
    // Connect to MySQL server
    $pdo = new PDO("mysql:host={$db_host};charset=utf8mb4", $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    // Ensure database exists
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$db_name}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
    $pdo->exec("USE `{$db_name}`;");

    // Create table: rsvps
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `rsvps` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `guest_name` VARCHAR(150) NOT NULL,
            `attending` ENUM('yes', 'no') NOT NULL DEFAULT 'yes',
            `guest_count` INT NOT NULL DEFAULT 1,
            `children_count` INT NOT NULL DEFAULT 0,
            `events` TEXT NULL,
            `dietary` VARCHAR(100) DEFAULT 'Traditional Sri Lankan Buffet',
            `phone` VARCHAR(50) NULL,
            `email` VARCHAR(150) NULL,
            `message` TEXT NULL,
            `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // Create table: wishes
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `wishes` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `name` VARCHAR(150) NOT NULL,
            `relationship` VARCHAR(100) DEFAULT 'Friend & Well-wisher',
            `message` TEXT NOT NULL,
            `likes` INT DEFAULT 0,
            `is_approved` TINYINT(1) DEFAULT 1,
            `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // Check if wishes has initial seed data
    $checkWishes = $pdo->query("SELECT COUNT(*) FROM `wishes`")->fetchColumn();
    if ($checkWishes == 0) {
        $stmt = $pdo->prepare("INSERT INTO `wishes` (`name`, `relationship`, `message`, `likes`) VALUES (?, ?, ?, ?)");
        $initialWishes = [
            ['Kasun & Sachini Perera', 'Cousins & Family', 'Subha Mangalam Nimesh & Dilhani! May the Triple Gem bless both of you with abundant joy, longevity, and timeless love. Can’t wait for the Poruwa ceremony!', 14],
            ['Dr. Rohan Fernando', 'Groom\'s Colleague', 'Wishing the wonderful couple a lifetime of shared laughter and blissful companionship. You both look truly regal in your Kandyan attire!', 8],
            ['Sanduni Jayawardena', 'Bride\'s Best Friend', 'Dilhani, you are going to make the most radiant Kandyan bride! Heartfelt congratulations to Nimesh and you. Counting down the days!', 21],
            ['Mahesh & Thilini', 'Close Friends', 'Warmest congratulations from Melbourne! We are flying down especially for your big day. Looking forward to the Magul Bera and grand reception!', 12]
        ];
        foreach ($initialWishes as $w) {
            $stmt->execute($w);
        }
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database connection failed: ' . $e->getMessage()
    ]);
    exit();
}
