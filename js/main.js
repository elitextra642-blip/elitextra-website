'use strict';

document.documentElement.classList.add('js-enabled');

const ELITEXTRA_PRODUCTS = {
  cocoa: {
    name: 'Cocoa',
    category: 'Retail-ready',
    formats: 'Jars, cartons, bulk sacks',
    bestFor: 'Retail shelves, samples, specialty food buyers',
    image: 'assets/products/cocoa-jars.jpg',
    price: 'From $6,500/MT FOB Lagos',
    story: 'A polished cocoa line built for buyers who need Nigerian origin, clean presentation, and a product that can move from sample review into repeat retail supply.',
    quoteCue: 'Ask for carton counts, jar sizing, labeling direction, and target destination.'
  },
  pap: {
    name: 'Dry pap',
    category: 'Retail-ready',
    formats: '500g pouches, cartons, mixed packs',
    bestFor: 'Diaspora grocery channels and food service',
    image: 'assets/products/pap-pouches.jpg',
    price: 'From $2.00/kg FOB Lagos',
    story: 'Fermented maize powder prepared for convenience-focused buyers who want familiar Nigerian staples in shelf-ready packaging.',
    quoteCue: 'Share pouch size, carton quantity, and whether you want plain or custom-label supply.'
  },
  beans: {
    name: 'Beans powder',
    category: 'Retail-ready',
    formats: 'Pouches, cartons, wholesale cases',
    bestFor: 'Ready-to-cook protein staples',
    image: 'assets/products/beans-pouches.jpg',
    price: 'From $3.50/kg FOB Lagos',
    story: 'A practical beans powder line for buyers serving customers who want speed, consistency, and authentic staple products.',
    quoteCue: 'Confirm pack size, order rhythm, and destination requirements.'
  },
  'palm-oil': {
    name: 'Palm oil',
    category: 'Bulk',
    formats: 'Bottles, cartons, drums',
    bestFor: 'Food service, importers, private-label planning',
    image: 'assets/products/palm-oil-bottle.jpg',
    price: 'From $800/MT FOB Lagos',
    story: 'Red palm oil sourced for culinary buyers who need reliable supply, clear packaging options, and a serious export path.',
    quoteCue: 'Include bottle or drum preference, volume range, and import documentation needs.'
  },
  hibiscus: {
    name: 'Dry hibiscus',
    category: 'Specialty',
    formats: 'Pouches, cartons, bulk packs',
    bestFor: 'Tea, beverages, specialty ingredients',
    image: 'assets/products/hibiscus-pouch.jpg',
    price: 'Confirm current grade price',
    story: 'A specialty ingredient line for tea, beverage, and wellness buyers who need hibiscus presented with stronger sourcing confidence.',
    quoteCue: 'Share intended use, pack format, and quality expectations.'
  },
  garri: {
    name: 'Garri',
    category: 'Bulk',
    formats: '1kg packs, 25kg bags, wholesale cartons',
    bestFor: 'Staple supply and recurring replenishment',
    image: 'assets/products/garri-bag.jpg',
    price: 'Confirm current pack price',
    story: 'Cassava flakes prepared for dependable staple distribution, from small retail runs to wholesale replenishment.',
    quoteCue: 'Specify white or yellow preference, bag size, and recurring supply goals.'
  }
};

const QUOTE_STORAGE_KEY = 'elitextraQuoteProducts';
const ELITEXTRA_EMAIL = 'elitextra642@gmail.com';

function getStoredQuoteProducts() {
  try {
    const value = window.localStorage.getItem(QUOTE_STORAGE_KEY);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed.filter((key) => ELITEXTRA_PRODUCTS[key]) : [];
  } catch (error) {
    return [];
  }
}

function storeQuoteProducts(products) {
  const uniqueProducts = [...new Set(products)].filter((key) => ELITEXTRA_PRODUCTS[key]);
  window.localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(uniqueProducts));
  updateQuoteDock(uniqueProducts);
}

