/* Cafe A+ — script dùng chung cho mọi trang */
{
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const PHONE='0932 034 539',TEL='tel:0932034539',ZALO='https://zalo.me/0932034539';

/* ---- Thanh điều hướng & chân trang ---- */
const PAGES=[['index.html','Trang chủ'],['menu.html','Menu'],['khuyen-mai.html','Khuyến mãi'],['khong-gian.html','Không gian'],['chi-nhanh.html','Chi nhánh'],['tuyen-dung.html','Tuyển dụng']];
const cur=document.body.dataset.page||'index.html';
if($('nav')){
 $('nav').setAttribute('aria-label','Điều hướng chính');
 $('nav').innerHTML=`<div class="wrap"><a class="logo" href="index.html"><img src="images/logo.png" alt="Logo Cafe A+">Cafe A+</a><button type="button" class="mtoggle" id="mtoggle" aria-expanded="false" aria-controls="links"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>Menu</button><div class="links" id="links">${PAGES.map(([h,t])=>`<a href="${h}"${h===cur?' aria-current="page"':''}>${t}</a>`).join('')}</div></div>`;
 const nav=$('nav'),tg=$('mtoggle');
 const setOpen=o=>{nav.classList.toggle('open',o);tg.setAttribute('aria-expanded',o);tg.lastChild.textContent=o?'Đóng':'Menu'};
 tg.addEventListener('click',()=>setOpen(!nav.classList.contains('open')));
 document.addEventListener('click',e=>{if(!nav.contains(e.target))setOpen(false)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false)});
}
/* Thanh nút nhanh trên điện thoại */
const mbar=document.createElement('div');
mbar.className='mbar';
mbar.innerHTML=`<a href="${TEL}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>Gọi quán</a><a href="${ZALO}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16v11H9l-5 4z"/></svg>Zalo</a><a href="chi-nhanh.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>Chỉ đường</a>`;
document.body.appendChild(mbar);
if($('footer')){
 $('footer').innerHTML=`<div class="wrap"><div><img src="images/logo.png" alt="Logo Cafe A+"><h3>Chuỗi Cafe A+</h3><p>Coffee Pure · Mở cửa 6h30 – 23h30 hằng ngày</p></div><div><h3>Địa chỉ</h3><p>1 Trần Văn Danh, P. Tân Bình</p><p>137 Hoàng Hoa Thám, P. Tân Bình</p><p>11/1 Nguyễn Đức Thuận, P. Tân Bình</p></div><div><h3>Trang</h3>${PAGES.map(([h,t])=>`<p><a href="${h}">${t}</a></p>`).join('')}</div><div><h3>Liên hệ</h3><p>Hotline · Zalo: <a href="${TEL}">${PHONE}</a></p><p><a href="${ZALO}">Nhắn Zalo cho quán</a></p></div></div><div class="wrap"><small>© 2026 Chuỗi Cafe A+ · TP. Hồ Chí Minh</small></div>`;
}

/* ---- Menu (đọc từ menu.json) ---- */
const loadJSON=f=>fetch(f,{cache:'no-store'}).then(r=>{if(!r.ok)throw 0;return r.json()});
if($('menuList')||$('drinks')){
 loadJSON('data/menu.json').then(menu=>{
  const shan=(menu.find(c=>c.isNew)||{items:[]}).items;
  if($('drinks'))$('drinks').innerHTML=shan.map(([n,p,,c])=>`<div class="drink"><i style="background:${/^#[0-9a-f]{3,8}$/i.test(c)?c:'#c19a5b'}"></i><h3>${esc(n)}</h3><b>${Number(p)}.000đ</b></div>`).join('');
  if($('menuList'))$('menuList').innerHTML=menu.map(c=>`<div class="cat${c.isNew?' isnew':''}"><h3>${esc(c.cat)}<span>${esc(c.en)}</span></h3><ul>${c.items.map(([n,p,b])=>`<li><span>${esc(n)}${b?' <small>Bán chạy</small>':''}</span><em></em><b>${Number(p)}K</b></li>`).join('')}</ul></div>`).join('');
 }).catch(()=>{if($('menuList'))$('menuList').innerHTML='<div class="empty">Chưa tải được menu. Vui lòng thử lại sau.</div>'});
}

