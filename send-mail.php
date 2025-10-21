<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Protection anti-spam simple (honeypot)
if (!empty($_POST['website'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Spam détecté']);
    exit;
}

// Vérification de la méthode
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

// Récupération et validation des données
$fullName = trim($_POST['fullName'] ?? '');
$email = trim($_POST['email'] ?? '');
$company = trim($_POST['company'] ?? '');
$message = trim($_POST['message'] ?? '');

// Validation des champs obligatoires
$errors = [];

if (empty($fullName)) {
    $errors[] = 'Le nom complet est obligatoire';
}

if (empty($email)) {
    $errors[] = 'L\'email est obligatoire';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'L\'email n\'est pas valide';
}

if (empty($message)) {
    $errors[] = 'Le message est obligatoire';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
    exit;
}

// Configuration de l'email
$to = 'contact@archiatech.fr';
$subject = '[ArchiAtech] Nouvelle demande de contact';
$from = 'noreply@archiatech.fr';

// Corps du message HTML
$body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #E53935 0%, #C62828 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: 600; color: #E53935; }
        .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #E53935; }
        .message-box { background: white; padding: 15px; border-radius: 8px; border: 1px solid #e0e0e0; margin-top: 10px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>🚀 ArchiAtech – Digital Solutions</h2>
            <p>Nouvelle demande de contact</p>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>👤 Nom complet :</div>
                <div class='value'>" . htmlspecialchars($fullName) . "</div>
            </div>
            
            <div class='field'>
                <div class='label'>📧 Email professionnel :</div>
                <div class='value'>" . htmlspecialchars($email) . "</div>
            </div>
            
            <div class='field'>
                <div class='label'>🏢 Société :</div>
                <div class='value'>" . htmlspecialchars($company ?: 'Non renseignée') . "</div>
            </div>
            
            <div class='field'>
                <div class='label'>💬 Message :</div>
                <div class='message-box'>" . nl2br(htmlspecialchars($message)) . "</div>
            </div>
            
            <div class='footer'>
                <p>📅 Date d'envoi : " . date('d/m/Y à H:i') . "</p>
                <p>🌐 Envoyé depuis le site web ArchiAtech</p>
            </div>
        </div>
    </div>
</body>
</html>
";

// Corps du message texte (fallback)
$textBody = "
[ArchiAtech] Nouvelle demande de contact

Nom : " . $fullName . "
Email : " . $email . "
Société : " . ($company ?: 'Non renseignée') . "

Message :
" . $message . "

Date d'envoi : " . date('d/m/Y à H:i') . "
Envoyé depuis le site web ArchiAtech
";

// Configuration des en-têtes
$headers = [
    'From: ' . $from,
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
    'X-Priority: 3'
];

$headersText = [
    'From: ' . $from,
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
    'X-Priority: 3'
];

// Tentative d'envoi de l'email
try {
    $success = mail($to, $subject, $body, implode("\r\n", $headers));
    
    if ($success) {
        // Envoi d'une copie texte en backup
        mail($to, $subject . ' (TXT)', $textBody, implode("\r\n", $headersText));
        
        echo json_encode([
            'success' => true, 
            'message' => 'Votre demande a bien été envoyée. Merci !'
        ]);
    } else {
        throw new Exception('Échec de l\'envoi de l\'email');
    }
} catch (Exception $e) {
    error_log('Erreur envoi email ArchiAtech: ' . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Une erreur est survenue, veuillez réessayer.'
    ]);
}
?>
