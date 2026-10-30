'use strict';
// Forest Shuffle Calculator 2.0: alle tellers blijven lokaal bewaard.
const kaartenPerCategorie={};
function add(cat,name,labels,score=null,extras=null,max=null){(kaartenPerCategorie[cat]??=[]).push({naam:name,labels:labels.split(' '),score,extras,max})}
const A=n=>aantallen[n]||0,E=id=>extraWaarden[id]||0,T=(label,distinct=false)=>telLabel(label,distinct);
const counter=(id,label,maxKaart=null,always=false)=>({id,label,maxKaart,always,type:'counter'});
const select=(id,label,options)=>({id,label,options,type:'select'});
const yesno=(id,label)=>({id,label,type:'yesno'});
// Amfibieen
add('Amfibieën','Alpenwatersalamander','amfibie berguitbreiding onderkant',()=>A('Alpenwatersalamander')*2*T('insect'));
add('Amfibieën','Boomkikker','amfibie onderkant',()=>A('Boomkikker')*5*A('Mug'));
add('Amfibieën','Gewone pad','amfibie onderkant',()=>A('Gewone pad')?5*E('duosPadden'):0,[counter('duosPadden',"Aantal duo's padden")]);
add('Amfibieën','Moerasschildpad','amfibie onderkant',()=>5*A('Moerasschildpad'));
add('Amfibieën','Vuursalamander','amfibie onderkant',()=>[0,5,15][A('Vuursalamander')]??25);
// Bomen
add('Bomen','Alpenden','boom berguitbreiding',()=>A('Alpenden')*T('berguitbreiding'));
add('Bomen','Beuk','boom',()=>effectief('Beuk')>=4?5*effectief('Beuk'):0,[counter('houtbijBeuk','Houtbij',null,true)]);
add('Bomen','Berk','boom',()=>A('Berk'));
add('Bomen','Douglasspar','boom',()=>5*A('Douglasspar'));
add('Bomen','Eik','boom',()=>T('boom',true)>=8?10*A('Eik'):0);
add('Bomen','Esdoorn','boom',()=>effectief('Esdoorn')*T('boom'),[counter('houtbijEsdoorn','Houtbij',null,true)]);
add('Bomen','Europese Lariks','boom berguitbreiding',()=>3*A('Europese Lariks'));
add('Bomen','Jonge boom','boom');
add('Bomen','Linde','boom',()=>A('Linde')*E('lindePunten'),[select('lindePunten','Aantal punten per linde',[[1,'1 punt'],[3,'3 punten']])]);
add('Bomen','Moseik','boom grotuitbreiding',()=>A('Moseik')*T('evenhoevig'));
add('Bomen','O, Dennenboom','boom grotuitbreiding',()=>A('O, Dennenboom')?2*E('dennenboomKaarten'):0,[counter('dennenboomKaarten','Aantal kaarten aan deze boom')]);
add('Bomen','Paardenkastanje','boom',()=>Math.min(effectief('Paardenkastanje')**2,49),[counter('houtbijPaardenkastanje','Houtbij',null,true)]);
add('Bomen','Palmboom','boom grotuitbreiding',()=>A('Palmboom')*T('vogel'));
add('Bomen','Zachte berk','boom grotuitbreiding',()=>A('Zachte berk'));
add('Bomen','Zilverspar','boom',()=>A('Zilverspar')?2*E('zilversparKaarten'):0,[counter('zilversparKaarten','Aantal kaarten aan deze bomen')]);
// Evenhoevige dieren
add('Evenhoevige dieren','Alpensteenbok','evenhoevig berguitbreiding zijkant',()=>10*A('Alpensteenbok'));
add('Evenhoevige dieren','Damhert','evenhoevig hert zijkant',()=>A('Damhert')*3*T('evenhoevig'));
add('Evenhoevige dieren','Edelhert','evenhoevig hert zijkant',()=>A('Edelhert')*(T('boom')+T('plant')));
add('Evenhoevige dieren','Eland','evenhoevig hert zijkant',()=>A('Eland')?2*(E('elandKleur')+E('elandJongeBomen')):0,[counter('elandKleur','Aantal kaarten met juiste kleur'),counter('elandJongeBomen','Aantal jonge boompjes')],1);
add('Evenhoevige dieren','Gems','evenhoevig berguitbreiding zijkant',()=>3*sumCopies('Gems'));
add('Evenhoevige dieren','Ree','evenhoevig hert zijkant',()=>3*sumCopies('Ree'));
add('Evenhoevige dieren','Wild zwijn','evenhoevig zijkant',()=>A('Zwijnenbig')?10*A('Wild zwijn'):0);
add('Evenhoevige dieren','Wild zwijn (zeug)','evenhoevig bosuitbreiding zijkant',()=>A('Wild zwijn (zeug)')*10*A('Zwijnenbig'));
add('Evenhoevige dieren','Wisent','evenhoevig bosuitbreiding zijkant',()=>2*sumCopies('Wisent'));
add('Evenhoevige dieren','Zwijnenbig','evenhoevig zijkant',()=>A('Zwijnenbig'));
kaartenPerCategorie['Herten']=['Damhert','Edelhert','Eland','Ree'].map(n=>kaartenPerCategorie['Evenhoevige dieren'].find(c=>c.naam===n));
// Insecten
add('Insecten','Bosmier','insect onderkant',()=>A('Bosmier')*2*T('onderkant'));
add('Insecten','Grote groene sabelsprinkhaan','insect onderkant bosuitbreiding',()=>A('Grote groene sabelsprinkhaan')*T('insect'));
add('Insecten','Houtbij','insect zijkant');
add('Insecten','Mug','insect zijkant',()=>A('Mug')*T('vleermuis'));
add('Insecten','Vliegend hert','insect onderkant',()=>A('Vliegend hert')*T('pootdier'));
add('Insecten','Vliegende hooiwagen','insect zijkant bosuitbreiding',()=>A('Vliegende hooiwagen')*T('vleermuis'));
add('Insecten','Vuurvliegjes','insect onderkant',()=>{let n=A('Vuurvliegjes');return n<2?0:n===2?10:n===3?15:20});
add('Insecten','Zwerm honingbijen','insect zijkant bosuitbreiding',()=>A('Zwerm honingbijen')*T('plant'));
// Paddenstoelen
for(const n of ['Cantharel','Eekhoorntjesbrood','Grote parasolzwam','Hoorn-van-overvloed','Vliegenzwam'])add('Paddenstoelen',n,'paddenstoel onderkant'+(n==='Hoorn-van-overvloed'?' berguitbreiding':''));
// Planten
add('Planten','Blauwe bosbes','plant onderkant berguitbreiding',()=>A('Blauwe bosbes')*2*T('vogel',true));
add('Planten','Boomvarens','plant onderkant',()=>A('Boomvarens')*6*T('amfibie'));
add('Planten','Bostulp','plant onderkant bosuitbreiding',()=>3*A('Bostulp'));
add('Planten','Bramen','plant onderkant',()=>A('Bramen')*2*T('plant'));
add('Planten','Edelweiss','plant onderkant berguitbreiding',()=>3*A('Edelweiss'));
add('Planten','Gentiaan','plant onderkant berguitbreiding',()=>A('Gentiaan')*3*T('vlinder'));
add('Planten','Grote brandnetel','plant onderkant bosuitbreiding',()=>A('Grote brandnetel')*2*T('vlinder'));
add('Planten','Maretak','plant bovenkant',()=>A('Maretak')*T('plant'));
add('Planten','Mos','plant onderkant',()=>T('boom')>=10?10*A('Mos'):0);
add('Planten','Vingerhoedskruid','plant onderkant bosuitbreiding',()=>A('Vingerhoedskruid')*[0,1,3,6,10,15][Math.min(T('plant',true),5)]);
add('Planten','Wateraardbei','plant onderkant',()=>A('Wateraardbei')*(T('boom')<=5?15:T('boom')<=10?7:3));
add('Planten','Wilde aardbeien','plant onderkant',()=>T('boom',true)>=8?10*A('Wilde aardbeien'):0);
// Pootdieren
add('Pootdieren','Alpenmarmot','pootdier zijkant berguitbreiding',()=>A('Alpenmarmot')*3*T('plant',true));
add('Pootdieren','Bruine beer','pootdier zijkant');
add('Pootdieren','Bunzing','pootdier zijkant bosuitbreiding',()=>10*Math.min(A('Bunzing'),E('bunzingAlleen')),[counter('bunzingAlleen','Aantal bunzings alleen aan boom/struik','Bunzing')]);
add('Pootdieren','Civetkat','pootdier zijkant',()=>5*A('Civetkat'));
add('Pootdieren','Egel','pootdier onderkant',()=>A('Egel')*2*T('vlinder'));
add('Pootdieren','Europese das','pootdier zijkant',()=>2*A('Europese das'));
add('Pootdieren','Europese haas','pootdier zijkant',()=>A('Europese haas')*hares());
add('Pootdieren','Lynx','pootdier zijkant',()=>A('Ree')?10*A('Lynx'):0);
add('Pootdieren','Mol','pootdier onderkant');
add('Pootdieren','Poolvos','pootdier zijkant',()=>A('Poolvos')*2*hares());
add('Pootdieren','Relmuis','pootdier zijkant',()=>15*Math.min(A('Relmuis'),E('relmuisMetVleermuis')),[counter('relmuisMetVleermuis','Aantal relmuizen met vleermuis in boom','Relmuis')]);
add('Pootdieren','Rode eekhoorn','pootdier bovenkant',()=>5*Math.min(A('Rode eekhoorn'),E('rodeEekhoornOpEik')),[counter('rodeEekhoornOpEik','Aantal rode eekhoornen op een eik','Rode eekhoorn')]);
add('Pootdieren','Rode panda','pootdier zijkant',()=>2*A('Rode panda'));
add('Pootdieren','Rode vos','pootdier zijkant',()=>A('Rode vos')*2*hares());
add('Pootdieren','Sabelmarter','pootdier zijkant',()=>A('Sabelmarter')*3*T('pootdier'));
add('Pootdieren','Sneeuwhaas','pootdier zijkant berguitbreiding',()=>A('Sneeuwhaas')*hares());
add('Pootdieren','Steenmarter','pootdier zijkant',()=>A('Steenmarter')*5*E('volledigeBomen'),[counter('volledigeBomen','Aantal volledige bomen')]);
add('Pootdieren','Wasbeer','pootdier zijkant');
add('Pootdieren','Wilde kat','pootdier zijkant bosuitbreiding',()=>A('Wilde kat')*T('bosuitbreiding'));
add('Pootdieren','Woelrat','pootdier zijkant bosuitbreiding');
add('Pootdieren','Wolf','pootdier zijkant',()=>A('Wolf')*5*T('hert'));
// Struiken
for(const n of ['Gewone vlier','Hazelaar','Sleedoorn'])add('Struiken',n,'struik bosuitbreiding');
// Vleermuizen
for(const n of ['Bechsteins vleermuis','Bruine grootoorvleermuis','Grote hoefijzerneus','Mopsvleermuis',"Savi's dwergvleermuis"])add('Vleermuizen',n,'vleermuis zijkant'+(n==="Savi's dwergvleermuis"?' berguitbreiding':''),()=>T('vleermuis',true)>=3?5*A(n):0);
// Vlinders
for(const n of ['Citroenvlinder','Dagpauwoog','Grote vos','Grote weerschijnvlinder','Keizersmantel','Kleine apollovlinder','Landkaartje','Rouwmantel'])add('Vlinders',n,'vlinder insect bovenkant'+(['Kleine apollovlinder','Landkaartje'].includes(n)?' berguitbreiding':''));
// Vogels
add('Vogels','Auerhoen','vogel zijkant berguitbreiding',()=>A('Auerhoen')*T('plant'));
add('Vogels','Bosuil','vogel bovenkant',()=>5*A('Bosuil'));
add('Vogels','Ekster','vogel bovenkant bosuitbreiding',()=>3*A('Ekster'));
add('Vogels','Goudvink','vogel bovenkant',()=>A('Goudvink')*2*T('insect'));
add('Vogels','Grote bonte specht','vogel bovenkant',()=>E('anderBosMeerBomen')?0:10*A('Grote bonte specht'),[yesno('anderBosMeerBomen','Is er een ander bos met meer bomen?')]);
add('Vogels','Havik','vogel bovenkant',()=>A('Havik')*3*T('vogel'));
add('Vogels','Kerkuil','vogel bovenkant bosuitbreiding',()=>A('Kerkuil')*3*T('vleermuis'));
add('Vogels','Koekoek','vogel bovenkant',()=>7*A('Koekoek'));
add('Vogels','Lammergier','vogel bovenkant berguitbreiding',()=>A('Lammergier')*grotAantalKaarten);
add('Vogels','Nachtegaal','vogel bovenkant bosuitbreiding',()=>5*Math.min(A('Nachtegaal'),E('nachtegaalOpStruik')),[counter('nachtegaalOpStruik','Aantal nachtegalen op een struik','Nachtegaal')]);
add('Vogels','Ooievaar','vogel zijkant bosuitbreiding',()=>A('Ooievaar')*(T('insect')+T('amfibie')));
add('Vogels','Paapje','vogel bovenkant',()=>A('Paapje')*T('plant'));
add('Vogels','Raaf','vogel bovenkant berguitbreiding',()=>5*A('Raaf'));
add('Vogels','Rode kardinaal','vogel bovenkant bosuitbreiding',()=>5*A('Rode kardinaal'));
add('Vogels','Roodborstje','vogel bovenkant bosuitbreiding',()=>A('Roodborstje')*T('insect'));
add('Vogels','Steenarend','vogel bovenkant berguitbreiding',()=>A('Steenarend')*(T('pootdier')+T('amfibie')));
add('Vogels','Vink','vogel bovenkant',()=>5*Math.min(A('Vink'),E('vinkOpBeuk')),[counter('vinkOpBeuk','Aantal vinken op een beuk','Vink')]);
add('Vogels','Vlaamse gaai','vogel bovenkant',()=>3*A('Vlaamse gaai'));

