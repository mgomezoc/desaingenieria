<?php

// Configuración base. En producción, mover estos valores a variables de entorno.

define('RECAPTCHA_SITE_KEY', getenv('RECAPTCHA_SITE_KEY') ?: '6LepKRQUAAAAAKgeVNNb3S8PTREj9Pzbeo0r3eSI');
define('RECAPTCHA_SECRET_KEY', getenv('RECAPTCHA_SECRET_KEY') ?: '6LepKRQUAAAAALpvSlwbrQszmHUjVg4JALeysj6I');
define('CONTACT_EMAIL_TO', getenv('CONTACT_EMAIL_TO') ?: 'hdelarosa@desaingenieria.com');
define('CONTACT_EMAIL_BCC', getenv('CONTACT_EMAIL_BCC') ?: '0013zkr@gmail.com');
define('CONTACT_EMAIL_FROM', getenv('CONTACT_EMAIL_FROM') ?: 'noreply@desaingenieria.com');
define('CONTACT_EMAIL_FROM_NAME', getenv('CONTACT_EMAIL_FROM_NAME') ?: 'DESAIngenieria');
