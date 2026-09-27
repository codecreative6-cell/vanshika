document.body.style.overflow = 'hidden';
var btn = document.getElementById('open-btn');
var gate = document.getElementById('gate');
var bgAudio = new Audio('aaaa.mp3');
bgAudio.loop = true;

if(btn && gate) {
  btn.addEventListener('click', function() {
    bgAudio.play().catch(e => console.error("Audio playback failed:", e));
    gate.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });
}

function spawn(containerId,count,className){
  var c=document.getElementById(containerId);
  if(!c)return;
  for(var i=0;i<count;i++){
    var el=document.createElement('div');
    el.className=className;
    el.style.left=(Math.random()*100)+'%';
    el.style.animationDelay=(Math.random()*10).toFixed(2)+'s';
    el.style.animationDuration=(6+Math.random()*8).toFixed(2)+'s';
    if(className==='confetti'){
      var colors=['#e8c27a','#e88aa0','#f6e2b3','#c85b78'];
      el.style.background=colors[Math.floor(Math.random()*colors.length)];
      el.style.top='-'+Math.floor(Math.random()*20)+'px';
    }
    if(className==='spark'){
      el.textContent='✦';
      el.style.top=(Math.random()*90)+'%';
    }
    c.appendChild(el);
  }
}
spawn('heroFloaters',10,'orb');
spawn('heroFloaters',22,'confetti');
spawn('heroFloaters',14,'spark');

var blowBtn=document.getElementById('blowBtn');
blowBtn.addEventListener('click',function(){
  document.querySelectorAll('.candle-flame').forEach(function(f){f.classList.add('out');});
  document.getElementById('wishText').classList.add('show');
  blowBtn.disabled=true;
});

var io=new IntersectionObserver(function(entries){
  entries.forEach(function(en){
    if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}
  });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
(function(){
  var c = document.getElementById('bg-canvas');
  if (!c) return;
  var ctx = c.getContext('2d');
  var stars = [];
  function resize() { c.width = innerWidth; c.height = innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  class Star {
    constructor() {
      this.x = Math.random() * c.width;
      this.y = Math.random() * c.height;
      this.r = Math.random() * 1.5 + 0.3;
      this.o = Math.random() * 0.5 + 0.1;
      this.sp = Math.random() * 0.015 + 0.005;
      this.ph = Math.random() * Math.PI * 2;
      this.col = ['#e8c27a','#f6e2b3','#e88aa0','#c85b78','#ffb04a'][~~(Math.random()*5)];
    }
    update() {
      this.ph += this.sp;
      this.o = 0.15 + Math.sin(this.ph) * 0.25;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.col;
      ctx.globalAlpha = Math.max(0, this.o);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
  for (var i = 0; i < 200; i++) stars.push(new Star());
  (function loop() {
    ctx.clearRect(0, 0, c.width, c.height);
    stars.forEach(function(s) { s.update(); s.draw(); });
    requestAnimationFrame(loop);
  })();
})();

// ── Floating Emojis & Lights ─────────────
    (function () {
      const bg = document.getElementById('floating-bg');
      if (!bg) return;
      const emojis = ['✨', '💖', '🌹', '👑', '💫', '🥂'];

      function spawnElement() {
        const el = document.createElement('div');
        const isEmoji = Math.random() > 0.4;
        el.classList.add('float-item');

        if (isEmoji) {
          el.classList.add('float-emoji');
          el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        } else {
          el.classList.add('float-light');
        }

        // Randomize position, size, duration, delay
        const left = Math.random() * 100;
        const duration = 10 + Math.random() * 15; // 10s to 25s
        const delay = Math.random() * 5;
        const size = isEmoji ? (20 + Math.random() * 20) : (4 + Math.random() * 6);

        el.style.left = left + 'vw';
        el.style.animationDuration = duration + 's' + (isEmoji ? '' : `, ${1 + Math.random()}s`);
        el.style.animationDelay = delay + 's';
        if (isEmoji) {
          el.style.fontSize = size + 'px';
        } else {
          el.style.width = size + 'px';
          el.style.height = size + 'px';
        }

        bg.appendChild(el);

        // Clean up after animation ends
        setTimeout(() => {
          if (bg.contains(el)) bg.removeChild(el);
        }, (duration + delay) * 1000);
      }

      // Spawn initial batch
      for (let i = 0; i < 20; i++) spawnElement();

      // Continuously spawn
      setInterval(spawnElement, 800);
    })();