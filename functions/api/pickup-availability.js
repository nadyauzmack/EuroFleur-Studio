export async function onRequestGet({ request, env }) {
  if (!env.PICKUP_DB) return Response.json({error:'Pickup availability is not configured'},{status:503});
  const date = new URL(request.url).searchParams.get('date');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date||'')) return Response.json({error:'Invalid date'},{status:400});
  const rows = await env.PICKUP_DB.prepare('SELECT pickup_time, reserved FROM pickup_slots WHERE pickup_date = ?').bind(date).all();
  return Response.json({date, capacity:4, slots:Object.fromEntries(rows.results.map(r=>[r.pickup_time,r.reserved]))},{headers:{'Cache-Control':'no-store'}});
}
