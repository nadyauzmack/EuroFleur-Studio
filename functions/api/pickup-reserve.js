function validDate(d) {
  if(!/^\d{4}-\d{2}-\d{2}$/.test(d||'')) return false;
  const parsed = new Date(d+'T12:00:00Z');
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0,10)===d;
}
export async function onRequestPost({request,env}) {
  if (!env.PICKUP_DB) return Response.json({error:'Pickup reservations are not configured'},{status:503});
  let body;
  try {body=await request.json()} catch {return Response.json({error:'Invalid request'},{status:400})}
  const {date,time}=body||{};
  if(!validDate(date)||!/^\d{2}:\d{2}$/.test(time||'')) return Response.json({error:'Invalid date or time'},{status:400});
  const [h,m]=time.split(':').map(Number);
  if(h<8||h>21||m%15!==0||(h===21&&m!==0)) return Response.json({error:'Outside pickup hours'},{status:400});
  const today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const earliest=new Date(today+'T12:00:00Z');earliest.setUTCDate(earliest.getUTCDate()+21);
  if(date<earliest.toISOString().slice(0,10)) return Response.json({error:'At least 21 days notice required'},{status:400});
  const db=env.PICKUP_DB;
  const update=await db.prepare(`INSERT INTO pickup_slots(pickup_date,pickup_time,reserved)
    VALUES(?,?,1) ON CONFLICT(pickup_date,pickup_time) DO UPDATE SET reserved=reserved+1 WHERE reserved<4
    RETURNING reserved`).bind(date,time).first();
  if(!update)return Response.json({error:'This time slot is fully booked'},{status:409});
  const id=crypto.randomUUID();
  await db.prepare('INSERT INTO pickup_requests(id,pickup_date,pickup_time) VALUES(?,?,?)').bind(id,date,time).run();
  return Response.json({reservation_id:id,date,time,remaining:4-update.reserved},{headers:{'Cache-Control':'no-store'}});
}