/* ---- Chi nhánh ---- */
const BRANCHES=[{n:'1',addr:'1 Trần Văn Danh'},{n:'137',addr:'137 Hoàng Hoa Thám'},{n:'11/1',addr:'11/1 Nguyễn Đức Thuận'}];
if($('branchList')){
 $('branchList').innerHTML=BRANCHES.map(b=>{
  const q=encodeURIComponent(`Cafe A+ ${b.addr}, Phường 13, Tân Bình, Hồ Chí Minh`);
  return `<article class="br"><div class="num">${esc(b.n)}</div><h3>Cafe A+ ${esc(b.addr)}</h3><p>Phường Tân Bình (P.13, Q. Tân Bình cũ), TP. Hồ Chí Minh</p><p>6h30 – 23h30 · ${PHONE}</p><div class="row"><a class="btn pri" href="https://www.google.com/maps/search/?api=1&query=${q}">Chỉ đường</a><a class="btn out" href="${TEL}">Gọi quán</a></div></article>`}).join('');
}

/* ---- Tuyển dụng (nội dung mẫu) ---- */
const JOBS=[
 ['Nhân viên pha chế','Full-time / Part-time','Pha cà phê, trà, đá xay theo công thức của quán. Ca sáng 6h30–14h30 hoặc ca tối 14h30–23h30.'],
 ['Nhân viên phục vụ','Part-time','Order, mang nước, dọn bàn. Ca 4–6 tiếng, chọn theo lịch học.'],
 ['Thu ngân','Full-time','Tính tiền, nhận đơn mang đi và đơn qua điện thoại, kiểm két cuối ca.']
];
if($('jobList'))$('jobList').innerHTML=JOBS.map(([t,k,d])=>`<div class="job"><h3>${esc(t)}<span>${esc(k)}</span></h3><p>${esc(d)}</p></div>`).join('');

/* ---- Tin tức & khuyến mãi (đọc từ posts.json) ---- */
const TYPES={'khuyen-mai':'Khuyến mãi','su-kien':'Sự kiện','mon-moi':'Món mới'};
const today=new Date().toISOString().slice(0,10);
const vn=d=>{const [y,m,dd]=String(d).split('-');return `${dd}/${m}/${y}`};
const postsEl=$('posts');
if(postsEl){
 const limit=+postsEl.dataset.limit||0, asLink=postsEl.dataset.link==='1';
 let posts=[],filter='all';
 const card=p=>{
  const ended=p.until&&p.until<today;
  const until=p.until?`<div class="until${ended?' off':''}">${ended?'Đã kết thúc':(p.type==='su-kien'?'Diễn ra: ':'Áp dụng đến ')+esc(vn(p.until))}</div>`:'';
  const inner=`${p.image?`<div class="pic"><img src="${esc(p.image)}" alt="" loading="lazy"><span class="tag ${esc(p.type)}">${esc(TYPES[p.type]||'Tin tức')}</span></div>`:''}<div class="txt"><div class="meta"><span>${esc(vn(p.date))}</span><span>${esc(p.branch)}</span></div><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p>${until}</div>`;
  return asLink?`<a class="post" style="text-decoration:none" href="khuyen-mai.html#bai-${esc(p.id)}">${inner}</a>`:`<button type="button" class="post" data-id="${esc(p.id)}">${inner}</button>`;
 };
 const render=()=>{
  let list=posts.filter(p=>filter==='all'||p.type===filter);
  if(limit)list=list.slice(0,limit);
  postsEl.innerHTML=list.length?list.map(card).join(''):'<div class="empty">Chưa có bài viết nào trong mục này.</div>';
 };
 const ov=$('ov'),mBody=$('mBody');
 const open=id=>{
  const p=posts.find(x=>x.id===id);if(!p||!ov)return;
  mBody.innerHTML=`${p.image?`<img src="${esc(p.image)}" alt="">`:''}<div class="in"><span class="tag ${esc(p.type)}" style="position:static;display:inline-block">${esc(TYPES[p.type]||'Tin tức')}</span><h3 id="mTitle">${esc(p.title)}</h3><div class="meta"><span>Đăng ngày ${esc(vn(p.date))}</span><span>${esc(p.branch)}</span>${p.until?`<span>${p.type==='su-kien'?'Diễn ra':'Áp dụng đến'} ${esc(vn(p.until))}</span>`:''}</div>${(p.content||[]).map(t=>`<p>${esc(t)}</p>`).join('')}<div class="btns"><a class="btn pri" href="${TEL}">Gọi quán ${PHONE}</a><a class="btn ghost" href="${ZALO}">Nhắn Zalo</a></div></div>`;
  ov.hidden=false;document.body.style.overflow='hidden';$('mClose').focus();
  if(location.hash!=='#bai-'+id)history.replaceState(null,'','#bai-'+id);
 };
 const close=()=>{ov.hidden=true;document.body.style.overflow='';if(location.hash.startsWith('#bai-'))history.replaceState(null,'',location.pathname)};
 if(ov){
  postsEl.addEventListener('click',e=>{const b=e.target.closest('button.post');if(b)open(b.dataset.id)});
  $('mClose').addEventListener('click',close);
  ov.addEventListener('click',e=>{if(e.target===ov)close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!ov.hidden)close()});
 }
 document.querySelectorAll('.filters button').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.f;document.querySelectorAll('.filters button').forEach(x=>x.setAttribute('aria-pressed',x===b));render()}));
 const fromHash=()=>{if(location.hash.startsWith('#bai-'))open(location.hash.slice(5))};
 window.addEventListener('hashchange',fromHash);
 loadJSON('data/posts.json').then(d=>{
  posts=(Array.isArray(d)?d:[]).sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  render();fromHash();
  const sample=posts.filter(p=>p.sample).map(p=>`"${p.title}"`);
  if(sample.length&&$('postNote'))$('postNote').textContent=`Bài ${sample.join(' và ')} là bài mẫu để minh họa, cần thay bằng chương trình thật của quán.`;
 }).catch(()=>{postsEl.innerHTML='<div class="empty">Chưa tải được bài viết. Vui lòng thử lại sau.</div>'});
}

