<?php
// api/admin.php - Wedding RSVP & Blessings Management Portal
require_once __DIR__ . '/db.php';

// Handle CSV Export
if (isset($_GET['action']) && $_GET['action'] === 'export_csv') {
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=wedding_rsvps_' . date('Y-m-d') . '.csv');
    $output = fopen('php://output', 'w');
    fputcsv($output, ['ID', 'Guest Name', 'Attending', 'Adults', 'Children', 'Events', 'Dietary Preference', 'Phone', 'Email', 'Blessing Message', 'RSVP Date']);
    
    $rows = $pdo->query("SELECT * FROM rsvps ORDER BY created_at DESC");
    while ($row = $rows->fetch()) {
        fputcsv($output, [
            $row['id'],
            $row['guest_name'],
            strtoupper($row['attending']),
            $row['guest_count'],
            $row['children_count'],
            $row['events'],
            $row['dietary'],
            $row['phone'],
            $row['email'],
            $row['message'],
            $row['created_at']
        ]);
    }
    fclose($output);
    exit();
}

// Handle Delete RSVP
if (isset($_POST['action']) && $_POST['action'] === 'delete_rsvp') {
    $id = (int)$_POST['id'];
    $stmt = $pdo->prepare("DELETE FROM rsvps WHERE id = ?");
    $stmt->execute([$id]);
    header('Location: admin.php?deleted=1');
    exit();
}

// Handle Wish Delete
if (isset($_POST['action']) && $_POST['action'] === 'delete_wish') {
    $id = (int)$_POST['id'];
    $stmt = $pdo->prepare("DELETE FROM wishes WHERE id = ?");
    $stmt->execute([$id]);
    header('Location: admin.php?deleted_wish=1#wishes');
    exit();
}

