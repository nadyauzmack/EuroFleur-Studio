// Cloudflare Pages Function: public pickup slots (America/New_York).
// Configure WEEKLY_PICKUP_SLOTS and BLOCKED_PICKUP_DATES in Pages environment variables.
// WEEKLY_PICKUP_SLOTS example: {"2":["17:00","17:30"],"6":["11:00","11:30"]}
// BLOCKED_PICKUP_DATES example: ["2026-11-26","2026-12-25"]
const DEFAULT_WEEKLY_SLOTS = Object.fromEntries(Array.from({length:7},(_,day)=>[String(day),Array.from({length:12},(_,hour)=>String(hour+8).padStart(2,'0')+':00')]));
const TZ = 'America/New_York';
const dateParts = d => Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(d).filter(p=>p.type!=='literal').map(p=>[p.type,p.value]));
const ymd = d => {const p=dateParts(d);return p.year+'-'+p.month+'-'+p.day};
const validDate = v => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v+'T12:00:00Z')) && new Date(v+'T12:00:00Z').toISOString().slice(0,10)===v;
const json = (value,status=200)=>new Response(JSON.stringify(value),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});
export async function onRequestGet({request,env}){
  const date=new URL(request.url).searchParams.get('date');
  if(!validDate(date))return json({error:'Valid date required (YYYY-MM-DD)'},400);
  const now=ymd(new Date());
  const earliest=new Date(now+'T12:00:00Z');earliest.setUTCDate(earliest.getUTCDate()+21);
  if(date<earliest.toISOString().slice(0,10))return json({date,slots:[],reason:'21-day advance notice required'});
  let weekly,blocked;
  try{weekly=JSON.parse(env.WEEKLY_PICKUP_SLOTS||JSON.stringify(DEFAULT_WEEKLY_SLOTS));blocked=JSON.parse(env.BLOCKED_PICKUP_DATES||'[]')}
  catch{return json({error:'Pickup schedule configuration is invalid'},503)}
  if(!Array.isArray(blocked)||!weekly||typeof weekly!=='object')return json({error:'Pickup schedule configuration is invalid'},503);
  const day=String(new Date(date+'T12:00:00Z').getUTCDay());
  const slots=blocked.includes(date)?[]:(Array.isArray(weekly[day])?weekly[day]:[]).filter(s=>/^([01]\d|2[0-3]):[0-5]\d$/.test(s));
  return json({date,slots,timezone:TZ,minimumNoticeDays:21,maximumOrdersPerSlot:3,pickupOnly:true});
}