/* ---- Bộ ảnh không gian + phóng to ---- */
if($('tour')&&$('lb')){
 const gal=[...$('tour').querySelectorAll('.g')].map(b=>({src:b.querySelector('img').src,alt:b.querySelector('img').alt,cap:b.querySelector('span').textContent}));
 const lb=$('lb');let gi=0;
 const show=i=>{gi=(i+gal.length)%gal.length;$('lbImg').src=gal[gi].src;$('lbImg').alt=gal[gi].alt;$('lbCap').textContent=`${gal[gi].cap} · ${gi+1}/${gal.length}`};
 const close=()=>{lb.hidden=true;document.body.style.overflow=''};
 $('tour').addEventListener('click',e=>{const b=e.target.closest('.g');if(!b)return;show(+b.dataset.i);lb.hidden=false;document.body.style.overflow='hidden';$('lbClose').focus()});
 $('lbPrev').addEventListener('click',()=>show(gi-1));
 $('lbNext').addEventListener('click',()=>show(gi+1));
 $('lbClose').addEventListener('click',close);
 lb.addEventListener('click',e=>{if(e.target===lb)close()});
 document.addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowRight')show(gi+1);if(e.key==='ArrowLeft')show(gi-1)});
}

/* ---- Dây bóng đèn ở đầu trang chủ ---- */
const svg=$('bulbs');
if(svg){
 const draw=()=>{
  const W=svg.clientWidth,n=Math.max(5,Math.round(W/140));
  const pts=Array.from({length:n},(_,i)=>[(i+.5)*W/n,34+Math.sin(i*1.7)*10+((i%2)?26:12)]);
  const wire=`M0 18 `+pts.map(([x])=>`Q${x-W/n/2} 46 ${x} 22`).join(' ')+` T${W} 18`;
  svg.innerHTML=`<defs><radialGradient id="bg"><stop offset="0" stop-color="#ffd27a" stop-opacity=".75"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient></defs><path d="${wire}" stroke="#0d0805" stroke-width="2" fill="none"/>`+pts.map(([x,y])=>`<line x1="${x}" y1="22" x2="${x}" y2="${y}" stroke="#0d0805" stroke-width="2"/><rect x="${x-5}" y="${y}" width="10" height="9" rx="2" fill="#5a4a3a"/><circle class="glow" cx="${x}" cy="${y+22}" r="34" fill="url(#bg)"/><ellipse cx="${x}" cy="${y+21}" rx="9" ry="12" fill="#ffe2a3"/><path d="M${x-3} ${y+16} q3 6 6 0" stroke="#d9802c" stroke-width="1.5" fill="none"/>`).join('');
 };
 const bulbRO=new ResizeObserver(draw);bulbRO.observe(svg);
}
}
