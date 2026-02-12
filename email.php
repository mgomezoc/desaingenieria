<?php
require('includes/autoload.php');

$secret = "6LepKRQUAAAAALpvSlwbrQszmHUjVg4JALeysj6I";
$recaptcha = new \ReCaptcha\ReCaptcha($secret);

$result = array();

if (isset($_POST['g-recaptcha-response'])) {
    $resp = $recaptcha->verify($_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);

    if ($resp->isSuccess()) {
        $comentarios = trim($_POST['comentario']);

        if (strlen($comentarios) > 1) {
            $to = "hdelarosa@desaingenieria.com";
            $subject = "Contacto";
            $message = "
            <html>
            <head>
            <title>Contacto</title>
            </head>
            <body>
            <div style='background:#eee;display:block;padding:15px;border:2px solid #ccc;margin:15px;font-family:Segoe UI;max-width:600px'>
            <h1 style='background:#fff;color:#333;padding:15px;border-radius:3px;margin:0;border-bottom:5px solid #ccc'>Contacto</h1>
            <div style='background:#fff;padding:15px'>
            <p>
                <b>Nombre:</b> $_POST[nombre]
            </p>
            <p>
                <b>Email:</b> $_POST[correo]
            </p>
            <p>
                <b>Comentario:</b> $_POST[comentario]
            </p>
            </div>
            </div>
            </body>
            </html>
            ";

            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            $headers .= 'From: DESAIngenieria <noreply@desaingenieria.com>'."\r\n";
            $headers .= 'Bcc: 0013zkr@gmail.com' . "\r\n";

            if (mail($to, $subject, $message, $headers)) {
                $result["Success"] = true;
            } else {
                $result["Success"] = false;
                $result["Result"] = "Error al enviar el correo electrónico.";
            }
        } else {
            $result["Success"] = false;
            $result["Result"] = "BOT";
        }
    } else {
        $result["Success"] = false;
        $result["Result"] = "ReCaptcha inválido.";
    }
} else {
    $result["Success"] = false;
    $result["Result"] = "ReCaptcha no proporcionado.";
}

echo json_encode($result);
?>
