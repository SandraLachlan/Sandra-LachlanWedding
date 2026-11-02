/**
 * Sandra Balan & Lachlan James McLean — Wedding Website
 * Vanilla JavaScript (No frameworks, fully compatible with GitHub Pages)
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. STATE & DOM REFERENCES
  // =========================================================================
  const state = {
    isAudioPlaying: false,
    isMuted: false,
    hasInteracted: false,
    activeGalleryCategory: 'all',
    lightboxCurrentIndex: 0,
    lightboxItems: []
  };

  // DOM Elements
  const invitationCover = document.getElementById('invitation-cover');
  const btnOpenInvitation = document.getElementById('btn-open-invitation');
  const btnViewCard = document.getElementById('btn-view-card');
  const siteHeader = document.getElementById('site-header');

  // Music Player Elements
  const weddingAudio = document.getElementById('wedding-audio');
  const btnPlayPause = document.getElementById('btn-play-pause');
  const btnMute = document.getElementById('btn-mute');
  const navMusicToggle = document.getElementById('nav-music-toggle');
  const playerStatus = document.getElementById('player-status');
  const musicTooltip = document.getElementById('music-tooltip');
  const closeTooltip = document.getElementById('close-tooltip');
  const iconPlay = document.querySelector('.icon-play');
  const iconPause = document.querySelector('.icon-pause');
  const iconSound = document.querySelector('.icon-sound');
  const iconMuted = document.querySelector('.icon-muted');

  // Mobile Drawer
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Gallery & Lightbox
  const galleryTabs = document.querySelectorAll('.gallery-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxOverlay = document.querySelector('.lightbox-overlay');

  // RSVP Form Elements
  const rsvpForm = document.getElementById('rsvp-form');
  const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
  const attendanceDetails = document.getElementById('attendance-details');
  const rsvpSuccessModal = document.getElementById('rsvp-success-modal');
  const rsvpSummaryContent = document.getElementById('rsvp-summary-content');
  const btnCloseRsvpModal = document.getElementById('btn-close-rsvp-modal');

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');

  // Back to Top Button
  const btnBackToTop = document.getElementById('btn-back-to-top');

  // Set initial cover state on body
  document.body.classList.add('cover-active');


  // =========================================================================
  // 2. OPENING INVITATION TRANSITION
  // =========================================================================
  if (btnOpenInvitation) {
    btnOpenInvitation.addEventListener('click', () => {
      openInvitation();
    });
  }

  // Button in nav to view cover again
  if (btnViewCard) {
    btnViewCard.addEventListener('click', () => {
      invitationCover.classList.remove('unsealed');
      document.body.classList.add('cover-active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function openInvitation() {
    state.hasInteracted = true;
    invitationCover.classList.add('unsealed');
    document.body.classList.remove('cover-active');

    // Attempt to start background music after user gesture
    playMusic();

    // Start floral petal shower if reduced-motion is not requested
    startPetalsAnimation();

    // Smooth scroll to Welcome section
    const welcomeSection = document.getElementById('welcome');
    if (welcomeSection) {
      setTimeout(() => {
        welcomeSection.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  }


  // =========================================================================
  // 3. BACKGROUND MUSIC CONTROLLER
  // =========================================================================
  function updateMusicUI() {
    if (state.isAudioPlaying) {
      if (iconPlay) iconPlay.style.display = 'none';
      if (iconPause) iconPause.style.display = 'block';
      if (navMusicToggle) navMusicToggle.classList.add('playing');
      if (playerStatus) playerStatus.textContent = 'Playing...';
    } else {
      if (iconPlay) iconPlay.style.display = 'block';
      if (iconPause) iconPause.style.display = 'none';
      if (navMusicToggle) navMusicToggle.classList.remove('playing');
      if (playerStatus) playerStatus.textContent = 'Paused';
    }

    if (state.isMuted) {
      if (iconSound) iconSound.style.display = 'none';
      if (iconMuted) iconMuted.style.display = 'block';
    } else {
      if (iconSound) iconSound.style.display = 'block';
      if (iconMuted) iconMuted.style.display = 'none';
    }
  }

  function playMusic() {
    if (!weddingAudio) return;

    weddingAudio.play()
      .then(() => {
        state.isAudioPlaying = true;
        updateMusicUI();
      })
      .catch((error) => {
        // Graceful fallback: audio file may not yet be added by user
        state.isAudioPlaying = false;
        updateMusicUI();
        if (playerStatus) {
          playerStatus.textContent = 'Add MP3 to enable';
        }
        showMusicTooltip();
        console.info('Audio note: Place wedding-song.mp3 in assets/music/ to enable background music.');
      });
  }

  function pauseMusic() {
    if (!weddingAudio) return;
    weddingAudio.pause();
    state.isAudioPlaying = false;
    updateMusicUI();
  }

  function togglePlayPause() {
    if (weddingAudio.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  }

  function toggleMute() {
    if (!weddingAudio) return;
    state.isMuted = !state.isMuted;
    weddingAudio.muted = state.isMuted;
    updateMusicUI();
  }

  function showMusicTooltip() {
    if (musicTooltip) {
      musicTooltip.classList.add('visible');
      setTimeout(() => {
        musicTooltip.classList.remove('visible');
      }, 7000);
    }
  }

  // Audio Event Listeners
  if (btnPlayPause) {
    btnPlayPause.addEventListener('click', togglePlayPause);
  }
  if (navMusicToggle) {
    navMusicToggle.addEventListener('click', togglePlayPause);
  }
  if (btnMute) {
    btnMute.addEventListener('click', toggleMute);
  }
  if (closeTooltip && musicTooltip) {
    closeTooltip.addEventListener('click', () => {
      musicTooltip.classList.remove('visible');
    });
  }

  // Error handling on audio tag
  if (weddingAudio) {
    weddingAudio.addEventListener('error', () => {
      state.isAudioPlaying = false;
      updateMusicUI();
      if (playerStatus) {
        playerStatus.textContent = 'Add MP3 to enable';
      }
    });

    weddingAudio.addEventListener('ended', () => {
      state.isAudioPlaying = false;
      updateMusicUI();
    });
  }


  // =========================================================================
  // 4. WEDDING COUNTDOWN TIMER (Counts to 20 February 2027, 09:00 IST)
  // =========================================================================
  // Timezone: Indian Standard Time (UTC+5:30) - Traditional Hindu Wedding Day
  const weddingDate = new Date('2027-02-20T09:00:00+05:30').getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  // =========================================================================
  // 5. STICKY HEADER & SCROLL BEHAVIOR
  // =========================================================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    highlightActiveNavLink();
  }, { passive: true });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  function highlightActiveNavLink() {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }


  // =========================================================================
  // 6. MOBILE NAVIGATION DRAWER
  // =========================================================================
  function openMobileMenu() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', openMobileMenu);
  }
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeMobileMenu);
  }
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });


  // =========================================================================
  // 7. PHOTO GALLERY & LIGHTBOX
  // =========================================================================
  // Category Filter Tabs
  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      galleryTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');
      state.activeGalleryCategory = filter;

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filter === 'all' || itemCategory === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });

      refreshVisibleLightboxItems();
    });
  });

  function refreshVisibleLightboxItems() {
    state.lightboxItems = [];
    galleryItems.forEach(item => {
      if (item.style.display !== 'none') {
        const frame = item.querySelector('.gallery-frame');
        const img = item.querySelector('.gallery-thumb');
        const caption = item.querySelector('.gallery-caption-text');
        state.lightboxItems.push({
          src: img ? img.getAttribute('src') : '',
          alt: img ? img.getAttribute('alt') : '',
          caption: caption ? caption.textContent : ''
        });
      }
    });
  }

  refreshVisibleLightboxItems();

  // Attach click to gallery frames
  galleryItems.forEach((item, index) => {
    const frame = item.querySelector('.gallery-frame');
    if (frame) {
      frame.addEventListener('click', () => {
        refreshVisibleLightboxItems();
        const img = item.querySelector('.gallery-thumb');
        const currentSrc = img ? img.getAttribute('src') : '';
        const foundIndex = state.lightboxItems.findIndex(i => i.src === currentSrc);
        state.lightboxCurrentIndex = foundIndex !== -1 ? foundIndex : 0;
        openLightbox();
      });

      frame.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          frame.click();
        }
      });
    }
  });

  function openLightbox() {
    updateLightboxContent();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    if (!state.lightboxItems.length) return;
    const current = state.lightboxItems[state.lightboxCurrentIndex];
    if (current) {
      lightboxImg.src = current.src;
      lightboxImg.alt = current.alt;
      lightboxCaption.textContent = current.caption;
    }
  }

  function showNextLightbox() {
    if (!state.lightboxItems.length) return;
    state.lightboxCurrentIndex = (state.lightboxCurrentIndex + 1) % state.lightboxItems.length;
    updateLightboxContent();
  }

  function showPrevLightbox() {
    if (!state.lightboxItems.length) return;
    state.lightboxCurrentIndex = (state.lightboxCurrentIndex - 1 + state.lightboxItems.length) % state.lightboxItems.length;
    updateLightboxContent();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevLightbox);

  // Keyboard navigation for Lightbox
  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextLightbox();
    if (e.key === 'ArrowLeft') showPrevLightbox();
  });


  // Lightbox click on palette images
  document.querySelectorAll('.palette-img-frame').forEach(frame => {
    frame.addEventListener('click', () => {
      const img = frame.querySelector('.palette-img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        if (lightboxCaption) lightboxCaption.textContent = img.alt;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // =========================================================================
  // 8. RSVP FORM LOGIC & SPREADSHEET INTEGRATION
  // =========================================================================
  // Optional: Connect directly to a live Google Sheet Web App
  // Setup instructions and copy-paste Google Apps Script code are provided in README.md!
  const GOOGLE_SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbz_SHgn0BHAfK27MZl1T36af8RzV8QJARqIQRKNOQ7hglQbUjLCe156nDOBpGzioDfyeA/exec';

  // Toggle Attendance Sections
  attendanceRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'declining') {
        attendanceDetails.style.display = 'none';
      } else {
        attendanceDetails.style.display = 'block';
      }
    });
  });

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Guest Name Validation
      const nameInput = document.getElementById('rsvp-name');
      const nameError = document.getElementById('name-error');
      if (!nameInput || !nameInput.value.trim()) {
        if (nameError) nameError.classList.add('visible');
        if (nameInput) nameInput.classList.add('input-error');
        isValid = false;
      } else {
        if (nameError) nameError.classList.remove('visible');
        if (nameInput) nameInput.classList.remove('input-error');
      }

      // Phone Number Validation
      const phoneInput = document.getElementById('rsvp-phone');
      const phoneError = document.getElementById('phone-error');
      if (!phoneInput || !phoneInput.value.trim()) {
        if (phoneError) phoneError.classList.add('visible');
        if (phoneInput) phoneInput.classList.add('input-error');
        isValid = false;
      } else {
        if (phoneError) phoneError.classList.remove('visible');
        if (phoneInput) phoneInput.classList.remove('input-error');
      }

      const selectedAttendance = document.querySelector('input[name="attendance"]:checked')?.value || 'attending';

      if (!isValid) return;

      // Extract Form Data
      const guestName = nameInput.value.trim();
      const guestPhone = phoneInput.value.trim();
      const guestCount = selectedAttendance === 'attending' ? (document.getElementById('rsvp-guest-count')?.value || '1') : '0';
      const message = document.getElementById('rsvp-message')?.value.trim() || 'No message provided';
      const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

      // Ensure phone numbers with '+' or country codes are treated as Plain Text in Google Sheets
      // Prepending an apostrophe prevents Google Sheets from mistaking '+' for a formula (#ERROR!)
      const sheetSafePhone = guestPhone.startsWith("'") ? guestPhone : ("'" + guestPhone);

      const rsvpRecord = {
        timestamp,
        guestName,
        guestPhone,
        attendance: selectedAttendance === 'attending' ? 'Joyfully Accepts' : 'Regretfully Declines',
        guestCount,
        message
      };

      const sheetPayload = {
        ...rsvpRecord,
        guestPhone: sheetSafePhone
      };

      // 1. Save to local browser database (never lost)
      try {
        const savedRsvps = JSON.parse(localStorage.getItem('sandra_lachlan_wedding_rsvps') || '[]');
        savedRsvps.push(rsvpRecord);
        localStorage.setItem('sandra_lachlan_wedding_rsvps', JSON.stringify(savedRsvps));
      } catch (err) {
        console.warn('LocalStorage save notice:', err);
      }

      // 2. Stream to Google Sheet Web App if endpoint URL is configured
      if (GOOGLE_SHEET_ENDPOINT && GOOGLE_SHEET_ENDPOINT.startsWith('http')) {
        fetch(GOOGLE_SHEET_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetPayload)
        }).catch(err => console.warn('Google Sheet submission notice:', err));
      }

      // Build confirmation preview
      let summaryHTML = `
        <p><strong>Guest Name:</strong> ${escapeHTML(guestName)}</p>
        <p><strong>Phone / WhatsApp:</strong> ${escapeHTML(guestPhone)}</p>
        <p><strong>Status:</strong> ${selectedAttendance === 'attending' ? 'Joyfully Accepting 🎉' : 'Regretfully Declining'}</p>
      `;

      if (selectedAttendance === 'attending') {
        summaryHTML += `
          <p><strong>Total Guests in Party:</strong> ${escapeHTML(guestCount)}</p>
        `;
      }

      if (message && message !== 'No message provided') {
        summaryHTML += `<p><strong>Warm Wishes:</strong> <em>“${escapeHTML(message)}”</em></p>`;
      }

      if (rsvpSummaryContent) {
        rsvpSummaryContent.innerHTML = summaryHTML;
      }

      // Show success modal
      if (rsvpSuccessModal) {
        rsvpSuccessModal.classList.add('active');
        rsvpSuccessModal.setAttribute('aria-hidden', 'false');
      }

      // Reset form
      rsvpForm.reset();
    });
  }

  // Export saved RSVPs to CSV spreadsheet
  function downloadRSVPsAsCSV() {
    let rsvps = [];
    try {
      rsvps = JSON.parse(localStorage.getItem('sandra_lachlan_wedding_rsvps') || '[]');
    } catch (e) {
      rsvps = [];
    }

    if (!rsvps.length) {
      alert('No RSVPs recorded yet in this browser.');
      return;
    }

    const headers = ['Timestamp (IST)', 'Guest Name', 'Phone / WhatsApp', 'Attendance Status', 'Party Size', 'Notes / Wishes'];
    const rows = rsvps.map(r => [
      `"${(r.timestamp || '').replace(/"/g, '""')}"`,
      `"${(r.guestName || '').replace(/"/g, '""')}"`,
      `"${(r.guestPhone || '').replace(/"/g, '""')}"`,
      `"${(r.attendance || '').replace(/"/g, '""')}"`,
      `"${(r.guestCount || '').replace(/"/g, '""')}"`,
      `"${(r.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Sandra_Lachlan_Wedding_RSVPs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const btnDownloadCsv = document.getElementById('btn-download-csv');
  if (btnDownloadCsv) {
    btnDownloadCsv.addEventListener('click', downloadRSVPsAsCSV);
  }

  const btnQuickDownloadCsv = document.getElementById('btn-quick-download-csv');
  if (btnQuickDownloadCsv) {
    btnQuickDownloadCsv.addEventListener('click', downloadRSVPsAsCSV);
  }

  if (btnCloseRsvpModal) {
    btnCloseRsvpModal.addEventListener('click', () => {
      rsvpSuccessModal.classList.remove('active');
      rsvpSuccessModal.setAttribute('aria-hidden', 'true');
    });
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }


  // =========================================================================
  // 9. FREQUENTLY ASKED QUESTIONS ACCORDION
  // =========================================================================
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const parent = question.parentElement;
      const isOpen = parent.classList.contains('open');

      // Close other accordions
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('open');
        item.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        parent.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });


  // =========================================================================
  // 10. BACK TO TOP BUTTON
  // =========================================================================
  if (btnBackToTop) {
    btnBackToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  // =========================================================================
  // 11. FLORAL PETALS CANVAS ANIMATION
  // =========================================================================
  const canvas = document.getElementById('petal-canvas');
  let ctx = null;
  let petals = [];
  let animationFrameId = null;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (canvas && !isReducedMotion) {
    ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Petal {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -100;
        this.size = Math.random() * 8 + 8; // 8px to 16px
        this.speedY = Math.random() * 0.9 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.7;
        this.angle = Math.random() * Math.PI * 2;
        this.angularSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.45 + 0.35;
        // Flora types: 0 = Vibrant Lotus Pink, 1 = Pastel Green Leaf, 2 = Jasmine Blossom
        const rand = Math.random();
        if (rand < 0.58) {
          this.petalType = 'lotus-pink';
          const pinkShades = ['#F4457E', '#EA336A', '#FA6894', '#FF4F84'];
          this.vibrantColor = pinkShades[Math.floor(Math.random() * pinkShades.length)];
        } else if (rand < 0.82) {
          this.petalType = 'pastel-green';
        } else {
          this.petalType = 'jasmine';
        }
      }

      update() {
        this.y += this.speedY;
        this.x += Math.sin(this.angle) * 0.9 + this.speedX;
        this.angle += this.angularSpeed;

        if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.globalAlpha = this.opacity;

        if (this.petalType === 'jasmine') {
          // White-cream fragrant jasmine blossom
          ctx.fillStyle = '#FFFDF8';
          ctx.strokeStyle = '#FDC2D0';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 0.4, this.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#E93B6C';
          ctx.beginPath();
          ctx.arc(0, 0, 1.2, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.petalType === 'pastel-green') {
          // Pastel Green Lotus Leaf / Mint Bud
          ctx.fillStyle = '#B4CEB1';
          ctx.strokeStyle = '#DCE8DA';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 0.45, this.size * 0.7, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else {
          // Vibrant Radiant Lotus Pink Petal
          ctx.fillStyle = this.vibrantColor || '#F4457E';
          ctx.strokeStyle = '#C2185B';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(0, -this.size);
          ctx.bezierCurveTo(-this.size * 0.6, -this.size * 0.3, -this.size * 0.6, this.size * 0.5, 0, this.size);
          ctx.bezierCurveTo(this.size * 0.6, this.size * 0.5, this.size * 0.6, -this.size * 0.3, 0, -this.size);
          ctx.fill();
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    // Initialize 28 petals (delicate, not overcrowded)
    for (let i = 0; i < 28; i++) {
      const p = new Petal();
      p.y = Math.random() * canvas.height; // Distribute initially
      petals.push(p);
    }

    function animatePetals() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animatePetals);
    }

    // Export trigger so invitation opening can awaken petals
    window.startPetalsAnimation = function() {
      if (!animationFrameId && !isReducedMotion) {
        animatePetals();
      }
    };

    // Pause animation when page is hidden to preserve battery
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      } else {
        if (!animationFrameId && !isReducedMotion && state.hasInteracted) {
          animatePetals();
        }
      }
    });
  } else {
    window.startPetalsAnimation = function() {};
  }

});
