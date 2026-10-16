/* Confirmed hit regions use normalized image coordinates. */
const findCycLevels = [{"id":1,"src":"find-cyc/01.webp","regions":[{"x":0.6579,"y":0.4185,"w":0.0523,"h":0.0999}]},{"id":2,"src":"find-cyc/02.webp","regions":[{"x":0.2781,"y":0.582,"w":0.2705,"h":0.2671},{"x":0.54,"y":0.7392,"w":0.3533,"h":0.2307}]},{"id":3,"src":"find-cyc/03.webp","regions":[{"x":0.3935,"y":0.427,"w":0.2022,"h":0.3755}]},{"id":4,"src":"find-cyc/04.webp","regions":[{"x":0.3294,"y":0.4667,"w":0.0749,"h":0.3502},{"x":0.2708,"y":0.6917,"w":0.0632,"h":0.1324}]},{"id":5,"src":"find-cyc/05.webp","regions":[{"x":0.3057,"y":0.5142,"w":0.1981,"h":0.1693}]},{"id":6,"src":"find-cyc/06.webp","regions":[{"x":0.75,"y":0.4765,"w":0.0551,"h":0.088}]},{"id":7,"src":"find-cyc/07.webp","regions":[{"x":0,"y":0.226,"w":0.3439,"h":0.774}]},{"id":8,"src":"find-cyc/08.webp","regions":[{"x":0.3962,"y":0.4492,"w":0.1286,"h":0.2186}]},{"id":9,"src":"find-cyc/09.webp","regions":[{"x":0.1245,"y":0.072,"w":0.3673,"h":0.928}]},{"id":10,"src":"find-cyc/10.webp","regions":[{"x":0.4747,"y":0.0146,"w":0.5217,"h":0.5675}]},{"id":11,"src":"find-cyc/11.webp","regions":[{"x":0.2599,"y":0.0046,"w":0.7401,"h":0.9954}]},{"id":12,"src":"find-cyc/12.webp","regions":[{"x":0.0515,"y":0.0777,"w":0.3047,"h":0.0657},{"x":0.0067,"y":0.5863,"w":0.3387,"h":0.1571}]},{"id":13,"src":"find-cyc/13.webp","regions":[{"x":0.0478,"y":0.1199,"w":0.9522,"h":0.8801}]},{"id":14,"src":"find-cyc/14.webp","regions":[{"x":0.0063,"y":0.4583,"w":0.3421,"h":0.5417}]},{"id":15,"src":"find-cyc/15.webp","regions":[{"x":0.0054,"y":0.2537,"w":0.5171,"h":0.7463}]},{"id":16,"src":"find-cyc/16.webp","regions":[{"x":0.1867,"y":0.3927,"w":0.2124,"h":0.0664}]},{"id":17,"src":"find-cyc/17.webp","regions":[{"x":0.0029,"y":0.0056,"w":0.2383,"h":0.9944},{"x":0.227,"y":0.8184,"w":0.1314,"h":0.0607},{"x":0.2403,"y":0.6234,"w":0.1232,"h":0.0636},{"x":0.2321,"y":0.4434,"w":0.111,"h":0.0514},{"x":0.2372,"y":0.0206,"w":0.1161,"h":0.0436},{"x":0.4155,"y":0.8984,"w":0.3219,"h":0.0614}]},{"id":18,"src":"find-cyc/18.webp","regions":[{"x":0.3854,"y":0.2765,"w":0.38,"h":0.7235}]},{"id":19,"src":"find-cyc/19.webp","regions":[{"x":0.4514,"y":0.2984,"w":0.4781,"h":0.7016}]},{"id":20,"src":"find-cyc/20.webp","regions":[{"x":0.4876,"y":0.6034,"w":0.1952,"h":0.1786}]},{"id":21,"src":"find-cyc/21.webp","regions":[{"x":0.34,"y":0.3599,"w":0.379,"h":0.6401}]},{"id":23,"src":"find-cyc/23.webp","regions":[{"x":0.2201,"y":0.6392,"w":0.1778,"h":0.1064}]},{"id":24,"src":"find-cyc/24.webp","regions":[{"x":0.4991,"y":0.1933,"w":0.2347,"h":0.6647}]}];
let findIndex=0,findWon=false,findBusy=false,findTimer=null,findZoom=false,findLoaded=false,findMistakes=0,findFocus={x:.5,y:.5},findEggAttempts=0,findEggRevealed=false;
const findEl=id=>document.getElementById(id);
const findTaunts=[['不是吧，连自己都认不出来啦？','再仔细看看，cyc 还在等你认领呢。'],['这位朋友先别急着冒充 cyc！','寿星本人还藏在图里呢，再找找。'],['你的眼睛是不是偷偷去吃蛋糕了？','拉回来拉回来，再看一次！'],['点得很果断，可惜没点对！','再给你一次机会，认真找找～'],['这都能认错？zyh 在旁边偷偷笑了。','不着急，cyc 肯定还在这张图里。']];
function hitFindCyc(regions,x,y){return regions.some(r=>x>=r.x&&x<=r.x+r.w&&y>=r.y&&y<=r.y+r.h);}
function resetFindCyc(){clearTimeout(findTimer);findIndex=0;findWon=false;findBusy=false;findMistakes=0;findLoaded=false;findEggAttempts=0;findEggRevealed=false;findEl('findDialog').close();}
function openBirthdayGift(){if(findWon){$('letter').showModal();celebrate();return;}findEl('findDialog').showModal();renderFindCyc();}
function findMessage(a,b){findEl('findFeedback').textContent=a;findEl('findFeedbackMore').textContent=b;}
function revealFindEgg(){findEggRevealed=true;findBusy=true;findMessage('逗你的，这张里面没有cyc','哈哈，已经认真找了五次啦！这关算你过，继续下一张吧～');findEl('findRetry').textContent='继续下一张 →';findEl('findRetry').hidden=false;}
function renderFindCyc(){
 clearTimeout(findTimer);findBusy=false;findLoaded=false;findZoom=false;findFocus={x:.5,y:.5};
 const won=findIndex>=findCycLevels.length;
 findEl('findPlay').hidden=won;findEl('findWin').hidden=!won;
 if(won){findEl('findProgress').textContent=`${findCycLevels.length} / ${findCycLevels.length} · 全部找到啦！`;findEl('findBar').style.width='100%';findEl('findPrize').focus();celebrate();return;}
 findEl('findProgress').textContent=`第 ${findIndex+1} / ${findCycLevels.length} 关 · 已找到 ${findIndex} 张`;
 findEl('findBar').style.width=findIndex/findCycLevels.length*100+'%';
 findEl('findPhotoButton').classList.remove('zoomed');findEl('findPhotoButton').style.width='';findEl('findZoom').textContent='放大照片 ＋';findEl('findPointer').hidden=true;
 findEl('findLoading').hidden=false;findEl('findRetry').hidden=true;findEl('findRetry').textContent='重新加载';findEl('findPhotoButton').disabled=true;
 findEl('findPhoto').alt=`寻找 cyc，第 ${findIndex+1} 关的照片`;
 findMessage('照片正在打开…','');
 const im=findEl('findPhoto');im.onload=()=>{findLoaded=true;findEl('findLoading').hidden=true;findEl('findPhotoButton').disabled=false;findMessage('cyc 藏在哪儿？点她一下！','有些照片藏的是只有你们懂的小彩蛋。');if(findCycLevels[findIndex].id===16&&findEggRevealed)revealFindEgg();};
 im.onerror=()=>{findEl('findLoading').hidden=true;findEl('findRetry').hidden=false;findMessage('这张照片还没加载出来。','点“重新加载”，不会丢掉进度。');};
 im.src=findCycLevels[findIndex].src;
 const next=findCycLevels[findIndex+1];if(next){const preload=new Image();preload.src=next.src;}
}
function chooseFindCyc(x,y){
 if(findBusy||!findLoaded||findIndex>=findCycLevels.length)return;
 if(!Number.isFinite(x)||!Number.isFinite(y)||x<0||y<0||x>1||y>1)return;
 if(findCycLevels[findIndex].id===16){findEggAttempts++;if(findEggAttempts>=5){revealFindEgg();}else{const joke=findTaunts[findMistakes++%findTaunts.length];findMessage(joke[0],joke[1]);}return;}
 if(hitFindCyc(findCycLevels[findIndex].regions,x,y)){
  findBusy=true;findMessage('找到啦！不愧是你！','下一张马上来～');findIndex++;
  findTimer=setTimeout(()=>{if(findEl('findDialog').open)renderFindCyc();},700);
 }else{const joke=findTaunts[findMistakes++%findTaunts.length];findMessage(joke[0],joke[1]);}
}
findEl('findPhotoButton').addEventListener('click',e=>{if(e.detail===0){chooseFindCyc(findFocus.x,findFocus.y);return;}const r=findEl('findPhoto').getBoundingClientRect();chooseFindCyc((e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height);});
findEl('findPhotoButton').addEventListener('keydown',e=>{const moves={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};if(!moves[e.key])return;e.preventDefault();const d=e.shiftKey?.005:.025;findFocus.x=Math.max(0,Math.min(1,findFocus.x+moves[e.key][0]*d));findFocus.y=Math.max(0,Math.min(1,findFocus.y+moves[e.key][1]*d));const p=findEl('findPointer');p.hidden=false;p.style.left=findFocus.x*100+'%';p.style.top=findFocus.y*100+'%';});
findEl('findZoom').onclick=()=>{findZoom=!findZoom;const b=findEl('findPhotoButton');b.classList.toggle('zoomed',findZoom);b.style.width=findZoom?Math.max(findEl('findViewport').clientWidth*2,900)+'px':'';findEl('findZoom').textContent=findZoom?'缩回全图 −':'放大照片 ＋';};
findEl('findRetry').onclick=()=>{if(findLoaded&&findCycLevels[findIndex]?.id===16&&findEggRevealed){findIndex++;renderFindCyc();}else renderFindCyc();};
findEl('findClose').onclick=()=>findEl('findDialog').close();
findEl('findDialog').addEventListener('close',()=>{clearTimeout(findTimer);findBusy=false;});
findEl('findPrize').onclick=()=>{findWon=true;findEl('findDialog').close();$('letter').showModal();celebrate();};