function initRevealAnimations() {
  const items = document.querySelectorAll('.reveal, .stagger-children > *');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.14,
    rootMargin: '0px 0px -60px 0px'
  });

  items.forEach((item, index) => {
    if (!item.classList.contains('reveal')) {
      item.classList.add('reveal');
      item.style.transitionDelay = `${Math.min(index * 70, 320)}ms`;
    }
    observer.observe(item);
  });
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = Number(entry.target.getAttribute('data-counter') || '0');
      const suffix = entry.target.getAttribute('data-suffix') || '';
      const duration = 1800;
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const value = Math.round(eased * target);
        entry.target.textContent = value.toLocaleString() + suffix;

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      }

      requestAnimationFrame(tick);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.45 });

  counters.forEach((counter) => observer.observe(counter));
}

function initHeader() {
  const header = document.querySelector('.header');
  const menuButton = document.querySelector('.header__menu-toggle');
  const mobileNav = document.querySelector('.header__mobile-nav');
  const mobileLinks = document.querySelectorAll('.header__mobile-nav-link');

  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 24);
    }, { passive: true });
  }

  if (!menuButton || !mobileNav || !header) return;

  menuButton.addEventListener('click', () => {
    const isOpen = header.classList.toggle('menu-open');
    mobileNav.classList.toggle('open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('menu-open');
      mobileNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  const header = document.querySelector('.header__inner');

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const offset = header ? header.offsetHeight + 28 : 100;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

function initScrollTop() {
  const button = document.querySelector('.scroll-top');
  if (!button) return;

  window.addEventListener('scroll', () => {
    button.classList.toggle('visible', window.scrollY > 700);
  }, { passive: true });

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__nav-link[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = `#${entry.target.id}`;

      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === id);
      });
    });
  }, {
    threshold: 0.45,
    rootMargin: '-20% 0px -40% 0px'
  });

  sections.forEach((section) => observer.observe(section));
}

function initProductFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card[data-category]');
  if (!buttons.length || !cards.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      buttons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');

      cards.forEach((card) => {
        const matches = filter === 'all' || card.getAttribute('data-category') === filter;
        card.style.display = matches ? '' : 'none';
      });
    });
  });
}

function initQuoteLinks() {
  const links = document.querySelectorAll('[data-add-to-quote]');
  if (!links.length) return;

  links.forEach((link) => {
    link.addEventListener('click', () => {
      const product = link.getAttribute('data-add-to-quote');
      if (!product) return;
      storeQuoteProducts([...getStoredQuoteProducts(), product]);
    });
  });
}

function initProductDrawer() {
  const cards = document.querySelectorAll('.product-card-premium[data-product]');
  if (!cards.length) return;

  const drawer = document.createElement('div');
  drawer.className = 'product-drawer';
  drawer.setAttribute('aria-hidden', 'true');
  drawer.innerHTML = `
    <button class="product-drawer__overlay" type="button" aria-label="Close product details"></button>
    <aside class="product-drawer__panel" role="dialog" aria-modal="true" aria-label="Product details">
      <button class="product-drawer__close" type="button" aria-label="Close product details">&times;</button>
      <div class="product-drawer__media"></div>
      <div class="product-drawer__content"></div>
    </aside>
  `;
  document.body.appendChild(drawer);

  const media = drawer.querySelector('.product-drawer__media');
  const content = drawer.querySelector('.product-drawer__content');
  const closeButtons = drawer.querySelectorAll('.product-drawer__overlay, .product-drawer__close');

  function closeDrawer() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function openDrawer(productKey) {
    const product = ELITEXTRA_PRODUCTS[productKey];
    if (!product || !media || !content) return;

    media.innerHTML = `<img src="${product.image}" alt="${product.name} product presentation.">`;
    content.innerHTML = `
      <span class="mini-label">${product.category}</span>
      <h2>${product.name}</h2>
      <p>${product.story}</p>
      <dl class="drawer-specs">
        <div><dt>Price guide</dt><dd>${product.price}</dd></div>
        <div><dt>Formats</dt><dd>${product.formats}</dd></div>
        <div><dt>Best for</dt><dd>${product.bestFor}</dd></div>
        <div><dt>Quote note</dt><dd>${product.quoteCue}</dd></div>
      </dl>
      <div class="button-row">
        <a class="btn btn--primary btn--lg" href="order.html" data-add-to-quote="${productKey}">Add to quote <span class="btn__icon">&rarr;</span></a>
        <button class="btn btn--secondary btn--lg" type="button" data-drawer-close>Keep browsing</button>
      </div>
    `;

    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    initQuoteLinks();
    content.querySelector('[data-drawer-close]')?.addEventListener('click', closeDrawer);
  }

  cards.forEach((card) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('click', (event) => {
      if (event.target.closest('a, button')) return;
      openDrawer(card.getAttribute('data-product'));
    });
    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openDrawer(card.getAttribute('data-product'));
    });
  });

  closeButtons.forEach((button) => button.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeDrawer();
  });
}

