const SLIDES = [
  {
    label: "Природа",
    title: "Гірські вершини",
    sub: "Краса Карпат у кожному кадрі",
    bg: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=75&auto=format",
  },
  {
    label: "Архітектура",
    title: "Місто не спить",
    sub: "Нічні вогні та міський ритм",
    bg: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=75&auto=format",
  },
  {
    label: "Океан",
    title: "Безкрає море",
    sub: "Там, де горизонт зустрічає хвилю",
    bg: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=75&auto=format",
  },
  {
    label: "Ліс",
    title: "Туманний бір",
    sub: "Ранній світанок серед старих дерев",
    bg: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=75&auto=format",
  },
  {
    label: "Захід сонця",
    title: "Золота година",
    sub: "Коли небо стає живописом",
    bg: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&q=75&auto=format",
  },
  {
    label: "Зима",
    title: "Кришталева тиша",
    sub: "Коли сніг вкриває все навколо",
    bg: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1200&q=75&auto=format",
  },
];

const SWIPE_THRESHOLD = 40;
const DRAG_THRESHOLD  = 50;
const SLIDE_INTERVAL   = 4000;

class Slider {
  constructor(slides, options = {}) {
    this.slides       = slides;
    this.total        = slides.length;
    this.current      = 0;
    this.interval     = options.interval || 4000;
    this.timer        = null;
    this.loadedImages = new Set();

    this._touchStartX = 0;
    this._touchStartY = 0;

    this._build();
    this._bindEvents();
    this._goTo(0, false);
    this._startAuto();
  }

  _build() {
    this.shell = document.getElementById('slider');
    const track = document.getElementById('sliderTrack');
    const dots  = document.getElementById('dotsContainer');

    this.slides.forEach((s, i) => {
      const slide = document.createElement('div');
      slide.className = 'slide';
      slide.innerHTML = `
        <div class="slide-bg loading" data-src="${s.bg}"></div>
        <div class="slide-content">
          <div class="slide-label">${s.label}</div>
          <div class="slide-title">${s.title}</div>
          <div class="slide-sub">${s.sub}</div>
        </div>`;
      track.appendChild(slide);

      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.addEventListener('click', () => this._goTo(i));
      dots.appendChild(dot);
    });

    this.track    = document.getElementById('sliderTrack');
    this.dotsEl   = document.querySelectorAll('.dot');
    this.slidesEl = document.querySelectorAll('.slide');
    this.bgsEl    = [...track.querySelectorAll('.slide-bg')];
  }

  _goTo(index, animate = true) {
    if (index < 0) index = this.total - 1;
    if (index >= this.total) index = 0;

    this.current = index;

    if (!animate) this.track.style.transition = 'none';
    this.track.style.transform = `translateX(-${index * 100}%)`;
    if (!animate) requestAnimationFrame(() => { this.track.style.transition = ''; });

    this.slidesEl.forEach((s, i) => s.classList.toggle('active', i === index));
    this.dotsEl.forEach((d, i) => {
      d.classList.toggle('active', i === index);
      d.setAttribute('aria-selected', i === index);
    });

    this._lazyLoad(index);
    this._lazyLoad((index + 1) % this.total);
  }

  _lazyLoad(index) {
    if (this.loadedImages.has(index)) return;
    const bgEl = this.bgsEl[index];
    if (!bgEl) return;
    const src = bgEl.dataset.src;
    if (!src) return;

    const img = new Image();
    img.onload = () => {
      bgEl.style.backgroundImage = `url('${src}')`;
      bgEl.classList.remove('loading');
      this.loadedImages.add(index);
    };
    img.onerror = () => {
      bgEl.style.backgroundImage = 'linear-gradient(135deg, #ccc, #aaa)';
      bgEl.classList.remove('loading');
      this.loadedImages.add(index);
    };
    img.src = src;
  }

  _startAuto() {
    this._stopAuto();
    this.timer = setInterval(() => this._goTo(this.current + 1), this.interval);
  }

  _stopAuto() {
    clearInterval(this.timer);
  }

  _bindEvents() {
    document.getElementById('btnPrev').addEventListener('click', () => { this._goTo(this.current - 1); this._restartAuto(); });
    document.getElementById('btnNext').addEventListener('click', () => { this._goTo(this.current + 1); this._restartAuto(); });

    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  { this._goTo(this.current - 1); this._restartAuto(); }
      if (e.key === 'ArrowRight') { this._goTo(this.current + 1); this._restartAuto(); }
    });

    this.shell.addEventListener('touchstart', e => {
      this._touchStartX = e.changedTouches[0].clientX;
      this._touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    this.shell.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - this._touchStartX;
      const dy = e.changedTouches[0].clientY - this._touchStartY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
        this._goTo(dx < 0 ? this.current + 1 : this.current - 1);
        this._restartAuto();
      }
    }, { passive: true });

    let dragStartX = 0, dragging = false;
    this.shell.addEventListener('mousedown', e => { dragStartX = e.clientX; dragging = true; });
    this.shell.addEventListener('mouseup', e => {
      if (!dragging) return;
      dragging = false;
      const dx = e.clientX - dragStartX;
      if (Math.abs(dx) > DRAG_THRESHOLD) {
        this._goTo(dx < 0 ? this.current + 1 : this.current - 1);
        this._restartAuto();
      }
    });
    this.shell.addEventListener('mouseleave', () => { dragging = false; });
  }

  _restartAuto() {
    this._stopAuto();
    this._startAuto();
  }
}

const slider = new Slider(SLIDES, { interval: SLIDE_INTERVAL });