const uniekeKaarten=[...new Map(Object.values(kaartenPerCategorie).flat().map(c=>[c.naam,c])).values()];
const aantallen=Object.fromEntries(uniekeKaarten.map(c=>[c.naam,0]));
const standaardExtras={lindePunten:1};
for(const c of uniekeKaarten)for(const e of c.extras||[])if(!(e.id in standaardExtras))standaardExtras[e.id]=0;
const extraWaarden={...standaardExtras};
const kaartTellers={Gems:[],Ree:[],Wisent:[]};
let grotType='Grot',grotAantalKaarten=0;
function telLabel(label,distinct=false){return uniekeKaarten.reduce((s,c)=>s+(c.labels.includes(label)?(distinct?Number(A(c.naam)>0):A(c.naam)):0),0)}
function effectief(n){return A(n)?A(n)+E({Beuk:'houtbijBeuk',Esdoorn:'houtbijEsdoorn',Paardenkastanje:'houtbijPaardenkastanje'}[n]):0}
function hares(){return A('Europese haas')+A('Sneeuwhaas')}
function sumCopies(n){return kaartTellers[n].reduce((s,v)=>s+v,0)}
function grotScore(){switch(grotType){case 'Spaargrot':return 2*grotAantalKaarten;case 'Verlaten grot':return grotAantalKaarten||5;case 'Vleermuizengrot':return grotAantalKaarten+3*T('vleermuis');default:return grotAantalKaarten}}
function totaalScore(){const vlinder=[0,0,3,6,12,20,35,55,80][Math.min(T('vlinder',true),8)];return uniekeKaarten.reduce((s,c)=>s+(A(c.naam)&&c.score?c.score():0),0)+vlinder+grotScore()}
const $=id=>document.getElementById(id);
function save(){try{localStorage.setItem('forestShuffleV2',JSON.stringify({aantallen,extraWaarden,kaartTellers,grotType,grotAantalKaarten}))}catch(err){console.warn('Opslaan niet mogelijk',err)}}
function restore(){try{const raw=localStorage.getItem('forestShuffleV2');if(!raw)return;const d=JSON.parse(raw);for(const n in aantallen)if(Number.isInteger(d.aantallen?.[n])&&d.aantallen[n]>=0)aantallen[n]=d.aantallen[n];for(const id in extraWaarden)if(Number.isFinite(d.extraWaarden?.[id])&&d.extraWaarden[id]>=0)extraWaarden[id]=d.extraWaarden[id];for(const n of Object.keys(kaartTellers))if(Array.isArray(d.kaartTellers?.[n]))kaartTellers[n]=d.kaartTellers[n].slice(0,aantallen[n]).map(v=>Number.isInteger(v)&&v>=0?v:0);if(['Grot','Opslaggrot','Smokkelgrot','Spaargrot','Verlaten grot','Vleermuizengrot'].includes(d.grotType))grotType=d.grotType;if(Number.isInteger(d.grotAantalKaarten)&&d.grotAantalKaarten>=0)grotAantalKaarten=d.grotAantalKaarten}catch(err){console.warn('Eerdere invoer niet geladen',err)}}
function refresh(){ $('total-count').textContent=Object.values(aantallen).reduce((s,n)=>s+n,0);$('total-score').textContent=totaalScore();$('cave-score-value').textContent=grotScore();$('cave-type').value=grotType;$('cave-description').textContent=({'Spaargrot':'2 punten per grotkaart.','Verlaten grot':'1 punt per grotkaart, of 5 punten als de grot leeg is.','Vleermuizengrot':'1 punt per grotkaart en 3 punten per vleermuis in je bos.'})[grotType]||'1 punt per grotkaart.';save()}
function show(id){for(const section of ['home','category-page','cave-page','scan-page'])$(section).hidden=section!==id;refresh();window.scrollTo(0,0)}
function teller(value,change,max=Infinity){const d=document.createElement('div');d.className='counter';const minus=document.createElement('button');minus.textContent='−';minus.type='button';const count=document.createElement('span');count.className='count-box';count.textContent=value();const plus=document.createElement('button');plus.textContent='+';plus.type='button';minus.disabled=value()<=0;plus.disabled=value()>=max;minus.onclick=()=>change(-1);plus.onclick=()=>change(1);d.append(minus,count,plus);return d}
function row(label,control,extra=false){const d=document.createElement('div');d.className='card-row'+(extra?' extra-row':'');const s=document.createElement('span');s.textContent=label;d.append(s,control);return d}
function extraControl(e,category){if(e.type==='select'){const sel=document.createElement('select');for(const [value,label] of e.options){const o=document.createElement('option');o.value=value;o.textContent=label;sel.append(o)}sel.value=E(e.id);sel.onchange=()=>{extraWaarden[e.id]=Number(sel.value);refresh()};return sel}if(e.type==='yesno'){const d=document.createElement('div');d.className='radio-group';for(const [v,label] of [[1,'Ja'],[0,'Nee']]){const l=document.createElement('label');const i=document.createElement('input');i.type='radio';i.name=e.id;i.checked=E(e.id)===v;i.onchange=()=>{extraWaarden[e.id]=v;refresh()};l.append(i,document.createTextNode(label));d.append(l)}return d}return teller(()=>E(e.id),delta=>{extraWaarden[e.id]=Math.max(0,Math.min(e.maxKaart?A(e.maxKaart):Infinity,E(e.id)+delta));renderCategory(category)},e.maxKaart?A(e.maxKaart):Infinity)}
function renderCategory(category){show('category-page');$('category-title').textContent=category;const list=$('card-list');list.replaceChildren();for(const c of [...kaartenPerCategorie[category]].sort((a,b)=>a.naam.localeCompare(b.naam,'nl'))){list.append(row(c.naam,teller(()=>A(c.naam),delta=>{aantallen[c.naam]=Math.max(0,Math.min(c.max??Infinity,A(c.naam)+delta));if(kaartTellers[c.naam]){const arr=kaartTellers[c.naam];while(arr.length<A(c.naam))arr.push(0);arr.length=A(c.naam)}for(const e of c.extras||[])if(e.maxKaart)extraWaarden[e.id]=Math.min(E(e.id),A(e.maxKaart));renderCategory(category)},c.max??Infinity)));if(kaartTellers[c.naam]){const arr=kaartTellers[c.naam];while(arr.length<A(c.naam))arr.push(0);arr.length=A(c.naam);for(let i=0;i<A(c.naam);i++)list.append(row(`${c.naam} ${i+1} — Aantal kaarten met juiste kleur`,teller(()=>arr[i],delta=>{arr[i]=Math.max(0,arr[i]+delta);renderCategory(category)}),true))}for(const e of c.extras||[]){if(!e.always&&!A(c.naam))continue;list.append(row(e.label,extraControl(e,category),true))}}refresh()}
function renderCave(){show('cave-page');$('cave-counter').replaceChildren(teller(()=>grotAantalKaarten,delta=>{grotAantalKaarten=Math.max(0,grotAantalKaarten+delta);renderCave()}))}
restore();for(const cat of Object.keys(kaartenPerCategorie)){const b=document.createElement('button');b.textContent=cat;b.onclick=()=>renderCategory(cat);$('category-overview').append(b)}
for(const b of document.querySelectorAll('.back'))b.onclick=()=>show('home');$('cave-button').onclick=renderCave;$('cave-type').onchange=e=>{grotType=e.target.value;refresh()};$('reset-button').onclick=()=>{if(!confirm('Alle kaarttellers, extra vragen en grotgegevens wissen?'))return;for(const n in aantallen)aantallen[n]=0;Object.assign(extraWaarden,standaardExtras);for(const n in kaartTellers)kaartTellers[n]=[];grotType='Grot';grotAantalKaarten=0;show('home')};$('scan-button').onclick=()=>show('scan-page');
const photos=[];let scanCandidates=[];function renderPhotos(){const g=$('scan-gallery');g.replaceChildren();for(const p of photos){const d=document.createElement('div');d.className='photo';const img=document.createElement('img');img.src=p.url;img.alt=p.name;const b=document.createElement('button');b.textContent='Verwijderen';b.onclick=()=>{URL.revokeObjectURL(p.url);photos.splice(photos.indexOf(p),1);scanCandidates=[];$('scan-results').replaceChildren();renderPhotos()};d.append(img,b);g.append(d)}}
// Android-camera's geven soms een leeg MIME-type terug. Controleer daarom
// de afbeelding via de browser in plaats van uitsluitend file.type.
async function addSelectedPhotos(input,source){
 const files=Array.from(input.files||[]);
 input.value='';
 if(!files.length){$('scan-status').textContent='Geen foto ontvangen. Probeer opnieuw of kies een foto uit je galerij.';return}
 let added=0;
 for(const file of files){
  if(!file.size)continue;
  const url=URL.createObjectURL(file);
  try{
   await new Promise((resolve,reject)=>{const img=new Image();img.onload=resolve;img.onerror=reject;img.src=url});
   photos.push({name:file.name||('Boomfoto '+(photos.length+1)),url});added++;
  }catch(err){URL.revokeObjectURL(url);console.warn('Camera-afbeelding kon niet worden geopend',err)}
 }
 if(added){scanCandidates=[];$('scan-results').replaceChildren();renderPhotos()}
 $('scan-status').textContent=added?`${added} foto('s) toegevoegd via ${source}. Totaal: ${photos.length}. Maak nog een foto of tik op Herken mijn kaarten.`:'De foto kon niet worden gelezen. Probeer opnieuw of kies een foto uit je galerij.';
}
// Open de camera direct vanuit een echte gebruikersklik (vereist op Android).
$('take-photo-button').addEventListener('click',()=>{
 const input=$('camera-input');
 input.value='';
 input.click();
});
$('camera-input').addEventListener('change',e=>{addSelectedPhotos(e.currentTarget,'camera').catch(console.error)});
$('scan-input').addEventListener('change',e=>{addSelectedPhotos(e.currentTarget,'galerij').catch(console.error)});
$('clear-photos').onclick=()=>{for(const p of photos)URL.revokeObjectURL(p.url);photos.length=0;scanCandidates=[];$('scan-results').replaceChildren();$('scan-status').textContent='Foto’s gewist.';renderPhotos()};