function getQuotePath(quantity) {
  const normalized = quantity.toLowerCase();
  if (normalized.includes('sample')) return 'Sample review path';
  if (normalized.includes('recurring')) return 'Recurring supply path';
  if (normalized.includes('1mt')) return 'Bulk export path';
  return 'Wholesale planning path';
}

function renderQuoteSummary(products, quantity, country) {
  const selectedProducts = products.map((key) => ELITEXTRA_PRODUCTS[key]).filter(Boolean);
  const names = selectedProducts.map((product) => product.name);
  const path = getQuotePath(quantity || 'Samples');
  const destination = country || 'Destination pending';

  if (!selectedProducts.length) {
    return `
      <span class="mini-label">Live quote brief</span>
      <h3>Your export brief is forming here.</h3>
      <p>Select products and quantity to see a cleaner buying path before you submit.</p>
    `;
  }

  return `
    <span class="mini-label">Live quote brief</span>
    <h3>${path}</h3>
    <p>${names.join(', ')} for ${destination}. We will respond with packaging fit, quantity guidance, and the next buying step.</p>
    <div class="quote-pill-row">
      ${names.map((name) => `<span class="quote-pill">${name}</span>`).join('')}
      <span class="quote-pill">${quantity || 'Quantity pending'}</span>
    </div>
  `;
}

function initQuoteBuilder() {
  const form = document.querySelector('[data-quote-form]');
  const summary = document.querySelector('[data-quote-summary]');
  if (!form || !summary) return;

  const productInputs = form.querySelectorAll('input[name="products"]');
  const quantity = form.querySelector('#quantity');
  const country = form.querySelector('#country');
  const message = form.querySelector('#message');
  const submitButton = form.querySelector('button[type="submit"]');
  const storedProducts = getStoredQuoteProducts();

  productInputs.forEach((input) => {
    input.checked = storedProducts.includes(input.value);
  });

  function getSelectedProducts() {
    return [...productInputs].filter((input) => input.checked).map((input) => input.value);
  }

  function updateSummary() {
    const selected = getSelectedProducts();
    storeQuoteProducts(selected);
    summary.innerHTML = renderQuoteSummary(selected, quantity?.value || '', country?.value.trim() || '');
  }

  productInputs.forEach((input) => input.addEventListener('change', updateSummary));
  quantity?.addEventListener('change', updateSummary);
  country?.addEventListener('input', updateSummary);
  updateSummary();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const selected = getSelectedProducts();
    const productNames = selected.map((key) => ELITEXTRA_PRODUCTS[key]?.name).filter(Boolean).join(', ');
    const note = `Quote request: ${productNames || 'Products pending'} | ${quantity?.value || 'Quantity pending'} | ${country?.value || 'Destination pending'}`;

    if (message && !message.value.includes('Quote request:')) {
      message.value = `${note}\n\n${message.value}`.trim();
    }

    if (!submitButton) return;
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Brief captured';
    summary.classList.add('quote-summary--success');
    summary.innerHTML = `
      <span class="mini-label">Ready to send</span>
      <h3>Your inquiry is structured.</h3>
      <p>The form now contains the quote brief. Use the email button below to send the prepared inquiry to Elitextra.</p>
      <a class="text-link" href="mailto:${ELITEXTRA_EMAIL}?subject=${encodeURIComponent('Elitextra quote inquiry')}&body=${encodeURIComponent(message?.value || note)}">Open prepared email</a>
    `;

    window.setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
      summary.classList.remove('quote-summary--success');
      updateSummary();
    }, 1800);
  });
}

