/**
 * ezhomes Theme JavaScript
 *
 * @package ezhomes
 */

(function($) {
    'use strict';

    // DOM Elements
    const $body = $('body');
    const $header = $('.site-header');
    const $mobileMenuToggle = $('#mobile-menu-toggle');
    const $mobileMenu = $('#mobile-navigation');
    const $cartToggle = $('#cart-toggle');
    const $cartDrawer = $('#cart-drawer');
    const $cartOverlay = $('#cart-overlay');
    const $cartClose = $('#cart-close');
    const $cartCount = $('#cart-count');
    const $cartBody = $('#cart-body');

    /**
     * Mobile Menu Toggle
     */
    function initMobileMenu() {
        $mobileMenuToggle.on('click', function() {
            const isOpen = $mobileMenu.hasClass('is-open');
            
            if (isOpen) {
                $mobileMenu.removeClass('is-open');
                $(this).find('.menu-icon').show();
                $(this).find('.close-icon').hide();
                $(this).attr('aria-expanded', 'false');
            } else {
                $mobileMenu.addClass('is-open');
                $(this).find('.menu-icon').hide();
                $(this).find('.close-icon').show();
                $(this).attr('aria-expanded', 'true');
            }
        });

        // Close mobile menu when clicking a link
        $mobileMenu.find('a').on('click', function() {
            $mobileMenu.removeClass('is-open');
            $mobileMenuToggle.find('.menu-icon').show();
            $mobileMenuToggle.find('.close-icon').hide();
        });
    }

    /**
     * Cart Drawer Toggle
     */
    function initCartDrawer() {
        // Open cart drawer
        $cartToggle.on('click', function(e) {
            e.preventDefault();
            openCartDrawer();
        });

        // Close cart drawer
        $cartClose.on('click', function() {
            closeCartDrawer();
        });

        $cartOverlay.on('click', function() {
            closeCartDrawer();
        });

        // Close on escape key
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape' && $cartDrawer.hasClass('is-open')) {
                closeCartDrawer();
            }
        });
    }

    function openCartDrawer() {
        $cartDrawer.addClass('is-open');
        $cartOverlay.addClass('is-open');
        $body.css('overflow', 'hidden');
        
        // Refresh cart contents via AJAX
        refreshCartContents();
    }

    function closeCartDrawer() {
        $cartDrawer.removeClass('is-open');
        $cartOverlay.removeClass('is-open');
        $body.css('overflow', '');
    }

    /**
     * Refresh Cart Contents via AJAX
     */
    function refreshCartContents() {
        if (typeof ezhomesAjax === 'undefined') return;

        $.ajax({
            url: ezhomesAjax.ajaxUrl,
            type: 'POST',
            data: {
                action: 'ezhomes_get_cart',
                nonce: ezhomesAjax.nonce
            },
            success: function(response) {
                if (response.success) {
                    $cartCount.text(response.data.cart_count);
                    
                    if (response.data.cart_count > 0) {
                        $cartBody.html(response.data.mini_cart);
                    }
                }
            }
        });
    }

    /**
     * AJAX Add to Cart
     */
    function initAjaxAddToCart() {
        $(document).on('click', '.ajax-add-to-cart', function(e) {
            e.preventDefault();
            
            const $button = $(this);
            const productId = $button.data('product-id');
            const quantity = $button.data('quantity') || 1;
            
            if (!productId) return;
            
            $button.addClass('loading').prop('disabled', true);
            
            $.ajax({
                url: ezhomesAjax.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'ezhomes_add_to_cart',
                    nonce: ezhomesAjax.nonce,
                    product_id: productId,
                    quantity: quantity
                },
                success: function(response) {
                    if (response.success) {
                        $cartCount.text(response.data.cart_count);
                        openCartDrawer();
                    } else {
                        console.error('Add to cart failed:', response.data.message);
                    }
                },
                error: function() {
                    console.error('AJAX request failed');
                },
                complete: function() {
                    $button.removeClass('loading').prop('disabled', false);
                }
            });
        });
    }

    /**
     * Header Scroll Effect
     */
    function initHeaderScroll() {
        let lastScroll = 0;
        const scrollThreshold = 100;

        $(window).on('scroll', function() {
            const currentScroll = $(window).scrollTop();
            
            if (currentScroll > scrollThreshold) {
                $header.addClass('scrolled');
            } else {
                $header.removeClass('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    /**
     * Smooth Scroll for Anchor Links
     */
    function initSmoothScroll() {
        $('a[href^="#"]').on('click', function(e) {
            const target = $(this.getAttribute('href'));
            
            if (target.length) {
                e.preventDefault();
                
                const headerHeight = $header.outerHeight() + 20;
                
                $('html, body').animate({
                    scrollTop: target.offset().top - headerHeight
                }, 500);
            }
        });
    }

    /**
     * Lazy Load Images
     */
    function initLazyLoad() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        
                        if (image.dataset.src) {
                            image.src = image.dataset.src;
                            image.removeAttribute('data-src');
                        }
                        
                        if (image.dataset.srcset) {
                            image.srcset = image.dataset.srcset;
                            image.removeAttribute('data-srcset');
                        }
                        
                        image.classList.add('loaded');
                        observer.unobserve(image);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            $('img[data-src], img[data-srcset]').each(function() {
                imageObserver.observe(this);
            });
        }
    }

    /**
     * Animate on Scroll
     */
    function initAnimateOnScroll() {
        if ('IntersectionObserver' in window) {
            const animateObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-visible');
                    }
                });
            }, {
                threshold: 0.1
            });

            $('.animate-on-scroll').each(function() {
                animateObserver.observe(this);
            });
        }
    }

    /**
     * Product Gallery (for single product page)
     */
    function initProductGallery() {
        const $mainImage = $('.product-main-image img');
        const $thumbnails = $('.product-thumbnails img');
        
        $thumbnails.on('click', function() {
            const newSrc = $(this).attr('src').replace('-150x150', '');
            const newSrcset = $(this).attr('srcset');
            
            $mainImage.attr('src', newSrc);
            if (newSrcset) {
                $mainImage.attr('srcset', newSrcset);
            }
            
            $thumbnails.removeClass('active');
            $(this).addClass('active');
        });
    }

    /**
     * Quantity Input
     */
    function initQuantityInput() {
        $(document).on('click', '.quantity-minus', function() {
            const $input = $(this).siblings('input[type="number"]');
            const min = parseInt($input.attr('min')) || 1;
            const current = parseInt($input.val()) || 1;
            
            if (current > min) {
                $input.val(current - 1).trigger('change');
            }
        });

        $(document).on('click', '.quantity-plus', function() {
            const $input = $(this).siblings('input[type="number"]');
            const max = parseInt($input.attr('max')) || 99;
            const current = parseInt($input.val()) || 1;
            
            if (current < max) {
                $input.val(current + 1).trigger('change');
            }
        });
    }

    /**
     * Newsletter Form
     */
    function initNewsletterForm() {
        $('.newsletter-form').on('submit', function(e) {
            e.preventDefault();
            
            const $form = $(this);
            const $button = $form.find('button[type="submit"]');
            const email = $form.find('input[type="email"]').val();
            
            // Basic email validation
            if (!email || !email.includes('@')) {
                alert('Please enter a valid email address.');
                return;
            }
            
            $button.prop('disabled', true).text('Subscribing...');
            
            // Here you would normally send to your newsletter service
            // For now, we'll just simulate success
            setTimeout(function() {
                $form.find('input[type="email"]').val('');
                $button.prop('disabled', false).text('Subscribed!');
                
                setTimeout(function() {
                    $button.text('Subscribe');
                }, 2000);
            }, 1000);
        });
    }

    /**
     * Initialize all functions on document ready
     */
    $(document).ready(function() {
        initMobileMenu();
        initCartDrawer();
        initAjaxAddToCart();
        initHeaderScroll();
        initSmoothScroll();
        initLazyLoad();
        initAnimateOnScroll();
        initProductGallery();
        initQuantityInput();
        initNewsletterForm();
    });

    /**
     * Re-initialize on AJAX complete (for WooCommerce updates)
     */
    $(document).ajaxComplete(function() {
        // Update cart count after any AJAX request
        if (typeof wc_cart_fragments_params !== 'undefined') {
            const fragments = JSON.parse(sessionStorage.getItem(wc_cart_fragments_params.fragment_name));
            if (fragments && fragments['.cart-count']) {
                $cartCount.text($(fragments['.cart-count']).text());
            }
        }
    });

})(jQuery);