// Versie 3.0: experimentele OCR, lokaal in de browser. Geen automatische wijzigingen in de kaarttellers.
function normalizedName(value){return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’‘]/g,"'").replace(/[^a-z0-9]/g,'')}
function editDistance(a,b){let prev=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){let curr=[i];for(let j=1;j<=b.length;j++)curr[j]=Math.min(curr[j-1]+1,prev[j]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));prev=curr}return prev[b.length]}
// Versie 3.6: herken exacte kaartnamen als losse woorden, ook bij OCR-regelafbrekingen.
// Geen fuzzy gokjes: daarmee voorkom je verzonnen kaartnamen.
function findScanMatches(text){
 const lines=text.split(/\n/).map(line=>line.trim()).filter(Boolean);
 const tokens=lines.map(line=>(line.match(/[\p{L}\p{N}]+/gu)||[]).map(normalizedName).filter(Boolean));
 const found=new Set();
 for(const card of uniekeKaarten){
  const parts=(card.naam.match(/[\p{L}\p{N}]+/gu)||[]).map(normalizedName);
  if(!parts.length)continue;
  // Zoek exacte opeenvolgende woorden op dezelfde OCR-regel.
  for(const row of tokens){
   for(let i=0;i<=row.length-parts.length;i++){
    if(parts.every((part,j)=>row[i+j]===part)){found.add(card.naam);break}
   }
   if(found.has(card.naam))break;
  }
  if(found.has(card.naam)||parts.length<2)continue;
  // OCR zet kaartnamen vaak op twee regels, met beeldruis na de naam.
  // Alleen laatste woorden van de eerste regel + eerste woorden van de volgende regel.
  for(let r=0;r<tokens.length-1;r++){
   const first=tokens[r],second=tokens[r+1];
   for(let cut=1;cut<parts.length;cut++){
    const left=parts.slice(0,cut),right=parts.slice(cut);
    // Naam mag vroeg op de eerste regel staan, gevolgd door maximaal 4 ruiswoorden.
    const leftIndex=first.findIndex((w,i)=>first.slice(i,i+left.length).every((v,j)=>v===left[j])&&i+left.length<=first.length);
    if(leftIndex<0||first.length-(leftIndex+left.length)>4)continue;
    if(second.slice(0,right.length).every((v,j)=>v===right[j])&&second.length>=right.length){found.add(card.naam);break}
   }
   if(found.has(card.naam))break;
  }
 }
 // Versie 3.9: OCR voegt soms een lege regel tussen "Savi's dwerg-" en
 // "vleermuis" toe. Kijk maximaal 3 fysieke regels vooruit en sla alleen
 // lege regels over. Houd de bestaande ruislimieten en specifieke naamcheck.
 const saviCard=uniekeKaarten.find(card=>normalizedName(card.naam)==='savisdwergvleermuis');
 if(saviCard){
  const saviLines=text.split(/\r?\n/);
  const secondPart=/\bvleermuis\b/iu;
  for(let i=0;i<saviLines.length-1;i++){
   const first=saviLines[i];
   const start=first.match(/\bsavi['’]?s\s+dwerg\s*[-‐‑–—]/iu);
   if(!start)continue;
   const suffix=first.slice(start.index+start[0].length);
   if(suffix.length>24)continue;
   for(let j=i+1;j<Math.min(saviLines.length,i+4);j++){
    const second=saviLines[j];
    if(!second.trim())continue;
    const before=second.split(/\bvleermuis\b/iu)[0];
    if(secondPart.test(second)&&before.length<=18)found.add(saviCard.naam);
    break; // Alleen de eerstvolgende niet-lege regel is toegestaan.
   }
   if(found.has(saviCard.naam))break;
  }
 }
 return [...found];
}
async function resizedPhoto(url){
 const image=new Image();image.src=url;
 await image.decode();
 const maxSide=1600, scale=Math.min(1,maxSide/Math.max(image.naturalWidth,image.naturalHeight));
 const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));
 const context=canvas.getContext('2d');context.drawImage(image,0,0,canvas.width,canvas.height);
 return canvas;
}
// Versie 3.3: extra uitsneden voor namen op overlappende kaarten.
function scanRegions(canvas){
 const w=canvas.width,h=canvas.height;
 const regions=[{label:'hele foto',canvas}];
 const specs=[
  {label:'linkerkant',x:0,y:0,w:Math.round(w*.56),h},
  {label:'rechterkant',x:Math.round(w*.44),y:0,w:Math.round(w*.56),h},
  {label:'onderkant',x:0,y:Math.round(h*.45),w,h:Math.round(h*.55)}
 ];
 for(const r of specs){
  const crop=document.createElement('canvas');crop.width=r.w;crop.height=r.h;
  crop.getContext('2d').drawImage(canvas,r.x,r.y,r.w,r.h,0,0,r.w,r.h);
  regions.push({label:r.label,canvas:crop});
 }
 return regions;
}
function renderScanResults(){const root=$('scan-results');root.replaceChildren();if(!scanCandidates.length){const p=document.createElement('p');p.textContent='Geen betrouwbare kaartnamen gevonden. Probeer een scherpere foto van dichtbij, of voer kaarten handmatig in via de categorieën.';root.append(p);return}const h=document.createElement('h3');h.textContent='Controleer de herkende kaarten';root.append(h);const info=document.createElement('p');info.className='hint';info.textContent='Dit zijn suggesties uit alle foto’s samen. Dubbelen zijn niet automatisch te onderscheiden. Pas aantallen aan en voeg alleen de juiste kaarten toe.';root.append(info);for(const c of scanCandidates){const wrap=document.createElement('div');wrap.className='card-row';const label=document.createElement('label');const check=document.createElement('input');check.type='checkbox';check.checked=c.selected;check.onchange=()=>c.selected=check.checked;label.append(check,document.createTextNode(' '+c.name));const quantity=document.createElement('input');quantity.type='number';quantity.min='1';quantity.max='99';quantity.value=c.count;quantity.className='scan-quantity';quantity.setAttribute('aria-label','Aantal '+c.name);quantity.onchange=()=>c.count=Math.max(1,Math.min(99,Number.parseInt(quantity.value,10)||1));wrap.append(label,quantity);root.append(wrap)}const add=document.createElement('button');add.className='primary';add.textContent='✅ Geselecteerde kaarten toevoegen aan mijn bos';add.onclick=()=>{const chosen=scanCandidates.filter(c=>c.selected);if(!chosen.length){$('scan-status').textContent='Vink eerst minstens één kaart aan.';return}for(const c of chosen){const card=uniekeKaarten.find(x=>x.naam===c.name);if(!card)continue;const next=Math.min(card.max??Infinity,aantallen[c.name]+c.count);aantallen[c.name]=next;if(kaartTellers[c.name]){while(kaartTellers[c.name].length<next)kaartTellers[c.name].push(0)}}refresh();scanCandidates=[];root.replaceChildren();$('scan-status').textContent=chosen.length+' kaartsoort(en) toegevoegd. Controleer voor de eindscore ook de extra vragen bij kaarten en boomcombinaties.';show('home')};root.append(add)}
function loadOcr(){return new Promise((resolve,reject)=>{if(window.Tesseract){resolve(window.Tesseract);return}const script=document.createElement('script');script.src='https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';script.onload=()=>window.Tesseract?resolve(window.Tesseract):reject(new Error('OCR-module ontbreekt'));script.onerror=()=>reject(new Error('OCR-module kon niet worden geladen. Controleer je internetverbinding.'));document.head.append(script)})}
// Versie 3.4: toon OCR-tekst en meet de fasen afzonderlijk; stop een langdurige OCR-test na een limiet.
let activeScan=null;
const timings=$('scan-timings');
const rawOcr=$('ocr-raw-text');
const saviDiagnostics=$('savi-diagnostics');
const saviName="Savi's dwergvleermuis";
function diagnoseSavi(text, photoIndex, regionLabel, matches){
 const db=uniekeKaarten.find(card=>normalizedName(card.naam)===normalizedName(saviName));
 const rows=text.split(/\r?\n/);
 const evidence=[];
 for(let i=0;i<rows.length;i++){
  if(/savi|dwerg|vleermuis/iu.test(rows[i])){
   const nextIndex=rows.findIndex((row,j)=>j>i&&j<=i+3&&row.trim().length>0);
   const next=nextIndex>=0?rows[nextIndex]:'';
   evidence.push({line:i+1,first:rows[i].trim(),next:next.trim(),nextLine:nextIndex>=0?nextIndex+1:'geen'});
  }
 }
 const matched=!!db&&matches.includes(db.naam);
 const lines=[`Foto ${photoIndex} / ${regionLabel}`,
  `Database: ${db?'JA — '+db.naam:'NEE — kaart ontbreekt'}`,
  `Kaartnaam uit OCR herkend: ${matched?'JA':'NEE'}`,
  `Aantal OCR-regels met Savi/dwerg/vleermuis: ${evidence.length}`];
 for(const item of evidence.slice(0,8)){
  lines.push(`Regel ${item.line}: ${item.first}`);
  lines.push(`Volgende niet-lege regel (${item.nextLine}): ${item.next}`);
  const a=/\bsavi['’]?s\s+dwerg\s*[-‐‑–—]/iu.exec(item.first);
  const b=/\bvleermuis\b/iu.exec(item.next);
  lines.push(`Savi+dwerg- op deze regel: ${a?'JA':'NEE'}; vleermuis op volgende regel: ${b?'JA':'NEE'}`);
  if(a&&b)lines.push(`Ruis na dwerg-: ${item.first.slice(a.index+a[0].length).length} tekens; voor vleermuis: ${item.next.slice(0,b.index).length} tekens`);
 }
 saviDiagnostics.textContent+=(saviDiagnostics.textContent?'\n\n':'')+lines.join('\n');
}
$('copy-savi-diagnostics').onclick=async()=>{
 try{await navigator.clipboard.writeText('Forest Shuffle 4.3.2 — Savi-diagnose\n'+saviDiagnostics.textContent);$('scan-status').textContent='Savi-diagnose gekopieerd! Plak hem hier in de chat.'}
 catch(_){$('scan-status').textContent='Kopiëren lukt niet. Maak een screenshot van de Savi-diagnose.'}
};

function addOcrText(label, text){rawOcr.textContent+=(rawOcr.textContent?'\n\n':'')+'--- '+label+' ---\n'+(text.trim()||'[geen leesbare tekst]');}
$('copy-ocr-text').onclick=async()=>{try{await navigator.clipboard.writeText('Forest Shuffle 4.3.2 OCR-tekst\n'+rawOcr.textContent);$('scan-status').textContent='Gelezen tekst gekopieerd! Plak hem hier in de chat.'}catch(_){$('scan-status').textContent='Kopiëren lukt niet. Maak een screenshot van het vak met gelezen tekst.'}};
function addTiming(line){timings.textContent+=(timings.textContent?'\n':'')+line}
function elapsed(t){return ((performance.now()-t)/1000).toFixed(1)+' s'}
$('copy-diagnostics').onclick=async()=>{
 const report='Forest Shuffle 4.3.2 | '+navigator.userAgent+'\n'+timings.textContent;
 try{await navigator.clipboard.writeText(report);$('scan-status').textContent='Meetresultaten gekopieerd! Plak ze in de chat.'}
 catch(_){$('scan-status').textContent='Kopiëren niet toegestaan. Maak een screenshot van de snelheidsmeting.'}
};
$('stop-recognition').onclick=()=>{if(activeScan){activeScan.cancelled=true;$('scan-status').textContent='Scan stoppen…';if(activeScan.worker)activeScan.worker.terminate().catch(()=>{})}};
$('recognize-button').onclick=async()=>{
 if(!photos.length){$('scan-status').textContent='Voeg eerst één of meer foto’s toe.';return}
 const state={cancelled:false,worker:null};activeScan=state;
 const btn=$('recognize-button'),stop=$('stop-recognition');btn.disabled=true;stop.hidden=false;
 scanCandidates=[];$('scan-results').replaceChildren();timings.textContent='';rawOcr.textContent='';saviDiagnostics.textContent='';
 const overall=performance.now();const names=new Set();
 const limit=$('scan-one-only').checked?1:photos.length;
 try{
  let t=performance.now();$('scan-status').textContent='OCR-bibliotheek laden…';
  const ocr=await loadOcr();addTiming('Bibliotheek laden: '+elapsed(t));
  if(state.cancelled)return;
  t=performance.now();$('scan-status').textContent='OCR-taalmodel en worker laden…';
  // Een limiet voorkomt dat de diagnose minutenlang onduidelijk blijft hangen.
  const workerPromise=ocr.createWorker('nld');
  workerPromise.then(w=>{if(state.cancelled)w.terminate().catch(()=>{})}).catch(()=>{});
  const init=await Promise.race([workerPromise,new Promise((_,reject)=>setTimeout(()=>reject(new Error('Worker laden duurde langer dan 60 seconden')),60000))]);
  state.worker=init;addTiming('Taalmodel + worker starten: '+elapsed(t));
  if(state.cancelled)return;
  for(let i=0;i<limit;i++){
   if(state.cancelled)break;
   t=performance.now();$('scan-status').textContent=`Foto ${i+1} van ${limit}: voorbereiden…`;
   const canvas=await resizedPhoto(photos[i].url);
   addTiming(`Foto ${i+1}: voorbereiden ${elapsed(t)} (${canvas.width}×${canvas.height} px)`);
   if(state.cancelled)break;
   const allRegions=scanRegions(canvas);
   const fastMode=$('scan-fast-mode').checked;
   const regions=fastMode?allRegions.filter(region=>region.label!=='hele foto'):allRegions;
   addTiming(`Foto ${i+1}: modus ${fastMode?'SNEL (3 uitsneden)':'VOLLEDIG (4 scans)'}`);
   for(let j=0;j<regions.length;j++){
    if(state.cancelled)break;
    const region=regions[j];
    t=performance.now();
    $('scan-status').textContent=`Foto ${i+1}/${limit}: ${region.label} lezen (${j+1}/${regions.length})…`;
    const recognition=state.worker.recognize(region.canvas);
    recognition.catch(()=>{});
    const result=await Promise.race([recognition,new Promise((_,reject)=>setTimeout(()=>reject(new Error('Tekstherkenning duurde langer dan 60 seconden bij '+region.label)),60000))]);
    addTiming(`Foto ${i+1}, ${region.label}: ${elapsed(t)}`);
    addOcrText(`Foto ${i+1} / ${region.label}`,result.data.text||'');
    const matches=findScanMatches(result.data.text||'');
    addTiming(`Foto ${i+1}, ${region.label}: ${matches.length} passende kaartnamen`);
    diagnoseSavi(result.data.text||'',i+1,region.label,matches);
    for(const name of matches)names.add(name);
    // Keep the UI responsive and show progressive findings.
    await new Promise(resolve=>setTimeout(resolve,0));
   }
   addTiming(`Foto ${i+1}: ${names.size} kaartsoort(en) gevonden (totaal)`);
  }
  if(!state.cancelled){scanCandidates=[...names].sort((a,b)=>a.localeCompare(b,'nl')).map(name=>({name,count:1,selected:true}));saviDiagnostics.textContent+='\n\nEINDCONTROLE: '+(scanCandidates.some(c=>normalizedName(c.name)===normalizedName(saviName))?'Savi staat in de resultaten.':'Savi staat NIET in de resultaten.');renderScanResults();$('scan-status').textContent=scanCandidates.length+' mogelijke kaartsoort(en) gevonden. Controleer alles zorgvuldig.'}
 }catch(err){addTiming('Melding: '+err.message);$('scan-status').textContent='Scan gestopt: '+err.message+'. Je kunt je kaarttellers nog steeds gebruiken.'}
 finally{addTiming('Totale testduur: '+elapsed(overall));if(state.worker)await state.worker.terminate().catch(()=>{});if(activeScan===state)activeScan=null;btn.disabled=false;stop.hidden=true}
};
