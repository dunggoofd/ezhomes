/**
 * ezhomes Product Page Interactions
 * Standalone JS for WordPress - makes copied UI functional
 * Add via: Appearance > Customize > Additional JS or child theme
 */

(function() {
  'use strict';

  // Wait for DOM
  document.addEventListener('DOMContentLoaded', function() {
    initProductGallery();
    initVariantSelector();
    initQuantityControls();
    initAddToCart();
    initMobileMenu();
    initCartDrawer();
    initStickyAddToCart();
    initAccordions();
  });

  /**
   * Product Image Gallery
   * Handles thumbnail clicks to change main image
   */
  function initProductGallery() {
    const thumbnails = document.querySelectorAll('[data-thumbnail], .gallery-thumbnail, .product-thumbnail');
    const mainImage = document.querySelector('[data-main-image], .gallery-main-image, .product-main-image, .woocommerce-product-gallery__image img');

    if (!mainImage || thumbnails.length === 0) return;

    thumbnails.forEach(function(thumb) {
      thumb.addEventListener('click', function() {
        // Get full-size image URL
        const newSrc = this.dataset.fullImage || this.dataset.src || this.src;
        
        // Update main image with fade effect
        mainImage.style.opacity = '0';
        setTimeout(function() {
          mainImage.src = newSrc;
          mainImage.style.opacity = '1';
        }, 150);

        // Update active state
        thumbnails.forEach(function(t) { 
          t.classList.remove('active', 'ring-2', 'ring-primary', 'border-primary'); 
        });
        this.classList.add('active', 'ring-2', 'ring-primary', 'border-primary');
      });

      // Add pointer cursor
      thumb.style.cursor = 'pointer';
    });

    // Add transition to main image
    mainImage.style.transition = 'opacity 0.15s ease';
  }

  /**
   * Variant/Color Selector
   * Handles color swatch and option selections
   */
  function initVariantSelector() {
    const swatches = document.querySelectorAll('[data-variant], .color-swatch, .variant-option, .swatch');
    const variantLabel = document.querySelector('[data-variant-label], .variant-label, .selected-variant');

    swatches.forEach(function(swatch) {
      swatch.addEventListener('click', function() {
        const variantId = this.dataset.variant || this.dataset.variantId;
        const variantName = this.dataset.name || this.title || this.getAttribute('aria-label');

        // Update active state
        swatches.forEach(function(s) { 
          s.classList.remove('active', 'ring-2', 'ring-offset-2', 'selected'); 
          s.setAttribute('aria-checked', 'false');
        });
        this.classList.add('active', 'ring-2', 'ring-offset-2', 'selected');
        this.setAttribute('aria-checked', 'true');

        // Update label if exists
        if (variantLabel && variantName) {
          variantLabel.textContent = variantName;
        }

        // Update hidden input for WooCommerce
        const hiddenInput = document.querySelector('input[name="variation_id"], input[name="attribute_pa_color"]');
        if (hiddenInput && variantId) {
          hiddenInput.value = variantId;
        }

        // Trigger custom event for other scripts
        document.dispatchEvent(new CustomEvent('ezhomes:variant-changed', {
          detail: { variantId: variantId, variantName: variantName }
        }));
      });

      swatch.style.cursor = 'pointer';
    });
  }

  /**
   * Quantity Controls
   * Plus/minus buttons for quantity inputs
   */
  function initQuantityControls() {
    // Find all quantity wrappers
    const quantityWrappers = document.querySelectorAll('.quantity, [data-quantity], .qty-wrapper');

    quantityWrappers.forEach(function(wrapper) {
      const input = wrapper.querySelector('input[type="number"], .qty');
      const minusBtn = wrapper.querySelector('[data-qty-minus], .qty-minus, .minus');
      const plusBtn = wrapper.querySelector('[data-qty-plus], .qty-plus, .plus');

      if (!input) return;

      const min = parseInt(input.min) || 1;
      const max = parseInt(input.max) || 999;

      // Create buttons if they don't exist
      if (!minusBtn || !plusBtn) {
        const minus = document.createElement('button');
        minus.type = 'button';
        minus.className = 'qty-minus';
        minus.innerHTML = '−';
        minus.setAttribute('aria-label', 'Decrease quantity');

        const plus = document.createElement('button');
        plus.type = 'button';
        plus.className = 'qty-plus';
        plus.innerHTML = '+';
        plus.setAttribute('aria-label', 'Increase quantity');

        input.parentNode.insertBefore(minus, input);
        input.parentNode.appendChild(plus);

        setupQuantityButton(minus, input, -1, min, max);
        setupQuantityButton(plus, input, 1, min, max);
      } else {
        setupQuantityButton(minusBtn, input, -1, min, max);
        setupQuantityButton(plusBtn, input, 1, min, max);
      }
    });

    // Also handle addon quantity controls
    const addonControls = document.querySelectorAll('[data-addon-qty]');
    addonControls.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const delta = parseInt(this.dataset.delta) || (this.classList.contains('plus') ? 1 : -1);
        const targetId = this.dataset.addonQty || this.dataset.target;
        const display = document.querySelector('[data-addon-display="' + targetId + '"], #' + targetId + '-qty');
        
        if (display) {
          let current = parseInt(display.textContent) || 0;
          current = Math.max(0, current + delta);
          display.textContent = current;
        }
      });
    });
  }

  function setupQuantityButton(btn, input, delta, min, max) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      let current = parseInt(input.value) || min;
      let newVal = current + delta;
      
      if (newVal >= min && newVal <= max) {
        input.value = newVal;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }

  /**
   * Add to Cart
   * AJAX add to cart functionality
   */
  function initAddToCart() {
    const addToCartBtns = document.querySelectorAll('[data-add-to-cart], .single_add_to_cart_button, .add-to-cart-btn');

    addToCartBtns.forEach(function(btn) {
      // Skip if already has WooCommerce handler
      if (btn.classList.contains('ajax_add_to_cart')) return;

      btn.addEventListener('click', function(e) {
        // Don't prevent default for WooCommerce forms
        if (this.closest('form.cart')) return;

        e.preventDefault();

        const productId = this.dataset.productId || this.dataset.product;
        const quantity = document.querySelector('.qty')?.value || 1;

        if (!productId) {
          console.warn('ezhomes: No product ID found');
          return;
        }

        // Show loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<span class="loading">Adding...</span>';
        this.disabled = true;

        // AJAX request (WooCommerce compatible)
        const formData = new FormData();
        formData.append('action', 'woocommerce_ajax_add_to_cart');
        formData.append('product_id', productId);
        formData.append('quantity', quantity);

        fetch(typeof wc_add_to_cart_params !== 'undefined' ? wc_add_to_cart_params.wc_ajax_url.replace('%%endpoint%%', 'add_to_cart') : '/wp-admin/admin-ajax.php', {
          method: 'POST',
          body: formData,
          credentials: 'same-origin'
        })
        .then(function(response) { return response.json(); })
        .then(function(data) {
          btn.innerHTML = '✓ Added!';
          
          // Open cart drawer
          openCartDrawer();

          // Update cart count
          updateCartCount();

          setTimeout(function() {
            btn.innerHTML = originalText;
            btn.disabled = false;
          }, 2000);
        })
        .catch(function(error) {
          console.error('Add to cart error:', error);
          btn.innerHTML = originalText;
          btn.disabled = false;
        });
      });
    });
  }

  /**
   * Mobile Menu
   */
  function initMobileMenu() {
    const menuToggle = document.querySelector('[data-menu-toggle], .mobile-menu-toggle, .menu-toggle');
    const mobileMenu = document.querySelector('[data-mobile-menu], .mobile-menu, .mobile-nav');
    const closeBtn = document.querySelector('[data-menu-close], .mobile-menu-close');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      mobileMenu.classList.toggle('hidden');
      document.body.classList.toggle('menu-open');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('menu-open');
      });
    }

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('menu-open');
      });
    });
  }

  /**
   * Cart Drawer
   */
  function initCartDrawer() {
    const cartTriggers = document.querySelectorAll('[data-cart-open], .cart-toggle, .cart-icon');
    const cartDrawer = document.querySelector('[data-cart-drawer], .cart-drawer, .mini-cart-drawer');
    const cartClose = document.querySelector('[data-cart-close], .cart-drawer-close');
    const cartOverlay = document.querySelector('[data-cart-overlay], .cart-overlay');

    if (!cartDrawer) return;

    cartTriggers.forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        openCartDrawer();
      });
    });

    if (cartClose) {
      cartClose.addEventListener('click', closeCartDrawer);
    }

    if (cartOverlay) {
      cartOverlay.addEventListener('click', closeCartDrawer);
    }

    // ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeCartDrawer();
    });
  }

  function openCartDrawer() {
    const drawer = document.querySelector('[data-cart-drawer], .cart-drawer, .mini-cart-drawer');
    const overlay = document.querySelector('[data-cart-overlay], .cart-overlay');
    
    if (drawer) {
      drawer.classList.add('active', 'open');
      drawer.classList.remove('hidden');
    }
    if (overlay) {
      overlay.classList.add('active');
      overlay.classList.remove('hidden');
    }
    document.body.classList.add('cart-open');
  }

  function closeCartDrawer() {
    const drawer = document.querySelector('[data-cart-drawer], .cart-drawer, .mini-cart-drawer');
    const overlay = document.querySelector('[data-cart-overlay], .cart-overlay');
    
    if (drawer) {
      drawer.classList.remove('active', 'open');
    }
    if (overlay) {
      overlay.classList.remove('active');
    }
    document.body.classList.remove('cart-open');
  }

  function updateCartCount() {
    fetch('/?wc-ajax=get_refreshed_fragments', {
      credentials: 'same-origin'
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.cart_hash) {
        const countEls = document.querySelectorAll('.cart-count, [data-cart-count]');
        countEls.forEach(function(el) {
          // WooCommerce stores count in fragments
          if (data.fragments) {
            const temp = document.createElement('div');
            for (let key in data.fragments) {
              if (key.includes('cart') && data.fragments[key].includes('count')) {
                temp.innerHTML = data.fragments[key];
                const count = temp.querySelector('.count, .cart-count');
                if (count) el.textContent = count.textContent;
              }
            }
          }
        });
      }
    });
  }

  /**
   * Sticky Add to Cart (Mobile)
   */
  function initStickyAddToCart() {
    const stickyBar = document.querySelector('[data-sticky-atc], .sticky-add-to-cart, .sticky-atc');
    
    if (!stickyBar) return;

    const triggerPoint = document.querySelector('.single_add_to_cart_button, [data-add-to-cart]');
    
    if (!triggerPoint) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          stickyBar.classList.remove('visible', 'active');
        } else {
          stickyBar.classList.add('visible', 'active');
        }
      });
    }, { threshold: 0 });

    observer.observe(triggerPoint);
  }

  /**
   * Accordions
   */
  function initAccordions() {
    const accordionTriggers = document.querySelectorAll('[data-accordion-trigger], .accordion-trigger, .accordion-header');

    accordionTriggers.forEach(function(trigger) {
      trigger.addEventListener('click', function() {
        const content = this.nextElementSibling || document.querySelector(this.dataset.target);
        const isOpen = this.classList.contains('active');

        // Close others in same group
        const group = this.closest('[data-accordion-group], .accordion-group');
        if (group) {
          group.querySelectorAll('[data-accordion-trigger], .accordion-trigger').forEach(function(t) {
            t.classList.remove('active');
            const c = t.nextElementSibling;
            if (c) c.style.maxHeight = null;
          });
        }

        // Toggle current
        if (!isOpen && content) {
          this.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  }

  // Expose functions globally for custom use
  window.ezhomes = {
    openCartDrawer: openCartDrawer,
    closeCartDrawer: closeCartDrawer,
    updateCartCount: updateCartCount
  };

})();
