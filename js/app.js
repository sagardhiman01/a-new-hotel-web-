/**
 * HOTEL MOHAN INN - MODERN SACRED LUXURY (BHAGWA & ANTIQUE GOLD)
 * High-Performance Client Logic & Interactive Modules (All Bugs Fixed)
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initParticles();
  initNavbarScroll();
  initAtmosphereStudio();
  initBlueprintExplorer();
  initTariffConfigurator();
  initBanquetCalculator();
  initRoomFilters();
  initPhotoGallery();
  init3DCardTilt();
  initLiveAartiTimer();
  initAudioSynthesizer();
  initModalAndDock();
  initMobileMenu();
  initHeroQuickBooking();
  initDynamicConfig();
});

/* -------------------------------------------------------------
 * 1. Kinetic Scroll Progress Bar (Initial State & Division by 0 Guard)
 * ------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight <= 0) {
      progressBar.style.width = '0%';
      return;
    }
    const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
    progressBar.style.width = `${progress}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* -------------------------------------------------------------
 * 2. Divine Bhagwa & Gold Embers Canvas (Retina / High-DPI Scaled)
 * ------------------------------------------------------------- */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let dpr = window.devicePixelRatio || 1;
  let width = window.innerWidth;
  let height = window.innerHeight;

  function setupCanvasSize() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
  }

  setupCanvasSize();
  window.addEventListener('resize', setupCanvasSize);

  const particleCount = Math.min(width > 768 ? 40 : 20, 50);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const isBhagwa = i % 2 === 0;
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.35 + 0.15,
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * Math.PI,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      isBhagwa: isBhagwa,
      color: isBhagwa ? 'rgba(255, 122, 40,' : 'rgba(212, 175, 55,'
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.pulse += p.pulseSpeed;

      const currentOpacity = p.opacity + Math.sin(p.pulse) * 0.15;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color} ${Math.max(0.08, currentOpacity)})`;
      ctx.shadowBlur = 8;
      // Fixed shadow color check: accurately match bhagwa vs gold
      ctx.shadowColor = p.isBhagwa ? 'rgba(255, 122, 40, 0.7)' : 'rgba(212, 175, 55, 0.6)';
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

/* -------------------------------------------------------------
 * 4. Navbar Scroll State & Floating Dock (Immediate Check)
 * ------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.luxury-navbar');
  const dock = document.querySelector('.floating-booking-dock');
  const hero = document.querySelector('.hero-section');

  function checkNavbar() {
    const scrollY = window.scrollY;
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (dock && hero) {
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      if (scrollY > heroBottom - 200) {
        dock.classList.add('visible');
      } else {
        dock.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', checkNavbar, { passive: true });
  checkNavbar();
}

/* -------------------------------------------------------------
 * 5. Ambience & Lighting Calibration Studio (Timer Race Condition Fixed)
 * ------------------------------------------------------------- */
function initAtmosphereStudio() {
  const previewImg = document.getElementById('atmosphere-preview-img');
  const filterLayer = document.getElementById('atmosphere-filter-layer');
  const titleEl = document.getElementById('atmosphere-title');
  const subEl = document.getElementById('atmosphere-sub');
  const presetBtns = document.querySelectorAll('.preset-chip-btn');
  const azimuthSlider = document.getElementById('range-azimuth');
  const elevationSlider = document.getElementById('range-elevation');
  const warmthSlider = document.getElementById('range-warmth');

  let transitionTimer = null;

  // Preload all 4 photorealistic time-of-day suite images
  const presetImages = [
    'assets/images/hotel_suite_dawn.jpg',
    'assets/images/hotel_suite_midday.jpg',
    'assets/images/hotel_suite_aarti.jpg',
    'assets/images/hotel_suite_night.jpg'
  ];
  presetImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  const presets = {
    dawn: {
      image: "assets/images/hotel_suite_dawn.jpg",
      title: "Brahma Muhurta (04:30 AM)",
      sub: "Mystic Himalayan dawn mist, cool spiritual tones, silent Ganges reflections.",
      azimuth: -120,
      elevation: 25,
      warmth: 20
    },
    midday: {
      image: "assets/images/hotel_suite_midday.jpg",
      title: "Surya Namaskar (10:00 AM)",
      sub: "Radiant golden sunshine across Shivalik mountain ranges with crisp clarity.",
      azimuth: 35,
      elevation: 85,
      warmth: 60
    },
    aarti: {
      image: "assets/images/hotel_suite_aarti.jpg",
      title: "Sandhya Maha Aarti (06:30 PM)",
      sub: "Sacred fire lamps, floating flower diyas, warm amber sacred resonance.",
      azimuth: 140,
      elevation: 45,
      warmth: 90
    },
    night: {
      image: "assets/images/hotel_suite_night.jpg",
      title: "Shanti Midnight (11:00 PM)",
      sub: "Deep obsidian mountain night, dark peaceful skies, soft bedside lamp accents.",
      azimuth: -180,
      elevation: 5,
      warmth: 15
    }
  };

  function applyAtmosphere(presetKey) {
    const config = presets[presetKey];
    if (!config) return;

    if (transitionTimer) {
      clearTimeout(transitionTimer);
      transitionTimer = null;
    }

    presetBtns.forEach(b => b.classList.toggle('active', b.dataset.preset === presetKey));

    if (titleEl) titleEl.textContent = config.title;
    if (subEl) subEl.textContent = config.sub;

    if (azimuthSlider) azimuthSlider.value = config.azimuth;
    if (elevationSlider) elevationSlider.value = config.elevation;
    if (warmthSlider) warmthSlider.value = config.warmth;

    if (previewImg) {
      if (previewImg.getAttribute('src') !== config.image) {
        previewImg.style.transition = 'opacity 0.25s ease-out';
        previewImg.style.opacity = '0.35';
        transitionTimer = setTimeout(() => {
          previewImg.src = config.image;
          previewImg.style.filter = 'none';
          previewImg.style.opacity = '1';
        }, 180);
      } else {
        previewImg.style.filter = 'none';
        previewImg.style.opacity = '1';
      }
    }

    if (filterLayer) {
      filterLayer.style.opacity = '0';
    }
  }

  function updateCustomSliders() {
    const az = azimuthSlider ? parseInt(azimuthSlider.value) : 0;
    const el = elevationSlider ? parseInt(elevationSlider.value) : 50;
    const wm = warmthSlider ? parseInt(warmthSlider.value) : 50;

    const posX = Math.max(10, Math.min(90, 50 + (az / 4)));
    const posY = Math.max(10, Math.min(90, 100 - el));

    const normEl = el / 100;
    const brightness = (0.75 + (normEl * 0.45)).toFixed(2);
    const normWm = wm / 100;
    const warmthColor = `rgba(${220 + normWm * 35}, ${140 + normWm * 40}, ${60 - normWm * 30}, ${0.15 + normWm * 0.25})`;

    if (previewImg) {
      previewImg.style.filter = `brightness(${brightness}) saturate(${0.85 + normWm * 0.35})`;
    }

    if (filterLayer) {
      filterLayer.style.mixBlendMode = (el > 60) ? 'screen' : 'soft-light';
      filterLayer.style.background = `radial-gradient(circle at ${posX}% ${posY}%, ${warmthColor} 0%, rgba(0,0,0,0) 70%)`;
      filterLayer.style.opacity = '1';
    }

    if (titleEl) titleEl.textContent = 'Custom Sacred Ambience';
    if (subEl) subEl.textContent = `Active calibration: Light Azimuth ${az}°, Sun Elevation ${el}%, Amber Warmth ${wm}%.`;
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      applyAtmosphere(btn.dataset.preset);
    });
  });

  [azimuthSlider, elevationSlider, warmthSlider].forEach(slider => {
    if (slider) {
      slider.addEventListener('input', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        updateCustomSliders();
      });
    }
  });

  applyAtmosphere('aarti');
}

/* -------------------------------------------------------------
 * 6. Virtual Suite Discovery Blueprint
 * ------------------------------------------------------------- */
function initBlueprintExplorer() {
  const pins = document.querySelectorAll('.hotspot-pin');
  const nodeTag = document.getElementById('bp-node-tag');
  const nodeTitle = document.getElementById('bp-node-title');
  const nodeDesc = document.getElementById('bp-node-desc');
  const nodeMeter1 = document.getElementById('bp-meter-1');
  const nodeMeter2 = document.getElementById('bp-meter-2');
  const nodeVal1 = document.getElementById('bp-val-1');
  const nodeVal2 = document.getElementById('bp-val-2');

  const nodesData = {
    1: {
      tag: "NODE 01 // SLEEP ARCHITECTURE",
      title: "Royal Orthopedic King Bed",
      desc: "Custom pocket-spring 10-inch mattress draped in 400-thread count breathable Egyptian cotton linen. Acoustically shielded suite walls ensure deep peaceful sleep after sacred temple yatras.",
      val1: "Grade AAA Luxury",
      meter1: "98%",
      val2: "100% Cotton Velvet",
      meter2: "95%"
    },
    2: {
      tag: "NODE 02 // SANITARY SPA",
      title: "Italian Geyser & Rain Shower",
      desc: "24/7 continuous hot & cold pressurised water supply. Equipped with modern designer fittings, spotless hygienic fixtures, and sacred herbal bathing amenities.",
      val1: "24/7 High Pressure",
      meter1: "100%",
      val2: "Dual Temperature",
      meter2: "92%"
    },
    3: {
      tag: "NODE 03 // DIGITAL RETREAT",
      title: "Executive Desk & 5G Wi-Fi",
      desc: "High-speed optical fiber wireless network spanning every room. Solid oak writing desk with universal international power adaptors and ergonomic leather task chair.",
      val1: "300 Mbps Fiber",
      meter1: "96%",
      val2: "Dedicated Desk",
      meter2: "90%"
    },
    4: {
      tag: "NODE 04 // VEDIC VISTA",
      title: "Panoramic Shivalik Balcony",
      desc: "Private picture window and sit-out area capturing the gentle morning Ganges valley breeze and panoramic views towards the foothills of the Himalayas.",
      val1: "Mountain & Ganga View",
      meter1: "94%",
      val2: "Fresh Breeze Ventilation",
      meter2: "96%"
    },
    5: {
      tag: "NODE 05 // REFRESHMENT NOOK",
      title: "Artisan Tea & Coffee Bar",
      desc: "Electric kettle, curated Darjeeling teas, roasted coffee blends, and 24/7 in-room dining service from Mohan Ji Poori Wale restaurant.",
      val1: "Instant In-Room",
      meter1: "92%",
      val2: "24/7 Room Service",
      meter2: "98%"
    }
  };

  pins.forEach(pin => {
    pin.addEventListener('click', () => {
      const id = pin.dataset.node;
      pins.forEach(p => p.classList.remove('active'));
      pin.classList.add('active');

      const data = nodesData[id];
      if (!data) return;

      if (nodeTag) nodeTag.textContent = data.tag;
      if (nodeTitle) nodeTitle.textContent = data.title;
      if (nodeDesc) nodeDesc.textContent = data.desc;
      if (nodeVal1) nodeVal1.textContent = data.val1;
      if (nodeMeter1) nodeMeter1.style.width = data.meter1;
      if (nodeVal2) nodeVal2.textContent = data.val2;
      if (nodeMeter2) nodeMeter2.style.width = data.meter2;
    });
  });
}

/* -------------------------------------------------------------
 * 7. Interactive Tariff & Stay Configurator (Pricing Mismatch Fixed)
 * ------------------------------------------------------------- */
function initTariffConfigurator() {
  const roomSelect = document.getElementById('cfg-room');
  const planSelect = document.getElementById('cfg-plan');
  const nightsInput = document.getElementById('cfg-nights');
  const aartiCheck = document.getElementById('cfg-aarti');
  const yatraCheck = document.getElementById('cfg-yatra');

  const billBase = document.getElementById('cfg-bill-base');
  const billPlan = document.getElementById('cfg-bill-plan');
  const billExtras = document.getElementById('cfg-bill-extras');
  const billTotal = document.getElementById('cfg-bill-total');
  const bookBtn = document.getElementById('cfg-book-btn');

  if (!roomSelect || !billTotal) return;

  function calculateBill() {
    const selectedOpt = roomSelect.options[roomSelect.selectedIndex];
    const roomName = selectedOpt.text.split('(')[0].trim();
    const nights = Math.max(1, parseInt(nightsInput ? nightsInput.value : 1) || 1);
    const planKey = (planSelect ? planSelect.value : 'CP').toLowerCase();

    // Read exact tariff rates matching published table:
    const epRate = parseInt(selectedOpt.dataset.ep) || 3500;
    const cpRate = parseInt(selectedOpt.dataset.cp) || 4000;
    const mapRate = parseInt(selectedOpt.dataset.map) || 4950;

    let roomRatePerNight = cpRate;
    let planDeltaPerNight = cpRate - epRate;
    let planName = "CP (With Breakfast)";

    if (planKey === 'ep') {
      roomRatePerNight = epRate;
      planDeltaPerNight = 0;
      planName = "EP (Room Only)";
    } else if (planKey === 'map') {
      roomRatePerNight = mapRate;
      planDeltaPerNight = mapRate - epRate;
      planName = "MAP (Breakfast + Dinner)";
    }

    let extras = 0;
    const extrasList = [];
    if (aartiCheck && aartiCheck.checked) {
      extras += 500;
      extrasList.push("Har Ki Pauri VIP Aarti Assist (₹500)");
    }
    if (yatraCheck && yatraCheck.checked) {
      extras += 2500;
      extrasList.push("Char Dham / Rishikesh Dedicated Cab (₹2,500)");
    }

    const baseStayAmount = epRate * nights;
    const planStayAmount = planDeltaPerNight * nights;
    const totalAmount = (roomRatePerNight * nights) + extras;

    if (billBase) billBase.textContent = `₹${baseStayAmount.toLocaleString('en-IN')}`;
    if (billPlan) billPlan.textContent = `₹${planStayAmount.toLocaleString('en-IN')}`;
    if (billExtras) billExtras.textContent = `₹${extras.toLocaleString('en-IN')}`;
    if (billTotal) billTotal.textContent = `₹${totalAmount.toLocaleString('en-IN')}`;

    if (bookBtn) {
      const message = `Namaste Manish Mishra ji! I would like to reserve at Hotel Mohan Inn Haridwar:
