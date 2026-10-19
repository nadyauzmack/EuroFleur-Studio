// Payment endpoint deliberately disabled until Stripe keys, durable reservations,
// authoritative product pricing, webhook fulfillment and tax rules are configured.
// NEVER put STRIPE_SECRET_KEY in HTML or client JavaScript.
export async function onRequestPost(){
  return new Response(JSON.stringify({error:'Online checkout is not yet enabled. Please use the existing email order request.'}),{status:503,headers:{'content-type':'application/json','cache-control':'no-store'}});
}
