## Estructura del Proyecto

```text
.
├── index.html
├── email.php
├── config.php
├── package.json
├── 404.html
├── nuestra-empresa.html
├── css/
│   ├── main.css
│   ├── main.less
│   ├── pushy.css
│   ├── pushy.less
│   ├── aos.css
│   ├── jquery.bxslider.css
│   ├── normalize.css
│   ├── normalize.min.css
│   ├── animate.less
│   ├── images/
│   └── source/
├── js/
│   ├── main.js
│   ├── plugins.js
│   ├── pushy.js
│   ├── pushy.min.js
│   ├── jquery.vide.js
│   ├── jquery.bxslider.min.js
│   ├── background-blur.js
│   ├── typed.min.js
│   ├── aos.js
│   ├── handlebars-v4.0.5.js
│   ├── Core.handlebars.js
│   ├── jquery.linq.js
│   └── vendor/
│       ├── jquery-1.11.2.min.js
│       └── modernizr-2.8.3-respond-1.4.2.min.js
├── includes/
│   ├── autoload.php
│   └── ReCaptcha/
│       ├── ReCaptcha.php
│       ├── Response.php
│       ├── RequestParameters.php
│       └── RequestMethod/
├── img/
│   ├── favicon/
│   ├── proyectos/
│   ├── images/
│   └── *.jpg|*.png|*.svg
├── content/
│   └── DESAIngenieriaHome.(mp4|jpg|jpeg|png|gif)
├── favicon.ico / apple-touch-icon.png / tile*.png
├── sitemap.xml / browserconfig.xml / crossdomain.xml / humans.txt
└── google90b2af379df69f2a.html
```

- `index.html`: página principal *single-page* con todas las secciones del sitio, formulario de contacto y carga de librerías externas.
- `css/`: estilos compilados y fuentes `.less` (preprocesador), además de hojas de estilos de terceros.
- `js/`: scripts de interacción de UI, navegación, slider, fondo en video, blur y validación.
- `includes/`: librería PHP de Google reCAPTCHA v2 y autoload para validación servidor.
- `img/` y `content/`: assets visuales (logos, fondos, proyectos, video hero, favicons).
- `email.php`: endpoint backend para validación de reCAPTCHA y envío de correo por `mail()`.
- `config.php`: configuración sensible centralizada (credenciales y correos).
- `package.json`: manifiesto virtual de dependencias objetivo para modernización.

## Stack Tecnológico y Dependencias

### Stack vigente tras modernización técnica
- **HTML5 + CSS + JavaScript (Vanilla + jQuery)**.
- **Bootstrap 5.3.3** (CDN CSS + bundle JS).
- **jQuery 3.7.1** (CDN runtime).
- **jQuery Validate 1.20.0** (CDN).
- **Font Awesome 6 (kit)**.
- **Google Fonts (Roboto)**.
- **Pushy 1.1.0** (local, legado).
- **Vide 0.5.1** (local, legado).
- **BxSlider 4.1.2 runtime local** (dependencia objetivo documentada: `bxslider 4.2.17`).
- **AOS local runtime** (dependencia objetivo documentada: `aos 2.3.4`).
- **PHP plano** para backend de contacto.
- **Google reCAPTCHA PHP client `php_1.1.3`**.

### Dependencias documentadas oficialmente (`package.json` virtual)
- `bootstrap@5.3.3`
- `jquery@3.7.1`
- `jquery-validation@1.20.0`
- `@fortawesome/fontawesome-free@6.6.0`
- `aos@2.3.4`
- `bxslider@4.2.17`
- `less@4.2.0` (dev)

### Servicios externos
- **Google reCAPTCHA v2** (`https://www.google.com/recaptcha/api.js`).
- **Zendesk Chat (Zopim)** embed script (legacy).
- **Google Analytics (analytics.js)** script legacy (pendiente migración a GA4).

### Estilo / toolchain
- Uso combinado de **LESS** y CSS compilado.
- Sin pipeline de build activo todavía; `package.json` sirve como baseline de migración.

## Arquitectura y Flujo de Datos

### Entry points
1. **`index.html`**: punto de entrada principal de la web.
2. **`js/main.js`**: punto de entrada de comportamiento de cliente (ready handler jQuery).
3. **`email.php`**: punto de entrada backend para envío del formulario.
4. **`config.php`**: fuente de configuración sensible para backend.

### Flujo de carga
1. `index.html` carga CSS (Bootstrap, normalize, pushy, aos, bxslider, main).
2. En `<body>`, se renderizan secciones estáticas (`Inicio`, `Contacto`, `NuestraEmpresa`, `Servicios`, `Espesificaciones`, `Proyectos`).
3. Al final de documento se cargan scripts en secuencia: jQuery → validate → bootstrap bundle → plugins visuales → `main.js`.
4. `main.js` inicializa validación, navegación smooth-scroll, video hero, slider y efectos visuales.

### Flujo de formulario de contacto
1. Usuario llena `#frm-contacto` y resuelve reCAPTCHA.
2. `main.js` valida cliente (campos requeridos + mínimo de comentario + token reCAPTCHA presente).
3. Se realiza `POST` AJAX a `email.php` con `serialize()` del formulario.
4. `email.php` toma credenciales desde `config.php`, sanitiza/valida entradas y verifica token contra Google.
5. Si es válido, arma correo HTML sanitizado y usa `mail()`; responde JSON `{Success: true/false, Result: ...}`.
6. Frontend muestra `alert()`, limpia formulario y resetea captcha cuando aplica.