- Suite Category: ${roomName}
- Meal Plan: ${planName} (₹${roomRatePerNight.toLocaleString('en-IN')}/night)
- Duration: ${nights} Night(s)
${extrasList.length ? `- Add-ons: ${extrasList.join(', ')}\n` : ''}- Total Estimate: ₹${totalAmount.toLocaleString('en-IN')}

Kindly share availability and confirmation details.`;

      bookBtn.href = `https://wa.me/919259368869?text=${encodeURIComponent(message)}`;
    }
  }

  [roomSelect, planSelect, nightsInput, aartiCheck, yatraCheck].forEach(el => {
    if (el) el.addEventListener('change', calculateBill);
    if (el && el.type === 'number') el.addEventListener('input', calculateBill);
  });

  calculateBill();
}

/* -------------------------------------------------------------
 * 8. 150 Pax Banquet Hall Event Calculator
 * ------------------------------------------------------------- */
function initBanquetCalculator() {
  const guestsSlider = document.getElementById('banquet-guests-slider');
  const guestsDisplay = document.getElementById('banquet-guests-display');
  const eventType = document.getElementById('banquet-event-type');
  const banquetEstimate = document.getElementById('banquet-estimate-total');
  const banquetInquiryBtn = document.getElementById('banquet-inquiry-btn');

  if (!guestsSlider) return;

  function updateBanquet() {
    const guests = parseInt(guestsSlider.value) || 75;
    if (guestsDisplay) guestsDisplay.textContent = `${guests} Guests (Max 150)`;

    const type = eventType ? eventType.value : 'wedding';
    let perPlate = 650;
    let typeName = "Grand Wedding / Ring Ceremony";

    if (type === 'reception') {
      perPlate = 550;
      typeName = "Anniversary / Family Gathering";
    } else if (type === 'corporate') {
      perPlate = 450;
      typeName = "Corporate Conference / Meeting";
    } else if (type === 'katha') {
      perPlate = 400;
      typeName = "Spiritual Katha / Bhajan Sandhya";
    }

    const hallCharge = 25000;
    const foodCost = guests * perPlate;
    const totalEst = hallCharge + foodCost;

    if (banquetEstimate) {
      banquetEstimate.textContent = `₹${totalEst.toLocaleString('en-IN')}`;
    }

    if (banquetInquiryBtn) {
      const msg = `Namaste Manish ji! I want to inquire about booking the 150 Pax AC Banquet Hall at Hotel Mohan Inn:
- Event: ${typeName}
- Expected Gathering: ${guests} Guests
- Food Package: Pure Veg Mohan Ji Poori Wale special
- Estimated Budget: ₹${totalEst.toLocaleString('en-IN')}

Kindly provide availability and package details.`;
      banquetInquiryBtn.href = `https://wa.me/919259368869?text=${encodeURIComponent(msg)}`;
    }
  }

  guestsSlider.addEventListener('input', updateBanquet);
  if (eventType) eventType.addEventListener('change', updateBanquet);
  updateBanquet();
}

