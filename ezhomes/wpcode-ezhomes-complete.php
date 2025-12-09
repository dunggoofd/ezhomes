/**
 * ezhomes Complete UI + AJAX Handlers
 * WPCode Snippet - Add as "PHP Snippet" with auto-insert location "Run Everywhere"
 * 
 * This includes:
 * - Backend AJAX handlers for add-to-cart
 * - Frontend JavaScript for all UI functionality
 */

// ============================================
// BACKEND: AJAX Add to Cart Handler
// ============================================
add_action('wp_ajax_ezhomes_wpcode_add_to_cart', 'ezhomes_wpcode_ajax_add_to_cart');
add_action('wp_ajax_nopriv_ezhomes_wpcode_add_to_cart', 'ezhomes_wpcode_ajax_add_to_cart');

function ezhomes_wpcode_ajax_add_to_cart() {
    $product_id = apply_filters('woocommerce_add_to_cart_product_id', absint($_POST['product_id']));
    $quantity = empty($_POST['quantity']) ? 1 : wc_stock_amount(wp_unslash($_POST['quantity']));
    $variation_id = isset($_POST['variation_id']) ? absint($_POST['variation_id']) : 0;
    $variations = array();
    
    if ($variation_id) {
        foreach ($_POST as $key => $value) {
            if (strpos($key, 'attribute_') === 0) {
                $variations[$key] = sanitize_text_field($value);
            }
        }
    }
    
    $passed_validation = apply_filters('woocommerce_add_to_cart_validation', true, $product_id, $quantity, $variation_id, $variations);
    
    if ($passed_validation && WC()->cart->add_to_cart($product_id, $quantity, $variation_id, $variations)) {
        do_action('woocommerce_ajax_added_to_cart', $product_id);
        
        if ('yes' === get_option('woocommerce_cart_redirect_after_add')) {
            wc_add_to_cart_message(array($product_id => $quantity), true);
        }
        
        WC_AJAX::get_refreshed_fragments();
    } else {
        $data = array(
            'error' => true,
            'product_url' => apply_filters('woocommerce_cart_redirect_after_error', get_permalink($product_id), $product_id),
        );
        
        wp_send_json($data);
    }
    
    wp_die();
}

// ============================================
// FRONTEND: UI Scripts & Styles
// ============================================
add_action('wp_footer', 'ezhomes_ui_scripts', 99);

