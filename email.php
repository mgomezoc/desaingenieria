<?php
require __DIR__ . '/config.php';
require __DIR__ . '/includes/autoload.php';

$recaptcha = new \ReCaptcha\ReCaptcha(RECAPTCHA_SECRET_KEY);
$result = array('Success' => false);

function clean_input($value)
{
    $value = is_string($value) ? trim($value) : '';
    $value = str_replace(array("\r", "\n", "%0a", "%0d"), ' ', $value);
    return $value;
}

function escape_html($value)
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

$nombre = clean_input($_POST['nombre'] ?? '');
$correo = clean_input($_POST['correo'] ?? '');
$comentario = clean_input($_POST['comentario'] ?? '');
$captchaResponse = $_POST['g-recaptcha-response'] ?? '';

if (empty($captchaResponse)) {
    $result['Result'] = 'ReCaptcha no proporcionado.';
    echo json_encode($result);
    exit;
}

$resp = $recaptcha->verify($captchaResponse, $_SERVER['REMOTE_ADDR'] ?? null);

if (!$resp->isSuccess()) {
    $result['Result'] = 'ReCaptcha inválido.';
    echo json_encode($result);
    exit;
}

if (strlen($comentario) < 10) {
    $result['Result'] = 'Comentario es necesario.';
    echo json_encode($result);
    exit;
}

if (empty($nombre) || !filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    $result['Result'] = 'Datos de contacto inválidos.';
    echo json_encode($result);
    exit;
}

$subject = 'Contacto';
$message = '
<html>
<head>
<title>Contacto</title>
</head>
<body>
<div style="background:#eee;display:block;padding:15px;border:2px solid #ccc;margin:15px;font-family:Segoe UI;max-width:600px">
<h1 style="background:#fff;color:#333;padding:15px;border-radius:3px;margin:0;border-bottom:5px solid #ccc">Contacto</h1>
<div style="background:#fff;padding:15px">
<p><b>Nombre:</b> ' . escape_html($nombre) . '</p>
<p><b>Email:</b> ' . escape_html($correo) . '</p>
<p><b>Comentario:</b> ' . nl2br(escape_html($comentario)) . '</p>
</div>
</div>
</body>
</html>';

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type:text/html;charset=UTF-8\r\n";
$headers .= 'From: ' . CONTACT_EMAIL_FROM_NAME . ' <' . CONTACT_EMAIL_FROM . ">\r\n";
$headers .= 'Reply-To: ' . $correo . "\r\n";

if (!empty(CONTACT_EMAIL_BCC)) {
    $headers .= 'Bcc: ' . CONTACT_EMAIL_BCC . "\r\n";
}

if (mail(CONTACT_EMAIL_TO, $subject, $message, $headers)) {
    $result['Success'] = true;
} else {
    $result['Result'] = 'Error al enviar el correo electrónico.';
}

echo json_encode($result);
