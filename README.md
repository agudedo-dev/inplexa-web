# INPLEXA — Landing de captación B2B

Abrí `index.html` en un navegador para verla localmente.

## Sitio publicado y medición

1. El WhatsApp comercial está configurado en `config.js` como `5491131008720`, sin el signo `+` ni espacios.
2. El sitio publicado es `https://inplexa.com/`; la ruta de campaña `https://inplexa.com/desarrollo/plastico` también sirve la landing.
3. `index.html` ya carga Google Ads (`AW-18452248601`) y GA4 (`G-6NSYC7V5YL`). `script.js` registra `contact` para los enlaces directos y `generate_lead` para el formulario, además de sus acciones de conversión existentes.

La página conserva `utm_source`, `utm_medium`, `utm_campaign` y `gclid` en los campos ocultos del formulario y en su evento interno de `dataLayer`. Google tag mantiene la medición desde la URL. Esos valores no se agregan al texto que ve o envía el cliente por WhatsApp, ni se agregan como parámetros personalizados a `gtag`.

La conversión del formulario mide la preparación de la consulta y su apertura en WhatsApp; no confirma que el cliente haya enviado el mensaje. La landing no guarda consultas directamente en el CRM.

## Calificación industrial — 3 de octubre de 2026

El sitio se orienta a empresas e industrias con producción en serie, reposiciones y demanda recurrente. El formulario pide empresa, contacto, pieza/aplicación, cantidad del lote, recurrencia y demanda mensual/anual. Una demanda a definir se deriva a evaluación comercial; no se considera automáticamente un lead calificado. Material, documentación, molde y plazo amplían la consulta y los archivos se comparten por WhatsApp.

No se estableció un mínimo comercial numérico. Los enlaces destacados conducen al formulario; los contactos directos preparan un mensaje que pide empresa y volumen. Las acciones de conversión y sus etiquetas conservan el comportamiento de medición anterior. Email, teléfono y detalles del proyecto solo se incluyen en el mensaje que el visitante decide enviar; no se agregan a los eventos de medición.