function ezhomes_ui_scripts() {
?>
<script>
/**
 * ezhomes Complete UI - v2.0
 * All-in-one JavaScript for WordPress/WooCommerce
 */
(function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================
  const config = {
    ajaxUrl: typeof wc_add_to_cart_params !== 'undefined' 
      ? wc_add_to_cart_params.ajax_url 
      : '<?php echo admin_url('admin-ajax.php'); ?>',
    wcAjaxUrl: typeof wc_add_to_cart_params !== 'undefined'
      ? wc_add_to_cart_params.wc_ajax_url
      : '/?wc-ajax=%%endpoint%%'
  };

  // ============================================
  // INITIALIZATION
  // ============================================
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setup);
    } else {
      setup();
    }
  }

  function setup() {
    initProductCardNavigation();
    initProductGallery();
    initVariantSelector();
    initQuantityControls();
    initAddToCart();
    initMobileMenu();
    initCartDrawer();
    initStickyAddToCart();
    initAccordions();
    initQuickAdd();
    initHeaderScroll();
    
    console.log('ezhomes UI initialized');
  }

  // ============================================
  // PRODUCT CARD NAVIGATION
  // ============================================
  function initProductCardNavigation() {
    document.addEventListener('click', function(e) {
      if (e.target.closest('[data-quick-add]') || 
          e.target.closest('.quick-add-btn') ||
          e.target.closest('.quick-add-overlay') ||
          e.target.closest('.ajax-add-to-cart')) {
        return;
      }
      
      const card = e.target.closest('.product-card, .woocommerce-loop-product__link, [data-product-url]');
      if (!card) return;
      
      let url = card.dataset.productUrl || card.href;
      
      if (!url) {
        const link = card.querySelector('a[href*="/product/"]');
        if (link) url = link.href;
      }
      
      if (url) {
        e.preventDefault();
        window.location.href = url;
      }
    });
    
    document.querySelectorAll('.product-card').forEach(function(card) {
      if (!card.querySelector('[data-quick-add]')) return;
      card.style.cursor = 'pointer';
    });
  }

  // ============================================
  // PRODUCT IMAGE GALLERY
  // ============================================
  function initProductGallery() {
    const thumbnails = document.querySelectorAll('[data-thumbnail], .gallery-thumbnail, .product-thumbnail');
    const mainImage = document.querySelector('[data-main-image], .gallery-main-image, .product-main-image, .woocommerce-product-gallery__image img');

    if (!mainImage || thumbnails.length === 0) return;

    thumbnails.forEach(function(thumb) {
      thumb.addEventListener('click', function() {
        const newSrc = this.dataset.fullImage || this.dataset.src || this.src;
        
        mainImage.style.opacity = '0';
        setTimeout(function() {
          mainImage.src = newSrc;
          mainImage.style.opacity = '1';
        }, 150);

        thumbnails.forEach(function(t) { 
          t.classList.remove('active', 'ring-2', 'ring-primary', 'border-primary'); 
        });
        this.classList.add('active', 'ring-2', 'ring-primary', 'border-primary');
      });

      thumb.style.cursor = 'pointer';
    });

    mainImage.style.transition = 'opacity 0.15s ease';
  }

  // ============================================
  // VARIANT/COLOR SELECTOR
  // ============================================
  function initVariantSelector() {
    const swatches = document.querySelectorAll('[data-variant], .color-swatch, .variant-option, .swatch');
    const variantLabel = document.querySelector('[data-variant-label], .variant-label, .selected-variant');

    swatches.forEach(function(swatch) {
      swatch.addEventListener('click', function() {
        const variantId = this.dataset.variant || this.dataset.variantId;
        const variantName = this.dataset.name || this.title || this.getAttribute('aria-label');

        swatches.forEach(function(s) { 
          s.classList.remove('active', 'ring-2', 'ring-offset-2', 'selected'); 
          s.setAttribute('aria-checked', 'false');
        });
        this.classList.add('active', 'ring-2', 'ring-offset-2', 'selected');
        this.setAttribute('aria-checked', 'true');

        if (variantLabel && variantName) {
          variantLabel.textContent = variantName;
        }

        const hiddenInput = document.querySelector('input[name="variation_id"], input[name="attribute_pa_color"]');
        if (hiddenInput && variantId) {
          hiddenInput.value = variantId;
        }

        document.dispatchEvent(new CustomEvent('ezhomes:variant-changed', {
          detail: { variantId: variantId, variantName: variantName }
        }));
      });

      swatch.style.cursor = 'pointer';
    });
  }

  // ============================================
  // QUANTITY CONTROLS
  // ============================================
  function initQuantityControls() {
    const quantityWrappers = document.querySelectorAll('.quantity, [data-quantity], .qty-wrapper');

    quantityWrappers.forEach(function(wrapper) {
      const input = wrapper.querySelector('input[type="number"], .qty');
      const minusBtn = wrapper.querySelector('[data-qty-minus], .qty-minus, .minus');
      const plusBtn = wrapper.querySelector('[data-qty-plus], .qty-plus, .plus');

      if (!input) return;

      const min = parseInt(input.min) || 1;
      const max = parseInt(input.max) || 999;

      if (minusBtn) {
        minusBtn.addEventListener('click', function(e) {
          e.preventDefault();
          let current = parseInt(input.value) || min;
          if (current > min) {
            input.value = current - 1;
            input.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
      }

      if (plusBtn) {
        plusBtn.addEventListener('click', function(e) {
          e.preventDefault();
          let current = parseInt(input.value) || min;
          if (current < max) {
            input.value = current + 1;
            input.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
      }
    });
  }

  // ============================================
  // ADD TO CART (AJAX)
  // ============================================
  function initAddToCart() {
    document.addEventListener('click', function(e) {
      const btn = e.target.closest('[data-add-to-cart]:not([data-quick-add]), .single_add_to_cart_button:not(.disabled), .add-to-cart-btn');
      if (!btn) return;
      
      if (btn.closest('form.cart') && btn.classList.contains('single_add_to_cart_button')) return;

      e.preventDefault();

      const productId = btn.dataset.productId || btn.dataset.product || btn.value;
      const quantity = document.querySelector('.qty')?.value || 1;

      if (!productId) {
        console.warn('ezhomes: No product ID found');
        return;
      }

      const originalText = btn.innerHTML;
      btn.innerHTML = '<span class="loading">Adding...</span>';
      btn.disabled = true;

      const formData = new FormData();
      formData.append('action', 'ezhomes_wpcode_add_to_cart');
      formData.append('product_id', productId);
      formData.append('quantity', quantity);

      fetch(config.ajaxUrl, {
        method: 'POST',
        body: formData,
        credentials: 'same-origin'
      })
      .then(function(response) { return response.json(); })
      .then(function(data) {
        btn.innerHTML = '✓ Added!';
        openCartDrawer();
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
  }

  // ============================================
  // MOBILE MENU
  // ============================================
  function initMobileMenu() {
    const menuToggle = document.querySelector('[data-menu-toggle], .mobile-menu-toggle, .menu-toggle, .mobile-menu-btn');
    const mobileMenu = document.querySelector('[data-mobile-menu], .mobile-menu, .mobile-nav, .mobile-drawer');
    const closeBtn = document.querySelector('[data-menu-close], .mobile-menu-close');
    const overlay = document.querySelector('.mobile-menu-overlay, .menu-overlay');

    if (!menuToggle) return;

    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      if (mobileMenu) {
        mobileMenu.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        mobileMenu.classList.toggle('hidden');
      }
      if (overlay) overlay.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      document.body.style.overflow = document.body.classList.contains('menu-open') ? 'hidden' : '';
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMobileMenu);
    }

    if (overlay) {
      overlay.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenu) {
      mobileMenu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', closeMobileMenu);
      });
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeMobileMenu();
    });

    function closeMobileMenu() {
      if (mobileMenu) {
        mobileMenu.classList.remove('active', 'open');
        mobileMenu.classList.add('hidden');
      }
      if (overlay) overlay.classList.remove('active');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    }
  }

  // ============================================
  // CART DRAWER
  // ============================================
  function initCartDrawer() {
    const cartTriggers = document.querySelectorAll('[data-cart-open], .cart-toggle, .cart-icon, .header-cart');
    const cartDrawer = document.querySelector('[data-cart-drawer], .cart-drawer, .mini-cart-drawer');
    const cartClose = document.querySelector('[data-cart-close], .cart-drawer-close, .cart-close');
    const cartOverlay = document.querySelector('[data-cart-overlay], .cart-overlay');

    if (!cartDrawer) {
      createCartDrawer();
    }

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

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeCartDrawer();
    });
  }

  function createCartDrawer() {
    if (document.querySelector('.cart-drawer')) return;
    
    const drawerHTML = `
      <div class="cart-overlay" data-cart-overlay></div>
      <div class="cart-drawer" data-cart-drawer>
        <div class="cart-drawer-header">
          <h3>Your Cart</h3>
          <button class="cart-close" data-cart-close aria-label="Close cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="cart-drawer-content">
          <div class="widget_shopping_cart_content"></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', drawerHTML);
    
    document.querySelector('.cart-close')?.addEventListener('click', closeCartDrawer);
    document.querySelector('.cart-overlay')?.addEventListener('click', closeCartDrawer);
  }

  function openCartDrawer() {
    const drawer = document.querySelector('[data-cart-drawer], .cart-drawer');
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
    document.body.style.overflow = 'hidden';
    
    refreshCartContents();
  }

  function closeCartDrawer() {
    const drawer = document.querySelector('[data-cart-drawer], .cart-drawer');
    const overlay = document.querySelector('[data-cart-overlay], .cart-overlay');
    
    if (drawer) {
      drawer.classList.remove('active', 'open');
    }
    if (overlay) {
      overlay.classList.remove('active');
    }
    document.body.classList.remove('cart-open');
    document.body.style.overflow = '';
  }

  function refreshCartContents() {
    const cartContent = document.querySelector('.widget_shopping_cart_content');
    if (!cartContent) return;
    
    fetch(config.wcAjaxUrl.replace('%%endpoint%%', 'get_refreshed_fragments'), {
      method: 'POST',
      credentials: 'same-origin'
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.fragments) {
        for (let selector in data.fragments) {
          const el = document.querySelector(selector);
          if (el) el.outerHTML = data.fragments[selector];
        }
      }
    })
    .catch(function(err) {
      console.log('Cart refresh error:', err);
    });
  }

  function updateCartCount() {
    fetch(config.wcAjaxUrl.replace('%%endpoint%%', 'get_refreshed_fragments'), {
      method: 'POST',
      credentials: 'same-origin'
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.fragments) {
        for (let selector in data.fragments) {
          const el = document.querySelector(selector);
          if (el) el.outerHTML = data.fragments[selector];
        }
      }
    });
    
    document.dispatchEvent(new CustomEvent('ezhomes:cart-updated'));
  }

  // ============================================
  // STICKY ADD TO CART
  // ============================================
  function initStickyAddToCart() {
    const stickyBar = document.querySelector('[data-sticky-atc], .sticky-add-to-cart, .sticky-atc, .sticky-mobile-cta');
    if (!stickyBar) return;

    const triggerPoint = document.querySelector('.single_add_to_cart_button, [data-add-to-cart], .product-actions');
    if (!triggerPoint) {
      if (document.body.classList.contains('single-product')) {
        stickyBar.classList.add('visible', 'active');
      }
      return;
    }

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

  // ============================================
  // ACCORDIONS
  // ============================================
  function initAccordions() {
    const accordionTriggers = document.querySelectorAll('[data-accordion-trigger], .accordion-trigger, .accordion-header, [data-radix-collection-item]');

    accordionTriggers.forEach(function(trigger) {
      trigger.addEventListener('click', function() {
        const content = this.nextElementSibling || document.querySelector(this.dataset.target);
        const isOpen = this.classList.contains('active') || this.getAttribute('data-state') === 'open';

        const group = this.closest('[data-accordion-group], .accordion-group, [data-orientation]');
        if (group) {
          group.querySelectorAll('[data-accordion-trigger], .accordion-trigger').forEach(function(t) {
            t.classList.remove('active');
            t.setAttribute('data-state', 'closed');
            const c = t.nextElementSibling;
            if (c) {
              c.style.maxHeight = null;
              c.setAttribute('data-state', 'closed');
            }
          });
        }

        if (!isOpen && content) {
          this.classList.add('active');
          this.setAttribute('data-state', 'open');
          content.style.maxHeight = content.scrollHeight + 'px';
          content.setAttribute('data-state', 'open');
        }
      });
    });
  }

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================
  function initHeaderScroll() {
    const header = document.querySelector('header, .site-header, .main-header');
    if (!header) return;
    
    let lastScroll = 0;
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > scrollThreshold) {
        header.classList.add('scrolled', 'is-sticky');
      } else {
        header.classList.remove('scrolled', 'is-sticky');
      }
      
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ============================================
  // QUICK ADD FUNCTIONALITY
  // ============================================
  function initQuickAdd() {
    createQuickAddModal();
    
    document.addEventListener('click', function(e) {
      const btn = e.target.closest('[data-quick-add], .quick-add-btn');
      if (!btn) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      const productId = btn.dataset.quickAdd || btn.dataset.productId;
      const productType = btn.dataset.productType || 'simple';
      
      if (productType === 'simple') {
        quickAddToCart(productId, 1, btn);
      } else {
        const card = btn.closest('.product-card, .product');
        const link = card?.querySelector('a[href*="/product/"]');
        if (link) {
          window.location.href = link.href;
        }
      }
    });
  }

  function createQuickAddModal() {
    if (document.querySelector('#quick-add-modal')) return;
    
    const modalHTML = `
      <div id="quick-add-modal" class="quick-add-modal" aria-hidden="true">
        <div class="quick-add-modal-overlay"></div>
        <div class="quick-add-modal-container">
          <button class="quick-add-modal-close" aria-label="Close">×</button>
          <div class="quick-add-modal-content">
            <div class="quick-add-product-image">
              <img src="" alt="" class="quick-add-image" />
            </div>
            <div class="quick-add-product-info">
              <h3 class="quick-add-title"></h3>
              <div class="quick-add-price"></div>
              <div class="quick-add-variants"></div>
              <div class="quick-add-quantity-wrapper">
                <label>Quantity</label>
                <div class="quick-add-quantity-controls">
                  <button type="button" class="quick-add-qty-minus">−</button>
                  <input type="number" class="quick-add-quantity" value="1" min="1" max="99" />
                  <button type="button" class="quick-add-qty-plus">+</button>
                </div>
              </div>
              <button type="button" class="quick-add-submit">Add to Cart</button>
              <p class="quick-add-message"></p>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    document.querySelector('.quick-add-modal-close')?.addEventListener('click', closeQuickAddModal);
    document.querySelector('.quick-add-modal-overlay')?.addEventListener('click', closeQuickAddModal);
  }

  function closeQuickAddModal() {
    const modal = document.querySelector('#quick-add-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.classList.remove('quick-add-modal-open');
    }
  }

  function quickAddToCart(productId, quantity, triggerBtn) {
    const btn = triggerBtn;
    const originalText = btn ? btn.innerHTML : '';
    
    if (btn) {
      btn.innerHTML = '<span class="loading">Adding...</span>';
      btn.disabled = true;
    }
    
    const formData = new FormData();
    formData.append('action', 'ezhomes_wpcode_add_to_cart');
    formData.append('product_id', productId);
    formData.append('quantity', quantity);
    
    fetch(config.ajaxUrl, {
      method: 'POST',
      body: formData,
      credentials: 'same-origin'
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (btn) {
        btn.innerHTML = '✓ Added!';
        setTimeout(function() {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }, 2000);
      }
      
      updateCartCount();
      openCartDrawer();
    })
    .catch(function(err) {
      console.error('Quick Add error:', err);
      if (btn) {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
    });
  }

  // ============================================
  // EXPOSE GLOBAL API
  // ============================================
  window.ezhomes = {
    openCartDrawer: openCartDrawer,
    closeCartDrawer: closeCartDrawer,
    updateCartCount: updateCartCount,
    quickAdd: {
      addToCart: quickAddToCart,
      closeModal: closeQuickAddModal
    }
  };

  // Initialize
  init();

})();
</script>

<style>
/* Cart Drawer Styles */
.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 9998;
}
.cart-overlay.active {
  opacity: 1;
  visibility: visible;
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100%;
  background: #fff;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
}
.cart-drawer.active,
.cart-drawer.open {
  transform: translateX(0);
}

.cart-drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
}
.cart-drawer-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.cart-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.5rem;
}

