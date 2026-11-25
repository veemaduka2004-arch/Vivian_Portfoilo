(function(){
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
// header
const hd=$('#hd'),bg=$('.burger'),mn=$('#menu'),tp=$('#top');
const onScroll=()=>{hd.classList.toggle('sc',scrollY>30);tp.classList.toggle('show',scrollY>700)};
addEventListener('scroll',onScroll,{passive:true});onScroll();
bg.onclick=()=>{const o=mn.classList.toggle('open');hd.classList.toggle('open',o);bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Close menu':'Open menu')};
addEventListener('keydown',e=>{if(e.key=='Escape'&&mn.classList.contains('open'))bg.click()});
// active page
const pg=document.body.dataset.page+'.html';
$$('a.l').forEach(a=>{if(a.getAttribute('href')==pg){a.classList.add('on');a.setAttribute('aria-current','page')}});
tp.onclick=()=>scrollTo({top:0});
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach(x=>io.observe(x));
// typing
const ty=$('#type');
if(ty&&!rm){const w=['Front-End Developer','Creative Web Developer','JavaScript Learner','UI-Focused Developer'];let i=0,c=w[0].length,del=true;
(function tick(){const s=w[i];ty.textContent=s.slice(0,c);let d=del?45:85;
if(del&&c==0){del=false;i=(i+1)%w.length;d=300}else if(!del&&c==w[i].length){del=true;d=1800}
c+=del?-1:1;setTimeout(tick,d)})()}
// live preview scaling
function fit(){$$('.frame').forEach(f=>{const fr=$('iframe',f);fr.style.transform='scale('+(f.clientWidth/1280)+')'})}
fit();addEventListener('resize',fit);
// contact form
const f=$('#f');
if(f){
const ENDPOINT=""; // Set to a working form service URL (e.g. Formspree) or your own serverless function to enable email delivery
const st=$('#status'),sb=$('#sb');let busy=false;
f.addEventListener('submit',async ev=>{ev.preventDefault();if(busy)return;st.className='';st.textContent='';
let ok=true;const d={};
$$('input[required],textarea[required]',f).forEach(i=>{const v=i.value.trim();let m='';
if(!v)m='This field is required.';
else if(i.type=='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))m='Enter a valid email address, like name@example.com.';
else if(i.name=='message'&&v.length<10)m='Please write at least 10 characters.';
i.setAttribute('aria-invalid',!!m);i.nextElementSibling.textContent=m;if(m)ok=false;d[i.name]=v});
if(!ok){$('[aria-invalid=true]',f).focus();return}
if(f.website.value)return;
if(!ENDPOINT){st.className='bad';st.textContent='Message not sent: the contact form is not connected to an email service yet. Please email veemaduka2004@gmail.com, call 070546969872 or use WhatsApp instead.';return}
busy=true;sb.disabled=true;sb.textContent='Sending…';
try{const r=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(d)});
if(!r.ok)throw 0;st.className='ok';st.textContent='Message sent. Thank you, Vivian will reply soon.';f.reset()}
catch(_){st.className='bad';st.textContent='Message not sent. Check your connection and try again, or call 070546969872.'}
busy=false;sb.disabled=false;sb.textContent='Send Message'})}
})();
