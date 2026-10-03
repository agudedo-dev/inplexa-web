(function(){
  const cfg = window.INPLEXA_CONFIG || {};
  const number = cfg.whatsappNumber || '';
  const params = new URLSearchParams(location.search);
  const tracked = ['utm_source','utm_medium','utm_campaign','gclid'];
  window.dataLayer = window.dataLayer || [];
  const sendEvent = (name, details={}, attribution={}) => {
    // Measurement must never prevent a visitor from contacting the factory.
    try {
      window.dataLayer.push({event:name,...details,...attribution});
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
    link.href = whatsappUrl('Hola INPLEXA, quiero consultar por producción industrial de piezas plásticas en serie.\n\nEmpresa:\nPieza y aplicación:\nCantidad por lote:\nDemanda mensual o anual:\nPlazo requerido:');
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
  const demandPeriod = quoteForm.elements.periodo_demanda;
  const demandAmount = quoteForm.elements.cantidad_demanda;
  const syncDemand = () => {
    const known = demandPeriod.value === 'mensual' || demandPeriod.value === 'anual';
    document.getElementById('cantidadDemanda').hidden = !known;
    demandAmount.disabled = !known;
    demandAmount.required = known;
    if (!known) demandAmount.value = '';
  };
  demandPeriod.addEventListener('change', syncDemand);
  syncDemand();
  const submitQuote = () => {
    ['empresa','nombre','consulta','telefono'].forEach(name => {
      const field = quoteForm.elements[name];
      field.value = field.value.trim();
    });
    if (!quoteForm.reportValidity()) return;
    const d=new FormData(quoteForm);
    const company = String(d.get('empresa') || '').trim();
    const demand = d.get('periodo_demanda') === 'a_definir'
      ? 'A definir con evaluación comercial'
      : `${d.get('cantidad_demanda')} unidades (${d.get('periodo_demanda')})`;
    const msg=`Hola INPLEXA, quiero cotizar una producción industrial en serie.\n\n*Empresa:* ${company}\n*Nombre:* ${d.get('nombre')}\n*Email:* ${d.get('email')}\n*Teléfono:* ${d.get('telefono')}\n*Pieza y aplicación:* ${d.get('consulta')}\n*Primer lote:* ${d.get('cantidad_lote')} unidades\n*Producción:* ${d.get('recurrencia')}\n*Demanda prevista:* ${demand}\n*Material:* ${d.get('material') || 'Requiere asesoramiento'}\n*Documentación:* ${d.get('documentacion')}\n*Molde:* ${d.get('molde')}\n*Plazo:* ${d.get('plazo') || 'A definir'}`;
    // Keep campaign attribution internal; it must never be appended to the customer's message.
    const attribution = Object.fromEntries(tracked.map(key => [key, String(d.get(key) || '')]));
    sendEvent('generate_lead',{lead_source:d.get('utm_source')||'direct',contact_method:'whatsapp_form'},attribution);
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
