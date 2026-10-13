# INPLEXA — Landing de captación B2B

Abrí `index.html` en un navegador para verla localmente.

## Sitio publicado y medición

1. El WhatsApp comercial está configurado en `config.js` como `5491131008720`, sin el signo `+` ni espacios.
2. El sitio publicado es `https://inplexa.com/`; la ruta de campaña `https://inplexa.com/desarrollo/plastico` también sirve la landing.
3. `index.html` ya carga Google Ads (`AW-18452248601`) y GA4 (`G-6NSYC7V5YL`). `script.js` registra `contact` para los enlaces directos y `generate_lead` para el formulario, además de sus acciones de conversión existentes.

La página conserva `utm_source`, `utm_medium`, `utm_campaign` y `gclid` en los campos ocultos del formulario y en su evento interno de `dataLayer`. Google tag mantiene la medición desde la URL. Esos valores no se agregan al texto que ve o envía el cliente por WhatsApp, ni se agregan como parámetros personalizados a `gtag`.

La conversión del formulario mide la preparación de la consulta y su apertura en WhatsApp; no confirma que el cliente haya enviado el mensaje. La landing no guarda consultas directamente en el CRM.

## Mejoras de captación — 13 de octubre de 2026

La landing presenta componentes para productos y equipos (carcasas, tapas, soportes y piezas funcionales), con evaluación técnica previa. Incluye una fotografía de muestras reales en desarrollo, con retoque de iluminación y fondo declarado en el pie de imagen; no se presenta como producción validada ni como caso de un cliente identificado.

El formulario incorpora disponibilidad del molde y distingue la demanda conocida de la que requiere evaluación. La medición registra una sola preparación por envío, usa un identificador anónimo y permite volver desde WhatsApp para modificar la consulta. El inicio del formulario ayuda a detectar abandono. Los clics directos en WhatsApp conservan su conversión secundaria.

Para evaluar calidad comercial, registrar en el CRM si el contacto llegó, empresa, pieza, lote, recurrencia, viabilidad técnica y avance a cotización. La conversión de Google Ads se llama «Consulta industrial preparada · WhatsApp»; por sí sola no acredita un cliente calificado ni una venta. El valor de ARS 1 es nominal y no representa facturación.

## Calificación industrial — 3 de octubre de 2026

El sitio se orienta a empresas e industrias con producción en serie, reposiciones y demanda recurrente. El formulario pide empresa, contacto, pieza/aplicación, cantidad del lote, recurrencia y demanda mensual/anual. Una demanda a definir se deriva a evaluación comercial; no se considera automáticamente un lead calificado. Material, documentación, molde y plazo amplían la consulta y los archivos se comparten por WhatsApp.

No se estableció un mínimo comercial numérico. Los enlaces destacados conducen al formulario; los contactos directos preparan un mensaje que pide empresa y volumen. Las acciones de conversión y sus etiquetas conservan el comportamiento de medición anterior. Email, teléfono y detalles del proyecto solo se incluyen en el mensaje que el visitante decide enviar; no se agregan a los eventos de medición.