/* Quick Add Modal */
.quick-add-modal {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}
.quick-add-modal.open {
  opacity: 1;
  visibility: visible;
}
.quick-add-modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
}
.quick-add-modal-container {
  position: relative;
  background: #fff;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  padding: 2rem;
  max-height: 90vh;
  overflow-y: auto;
}
.quick-add-modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Quick Add Overlay on Product Cards */
.quick-add-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  background: linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.8));
}
.product-card:hover .quick-add-overlay {
  transform: translateY(0);
}
.quick-add-btn {
  display: block;
  width: 100%;
  background: #1a1a1a;
  color: #fff;
  padding: 0.75rem;
  text-align: center;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}
.quick-add-btn:hover {
  opacity: 0.9;
}

/* Mobile Menu */
.mobile-menu,
.mobile-nav,
.mobile-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100%;
  background: #fff;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 9999;
}
.mobile-menu.active,
.mobile-menu.open,
.mobile-nav.active,
.mobile-drawer.active {
  transform: translateX(0);
}

/* Sticky Add to Cart */
.sticky-add-to-cart,
.sticky-atc,
.sticky-mobile-cta {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 1rem;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(100%);
  transition: transform 0.3s ease;
  z-index: 999;
}
.sticky-add-to-cart.visible,
.sticky-add-to-cart.active,
.sticky-atc.visible,
.sticky-mobile-cta.visible {
  transform: translateY(0);
}

/* Header scroll state */
header.scrolled,
.site-header.scrolled,
.main-header.is-sticky {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Body states */
body.cart-open,
body.menu-open,
body.quick-add-modal-open {
  overflow: hidden;
}

/* Product Card clickable */
.product-card {
  cursor: pointer;
}
</style>
<?php
}