/* -------------------------------------------------------------
 * 9. Room Category Filters (Race Condition Fixed)
 * ------------------------------------------------------------- */
function initRoomFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const roomCards = document.querySelectorAll('.room-card');
  let filterTimers = [];

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Clear any pending transition timers from rapid clicks
      filterTimers.forEach(t => clearTimeout(t));
      filterTimers = [];

      const filter = btn.dataset.filter;
      roomCards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          const t1 = setTimeout(() => {
            card.style.opacity = '1';
            card.style.setProperty('--tilt-ty', '0px');
          }, 30);
          filterTimers.push(t1);
        } else {
          card.style.opacity = '0';
          card.style.setProperty('--tilt-ty', '15px');
          const t2 = setTimeout(() => {
            card.style.display = 'none';
          }, 280);
          filterTimers.push(t2);
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 10. 3D Card Tilt with Responsive Handling & CSS Variables
 * ------------------------------------------------------------- */
function init3DCardTilt() {
  const tiltCards = document.querySelectorAll('.room-card, .yatra-location-card, .amenity-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 1024) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (((y - centerY) / centerY) * -4).toFixed(2);
      const rotateY = (((x - centerX) / centerX) * 4).toFixed(2);

      card.style.setProperty('--tilt-rx', `${rotateX}deg`);
      card.style.setProperty('--tilt-ry', `${rotateY}deg`);
      card.style.setProperty('--tilt-ty', '-6px');
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--tilt-rx', '0deg');
      card.style.setProperty('--tilt-ry', '0deg');
      card.style.setProperty('--tilt-ty', '0px');
    });
  });
}

