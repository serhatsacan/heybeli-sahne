document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  // Sticky Header on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header && header.classList.add('scrolled');
    } else {
      header && header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Drawer
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isActive = mobileMenu.classList.toggle('active');
      mobileToggle.classList.toggle('active', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-nav-link, .mobile-menu-actions a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Events Category Filters
  const eventFilters = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');

  if (eventFilters.length > 0 && eventCards.length > 0) {
    eventFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        eventFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');

        eventCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (category === 'all' || cardCat === category) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Menu Tab Switcher (Fix Menus vs A la Carte)
  const menuTabs = document.querySelectorAll('.menu-tab-btn');
  const fixMenuSection = document.getElementById('fix-menu-section');
  const alacarteSection = document.getElementById('alacarte-section');

  if (menuTabs.length > 0) {
    menuTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        menuTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.getAttribute('data-target');
        if (target === 'fix') {
          if (fixMenuSection) fixMenuSection.style.display = '';
          if (alacarteSection) alacarteSection.style.display = 'none';
        } else {
          if (fixMenuSection) fixMenuSection.style.display = 'none';
          if (alacarteSection) alacarteSection.style.display = '';
        }
      });
    });
  }

  // Quick Book Button Action -> Fills Reservation Form
  document.querySelectorAll('.btn-book-event').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const eventName = btn.getAttribute('data-event');
      const eventDate = btn.getAttribute('data-date');
      const noteInput = document.getElementById('r-note');
      const dateInput = document.getElementById('r-date');

      if (noteInput && eventName) {
        noteInput.value = `Etkinlik: ${eventName}`;
      }
      
      const reserveSection = document.getElementById('rezervasyon');
      if (reserveSection) {
        reserveSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // FAQ Accordion Toggle
  const faqQuestions = document.querySelectorAll('.faq-question');
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('active');
        
        // Close all items
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        
        // Toggle current item
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    });
  }

  // Reservation Form Submission
  const reserveForm = document.getElementById('reservation-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (reserveForm) {
    reserveForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.innerText = 'Rezervasyon Gönderiliyor...';
      }

      const tableChecked = document.querySelector('input[name="tableType"]:checked');

      const formData = {
        name: document.getElementById('r-name').value.trim(),
        phone: document.getElementById('r-phone').value.trim(),
        date: document.getElementById('r-date').value,
        guests: document.getElementById('r-guests').value,
        tableType: tableChecked ? tableChecked.value : 'Standart Meyhane Masası',
        note: document.getElementById('r-note') ? document.getElementById('r-note').value.trim() : ''
      };

      try {
        const response = await fetch('/api/reservation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok && result.success) {
          formFeedback.className = 'form-feedback success';
          formFeedback.innerText = `✓ Harika! Rezervasyon talebiniz alındı. Ekibimiz ${formData.phone} üzerinden en kısa sürede masanızı teyit edecektir.`;
          reserveForm.reset();
        } else {
          throw new Error(result.error || 'Bir hata oluştu.');
        }
      } catch (err) {
        formFeedback.className = 'form-feedback error';
        formFeedback.innerText = `X Hata: ${err.message}`;
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          submitBtn.innerText = 'Masanızı Hemen Ayırın';
        }
      }
    });
  }

  // ==========================================
  // CONVERSION & CLICK TRACKING (v1)
  // Calls (tel:) & WhatsApp (wa.me) Click Tracking
  // ==========================================
  function trackClick(type, source) {
    try {
      const payload = JSON.stringify({
        type,
        source,
        page: window.location.pathname || '/'
      });

      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon('/api/track', blob);
      } else {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true
        }).catch(() => {});
      }
    } catch (err) {
      // Non-blocking silently
    }
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href') || '';

    let type = null;
    if (href.startsWith('tel:')) {
      type = 'call';
    } else if (href.includes('wa.me') || href.includes('whatsapp.com')) {
      type = 'whatsapp';
    }

    if (type) {
      let source = 'Sayfa İçi Buton';
      if (link.closest('#mobile-bottom-bar, .mobile-bottom-bar')) {
        source = 'Mobil Sabit Alt Bar';
      } else if (link.closest('header, #header, .nav-actions')) {
        source = 'Üst Menü (Header)';
      } else if (link.closest('footer, .site-footer')) {
        source = 'Alt Bilgi (Footer)';
      } else if (link.closest('#hero, .hero-section')) {
        source = 'Hero / Sahne Alanı';
      } else if (link.closest('.schedule-item, .event-card')) {
        source = 'Etkinlik / Program';
      } else if (link.closest('.contact-info, #iletisim, .iletisim-card')) {
        source = 'İletişim Bölümü';
      } else {
        const btnText = (link.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30);
        if (btnText) source = btnText;
      }
      trackClick(type, source);
    }
  });
});

