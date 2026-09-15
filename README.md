# INPLEXA — Landing de captación B2B

Abrí `index.html` en un navegador para verla localmente.

## Antes de publicar

1. El WhatsApp comercial ya está configurado en `config.js` como `5491131008720`, sin el signo `+` ni espacios.
2. El canonical está preparado para `https://www.inplexa.com/`; confirmalo una vez que el dominio esté comprado y conectado.
3. Para medir Google Ads, pegá el código de etiqueta de Google (Google tag) antes de `</head>` en `index.html`. Los eventos ya preparados se llaman `inplexa_whatsapp_click` y `inplexa_generate_lead`.

La página conserva `utm_source`, `utm_medium`, `utm_campaign` y `gclid` en el mensaje enviado desde el formulario, para asociar cada consulta a su campaña.
