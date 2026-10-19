const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
const validDate=s=>/^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(Date.parse(s+'T12:00:00Z'));
export async function onRequestPost({request,env}){
  if(!env.RESEND_API_KEY||!env.ORDER_FROM_EMAIL)return json({error:'Email delivery is not configured yet. Please text 814-769-6244.'},503);
  if(Number(request.headers.get('content-length')||0)>16000)return json({error:'Request too large.'},413);
  let x;try{x=await request.json()}catch{return json({error:'Invalid request.'},400)}
  if(x.website)return json({ok:true});
  const clean=(v,n=500)=>String(v??'').trim().slice(0,n);
  const name=clean(x.name,100),email=clean(x.email,254),phone=clean(x.phone,40);
  const date=clean(x.pickupDate,10),time=clean(x.pickupTime,5);
  if(!name||!/^\S+@\S+\.\S+$/.test(email)||!phone||!validDate(date)||!/^([01]\d|2[0-3]):[0-5]\d$/.test(time))return json({error:'Please check your contact and pickup details.'},400);
  const now=new Date();const min=new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate()+20));
  if(Date.parse(date+'T12:00:00Z')<min.getTime()||(date>='2026-11-24'&&date<='2026-12-03'))return json({error:'This pickup date is unavailable. Please choose another date.'},400);
  const mins=Number(time.slice(0,2))*60+Number(time.slice(3));
  if(mins<480||mins>1260||mins%15!==0)return json({error:'Please select a pickup time between 8 AM and 9 PM.'},400);
  if(!['large','ramo'].includes(x.product)||!Array.isArray(x.colors)||x.colors.length<1||x.colors.length>3||!['Venmo','Cash App','Cash'].some(v=>clean(x.payment,60).toLowerCase().includes(v.toLowerCase())))return json({error:'Please complete your bouquet and payment selections.'},400);
  const lines=[
    'NEW EUROFLEUR STUDIO BOUQUET REQUEST','',
    'Customer: '+name,'Email: '+email,'Phone: '+phone,
    'Arrangement: '+clean(x.arrangement,150),
    'Rose count: '+(x.product==='ramo'?clean(x.roses,4):'N/A'),
    'Color families: '+x.colors.map(v=>clean(v,60)).join(', '),
    'Pickup date: '+date,'Pickup time: '+time,
    'Payment preference: '+clean(x.payment,60),
    'Estimated price: $'+clean(x.price,10),
    'Notes: '+clean(x.notes,1500),'',
    'REQUEST ONLY — pickup and payment require studio confirmation.'
  ];
  let r;try{r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{'Authorization':'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:env.ORDER_FROM_EMAIL,to:['justfloralmoments@gmail.com'],reply_to:email,subject:'New EuroFleur bouquet request — '+name,text:lines.join('\n')})})}catch{return json({error:'Email service temporarily unavailable. Please try again.'},502)}
  if(!r.ok){console.error('Resend delivery error',r.status,await r.text());return json({error:'Email could not be delivered. Please try again or text us.'},502)}
  return json({ok:true});
}