function updateQuoteDock(products = getStoredQuoteProducts()) {
  const dock = document.querySelector('[data-quote-dock]');
  if (!dock) return;

  const count = products.length;
  dock.classList.toggle('visible', count > 0);
  dock.querySelector('[data-quote-count]').textContent = String(count);
  dock.querySelector('[data-quote-label]').textContent = count === 1 ? 'product selected' : 'products selected';
}

function initQuoteDock() {
  if (document.querySelector('[data-quote-dock]')) return;

  const dock = document.createElement('a');
  dock.href = 'order.html';
  dock.className = 'quote-dock';
  dock.setAttribute('data-quote-dock', '');
  dock.innerHTML = `
    <span class="quote-dock__count" data-quote-count>0</span>
    <span><strong>Build quote</strong><small data-quote-label>products selected</small></span>
  `;
  document.body.appendChild(dock);
  updateQuoteDock();
}

function initPageTransitions() {
  const links = document.querySelectorAll('a[href$=".html"]');
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.target || link.hasAttribute('download')) return;

      event.preventDefault();
      document.body.classList.add('page-transition-out');
      window.setTimeout(() => {
        window.location.href = link.href;
      }, 160);
    });
  });
}

function initPointerLift() {
  const cards = document.querySelectorAll('.product-card-premium, .premium-card, .contact-card');
  if (!cards.length || window.matchMedia('(pointer: coarse)').matches) return;

  cards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
      card.style.setProperty('--tilt-x', `${y}deg`);
      card.style.setProperty('--tilt-y', `${x}deg`);
      card.classList.add('is-tilting');
    });

    card.addEventListener('pointerleave', () => {
      card.classList.remove('is-tilting');
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
    });
  });
}

function initRoutePlanner() {
  const buttons = document.querySelectorAll('[data-route]');
  const panel = document.querySelector('[data-route-panel]');
  if (!buttons.length || !panel) return;

  const routes = {
    sample: {
      kicker: 'Fastest path',
      title: 'Send a small product list and target destination.',
      copy: 'We confirm the right pack format, sample quantity, product availability, and the cleanest way to move from trial order into a commercial quote.',
      metricA: '24h',
      metricB: '3'
    },
    wholesale: {
      kicker: 'Volume path',
      title: 'Share cartons, kilograms, destination, and packaging target.',
      copy: 'We shape the order around product grade, pack size, carton count, documentation expectations, and the route that keeps the shipment practical.',
      metricA: '6+',
      metricB: '4'
    },
    recurring: {
      kicker: 'Supply rhythm',
      title: 'Plan repeat shipments around product seasonality and demand.',
      copy: 'We help buyers move beyond one-off sourcing by planning quantities, packaging consistency, reorder cadence, and market-specific requirements.',
      metricA: '12+',
      metricB: '1'
    }
  };

  const kicker = panel.querySelector('[data-route-kicker]');
  const title = panel.querySelector('[data-route-title]');
  const copy = panel.querySelector('[data-route-copy]');
  const metricA = panel.querySelector('[data-route-metric-a]');
  const metricB = panel.querySelector('[data-route-metric-b]');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const route = routes[button.getAttribute('data-route')];
      if (!route) return;

      buttons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      panel.classList.add('is-changing');

      window.setTimeout(() => {
        kicker.textContent = route.kicker;
        title.textContent = route.title;
        copy.textContent = route.copy;
        metricA.textContent = route.metricA;
        metricB.textContent = route.metricB;
        panel.classList.remove('is-changing');
      }, 140);
    });
  });
}