/* -------------------------------------------------------------
 * 11. Live Aarti Countdown (Haridwar IST UTC+5:30 Synced)
 * ------------------------------------------------------------- */
function initLiveAartiTimer() {
  const timerDisplay = document.getElementById('aarti-countdown');
  if (!timerDisplay) return;

  function updateCountdown() {
    // Current UTC time
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    // Haridwar time = UTC + 5.5 hours
    const istOffset = 5.5 * 3600000;
    const istNow = new Date(utcTime + istOffset);

    // Target: Today 18:30 IST (or configured custom aarti time)
    const target = new Date(istNow);
    let targetHours = 18;
    let targetMinutes = 30;
    if (window._customAartiTime) {
      const parts = window._customAartiTime.split(':');
      if (parts.length === 2) {
        targetHours = parseInt(parts[0]) || 18;
        targetMinutes = parseInt(parts[1]) || 30;
      }
    }
    target.setHours(targetHours, targetMinutes, 0, 0);

    if (istNow > target) {
      target.setDate(target.getDate() + 1);
    }

    const diff = target - istNow;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timerDisplay.textContent = `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* -------------------------------------------------------------
 * 12. Divine Flute & Temple Chime Web Audio Synthesizer (Leaks Fixed)
 * ------------------------------------------------------------- */
function initAudioSynthesizer() {
  const toggleBtn = document.getElementById('audio-toggle-btn');
  if (!toggleBtn) return;

  let audioCtx = null;
  let isPlaying = false;
  let timerId = null;
  let currentActiveNodes = [];

  const frequencies = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];

  function playFluteTone(freq, duration = 3.5) {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.setValueAtTime(4.5, audioCtx.currentTime);
    lfoGain.gain.setValueAtTime(2.5, audioCtx.currentTime);
    lfo.connect(osc.frequency);
    lfo.start();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, audioCtx.currentTime);

    const now = audioCtx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.8);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + duration);
    lfo.stop(now + duration);

    const nodes = { osc, gain, filter, lfo, lfoGain };
    currentActiveNodes.push(nodes);

    osc.onended = () => {
      try {
        osc.disconnect();
        filter.disconnect();
        gain.disconnect();
        lfo.disconnect();
        lfoGain.disconnect();
      } catch (e) {}
      currentActiveNodes = currentActiveNodes.filter(n => n !== nodes);
    };
  }

  function startAmbientChant() {
    isPlaying = true;
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-pressed', 'true');
    const label = toggleBtn.querySelector('.audio-label');
    if (label) label.textContent = 'Divine Flute: On';

    let index = 0;
    function cycle() {
      if (!isPlaying) return;
      const note = frequencies[index % frequencies.length];
      playFluteTone(note, 4.0);
      index++;
      timerId = setTimeout(cycle, 3800);
    }
    cycle();
  }

  function stopAmbientChant() {
    isPlaying = false;
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-pressed', 'false');
    const label = toggleBtn.querySelector('.audio-label');
    if (label) label.textContent = 'Temple Flute';
    if (timerId) clearTimeout(timerId);

    // Mute and disconnect any currently running tones immediately
    currentActiveNodes.forEach(({ gain, osc, lfo }) => {
      try {
        if (gain && audioCtx) {
          gain.gain.setValueAtTime(0, audioCtx.currentTime);
        }
        if (osc) osc.stop();
        if (lfo) lfo.stop();
      } catch (e) {}
    });
    currentActiveNodes = [];
  }

  toggleBtn.addEventListener('click', () => {
    if (!isPlaying) {
      startAmbientChant();
    } else {
      stopAmbientChant();
    }
  });
}

/* -------------------------------------------------------------
 * 13. Reservation Modal & WhatsApp Engine (Date Validations & Focus Trap)
 * ------------------------------------------------------------- */
function initModalAndDock() {
  const modal = document.getElementById('reservation-modal');
  const openBtns = document.querySelectorAll('.open-reserve-modal-btn');
  const closeBtn = document.getElementById('modal-close-btn');
  const form = document.getElementById('modal-booking-form');
  const checkinInput = document.getElementById('modal-checkin');
  const checkoutInput = document.getElementById('modal-checkout');
  let lastFocusedElement = null;

  if (!modal) return;

  // Set min check-in date to today
  const todayStr = new Date().toISOString().split('T')[0];
  if (checkinInput) {
    checkinInput.min = todayStr;
    checkinInput.addEventListener('change', () => {
      if (checkoutInput) {
        checkoutInput.min = checkinInput.value;
        if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
          const nextDay = new Date(checkinInput.value);
          nextDay.setDate(nextDay.getDate() + 1);
          checkoutInput.value = nextDay.toISOString().split('T')[0];
        }
      }
    });
  }
  if (checkoutInput) {
    checkoutInput.min = todayStr;
  }

  function openModal(defaultRoom = '') {
    lastFocusedElement = document.activeElement;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const roomInput = document.getElementById('modal-room-select');
    if (roomInput) {
      roomInput.value = defaultRoom || 'Deluxe AC Room';
    }

    // Set default dates if empty
    if (checkinInput && !checkinInput.value) {
      checkinInput.value = todayStr;
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      if (checkoutInput && !checkoutInput.value) {
        checkoutInput.value = tomorrow.toISOString().split('T')[0];
      }
    }

    // Focus first input
    const firstInput = modal.querySelector('input');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const room = btn.dataset.room || '';
      openModal(room);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active')) {
      if (e.key === 'Escape') closeModal();
      // Simple focus trap
      if (e.key === 'Tab') {
        const focusables = modal.querySelectorAll('button, [href], input, select, textarea');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modal-name')?.value.trim() || 'Guest';
      const phone = document.getElementById('modal-phone')?.value.trim() || '';
      const checkin = document.getElementById('modal-checkin')?.value || 'Upcoming';
      const checkout = document.getElementById('modal-checkout')?.value || 'Upcoming';
      const room = document.getElementById('modal-room-select')?.value || 'Deluxe AC Room';
      const guests = document.getElementById('modal-guests-select')?.value || '2';

      if (phone.length < 10) {
        alert('Please enter a valid 10-digit mobile number for booking confirmation.');
        return;
      }

      const waText = `Namaste Manish Mishra ji!
I would like to book a stay at Hotel Mohan Inn Haridwar:
- Guest Name: ${name}
- Phone: ${phone}
- Check-in: ${checkin}
- Check-out: ${checkout}
- Selected Suite: ${room}
- Guests: ${guests}

Please confirm availability and booking tariff.`;

      window.open(`https://wa.me/919259368869?text=${encodeURIComponent(waText)}`, '_blank', 'noopener,noreferrer');
      form.reset();
      closeModal();
    });
  }
}