// Query Stats
$stats = $pdo->query("
    SELECT 
        COUNT(*) as total_responses,
        SUM(CASE WHEN attending = 'yes' THEN 1 ELSE 0 END) as attending_count,
        SUM(CASE WHEN attending = 'no' THEN 1 ELSE 0 END) as declined_count,
        SUM(CASE WHEN attending = 'yes' THEN guest_count + children_count ELSE 0 END) as total_headcount,
        SUM(CASE WHEN attending = 'yes' THEN children_count ELSE 0 END) as total_children
    FROM rsvps
")->fetch();

$dietaryStats = $pdo->query("
    SELECT dietary, COUNT(*) as count 
    FROM rsvps 
    WHERE attending = 'yes' AND dietary IS NOT NULL AND dietary != '' 
    GROUP BY dietary
")->fetchAll();

$rsvps = $pdo->query("SELECT * FROM rsvps ORDER BY created_at DESC")->fetchAll();
$wishes = $pdo->query("SELECT * FROM wishes ORDER BY created_at DESC")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nimesh & Dilhani Wedding — Admin RSVP Portal</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --gold: #c6923c;
            --gold-light: #e6c888;
            --gold-dark: #8d621f;
            --cream: #fbf9f4;
            --bg-dark: #1a120b;
            --card-dark: #241a12;
            --text-gold: #f4ddaa;
            --text-dark: #2c2016;
            --border: #4a3824;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background: #140d08;
            color: #f1ede6;
            padding: 30px 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 25px;
            border-bottom: 1px solid var(--border);
            position: relative;
        }
        h1 {
            font-family: 'Cinzel', serif;
            color: var(--gold-light);
            font-size: 2.2rem;
            letter-spacing: 2px;
            margin-bottom: 8px;
        }
        .subtitle {
            color: #d1b88e;
            font-style: italic;
            font-family: 'Playfair Display', serif;
            font-size: 1.1rem;
        }
        .actions-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
            margin-top: 25px;
        }
        .btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
            border: 1px solid transparent;
        }
        .btn-gold {
            background: linear-gradient(135deg, #d4a359 0%, #aa772d 100%);
            color: #1a120b;
        }
        .btn-gold:hover {
            filter: brightness(1.15);
            transform: translateY(-1px);
        }
        .btn-outline {
            border: 1px solid var(--gold);
            color: var(--gold-light);
            background: transparent;
        }
        .btn-outline:hover {
            background: rgba(198, 146, 60, 0.15);
        }
        .btn-danger {
            background: rgba(220, 53, 69, 0.15);
            border: 1px solid #dc3545;
            color: #ff8591;
            padding: 6px 12px;
            font-size: 0.8rem;
        }
        .btn-danger:hover {
            background: #dc3545;
            color: #fff;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        .stat-card {
            background: var(--card-dark);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 22px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            position: relative;
            overflow: hidden;
        }
        .stat-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 3px;
            background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }
        .stat-num {
            font-family: 'Cinzel', serif;
            font-size: 2.4rem;
            font-weight: 700;
            color: var(--gold-light);
            margin-bottom: 6px;
        }
        .stat-label {
            font-size: 0.85rem;
            color: #bfa98e;
            text-transform: uppercase;
            letter-spacing: 1.5px;
        }
        .dietary-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 35px;
            background: var(--card-dark);
            padding: 16px 20px;
            border-radius: 8px;
            border: 1px solid var(--border);
            align-items: center;
        }
        .diet-badge {
            background: rgba(198, 146, 60, 0.12);
            border: 1px solid var(--gold-dark);
            color: var(--gold-light);
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 0.85rem;
        }
        .section-title {
            font-family: 'Cinzel', serif;
            color: var(--gold-light);
            font-size: 1.5rem;
            margin: 35px 0 15px;
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .table-wrap {
            overflow-x: auto;
            background: var(--card-dark);
            border-radius: 12px;
            border: 1px solid var(--border);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            margin-bottom: 40px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 0.9rem;
        }
        th {
            background: #1e150f;
            color: var(--gold-light);
            padding: 14px 16px;
            font-weight: 600;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 1px solid var(--border);
            white-space: nowrap;
        }
        td {
            padding: 14px 16px;
            border-bottom: 1px solid rgba(74, 56, 36, 0.5);
            color: #ddd2c4;
            vertical-align: middle;
        }
        tr:hover td {
            background: rgba(198, 146, 60, 0.05);
        }
        .badge-attending {
            background: rgba(40, 167, 69, 0.2);
            color: #75e08f;
            border: 1px solid rgba(40, 167, 69, 0.4);
            padding: 4px 10px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 0.78rem;
            display: inline-block;
        }
        .badge-declined {
            background: rgba(220, 53, 69, 0.2);
            color: #ff8591;
            border: 1px solid rgba(220, 53, 69, 0.4);
            padding: 4px 10px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 0.78rem;
            display: inline-block;
        }
        .empty-state {
            padding: 40px;
            text-align: center;
            color: #a3927d;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Nimesh & Dilhani</h1>
            <p class="subtitle">Traditional Sri Lankan Wedding — RSVP & Blessings Management</p>
            <div class="actions-top">
                <div>
                    <a href="http://localhost:3000" target="_blank" class="btn btn-outline">
                        ← Open Wedding Invitation Site
                    </a>
                </div>
                <div style="display: flex; gap: 10px;">
                    <a href="admin.php?action=export_csv" class="btn btn-gold">
                        📥 Export All to CSV
                    </a>
                </div>
            </div>
        </header>

        <!-- Stats Overview -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-num"><?= (int)($stats['total_responses'] ?? 0) ?></div>
                <div class="stat-label">Total Responses</div>
            </div>
            <div class="stat-card">
                <div class="stat-num" style="color: #75e08f;"><?= (int)($stats['attending_count'] ?? 0) ?></div>
                <div class="stat-label">Acceptances</div>
            </div>
            <div class="stat-card">
                <div class="stat-num" style="color: #ff8591;"><?= (int)($stats['declined_count'] ?? 0) ?></div>
                <div class="stat-label">Declined</div>
            </div>
            <div class="stat-card">
                <div class="stat-num"><?= (int)($stats['total_headcount'] ?? 0) ?></div>
                <div class="stat-label">Total Guests Attending</div>
            </div>
            <div class="stat-card">
                <div class="stat-num"><?= (int)($stats['total_children'] ?? 0) ?></div>
                <div class="stat-label">Children Included</div>
            </div>
        </div>

        <!-- Dietary Breakdown -->
        <?php if (!empty($dietaryStats)): ?>
        <div class="dietary-tags">
            <span style="font-weight: 600; color: var(--gold-light); font-size: 0.9rem;">Dietary Breakdown:</span>
            <?php foreach ($dietaryStats as $d): ?>
                <span class="diet-badge"><strong><?= htmlspecialchars($d['dietary']) ?></strong>: <?= $d['count'] ?></span>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>

        <!-- RSVPs Table -->
        <h2 class="section-title">
            <span>📋 Guest RSVP List (<?= count($rsvps) ?>)</span>
        </h2>
        <div class="table-wrap">
            <?php if (empty($rsvps)): ?>
                <div class="empty-state">No RSVPs received yet. Guest submissions will appear here instantly!</div>
            <?php else: ?>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Guest Name</th>
                            <th>Status</th>
                            <th>Adults</th>
                            <th>Children</th>
                            <th>Events</th>
                            <th>Dietary Preference</th>
                            <th>Contact</th>
                            <th>Message</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($rsvps as $idx => $r): ?>
                        <tr>
                            <td><?= $idx + 1 ?></td>
                            <td><strong style="color: #fff;"><?= htmlspecialchars($r['guest_name']) ?></strong></td>
                            <td>
                                <?php if ($r['attending'] === 'yes'): ?>
                                    <span class="badge-attending">Attending</span>
                                <?php else: ?>
                                    <span class="badge-declined">Declined</span>
                                <?php endif; ?>
                            </td>
                            <td><?= (int)$r['guest_count'] ?></td>
                            <td><?= (int)$r['children_count'] ?></td>
                            <td style="max-width: 140px; font-size: 0.82rem;"><?= htmlspecialchars($r['events'] ?: 'All Events') ?></td>
                            <td><?= htmlspecialchars($r['dietary']) ?></td>
                            <td style="font-size: 0.82rem;">
                                <?= htmlspecialchars($r['phone'] ?: '-') ?><br>
                                <span style="color: #999;"><?= htmlspecialchars($r['email'] ?: '') ?></span>
                            </td>
                            <td style="max-width: 200px; font-size: 0.82rem; font-style: italic;">
                                <?= htmlspecialchars($r['message'] ?: '—') ?>
                            </td>
                            <td style="font-size: 0.78rem; white-space: nowrap; color: #a8947f;">
                                <?= date('M d, Y h:i A', strtotime($r['created_at'])) ?>
                            </td>
                            <td>
                                <form method="POST" onsubmit="return confirm('Delete this RSVP entry?');" style="margin: 0;">
                                    <input type="hidden" name="action" value="delete_rsvp">
                                    <input type="hidden" name="id" value="<?= $r['id'] ?>">
                                    <button type="submit" class="btn btn-danger">Delete</button>
                                </form>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>

        <!-- Wishes Moderation -->
        <h2 class="section-title" id="wishes">
            <span>✨ Guestbook Wishes & Blessings (<?= count($wishes) ?>)</span>
        </h2>
        <div class="table-wrap">
            <?php if (empty($wishes)): ?>
                <div class="empty-state">No wishes submitted yet.</div>
            <?php else: ?>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Sender</th>
                            <th>Relationship</th>
                            <th>Blessing Message</th>
                            <th>Likes</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($wishes as $idx => $w): ?>
                        <tr>
                            <td><?= $idx + 1 ?></td>
                            <td><strong style="color: var(--gold-light);"><?= htmlspecialchars($w['name']) ?></strong></td>
                            <td><?= htmlspecialchars($w['relationship']) ?></td>
                            <td style="font-style: italic; color: #f5eedf;"><?= htmlspecialchars($w['message']) ?></td>
                            <td>❤️ <?= (int)$w['likes'] ?></td>
                            <td style="font-size: 0.78rem; color: #a8947f;"><?= date('M d, Y', strtotime($w['created_at'])) ?></td>
                            <td>
                                <form method="POST" onsubmit="return confirm('Remove this wish?');" style="margin:0;">
                                    <input type="hidden" name="action" value="delete_wish">
                                    <input type="hidden" name="id" value="<?= $w['id'] ?>">
                                    <button type="submit" class="btn btn-danger">Delete</button>
                                </form>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>