function initTabs() {
  const containers = document.querySelectorAll('.tabs');
  if (!containers.length) return;

  containers.forEach((container) => {
    const buttons = container.querySelectorAll('.tab-btn');
    const panels = container.parentElement ? container.parentElement.querySelectorAll('.tab-panel') : [];

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.getAttribute('data-tab');
        buttons.forEach((item) => item.classList.remove('active'));
        panels.forEach((panel) => panel.classList.remove('active'));
        button.classList.add('active');
        const panel = container.parentElement?.querySelector(`.tab-panel[data-tab="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });
}

function initAccordions() {
  const accordions = document.querySelectorAll('.accordion-btn');
  accordions.forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.accordion-item');
      if (!item) return;
      item.classList.toggle('open');
    });
  });
}

function initFaq() {
  const faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      if (!item) return;
      const answer = item.querySelector('.faq-answer');
      const willOpen = !item.classList.contains('open');

      item.parentElement?.querySelectorAll('.faq-item').forEach((entry) => {
        entry.classList.remove('open');
        const panel = entry.querySelector('.faq-answer');
        if (panel) panel.style.maxHeight = '0px';
      });

      if (willOpen) {
        item.classList.add('open');
        if (answer) answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });
}

function initOrderForm() {
  const form = document.querySelector('.order-form');
  if (!form) return;

  const steps = form.querySelectorAll('.order-step');
  const nextButtons = form.querySelectorAll('.btn-next');
  const prevButtons = form.querySelectorAll('.btn-prev');
  const indicators = document.querySelectorAll('.step');
  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, stepIndex) => {
      step.classList.toggle('active', stepIndex === index);
    });

    indicators.forEach((indicator, indicatorIndex) => {
      indicator.classList.toggle('active', indicatorIndex === index);
      indicator.classList.toggle('completed', indicatorIndex < index);
    });
  }

  nextButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (currentStep < steps.length - 1) {
        currentStep += 1;
        showStep(currentStep);
      }
    });
  });

  prevButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep -= 1;
        showStep(currentStep);
      }
    });
  });

  const productOptions = form.querySelectorAll('.product-option');
  productOptions.forEach((option) => {
    option.addEventListener('click', () => {
      option.classList.toggle('selected');
      const input = option.querySelector('input');
      if (input) input.checked = !input.checked;
    });
  });

  showStep(currentStep);
}

function initContactForm() {
  const forms = document.querySelectorAll('.contact-form');
  if (!forms.length) return;

  forms.forEach((form) => {
    if (form.matches('[data-quote-form]')) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      if (!button) return;

      const originalText = button.textContent;
      const formData = new FormData(form);
      const subject = formData.get('topic') || 'Elitextra website inquiry';
      const body = [...formData.entries()].map(([key, value]) => `${key}: ${value}`).join('\n');
      button.disabled = true;
      button.textContent = 'Preparing email...';

      window.setTimeout(() => {
        button.textContent = 'Email ready';
        window.location.href = `mailto:${ELITEXTRA_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.setTimeout(() => {
          button.disabled = false;
          button.textContent = originalText;
          form.reset();
        }, 1400);
      }, 900);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
  initCounters();
  initHeader();
  initSmoothScroll();
  initScrollTop();
  initActiveNav();
  initProductFilter();
  initQuoteLinks();
  initProductDrawer();
  initTabs();
  initAccordions();
  initFaq();
  initOrderForm();
  initQuoteDock();
  initQuoteBuilder();
  initPageTransitions();
  initPointerLift();
  initRoutePlanner();
  initContactForm();
});
