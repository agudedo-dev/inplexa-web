(function(){
  const cfg = window.INPLEXA_CONFIG || {};
  const number = cfg.whatsappNumber || '';
  const params = new URLSearchParams(location.search);
  const tracked = ['utm_source','utm_medium','utm_campaign','gclid'];
  window.dataLayer = window.dataLayer || [];
  const sendEvent = (name, details={}) => {
    // Measurement must never prevent a visitor from contacting the factory.
    try {
      window.dataLayer.push({event:name,...details});
      if (typeof window.gtag === 'function') window.gtag('event', name, details);
    } catch (_) {}
  };
  const conversion = details => {
    try {
      if (typeof window.gtag === 'function') window.gtag('event','conversion',details);
    } catch (_) {}
  };
  const whatsappUrl = message => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  document.querySelectorAll('[data-whatsapp]').forEach(link => {
    link.href = whatsappUrl('Hola INPLEXA, quiero consultar por desarrollo y fabricación de piezas plásticas.');
    link.addEventListener('click', () => {
      // A WhatsApp click is useful engagement, but not a confirmed lead. It is
      // deliberately excluded from the Google Ads conversion used for bidding.
      sendEvent('contact',{placement:link.className || 'link',contact_method:'whatsapp'});
      conversion({
        send_to:'AW-18452248601/dmTDCLOM8PscEJnw295E',
        value:1.0,
        currency:'ARS'
      });
    });
  });
  tracked.forEach(key => { const input=document.querySelector(`[name="${key}"]`); if(input) input.value=params.get(key)||''; });
  document.getElementById('year').textContent = new Date().getFullYear();
  const quoteForm = document.getElementById('quoteForm');
  const submitQuote = () => {
    if (!quoteForm.reportValidity()) return;
    const d=new FormData(quoteForm);
    const msg=`Hola INPLEXA, solicito cotización.\n\n*Nombre:* ${d.get('nombre')}\n*Empresa:* ${d.get('empresa')}\n*Rol:* ${d.get('rol')}\n*Tipo de proyecto:* ${d.get('tipo_proyecto')}\n*WhatsApp:* ${d.get('telefono')}\n*Email:* ${d.get('email')}\n*Necesidad:* ${d.get('consulta')}\n\nOrigen campaña: ${d.get('utm_source')||'directo'} | ${d.get('utm_campaign')||'sin campaña'} | GCLID: ${d.get('gclid')||'sin GCLID'}`;
    sendEvent('generate_lead',{lead_source:d.get('utm_source')||'direct',contact_method:'whatsapp_form'});
    // This measures a completed form handed off to WhatsApp, not a delivered message.
    // Same-tab navigation avoids losing the inquiry to a popup blocker.
    let navigated = false;
    const openWhatsApp = () => {
      if (navigated) return;
      navigated = true;
      window.location.assign(whatsappUrl(msg));
    };
    setTimeout(openWhatsApp, 900);
    conversion({send_to:'AW-18452248601/wT3nCLHmqvgcEJnw295E',value:1.0,currency:'ARS',event_callback:openWhatsApp,event_timeout:800});
  };
  quoteForm.addEventListener('submit', event => {
    event.preventDefault();
    submitQuote();
  });
  quoteForm.querySelector('[type="submit"]').addEventListener('click', event => {
    event.preventDefault();
    submitQuote();
  });
})();
