// StickerDex simple app
const STICKER_COUNT = 15; // total slots (removed slot #5)
// Preloaded stickers: prefer images from the `sticker/` folder if present
// PRELOADED in order — note: removed the original #5 entry so subsequent items shift
const PRELOADED = [
  {id:0,name:'¡Un hallazgo raro sin duda! Este espécimen suele mostrarse en raras ocasiones cuando la situación es... curiosa',src:'sticker/duda.jpeg'},
  {id:1,name:'Sticker poco común, refleja la falta de ideas y de ganas de pensar en una... espera... me recuerda a alguien...',src:'sticker/flojera.jpeg'},
  {id:2,name:'Sticker común... la respuesta predilecta cuando no hay respuesta, o se ha hecho algo indebido... por lo general es al revés ja',src:'sticker/indecision.jpeg'},
  {id:3,name:'Poco común, que mejor forma de responder que disfrutando la situación de una manera tranquila... o igual cuando no se sabe que decir',src:'sticker/juguito.jpeg'},
  {id:4,name:'Válgame... este sticker refleja muy bien como llega a ser la persona que envía este mismo... se ve esa sonrisa y no solo en el sticker',src:'sticker/maldad.jpeg'},
];

const STORAGE_KEY = 'stickerdex:v1';

function loadSaved(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw? JSON.parse(raw) : {};
  }catch(e){return {}};
}
function saveAll(state){
  localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
}

function makeCard(index, initial){
  const card = document.createElement('div');
  // Use our sticker styles and Bootstrap column classes for responsiveness
  card.className='sticker-card col-6 col-sm-4 col-md-3 col-lg-2';

  // Title area (fixed): Descubrimiento #N (placed above the image)
  const title = document.createElement('div');
  title.className = 'sticker-title';
  title.textContent = `Descubrimiento #${index+1}`;

  // Top: image
  const stickerWrap = document.createElement('div');
  stickerWrap.className='sticker';

  const img = document.createElement('img');
  img.alt = `Sticker ${index+1}`;
  img.draggable=false;
  if(initial && initial.src){
    img.src = initial.src;
  } else {
    img.src = 'sticker/placeholder.svg';
  }
  stickerWrap.appendChild(img);

  // Description (editable) — single editable block for description
  const desc = document.createElement('div');
  desc.className = 'sticker-desc';
  desc.contentEditable = true;
  desc.spellcheck = false;
  desc.dataset.index = index;

  // Append in order: title, image, description
  card.appendChild(title);
  card.appendChild(stickerWrap);
  card.appendChild(desc);

  return {card,desc};
}

function render(){
  const grid = document.getElementById('grid');
  grid.innerHTML='';
  const saved = loadSaved();
  for(let i=0;i<STICKER_COUNT;i++){
    const pre = PRELOADED.find(p=>p.id===i);
    const {card,desc} = makeCard(i, pre);

    // decide default description
    if(saved[i] && saved[i].text){
      desc.textContent = saved[i].text;
    } else if(pre && pre.name){
      desc.textContent = pre.name;
    } else {
      desc.textContent = 'Por descubrir';
      desc.style.opacity = 0.85;
    }

    grid.appendChild(card);
  }
}

// initial render
render();

// Optional: save edits automatically when focus lost
// Save description on focus out
document.addEventListener('focusout', (e)=>{
  if(e.target && e.target.classList && e.target.classList.contains('sticker-desc')){
    const idx = e.target.dataset.index;
    const state = loadSaved();
    state[idx] = {text: e.target.textContent.trim()};
    saveAll(state);
  }
});

// expose a small helper for debugging in console
window.stickerdex = {render,loadSaved};