### Acoplamientos relevantes
- Acoplamiento por IDs/clases entre HTML/CSS/JS (`#Video-vide`, `.bxslider`, `#menu a`, `#frm-contacto`).
- Dependencia de plugins legacy (pushy/bxslider/vide).
- Dependencia de servicios de terceros sin fallback robusto (reCAPTCHA, Zendesk, GA).

## Inventario de Componentes y Funcionalidad

### 1) Navegación lateral (Pushy)
- **UI**: menú lateral off-canvas con anclas internas a secciones.
- **Archivos**: `index.html` (`<nav class="pushy">`), `css/pushy.css`, `js/pushy.min.js`, `js/main.js`.
- **Lógica**: apertura por hover/click en trigger y smooth-scroll a anclas.

### 2) Hero / Inicio
- **UI**: bloque principal con logo/título y fondo en video.
- **Archivos**: `index.html` (`#Inicio`, `#Video-vide`), `js/jquery.vide.js`, `js/main.js`, assets en `content/`.
- **Lógica**: inicialización de video en loop, muteado y con ajuste responsivo.

### 3) Contacto
- **UI**: formulario (nombre, correo, comentario) + reCAPTCHA + datos de contacto.
- **Archivos**: `index.html` (`#Contacto`, `#frm-contacto`), `js/main.js`, `email.php`, `config.php`.
- **Lógica de negocio**:
  - Validación cliente con jQuery Validate.
  - Validación adicional JS: captcha obligatorio y comentario mínimo.
  - Envío AJAX a backend.
  - Backend sanitiza y valida payload, valida captcha, envía mail y retorna JSON.

### 4) Nuestra Empresa
- **UI**: contenido institucional con objetivos y filosofía.
- **Archivos**: `index.html`, estilos en `css/main.css`, apoyo textual legacy en `nuestra-empresa.html`.
- **Lógica**: estática (sin lógica dinámica).

### 5) Servicios y Productos
- **UI**: tres bloques de servicios con listas.
- **Archivos**: `index.html`, `css/main.css`, assets (`img/Preliminares.jpg`, etc.).
- **Lógica**: contenido estático; sin consumo de API.

### 6) Especificaciones y Normas
- **UI**: listado de normas (AISC, MBMA, AWS, etc.) con animaciones AOS.
- **Archivos**: `index.html` (`#Espesificaciones`), `css/main.css`, `js/aos.js`, `js/main.js`.
- **Lógica**: animaciones activadas por scroll con `AOS.init()`.

### 7) Proyectos (slider)
- **UI**: carrusel de proyectos con descripción e imagen.
- **Archivos**: `index.html` (`.bxslider`), `js/jquery.bxslider.min.js`, `js/background-blur.js`, `js/main.js`.
- **Lógica**:
  - Slider en modo `fade`.
  - Al cambiar slide, se recalcula fondo blur desde imagen actual.

### 8) Footer y tracking
- **UI**: footer simple con copyright.
- **Archivos**: `index.html`.
- **Lógica**: scripts embebidos para Zendesk Chat y Google Analytics.

## Puntos de Atención para el Rediseño

### Riesgos y deuda técnica prioritaria
- **Plugins legacy no migrados aún**: Pushy, Vide, BxSlider y AOS local pueden requerir reemplazo progresivo.
- **Tracking legacy**: Google Analytics `analytics.js` pendiente migración a GA4.
- **Dependencia en `mail()`**: funcional pero limitada en trazabilidad/entregabilidad frente a SMTP/API transaccional.
- **Front-end monolítico**: contenido y layout hardcodeados en `index.html`.
- **Sin pipeline de build**: existen dependencias documentadas pero no integradas en un flujo npm real todavía.

### Seguridad / hardening pendiente
- Rotar claves de reCAPTCHA y moverlas a entorno real (no repositorio).
- Añadir CSRF token al formulario.
- Endurecer políticas de cabeceras (CSP, HSTS, X-Frame-Options en servidor web).
- Validación adicional de rate limiting para endpoint de contacto.

### CHANGELOG
- Se añadió `package.json` virtual para normalizar versión objetivo de dependencias modernas.
- `index.html` migró a CDNs modernos: Bootstrap 5.3.3, jQuery 3.7.1, jQuery Validate 1.20.0, Bootstrap bundle y Font Awesome kit actual.
- Se ajustaron clases de formulario para compatibilidad Bootstrap 5 (`form-group` → `row mb-3`).
- Se actualizó `js/main.js` para eliminar uso de API jQuery de Bootstrap removida (`button('loading'/'reset')`), reemplazándola con deshabilitado y texto temporal del botón.
- Se creó `config.php` para centralizar credenciales y correos (con opción de variables de entorno).
- Se refactorizó `email.php` para:
  - consumir configuración desde `config.php`;
  - sanitizar entradas (`nombre`, `correo`, `comentario`);
  - validar formato de correo;
  - evitar inyección de headers por saltos de línea;
  - escapar contenido HTML del correo.
- Se añadió comentario en `css/main.css` marcando reglas globales que podrían pisar estilos base de Bootstrap 5 y requieren revisión en rediseño.
