<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <a class="skip-link sr-only" href="#primary"><?php esc_html_e( 'Skip to content', 'ezhomes' ); ?></a>

    <?php if ( get_theme_mod( 'ezhomes_announcement_enable', true ) ) : ?>
        <!-- Announcement Bar -->
        <div class="announcement-bar">
            <p>
                <?php
                $announcement_text = get_theme_mod( 'ezhomes_announcement_text', '<span class="highlight">FREE SHIPPING</span> on all orders over $999 | <span class="highlight">30-DAY</span> Risk-Free Trial' );
                echo wp_kses_post( $announcement_text );
                ?>
            </p>
        </div>
    <?php endif; ?>

    <!-- Site Header -->
    <header id="masthead" class="site-header">
        <div class="container">
            <div class="header-inner">
                
                <!-- Mobile Menu Toggle -->
                <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="<?php esc_attr_e( 'Toggle menu', 'ezhomes' ); ?>">
                    <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>

                <!-- Logo -->
                <div class="site-branding">
                    <?php if ( has_custom_logo() ) : ?>
                        <?php the_custom_logo(); ?>
                    <?php else : ?>
                        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-logo">
                            <?php bloginfo( 'name' ); ?>
                        </a>
                    <?php endif; ?>
                </div>

                <!-- Main Navigation -->
                <nav id="site-navigation" class="main-nav" aria-label="<?php esc_attr_e( 'Primary Navigation', 'ezhomes' ); ?>">
                    <?php
                    wp_nav_menu( array(
                        'theme_location' => 'primary',
                        'menu_class'     => 'nav-menu',
                        'container'      => false,
                        'fallback_cb'    => function() {
                            if ( function_exists( 'wc_get_page_permalink' ) ) {
                                echo '<a href="' . esc_url( wc_get_page_permalink( 'shop' ) ) . '">Shop</a>';
                            }
                            echo '<a href="#how-it-works">How It Works</a>';
                            echo '<a href="#reviews">Reviews</a>';
                            echo '<a href="#contact">Contact</a>';
                        },
                    ) );
                    ?>
                </nav>

                <!-- Header Actions -->
                <div class="header-actions">
                    <!-- Account -->
                    <?php if ( ezhomes_is_woocommerce_active() ) : ?>
                        <a href="<?php echo esc_url( wc_get_page_permalink( 'myaccount' ) ); ?>" class="account-link hidden md:block" aria-label="<?php esc_attr_e( 'My Account', 'ezhomes' ); ?>">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </a>
                    <?php endif; ?>

                    <!-- Cart -->
                    <button class="cart-toggle" id="cart-toggle" aria-label="<?php esc_attr_e( 'View cart', 'ezhomes' ); ?>" style="position: relative;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        <span class="cart-count" id="cart-count"><?php echo esc_html( ezhomes_get_cart_count() ); ?></span>
                    </button>
                </div>
            </div>

            <!-- Mobile Navigation -->
            <nav id="mobile-navigation" class="mobile-menu" aria-label="<?php esc_attr_e( 'Mobile Navigation', 'ezhomes' ); ?>">
                <?php
                wp_nav_menu( array(
                    'theme_location' => 'mobile',
                    'menu_class'     => 'mobile-nav-menu',
                    'container'      => false,
                    'fallback_cb'    => function() {
                        if ( function_exists( 'wc_get_page_permalink' ) ) {
                            echo '<a href="' . esc_url( wc_get_page_permalink( 'shop' ) ) . '">Shop</a>';
                        }
                        echo '<a href="#how-it-works">How It Works</a>';
                        echo '<a href="#reviews">Reviews</a>';
                        echo '<a href="#contact">Contact</a>';
                        if ( ezhomes_is_woocommerce_active() ) {
                            echo '<a href="' . esc_url( wc_get_page_permalink( 'myaccount' ) ) . '">My Account</a>';
                        }
                    },
                ) );
                ?>
            </nav>
        </div>
    </header>

    <!-- Cart Drawer Overlay -->
    <div class="cart-overlay" id="cart-overlay"></div>

    <!-- Cart Drawer -->
    <div class="cart-drawer" id="cart-drawer">
        <div class="cart-header">
            <h2><?php esc_html_e( 'Your Cart', 'ezhomes' ); ?></h2>
            <button class="cart-close" id="cart-close" aria-label="<?php esc_attr_e( 'Close cart', 'ezhomes' ); ?>">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
        
        <div class="cart-body" id="cart-body">
            <?php if ( ezhomes_is_woocommerce_active() && WC()->cart && ! WC()->cart->is_empty() ) : ?>
                <?php woocommerce_mini_cart(); ?>
            <?php else : ?>
                <div class="cart-empty">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    <p><?php esc_html_e( 'Your cart is empty', 'ezhomes' ); ?></p>
                    <?php if ( function_exists( 'wc_get_page_permalink' ) ) : ?>
                        <a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="btn btn-primary">
                            <?php esc_html_e( 'Continue Shopping', 'ezhomes' ); ?>
                        </a>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </div>

        <?php if ( ezhomes_is_woocommerce_active() && WC()->cart && ! WC()->cart->is_empty() ) : ?>
            <div class="cart-footer">
                <div class="cart-total">
                    <span><?php esc_html_e( 'Subtotal:', 'ezhomes' ); ?></span>
                    <span><?php echo WC()->cart->get_cart_subtotal(); ?></span>
                </div>
                <a href="<?php echo esc_url( wc_get_checkout_url() ); ?>" class="btn btn-accent" style="width: 100%;">
                    <?php esc_html_e( 'Checkout', 'ezhomes' ); ?>
                </a>
            </div>
        <?php endif; ?>
    </div>
