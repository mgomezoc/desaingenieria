## Estructura del Proyecto

```text
.
├── index.html
├── email.php
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

## Stack Tecnológico y Dependencias

### Front-end
- **HTML5 + CSS + JavaScript (Vanilla + jQuery)**.
- **Bootstrap 4.0.0-alpha.6** (CDN CSS y JS).
- **jQuery 1.11.2** (CDN en runtime y copia local en `js/vendor`).
- **jQuery Validate 1.16.0** (CDN).
- **Pushy 1.1.0** (menú off-canvas).
- **Vide 0.5.1** (video de fondo).
- **BxSlider 4.1.2** (carrusel de proyectos).
- **AOS (Animate On Scroll)** (local, versión no declarada en cabecera minificada).
- **Typed.js** (local `typed.min.js`, versión no declarada en cabecera minificada).
- **Modernizr 2.8.3 + Respond 1.4.2** (compatibilidad navegadores antiguos).
- **Font Awesome** (script kit legacy `use.fontawesome.com`, sin versión explícita).
- **Google Fonts (Roboto)**.

### Backend
- **PHP** (sin framework) con endpoint único `email.php`.
- **Google reCAPTCHA PHP client `php_1.1.3`** (librería incluida localmente en `includes/ReCaptcha`).

### Dependencias externas de servicios
- **Google reCAPTCHA v2** (`https://www.google.com/recaptcha/api.js`).
- **Zendesk Chat (Zopim)** embed script con ID hardcodeado.
- **Google Analytics (analytics.js)** UA hardcodeado.

### Estilo / toolchain
- Hay uso de **LESS** (`main.less`, `pushy.less`, `animate.less`, `css/source/*.less`) y CSS compilado (`main.css`, `pushy.css`).
- No se detecta `package.json`, bundler moderno (Webpack/Vite), ni gestor de dependencias front.

## Arquitectura y Flujo de Datos

### Entry points
1. **`index.html`**: punto de entrada principal de la web.
2. **`js/main.js`**: punto de entrada de comportamiento de cliente (ready handler jQuery).
3. **`email.php`**: punto de entrada backend para envío del formulario.

### Flujo de carga
1. `index.html` carga CSS (Bootstrap, normalize, pushy, aos, bxslider, main).
2. En `<body>`, se renderizan secciones estáticas (`Inicio`, `Contacto`, `NuestraEmpresa`, `Servicios`, `Espesificaciones`, `Proyectos`).
3. Al final de documento se cargan scripts en secuencia: jQuery → plugins (validate, bootstrap, vide, aos, pushy, bxslider, blur, typed) → `main.js`.
4. `main.js` inicializa validación, navegación smooth-scroll, video hero, slider y efectos visuales.

### Flujo de formulario de contacto
1. Usuario llena `#frm-contacto` y resuelve reCAPTCHA.
2. `main.js` valida cliente (campos requeridos + mínimo de comentario + token reCAPTCHA presente).
3. Se realiza `POST` AJAX a `email.php` con `serialize()` del formulario.
4. `email.php` valida token contra Google usando librería ReCaptcha.
5. Si es válido, arma correo HTML y usa `mail()`; responde JSON `{Success: true/false, Result: ...}`.
6. Frontend muestra `alert()`, limpia formulario y resetea captcha cuando aplica.

### Acoplamientos relevantes
- Fuerte acoplamiento por **IDs y clases hardcodeadas** entre HTML/CSS/JS (`#Video-vide`, `.bxslider`, `#menu a`, `#frm-contacto`).
- Dependencia de orden de scripts (si falla jQuery/CDN, `main.js` queda inoperante).
- Dependencia de servicios de terceros sin fallback robusto (reCAPTCHA, Zendesk, GA, CDN).

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
- **Archivos**: `index.html` (`#Contacto`, `#frm-contacto`), `js/main.js`, `email.php`.
- **Lógica de negocio**:
  - Validación cliente con jQuery Validate.
  - Validación adicional JS: captcha obligatorio y comentario mínimo.
  - Envío AJAX a backend.
  - Backend valida captcha, envía mail y retorna JSON.

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

### Hardcoded values críticos (migrar a configuración segura)
- **Claves de reCAPTCHA expuestas** (site key en HTML y secret key en PHP).
- **Correos de destino y BCC hardcodeados** en `email.php`.
- **IDs de terceros hardcodeados** (Zendesk key, Google Analytics UA).
- **Textos institucionales y catálogo de proyectos embebidos** directamente en HTML.
- **Rutas de imágenes/video fijas** en HTML/CSS/JS sin capa de configuración.
- **Año de footer fijo (2017)** desactualizable manualmente.

### Riesgos técnicos / malas prácticas detectadas
- **Dependencias obsoletas o legacy**:
  - jQuery 1.11.2 (EOL).
  - Bootstrap 4 alpha (pre-release antigua).
  - Modernizr/Respond orientado a navegadores muy antiguos.
  - Google Analytics `analytics.js` (legacy frente a GA4).
- **Sin pipeline moderno**: no hay control de versiones de dependencias vía npm/yarn ni build reproducible.
- **CDNs sin estrategia de fallback completa** (solo include remoto para jQuery runtime).
- **Seguridad backend mejorable**:
  - `$_POST[...]` incrustado directo en HTML de correo (sin sanitización estricta).
  - Sin CSRF token en formulario.
  - Uso de `mail()` nativo (entregabilidad y observabilidad limitada).
- **UX/error handling limitado**:
  - Uso intensivo de `alert()`.
  - En `.fail()` AJAX no hay feedback al usuario final.
- **Accesibilidad/semántica**:
  - Navegación y componentes con dependencia fuerte de JS.
  - Varios contenidos podrían mejorar etiquetas semánticas y atributos ARIA.

### Implicaciones para rediseño
- Separar **contenido** de **presentación** (CMS/JSON/headless) para evitar edición manual del HTML.
- Centralizar configuración sensible en variables de entorno (server-side).
- Migrar gradualmente stack front (Bootstrap estable, jQuery moderno o framework actual).
- Introducir arquitectura por componentes (design system + tokens + módulos).
- Definir estrategia de analítica/observabilidad y formularios (API backend robusta).
