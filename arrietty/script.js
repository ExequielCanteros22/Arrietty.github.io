var INSTAGRAM="arrietty.crochetstudio",WHATSAPP="5492304318063",EMAIL="arrietty.crochetstudio@gmail.com";
function wa(t){return "https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(t)}
document.querySelectorAll("[data-wa]").forEach(function(a){a.href=wa(a.getAttribute("data-wa"))});
document.querySelectorAll("[data-ig]").forEach(function(a){a.href="https://instagram.com/"+INSTAGRAM});
document.querySelectorAll("[data-mail]").forEach(function(a){a.href="mailto:"+EMAIL});

/* menú hamburguesa */
var mb=document.getElementById("menu-btn"),nav=document.getElementById("menu");
mb.addEventListener("click",function(){var o=nav.classList.toggle("open");mb.setAttribute("aria-expanded",o)});
nav.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){nav.classList.remove("open");mb.setAttribute("aria-expanded","false")})});

/* aparecer al hacer scroll */
if("IntersectionObserver" in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
  document.querySelectorAll(".card,details,.section-head").forEach(function(e){e.classList.add("reveal");io.observe(e)});
}

/* estante de libros */
var SECTIONS=[
 {id:"amigurumis",title:"Amigurumis",c:"#5f8f2f",t:"#faf1dc",quote:"Muñequitos con alma, puntada por puntada.",html:'<h3>Amigurumis</h3><p>Tejidos con hilo de algodón y relleno suave. Cada uno sale único.</p><a class="btn" href="#amigurumis">Ver los amigurumis</a>'},
 {id:"llaveros",title:"Llaveros",c:"#d2612a",t:"#faf1dc",quote:"Para llevar un poquito de cariño a todos lados.",html:'<h3>Llaveros</h3><p>Chiquitos, resistentes y listos para colgar de tu llave o mochila.</p><a class="btn" href="#llaveros">Ver los llaveros</a>'},
 {id:"personajes",title:"Personajes personalizados",c:"#2f4a1f",t:"#faf1dc",quote:"Tu personaje favorito, hecho a mano.",html:'<h3>Personajes personalizados</h3><p>Contame a quién querés tejer y lo hacemos juntos.</p><a class="btn" href="#personajes">Cómo se pide</a><a class="btn" style="background:#5f8f2f" target="_blank" rel="noopener" href="'+wa("Hola! Quiero encargar un personaje personalizado")+'">WhatsApp</a>'},
 {id:"instagram",title:"Instagram",c:"#e0b030",t:"#2f4a1f",quote:"Mirá cómo nace cada pieza.",html:'<h3>Instagram</h3><p>Fotos nuevas, procesos y trabajos terminados.</p><a class="btn" target="_blank" rel="noopener" href="https://instagram.com/'+INSTAGRAM+'">@'+INSTAGRAM+'</a>'},
 {id:"contacto",title:"Contacto",c:"#8a5f2e",t:"#faf1dc",quote:"Escribime, me encanta charlar de lana.",html:'<h3>Contacto</h3><p>Pedidos, precios, envíos o ideas nuevas.</p><a class="btn" style="background:#5f8f2f" target="_blank" rel="noopener" href="'+wa("Hola! Vi tu página de crochet")+'">WhatsApp</a><a class="btn" href="mailto:'+EMAIL+'">Correo</a><a class="btn" href="#contacto">Ver contacto</a>'}
];
var PLANT='<svg viewBox="0 0 60 90" aria-hidden="true"><path d="M30 60 C28 40 14 34 8 18 C26 20 32 34 30 60Z" fill="#5f8f2f"/><path d="M30 60 C32 36 46 28 54 10 C36 14 28 34 30 60Z" fill="#2f4a1f"/><path d="M16 62 H44 L40 88 H20 Z" fill="#d2612a"/></svg>';
var V="#5f8f2f",O="#2f4a1f",C="#faf1dc",R="#d2612a",M="#e0b030",W="#8a5f2e";
var LAYOUT=[
 [{c:R,h:200,t:"rd"},{c:M,h:250,k:1.2,t:"cp",x:O},{s:"amigurumis",h:270,k:1.3,t:"rd"},{c:C,h:190},{s:"llaveros",h:225,k:1.2,t:"cp"},{c:W,h:150,t:"rd"},{s:"personajes",h:300,k:1.5,t:"rd"},{plant:1},{c:V,h:210,lean:1}],
 [{yarn:1},{stack:1},{s:"instagram",h:240,k:1.2,t:"rd"},{c:O,h:200,t:"rd"},{s:"contacto",h:255,k:1.2,t:"cp"},{c:C,h:215,t:"cp"},{c:R,h:170,k:.9},{c:M,h:230,lean:1}]
];
var books=document.getElementById("books"),stage=document.getElementById("stage"),page=document.getElementById("page"),closeBtn=document.getElementById("close"),lastBtn=null,busy=false;
LAYOUT.forEach(function(row){
  var sh=document.createElement("div");sh.className="shelf";
  row.forEach(function(it){
    var el;
    if(it.plant){el=document.createElement("div");el.className="deco-plant";el.innerHTML=PLANT}
    else if(it.yarn){el=document.createElement("div");el.className="yarn"}
    else if(it.stack){el=document.createElement("div");el.className="stack";el.innerHTML='<i style="--c:'+R+'"></i><i style="--c:'+V+'"></i><i style="--c:'+M+'"></i>'}
    else{
      var s=it.s?SECTIONS.filter(function(x){return x.id===it.s})[0]:null;
      el=document.createElement(s?"button":"div");
      el.className="bk "+(it.t||"")+(it.lean?" lean":"");
      el.style.setProperty("--c",s?s.c:it.c);el.style.setProperty("--bh",it.h+"px");el.style.setProperty("--k",it.k||1);
      if(s){el.style.setProperty("--t",s.t);el.setAttribute("aria-label","Abrir libro: "+s.title);el.innerHTML="<span>"+s.title+"</span>";el.addEventListener("click",function(){openBook(s,el)})}
      else el.setAttribute("aria-hidden","true");
    }
    sh.appendChild(el);
  });
  books.appendChild(sh);
  var bd=document.createElement("div");bd.className="board";books.appendChild(bd);
});
function openBook(s,btn){
  if(busy)return;busy=true;lastBtn=btn;
  stage.style.setProperty("--c",s.c);stage.style.setProperty("--t",s.t);
  document.getElementById("ctitle").textContent=s.title;document.getElementById("cquote").textContent=s.quote;
  page.innerHTML=s.html;page.scrollTop=0;stage.classList.add("show");
  setTimeout(function(){stage.classList.add("open");busy=false;closeBtn.focus()},700);
}
function closeBook(now){
  if(!stage.classList.contains("show"))return;
  if(busy&&!now)return;busy=true;stage.classList.remove("open");
  setTimeout(function(){stage.classList.remove("show");busy=false;if(lastBtn&&!now)lastBtn.focus()},now?400:1150);
}
closeBtn.addEventListener("click",function(){closeBook()});
stage.addEventListener("click",function(e){if(e.target===stage)closeBook()});
page.addEventListener("click",function(e){var a=e.target.closest("a");if(a&&a.getAttribute("href").charAt(0)==="#")closeBook(true)});
document.addEventListener("keydown",function(e){if(e.key==="Escape")closeBook()});

/* niña y ovillo */
function poke(){var b=document.getElementById("ballg"),g=document.getElementById("girl");b.classList.remove("roll");g.classList.remove("twirl");void b.getBoundingClientRect();b.classList.add("roll");g.classList.add("twirl")}
document.getElementById("ballg").addEventListener("click",poke);document.getElementById("girl").addEventListener("click",poke);
document.getElementById("ballg").addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();poke()}});

/* hojas que caen */
(function(){if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;var c=[V,M,R,W];for(var i=0;i<10;i++){var l=document.createElement("span");l.className="leaf";l.setAttribute("aria-hidden","true");l.style.cssText="left:"+(Math.random()*100)+"vw;background:"+c[i%4]+";animation-duration:"+(14+Math.random()*14)+"s;animation-delay:-"+(Math.random()*20)+"s;--sw:"+(Math.random()*80-40)+"px";document.body.appendChild(l)}})();
