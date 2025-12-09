/**
 * ezhomes Quick Add to Cart
 * Standalone JavaScript for Quick Add functionality
 * Works with ClonewebX cloned designs - no server-side enqueuing required
 * 
 * Usage:
 * Add data-quick-add="PRODUCT_ID" to any Quick Add button
 * Add data-product-type="simple|variable" to indicate product type
 * For variable products, add data-variants='[{"id":123,"color":"Blue","colorCode":"#0000FF","size":"Large","price":999}]'
 */

(function() {
  'use strict';

  // Configuration
  const config = {
    selectors: {
      quickAddBtn: '[data-quick-add]',
      modal: '#quick-add-modal',
      modalOverlay: '.quick-add-modal-overlay',
      modalClose: '.quick-add-modal-close',
      variantOption: '.quick-add-variant-option',
      addToCartBtn: '.quick-add-submit',
      quantityInput: '.quick-add-quantity',
      quantityPlus: '.quick-add-qty-plus',
      quantityMinus: '.quick-add-qty-minus',
      cartCount: '.cart-count, .header-cart-count',
      cartDrawer: '.cart-drawer'
    },
    classes: {
      active: 'active',
      loading: 'loading',
      selected: 'selected',
      open: 'open'
    },
    ajaxUrl: typeof wc_add_to_cart_params !== 'undefined' 
      ? wc_add_to_cart_params.ajax_url 
      : '/wp-admin/admin-ajax.php'
  };

  // State
  let state = {
    currentProductId: null,
    currentVariantId: null,
    selectedOptions: {},
    quantity: 1
  };

  /**
   * Initialize Quick Add functionality
   */
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setup);
    } else {
      setup();
    }
  }

  function setup() {
    createModal();
    bindEvents();
  }

  /**
   * Create the modal HTML structure
   */
  function createModal() {
    if (document.querySelector(config.selectors.modal)) return;

    const modalHTML = `
      <div id="quick-add-modal" class="quick-add-modal" aria-hidden="true">
        <div class="quick-add-modal-overlay"></div>
        <div class="quick-add-modal-container">
          <button class="quick-add-modal-close" aria-label="Close modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div class="quick-add-modal-content">
            <div class="quick-add-product-image">
              <img src="" alt="" class="quick-add-image" />
            </div>
            
            <div class="quick-add-product-info">
              <h3 class="quick-add-title"></h3>
              <div class="quick-add-price"></div>
              
              <!-- Variant Selectors -->
              <div class="quick-add-variants"></div>
              
              <!-- Quantity -->
              <div class="quick-add-quantity-wrapper">
                <label>Quantity</label>
                <div class="quick-add-quantity-controls">
                  <button type="button" class="quick-add-qty-minus" aria-label="Decrease quantity">−</button>
                  <input type="number" class="quick-add-quantity" value="1" min="1" max="99" />
                  <button type="button" class="quick-add-qty-plus" aria-label="Increase quantity">+</button>
                </div>
              </div>
              
              <!-- Add to Cart -->
              <button type="button" class="quick-add-submit">
                <span class="quick-add-submit-text">Add to Cart</span>
                <span class="quick-add-submit-loading">
                  <svg class="spinner" width="20" height="20" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" opacity="0.25"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
                  </svg>
                </span>
              </button>
              
              <p class="quick-add-message"></p>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    injectStyles();
  }

  /**
   * Inject required CSS styles
   */
  function injectStyles() {
    if (document.getElementById('quick-add-styles')) return;

    const styles = `
      <style id="quick-add-styles">
        /* Modal Base */
        .quick-add-modal {
          position: fixed;
          inset: 0;
          z-index: 9999;
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
          backdrop-filter: blur(4px);
        }
        
        .quick-add-modal-container {
          position: relative;
          background: var(--ez-surface, #fff);
          border-radius: 12px;
          max-width: 600px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          transform: translateY(20px);
          transition: transform 0.3s ease;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .quick-add-modal.open .quick-add-modal-container {
          transform: translateY(0);
        }
        
        .quick-add-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 10;
          background: var(--ez-surface, #fff);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
        }
        
        .quick-add-modal-close:hover {
          transform: scale(1.1);
        }
        
        /* Modal Content */
        .quick-add-modal-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        
        @media (max-width: 600px) {
          .quick-add-modal-content {
            grid-template-columns: 1fr;
          }
        }
        
        .quick-add-product-image {
          aspect-ratio: 1;
          overflow: hidden;
          border-radius: 12px 0 0 12px;
        }
        
        @media (max-width: 600px) {
          .quick-add-product-image {
            border-radius: 12px 12px 0 0;
            aspect-ratio: 4/3;
          }
        }
        
        .quick-add-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .quick-add-product-info {
          padding: 24px 24px 24px 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        @media (max-width: 600px) {
          .quick-add-product-info {
            padding: 0 24px 24px;
          }
        }
        
        .quick-add-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--ez-text-primary, #1a1a1a);
          margin: 0;
          line-height: 1.3;
        }
        
        .quick-add-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--ez-primary, #1a1a1a);
        }
        
        .quick-add-price .original-price {
          font-size: 1rem;
          color: var(--ez-text-muted, #666);
          text-decoration: line-through;
          font-weight: 400;
          margin-right: 8px;
        }
        
        .quick-add-price .sale-price {
          color: var(--ez-destructive, #dc2626);
        }
        
        /* Variant Selectors */
        .quick-add-variants {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .quick-add-variant-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .quick-add-variant-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--ez-text-primary, #1a1a1a);
        }
        
        .quick-add-variant-options {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        /* Color Swatches */
        .quick-add-variant-option[data-type="color"] {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        
        .quick-add-variant-option[data-type="color"]:hover,
        .quick-add-variant-option[data-type="color"].selected {
          border-color: var(--ez-primary, #1a1a1a);
          transform: scale(1.1);
        }
        
        .quick-add-variant-option[data-type="color"].selected::after {
          content: '✓';
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 14px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }
        
        /* Size/Text Options */
        .quick-add-variant-option[data-type="text"] {
          padding: 8px 16px;
          border: 1px solid var(--ez-border, #e5e5e5);
          border-radius: 6px;
          background: transparent;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s ease;
        }
        
        .quick-add-variant-option[data-type="text"]:hover {
          border-color: var(--ez-primary, #1a1a1a);
        }
        
        .quick-add-variant-option[data-type="text"].selected {
          background: var(--ez-primary, #1a1a1a);
          color: var(--ez-primary-foreground, #fff);
          border-color: var(--ez-primary, #1a1a1a);
        }
        
        /* Quantity Controls */
        .quick-add-quantity-wrapper label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 8px;
          color: var(--ez-text-primary, #1a1a1a);
        }
        
        .quick-add-quantity-controls {
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--ez-border, #e5e5e5);
          border-radius: 6px;
          overflow: hidden;
        }
        
        .quick-add-qty-minus,
        .quick-add-qty-plus {
          width: 40px;
          height: 40px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 1.25rem;
          color: var(--ez-text-primary, #1a1a1a);
          transition: background 0.2s ease;
        }
        
        .quick-add-qty-minus:hover,
        .quick-add-qty-plus:hover {
          background: var(--ez-muted, #f5f5f5);
        }
        
        .quick-add-quantity {
          width: 60px;
          height: 40px;
          border: none;
          border-left: 1px solid var(--ez-border, #e5e5e5);
          border-right: 1px solid var(--ez-border, #e5e5e5);
          text-align: center;
          font-size: 1rem;
          font-weight: 500;
          -moz-appearance: textfield;
        }
        
        .quick-add-quantity::-webkit-outer-spin-button,
        .quick-add-quantity::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        /* Submit Button */
        .quick-add-submit {
          width: 100%;
          padding: 14px 24px;
          background: var(--ez-primary, #1a1a1a);
          color: var(--ez-primary-foreground, #fff);
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .quick-add-submit:hover:not(.loading) {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        
        .quick-add-submit.loading {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .quick-add-submit-loading {
          display: none;
        }
        
        .quick-add-submit.loading .quick-add-submit-text {
          display: none;
        }
        
        .quick-add-submit.loading .quick-add-submit-loading {
          display: block;
        }
        
        .quick-add-submit .spinner {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Message */
        .quick-add-message {
          font-size: 0.875rem;
          text-align: center;
          margin: 0;
          min-height: 20px;
        }
        
        .quick-add-message.success {
          color: var(--ez-success, #16a34a);
        }
        
        .quick-add-message.error {
          color: var(--ez-destructive, #dc2626);
        }

        /* Quick Add Button Overlay on Product Cards */
        .product-card .quick-add-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }

        .product-card:hover .quick-add-overlay {
          transform: translateY(0);
        }

        .quick-add-trigger {
          display: block;
          width: 100%;
          background: var(--ez-primary, #1a1a1a);
          color: var(--ez-primary-foreground, #fff);
          padding: 0.75rem;
          text-align: center;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .quick-add-trigger:hover {
          opacity: 0.9;
        }

        /* Body scroll lock when modal open */
        body.quick-add-modal-open {
          overflow: hidden;
        }
      </style>
    `;

    document.head.insertAdjacentHTML('beforeend', styles);
  }

  /**
   * Bind all event listeners
   */
  function bindEvents() {
    // Quick Add button clicks (delegated)
    document.addEventListener('click', handleQuickAddClick);
    
    // Modal close events
    document.addEventListener('click', handleModalClose);
    document.addEventListener('keydown', handleEscapeKey);
    
    // Variant selection
    document.addEventListener('click', handleVariantSelect);
    
    // Quantity controls
    document.addEventListener('click', handleQuantityChange);
    
    // Add to cart submit
    document.addEventListener('click', handleAddToCart);
  }

  /**
   * Handle Quick Add button click
   */
  function handleQuickAddClick(e) {
    const btn = e.target.closest('[data-quick-add]');
    if (!btn) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const productId = btn.dataset.quickAdd;
    const productType = btn.dataset.productType || 'simple';
    const productData = btn.dataset.product ? JSON.parse(btn.dataset.product) : null;
    
    if (productType === 'simple' && !productData?.variants?.length) {
      // Simple product - add directly
      addToCart(productId, 1);
    } else {
      // Variable product or has variants - show modal
      openModal(productId, productData);
    }
  }

  /**
   * Open the Quick Add modal
   */
  function openModal(productId, productData) {
    const modal = document.querySelector(config.selectors.modal);
    if (!modal) return;
    
    state.currentProductId = productId;
    state.currentVariantId = null;
    state.selectedOptions = {};
    state.quantity = 1;
    
    // Populate modal with product data
    if (productData) {
      populateModal(productData);
    }
    
    // Show modal
    modal.classList.add(config.classes.open);
    document.body.classList.add('quick-add-modal-open');
    
    // Focus trap
    const firstFocusable = modal.querySelector('button, input');
    if (firstFocusable) firstFocusable.focus();
  }

  /**
   * Populate modal with product data
   */
  function populateModal(data) {
    const modal = document.querySelector(config.selectors.modal);
    if (!modal) return;
    
    // Image
    const img = modal.querySelector('.quick-add-image');
    if (img && data.image) {
      img.src = data.image;
      img.alt = data.title || '';
    }
    
    // Title
    const title = modal.querySelector('.quick-add-title');
    if (title) title.textContent = data.title || '';
    
    // Price
    const price = modal.querySelector('.quick-add-price');
    if (price) {
      if (data.compareAtPrice && data.compareAtPrice > data.price) {
        price.innerHTML = `
          <span class="original-price">$${data.compareAtPrice.toLocaleString()}</span>
          <span class="sale-price">$${data.price.toLocaleString()}</span>
        `;
      } else {
        price.innerHTML = `$${data.price.toLocaleString()}`;
      }
    }
    
    // Variants
    const variantsContainer = modal.querySelector('.quick-add-variants');
    if (variantsContainer && data.variants) {
      variantsContainer.innerHTML = buildVariantSelectors(data.variants, data.variantGroups);
    }
    
    // Reset quantity
    const qtyInput = modal.querySelector(config.selectors.quantityInput);
    if (qtyInput) qtyInput.value = 1;
    
    // Clear message
    const message = modal.querySelector('.quick-add-message');
    if (message) {
      message.textContent = '';
      message.className = 'quick-add-message';
    }
  }

  /**
   * Build variant selector HTML
   */
  function buildVariantSelectors(variants, groups) {
    if (!groups || !groups.length) {
      // Auto-detect groups from variant data
      groups = detectVariantGroups(variants);
    }
    
    return groups.map(group => {
      const options = getUniqueOptions(variants, group.attribute);
      const isColor = group.attribute.toLowerCase().includes('color');
      
      return `
        <div class="quick-add-variant-group" data-attribute="${group.attribute}">
          <span class="quick-add-variant-label">${group.label || group.attribute}</span>
          <div class="quick-add-variant-options">
            ${options.map((opt, i) => {
              if (isColor) {
                return `
                  <button 
                    type="button"
                    class="quick-add-variant-option ${i === 0 ? 'selected' : ''}"
                    data-type="color"
                    data-attribute="${group.attribute}"
                    data-value="${opt.value}"
                    style="background-color: ${opt.colorCode || opt.value}"
                    title="${opt.value}"
                  ></button>
                `;
              } else {
                return `
                  <button 
                    type="button"
                    class="quick-add-variant-option ${i === 0 ? 'selected' : ''}"
                    data-type="text"
                    data-attribute="${group.attribute}"
                    data-value="${opt.value}"
                  >${opt.value}</button>
                `;
              }
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Detect variant groups from variant data
   */
  function detectVariantGroups(variants) {
    if (!variants || !variants.length) return [];
    
    const groups = [];
    const sample = variants[0];
    
    if (sample.color) groups.push({ attribute: 'color', label: 'Color' });
    if (sample.size) groups.push({ attribute: 'size', label: 'Size' });
    if (sample.material) groups.push({ attribute: 'material', label: 'Material' });
    
    return groups;
  }

  /**
   * Get unique options for an attribute
   */
  function getUniqueOptions(variants, attribute) {
    const seen = new Set();
    const options = [];
    
    variants.forEach(v => {
      const value = v[attribute];
      if (value && !seen.has(value)) {
        seen.add(value);
        options.push({
          value: value,
          colorCode: v.colorCode || v[attribute + 'Code']
        });
      }
    });
    
    return options;
  }

  /**
   * Handle variant option selection
   */
  function handleVariantSelect(e) {
    const option = e.target.closest(config.selectors.variantOption);
    if (!option) return;
    
    const attribute = option.dataset.attribute;
    const value = option.dataset.value;
    
    // Update selection state
    state.selectedOptions[attribute] = value;
    
    // Update UI
    const group = option.closest('.quick-add-variant-group');
    group.querySelectorAll(config.selectors.variantOption).forEach(opt => {
      opt.classList.remove(config.classes.selected);
    });
    option.classList.add(config.classes.selected);
    
    // Find matching variant ID
    updateSelectedVariant();
  }

  /**
   * Update the selected variant based on options
   */
  function updateSelectedVariant() {
    const btn = document.querySelector(`[data-quick-add="${state.currentProductId}"]`);
    if (!btn) return;
    
    const productData = btn.dataset.product ? JSON.parse(btn.dataset.product) : null;
    if (!productData?.variants) return;
    
    // Find variant matching all selected options
    const variant = productData.variants.find(v => {
      return Object.entries(state.selectedOptions).every(([attr, value]) => {
        return v[attr] === value;
      });
    });
    
    if (variant) {
      state.currentVariantId = variant.id;
      
      // Update price display if variant has different price
      const modal = document.querySelector(config.selectors.modal);
      const price = modal?.querySelector('.quick-add-price');
      if (price && variant.price) {
        price.innerHTML = `$${variant.price.toLocaleString()}`;
      }
      
      // Update image if variant has image
      const img = modal?.querySelector('.quick-add-image');
      if (img && variant.image) {
        img.src = variant.image;
      }
    }
  }

  /**
   * Handle quantity changes
   */
  function handleQuantityChange(e) {
    const plus = e.target.closest(config.selectors.quantityPlus);
    const minus = e.target.closest(config.selectors.quantityMinus);
    
    if (!plus && !minus) return;
    
    const input = document.querySelector(`${config.selectors.modal} ${config.selectors.quantityInput}`);
    if (!input) return;
    
    let qty = parseInt(input.value) || 1;
    const min = parseInt(input.min) || 1;
    const max = parseInt(input.max) || 99;
    
    if (plus) qty = Math.min(qty + 1, max);
    if (minus) qty = Math.max(qty - 1, min);
    
    input.value = qty;
    state.quantity = qty;
  }

  /**
   * Handle Add to Cart submission
   */
  function handleAddToCart(e) {
    const btn = e.target.closest(config.selectors.addToCartBtn);
    if (!btn) return;
    
    const productId = state.currentVariantId || state.currentProductId;
    if (!productId) return;
    
    addToCart(productId, state.quantity, btn);
  }

  /**
   * Add product to cart via AJAX
   */
  function addToCart(productId, quantity, triggerBtn) {
    const btn = triggerBtn || document.querySelector(config.selectors.addToCartBtn);
    if (btn) btn.classList.add(config.classes.loading);
    
    const message = document.querySelector('.quick-add-message');
    
    // WooCommerce AJAX add to cart
    const formData = new FormData();
    formData.append('action', 'woocommerce_ajax_add_to_cart');
    formData.append('product_id', productId);
    formData.append('quantity', quantity);
    
    // Add variation data if applicable
    if (state.currentVariantId && state.currentVariantId !== state.currentProductId) {
      formData.append('variation_id', state.currentVariantId);
      Object.entries(state.selectedOptions).forEach(([key, value]) => {
        formData.append(`attribute_${key}`, value);
      });
    }
    
    fetch(config.ajaxUrl, {
      method: 'POST',
      body: formData,
      credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(data => {
      if (btn) btn.classList.remove(config.classes.loading);
      
      if (data.error) {
        if (message) {
          message.textContent = data.error || 'Failed to add to cart';
          message.className = 'quick-add-message error';
        }
        return;
      }
      
      // Success
      if (message) {
        message.textContent = 'Added to cart!';
        message.className = 'quick-add-message success';
      }
      
      // Update cart count
      updateCartCount();
      
      // Close modal after delay and open cart drawer
      setTimeout(() => {
        closeModal();
        openCartDrawer();
      }, 800);
    })
    .catch(err => {
      console.error('Quick Add error:', err);
      if (btn) btn.classList.remove(config.classes.loading);
      if (message) {
        message.textContent = 'Something went wrong. Please try again.';
        message.className = 'quick-add-message error';
      }
    });
  }

  /**
   * Update cart count in header
   */
  function updateCartCount() {
    // Use WooCommerce fragments if available
    if (typeof wc_cart_fragments_params !== 'undefined') {
      fetch(wc_cart_fragments_params.wc_ajax_url.toString().replace('%%endpoint%%', 'get_refreshed_fragments'), {
        method: 'POST',
        credentials: 'same-origin'
      })
      .then(res => res.json())
      .then(data => {
        if (data.fragments) {
          Object.entries(data.fragments).forEach(([selector, html]) => {
            const el = document.querySelector(selector);
            if (el) el.outerHTML = html;
          });
        }
      });
    }
    
    // Also trigger custom event for other scripts
    document.dispatchEvent(new CustomEvent('ezhomes:cart-updated'));
  }

  /**
   * Open cart drawer
   */
  function openCartDrawer() {
    if (window.ezhomes?.openCartDrawer) {
      window.ezhomes.openCartDrawer();
    } else {
      const drawer = document.querySelector(config.selectors.cartDrawer);
      if (drawer) {
        drawer.classList.add(config.classes.open, config.classes.active);
      }
    }
  }

  /**
   * Close the modal
   */
  function closeModal() {
    const modal = document.querySelector(config.selectors.modal);
    if (!modal) return;
    
    modal.classList.remove(config.classes.open);
    document.body.classList.remove('quick-add-modal-open');
    
    // Reset state
    state.currentProductId = null;
    state.currentVariantId = null;
    state.selectedOptions = {};
    state.quantity = 1;
  }

  /**
   * Handle modal close click
   */
  function handleModalClose(e) {
    const close = e.target.closest(config.selectors.modalClose);
    const overlay = e.target.closest(config.selectors.modalOverlay);
    
    if (close || overlay) {
      closeModal();
    }
  }

  /**
   * Handle ESC key to close modal
   */
  function handleEscapeKey(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  // Initialize
  init();

  // Expose API globally
  window.ezhomes = window.ezhomes || {};
  window.ezhomes.quickAdd = {
    open: openModal,
    close: closeModal,
    addToCart: addToCart
  };

})();
