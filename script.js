(function(){
  const cfg = window.INPLEXA_CONFIG || {};
  const number = cfg.whatsappNumber || '';
  const params = new URLSearchParams(location.search);
  const tracked = ['utm_source','utm_medium','utm_campaign','gclid'];
  window.dataLayer = window.dataLayer || [];
  const sendEvent = (name, details={}) => window.dataLayer.push({event:name,...details});
  const whatsappUrl = message => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  document.querySelectorAll('[data-whatsapp]').forEach(link => {
    link.href = whatsappUrl('Hola INPLEXA, quiero consultar por desarrollo y fabricación de piezas plásticas.');
    link.addEventListener('click', () => sendEvent('inplexa_whatsapp_click',{placement:link.className || 'link'}));
  });
  tracked.forEach(key => { const input=document.querySelector(`[name="${key}"]`); if(input) input.value=params.get(key)||''; });
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('quoteForm').addEventListener('submit', function(event){
    event.preventDefault(); const d=new FormData(this);
    const msg=`Hola INPLEXA, solicito cotización.\n\n*Nombre:* ${d.get('nombre')}\n*Empresa:* ${d.get('empresa')}\n*Rol:* ${d.get('rol')}\n*Tipo de proyecto:* ${d.get('tipo_proyecto')}\n*WhatsApp:* ${d.get('telefono')}\n*Email:* ${d.get('email')}\n*Necesidad:* ${d.get('consulta')}\n\nOrigen campaña: ${d.get('utm_source')||'directo'} | ${d.get('utm_campaign')||'sin campaña'} | GCLID: ${d.get('gclid')||'sin GCLID'}`;
    sendEvent('inplexa_generate_lead',{lead_source:d.get('utm_source')||'direct'});
    window.open(whatsappUrl(msg),'_blank','noopener');
  });
})();