/* -------------------------------------------------------------
 * 14. Mobile Navigation Drawer (Dynamic Height Calculation)
 * ------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (!toggleBtn || !mobileDrawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    if (isOpen) {
      mobileDrawer.style.maxHeight = (mobileDrawer.scrollHeight + 40) + 'px';
      mobileDrawer.style.opacity = '1';
    } else {
      mobileDrawer.style.maxHeight = '0px';
      mobileDrawer.style.opacity = '0';
    }
  });

  mobileDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      mobileDrawer.style.maxHeight = '0px';
      mobileDrawer.style.opacity = '0';
    });
  });
}

/* -------------------------------------------------------------
 * 15. Hotel Mohan Inn Photo Gallery & Fullscreen Lightbox
 * ------------------------------------------------------------- */
function initPhotoGallery() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const cards = Array.from(document.querySelectorAll('.gallery-card'));
  const lightbox = document.getElementById('lightbox-modal');
  const lbImg = document.getElementById('lightbox-img');
  const lbTitle = document.getElementById('lightbox-title');
  const lbTag = document.getElementById('lightbox-tag');
  const lbCounter = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');

  if (!cards.length) return;

  let currentVisibleCards = cards;
  let currentIndex = 0;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = 'block';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });

      currentVisibleCards = cards.filter(c => filterVal === 'all' || c.getAttribute('data-category') === filterVal);
      currentIndex = 0;
    });
  });

  function openLightbox(index) {
    if (!currentVisibleCards.length || !currentVisibleCards[index] || !lightbox) return;
    currentIndex = index;
    const card = currentVisibleCards[currentIndex];
    const imgSrc = card.getAttribute('data-img');
    const title = card.getAttribute('data-title') || '';
    const tag = card.getAttribute('data-tag') || '';

    if (lbImg) {
      lbImg.src = imgSrc;
      lbImg.alt = title;
    }
    if (lbTitle) lbTitle.textContent = title;
    if (lbTag) lbTag.textContent = tag;
    if (lbCounter) lbCounter.textContent = `Photo ${currentIndex + 1} of ${currentVisibleCards.length}`;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNext() {
    if (!currentVisibleCards.length) return;
    currentIndex = (currentIndex + 1) % currentVisibleCards.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    if (!currentVisibleCards.length) return;
    currentIndex = (currentIndex - 1 + currentVisibleCards.length) % currentVisibleCards.length;
    openLightbox(currentIndex);
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = currentVisibleCards.indexOf(card);
      if (idx !== -1) {
        openLightbox(idx);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/* -------------------------------------------------------------
 * 16. Hero Quick Booking Widget Bar Interceptor
 * ------------------------------------------------------------- */
function initHeroQuickBooking() {
  const barForm = document.getElementById('hero-quick-booking-form');
  const checkin = document.getElementById('bar-checkin');
  const checkout = document.getElementById('bar-checkout');

  const todayStr = new Date().toISOString().split('T')[0];
  if (checkin) {
    checkin.min = todayStr;
    checkin.value = todayStr;
    checkin.addEventListener('change', () => {
      if (checkout) {
        checkout.min = checkin.value;
        if (checkout.value && checkout.value <= checkin.value) {
          const nextDay = new Date(checkin.value);
          nextDay.setDate(nextDay.getDate() + 1);
          checkout.value = nextDay.toISOString().split('T')[0];
        }
      }
    });
  }
  if (checkout) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    checkout.min = todayStr;
    checkout.value = tomorrow.toISOString().split('T')[0];
  }

  if (barForm) {
    barForm.addEventListener('submit', (e) => {
      if (checkin && checkout && checkout.value <= checkin.value) {
        e.preventDefault();
        alert('Check-out date must be after Check-in date.');
      }
    });
  }
}

/* -------------------------------------------------------------
 * 17. Dynamic Site Configuration Sync (Admin Studio Integration)
 * ------------------------------------------------------------- */
async function initDynamicConfig() {
  let cfg = null;
  try {
    const res = await fetch('/api/config');
    if (res.ok) {
      cfg = await res.json();
    }
  } catch (e) {}

  if (!cfg) {
    const local = localStorage.getItem('mohan_site_config');
    if (local) {
      try { cfg = JSON.parse(local); } catch (e) {}
    }
  }

  if (!cfg) return;

  // 1. Ticker & Director
  const tickerEl = document.getElementById('topbar-ticker-text');
  if (tickerEl && cfg.weatherTicker) tickerEl.textContent = cfg.weatherTicker;

  const topDirEl = document.getElementById('topbar-director-display');
  if (topDirEl && cfg.directorName) topDirEl.textContent = `Managing Director: ${cfg.directorName}`;

  const dirNameEl = document.getElementById('display-director-name');
  if (dirNameEl && cfg.directorName) dirNameEl.textContent = cfg.directorName;

  const dirRoleEl = document.getElementById('display-director-role');
  if (dirRoleEl && cfg.directorRole) dirRoleEl.textContent = cfg.directorRole;

  const dirQuoteEl = document.getElementById('display-director-quote');
  if (dirQuoteEl && cfg.directorQuote) dirQuoteEl.textContent = `"${cfg.directorQuote}"`;

  // 2. Aarti time target
  if (cfg.aartiTime) {
    window._customAartiTime = cfg.aartiTime;
  }

  // 3. Tariffs & Configurator Sync
  if (cfg.tariffs) {
    const optStd = document.querySelector('#cfg-room option[value="standard"]');
    const optDlx = document.querySelector('#cfg-room option[value="deluxe"]');
    const optFam = document.querySelector('#cfg-room option[value="family"]');

    if (optStd && cfg.tariffs.standard) {
      optStd.dataset.ep = cfg.tariffs.standard.ep;
      optStd.dataset.cp = cfg.tariffs.standard.cp;
      optStd.dataset.map = cfg.tariffs.standard.map;
      optStd.textContent = `Standard AC Room (From ₹${cfg.tariffs.standard.ep.toLocaleString('en-IN')})`;
    }
    if (optDlx && cfg.tariffs.deluxe) {
      optDlx.dataset.ep = cfg.tariffs.deluxe.ep;
      optDlx.dataset.cp = cfg.tariffs.deluxe.cp;
      optDlx.dataset.map = cfg.tariffs.deluxe.map;
      optDlx.textContent = `Deluxe AC Room (From ₹${cfg.tariffs.deluxe.ep.toLocaleString('en-IN')})`;
    }
    if (optFam && cfg.tariffs.family) {
      optFam.dataset.ep = cfg.tariffs.family.ep;
      optFam.dataset.cp = cfg.tariffs.family.cp;
      optFam.dataset.map = cfg.tariffs.family.map;
      optFam.textContent = `Family Suite AC (From ₹${cfg.tariffs.family.ep.toLocaleString('en-IN')})`;
    }

    // Trigger recalculation if configurator exists
    const cfgRoom = document.getElementById('cfg-room');
    if (cfgRoom) {
      cfgRoom.dispatchEvent(new Event('change'));
    }
  }

  // 4. Update Phone Numbers across website
  if (cfg.phones) {
    if (cfg.phones.primary) {
      document.querySelectorAll('a[href^="tel:"]').forEach(a => {
        if (a.href.includes('9286081713')) {
          a.href = `tel:${cfg.phones.primary.replace(/[^0-9]/g, '')}`;
        }
      });
    }
    if (cfg.phones.secondary) {
      document.querySelectorAll('a[href^="tel:"]').forEach(a => {
        if (a.href.includes('9259368869')) {
          a.href = `tel:${cfg.phones.secondary.replace(/[^0-9]/g, '')}`;
        }
      });
    }
  }
}
