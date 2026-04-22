/**
 * 神山まるごと高専 紹介サイト — メインスクリプト
 * 依存ライブラリなし。バニラ JS のみ。
 */

(function () {
  'use strict';

  /* --------------------------------------------------
   * 1. ヘッダー: スクロール時にクラス付与・縮小
   * -------------------------------------------------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // 初期状態を即反映
  }

  /* --------------------------------------------------
   * 2. ハンバーガーメニュー
   * -------------------------------------------------- */
  const hamburger = document.querySelector('.hamburger');
  const nav       = document.querySelector('.site-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open', !expanded);
      document.body.style.overflow = expanded ? '' : 'hidden';
    });

    // ナビリンクをクリックしたらドロワーを閉じる
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });

    // ESC キーで閉じる
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        hamburger.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
        hamburger.focus();
      }
    });
  }

  /* --------------------------------------------------
   * 3. アクティブナビリンクのハイライト
   * -------------------------------------------------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
    }
  });

  /* --------------------------------------------------
   * 4. フェードイン（IntersectionObserver）
   * -------------------------------------------------- */
  const fadeTargets = document.querySelectorAll('.fade-in');
  if (fadeTargets.length > 0 && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    fadeTargets.forEach(el => io.observe(el));
  } else {
    // フォールバック: 全部表示
    fadeTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* --------------------------------------------------
   * 5. ギャラリーライトボックス（campus-life.html 用）
   * -------------------------------------------------- */
  const galleryItems = document.querySelectorAll('.gallery__item');
  if (galleryItems.length > 0) {
    // オーバーレイを動的生成
    const overlay = document.createElement('div');
    overlay.id = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', '画像を拡大表示');
    overlay.innerHTML = `
      <div class="lb-backdrop"></div>
      <div class="lb-content">
        <button class="lb-close" aria-label="閉じる">&times;</button>
        <img class="lb-img" src="" alt="" />
        <p class="lb-caption"></p>
        <button class="lb-prev" aria-label="前の画像">&#8249;</button>
        <button class="lb-next" aria-label="次の画像">&#8250;</button>
      </div>`;
    document.body.appendChild(overlay);

    const lbImg     = overlay.querySelector('.lb-img');
    const lbCaption = overlay.querySelector('.lb-caption');
    const lbClose   = overlay.querySelector('.lb-close');
    const lbPrev    = overlay.querySelector('.lb-prev');
    const lbNext    = overlay.querySelector('.lb-next');
    let currentIndex = 0;

    const images = Array.from(galleryItems).map(item => ({
      src:     item.dataset.src || item.querySelector('img')?.src || '',
      alt:     item.dataset.alt || item.querySelector('img')?.alt || '',
      caption: item.dataset.caption || '',
    }));

    const showImage = idx => {
      currentIndex = (idx + images.length) % images.length;
      const { src, alt, caption } = images[currentIndex];
      lbImg.src = src;
      lbImg.alt = alt;
      lbCaption.textContent = caption;
    };

    const openLightbox = idx => {
      showImage(idx);
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    };

    const closeLightbox = () => {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    galleryItems.forEach((item, i) => {
      item.addEventListener('click', () => openLightbox(i));
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); }
      });
    });

    lbClose.addEventListener('click', closeLightbox);
    overlay.querySelector('.lb-backdrop').addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', () => showImage(currentIndex - 1));
    lbNext.addEventListener('click', () => showImage(currentIndex + 1));

    document.addEventListener('keydown', e => {
      if (!overlay.classList.contains('is-open')) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  showImage(currentIndex - 1);
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
  }

  /* --------------------------------------------------
   * 6. スムーズスクロール（アンカーリンク）
   * -------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
// 神山まるごと高専 紹介サイト - 共通スクリプト
(function () {
  'use strict';

  // ---------- Mobile nav toggle ----------
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('is-open');
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        toggle.classList.remove('is-open');
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ---------- Scroll header shrink ----------
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---------- Reveal on scroll ----------
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // ---------- Lightbox for gallery ----------
  const galleryItems = document.querySelectorAll('[data-lightbox]');
  if (galleryItems.length) {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.innerHTML = '<button class="lightbox__close" aria-label="閉じる">×</button><img alt="" />';
    document.body.appendChild(lb);
    const lbImg = lb.querySelector('img');
    const close = () => {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
    };
    lb.addEventListener('click', (e) => {
      if (e.target === lb || e.target.classList.contains('lightbox__close')) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
    galleryItems.forEach((item) => {
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      const open = () => {
        const src = item.getAttribute('data-lightbox');
        const alt = item.getAttribute('data-alt') || '';
        lbImg.src = src;
        lbImg.alt = alt;
        lb.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      };
      item.addEventListener('click', open);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
    });
  }

  // ---------- Mark active nav ----------
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('is-active');
    }
  });
})();
