<?php
/**
 * ezhomes Theme Functions
 *
 * @package ezhomes
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Define theme constants
define( 'EZHOMES_VERSION', '1.0.0' );
define( 'EZHOMES_DIR', get_template_directory() );
define( 'EZHOMES_URI', get_template_directory_uri() );

/**
 * Theme Setup
 */
function ezhomes_setup() {
    // Add default posts and comments RSS feed links to head
    add_theme_support( 'automatic-feed-links' );

    // Let WordPress manage the document title
    add_theme_support( 'title-tag' );

    // Enable support for Post Thumbnails
    add_theme_support( 'post-thumbnails' );

    // Add custom image sizes
    add_image_size( 'ezhomes-product', 600, 450, true );
    add_image_size( 'ezhomes-hero', 1920, 1080, true );
    add_image_size( 'ezhomes-thumbnail', 300, 225, true );

    // Register navigation menus
    register_nav_menus( array(
        'primary'   => __( 'Primary Menu', 'ezhomes' ),
        'footer'    => __( 'Footer Menu', 'ezhomes' ),
        'mobile'    => __( 'Mobile Menu', 'ezhomes' ),
    ) );

    // Switch default core markup to HTML5
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ) );

    // Add support for custom logo
    add_theme_support( 'custom-logo', array(
        'height'      => 80,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ) );

    // Add WooCommerce support
    add_theme_support( 'woocommerce' );
    add_theme_support( 'wc-product-gallery-zoom' );
    add_theme_support( 'wc-product-gallery-lightbox' );
    add_theme_support( 'wc-product-gallery-slider' );

    // Add support for responsive embeds
    add_theme_support( 'responsive-embeds' );

    // Add support for wide alignment
    add_theme_support( 'align-wide' );
}
add_action( 'after_setup_theme', 'ezhomes_setup' );

/**
 * Enqueue Scripts and Styles
 */
function ezhomes_scripts() {
    // Google Fonts
    wp_enqueue_style(
        'ezhomes-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap',
        array(),
        null
    );

    // Main stylesheet
    wp_enqueue_style(
        'ezhomes-style',
        get_stylesheet_uri(),
        array(),
        EZHOMES_VERSION
    );

    // Main JavaScript
    wp_enqueue_script(
        'ezhomes-main',
        EZHOMES_URI . '/main.js',
        array( 'jquery' ),
        EZHOMES_VERSION,
        true
    );

    // Product Interactions JavaScript
    wp_enqueue_script(
        'ezhomes-product-interactions',
        EZHOMES_URI . '/product-interactions.js',
        array( 'jquery', 'ezhomes-main' ),
        EZHOMES_VERSION,
        true
    );

    // Quick Add JavaScript
    wp_enqueue_script(
        'ezhomes-quick-add',
        EZHOMES_URI . '/quick-add.js',
        array( 'jquery', 'ezhomes-main' ),
        EZHOMES_VERSION,
        true
    );

    // Localize quick-add script with AJAX data
    wp_localize_script( 'ezhomes-quick-add', 'ezhomesQuickAdd', array(
        'ajaxUrl'   => admin_url( 'admin-ajax.php' ),
        'nonce'     => wp_create_nonce( 'ezhomes_nonce' ),
    ) );

    // Localize script for AJAX
    wp_localize_script( 'ezhomes-main', 'ezhomesAjax', array(
        'ajaxUrl'   => admin_url( 'admin-ajax.php' ),
        'nonce'     => wp_create_nonce( 'ezhomes_nonce' ),
        'cartUrl'   => function_exists( 'wc_get_cart_url' ) ? wc_get_cart_url() : '',
        'shopUrl'   => function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : '',
    ) );

    // Comment reply script
    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}
add_action( 'wp_enqueue_scripts', 'ezhomes_scripts' );

/**
 * Register Widget Areas
 */
function ezhomes_widgets_init() {
    register_sidebar( array(
        'name'          => __( 'Footer Widget Area', 'ezhomes' ),
        'id'            => 'footer-widgets',
        'description'   => __( 'Add widgets here to appear in your footer.', 'ezhomes' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ) );

    register_sidebar( array(
        'name'          => __( 'Shop Sidebar', 'ezhomes' ),
        'id'            => 'shop-sidebar',
        'description'   => __( 'Add widgets here to appear in your shop sidebar.', 'ezhomes' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ) );
}
add_action( 'widgets_init', 'ezhomes_widgets_init' );

/**
 * WooCommerce Setup
 */
function ezhomes_woocommerce_setup() {
    // Remove default WooCommerce wrapper
    remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10 );
    remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10 );
}
add_action( 'init', 'ezhomes_woocommerce_setup' );

// Custom WooCommerce wrappers
function ezhomes_woocommerce_wrapper_before() {
    echo '<main id="primary" class="site-main"><div class="container section">';
}
add_action( 'woocommerce_before_main_content', 'ezhomes_woocommerce_wrapper_before' );

function ezhomes_woocommerce_wrapper_after() {
    echo '</div></main>';
}
add_action( 'woocommerce_after_main_content', 'ezhomes_woocommerce_wrapper_after' );

/**
 * AJAX Add to Cart Handler
 */
function ezhomes_ajax_add_to_cart() {
    check_ajax_referer( 'ezhomes_nonce', 'nonce' );

    $product_id = absint( $_POST['product_id'] );
    $quantity   = absint( $_POST['quantity'] ?? 1 );

    if ( WC()->cart->add_to_cart( $product_id, $quantity ) ) {
        wp_send_json_success( array(
            'cart_count' => WC()->cart->get_cart_contents_count(),
            'cart_total' => WC()->cart->get_cart_total(),
            'fragments'  => apply_filters( 'woocommerce_add_to_cart_fragments', array() ),
        ) );
    } else {
        wp_send_json_error( array(
            'message' => __( 'Error adding product to cart.', 'ezhomes' ),
        ) );
    }
}
add_action( 'wp_ajax_ezhomes_add_to_cart', 'ezhomes_ajax_add_to_cart' );
add_action( 'wp_ajax_nopriv_ezhomes_add_to_cart', 'ezhomes_ajax_add_to_cart' );

/**
 * AJAX Get Cart Contents
 */
function ezhomes_ajax_get_cart() {
    check_ajax_referer( 'ezhomes_nonce', 'nonce' );

    ob_start();
    woocommerce_mini_cart();
    $mini_cart = ob_get_clean();

    wp_send_json_success( array(
        'cart_count' => WC()->cart->get_cart_contents_count(),
        'cart_total' => WC()->cart->get_cart_total(),
        'mini_cart'  => $mini_cart,
    ) );
}
add_action( 'wp_ajax_ezhomes_get_cart', 'ezhomes_ajax_get_cart' );
add_action( 'wp_ajax_nopriv_ezhomes_get_cart', 'ezhomes_ajax_get_cart' );

/**
 * Add Product Badges (Sale, New, Bestseller)
 */
function ezhomes_product_badge() {
    global $product;

    $badges = array();

    // Sale badge
    if ( $product->is_on_sale() ) {
        $badges[] = '<span class="product-badge sale">' . __( 'Sale', 'ezhomes' ) . '</span>';
    }

    // New product badge (within last 30 days)
    $created = strtotime( $product->get_date_created() );
    if ( $created && ( time() - $created ) < ( 30 * DAY_IN_SECONDS ) ) {
        $badges[] = '<span class="product-badge new">' . __( 'New', 'ezhomes' ) . '</span>';
    }

    // Bestseller badge (custom field)
    if ( get_post_meta( $product->get_id(), '_bestseller', true ) === 'yes' ) {
        $badges[] = '<span class="product-badge bestseller">' . __( 'Bestseller', 'ezhomes' ) . '</span>';
    }

    if ( ! empty( $badges ) ) {
        echo '<div class="product-badges">' . implode( '', $badges ) . '</div>';
    }
}
add_action( 'woocommerce_before_shop_loop_item_title', 'ezhomes_product_badge', 10 );

/**
 * Trust Bar Shortcode
 */
function ezhomes_trust_bar_shortcode( $atts ) {
    ob_start();
    ?>
    <section class="trust-section section">
        <div class="container">
            <div class="trust-grid">
                <div class="trust-item">
                    <div class="trust-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="1" y="3" width="15" height="13"></rect>
                            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                            <circle cx="5.5" cy="18.5" r="2.5"></circle>
                            <circle cx="18.5" cy="18.5" r="2.5"></circle>
                        </svg>
                    </div>
                    <h4><?php esc_html_e( 'Free Shipping', 'ezhomes' ); ?></h4>
                    <p><?php esc_html_e( 'On orders over $999', 'ezhomes' ); ?></p>
                </div>
                <div class="trust-item">
                    <div class="trust-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                    </div>
                    <h4><?php esc_html_e( '5-Year Warranty', 'ezhomes' ); ?></h4>
                    <p><?php esc_html_e( 'Full coverage protection', 'ezhomes' ); ?></p>
                </div>
                <div class="trust-item">
                    <div class="trust-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="23 4 23 10 17 10"></polyline>
                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                        </svg>
                    </div>
                    <h4><?php esc_html_e( '30-Day Returns', 'ezhomes' ); ?></h4>
                    <p><?php esc_html_e( 'Risk-free trial period', 'ezhomes' ); ?></p>
                </div>
                <div class="trust-item">
                    <div class="trust-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                    </div>
                    <h4><?php esc_html_e( '10-Min Assembly', 'ezhomes' ); ?></h4>
                    <p><?php esc_html_e( 'No tools required', 'ezhomes' ); ?></p>
                </div>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
add_shortcode( 'trust_bar', 'ezhomes_trust_bar_shortcode' );

/**
 * Customizer Settings
 */
function ezhomes_customize_register( $wp_customize ) {
    // Announcement Bar Section
    $wp_customize->add_section( 'ezhomes_announcement', array(
        'title'    => __( 'Announcement Bar', 'ezhomes' ),
        'priority' => 30,
    ) );

    $wp_customize->add_setting( 'ezhomes_announcement_enable', array(
        'default'           => true,
        'sanitize_callback' => 'wp_validate_boolean',
    ) );

    $wp_customize->add_control( 'ezhomes_announcement_enable', array(
        'label'    => __( 'Enable Announcement Bar', 'ezhomes' ),
        'section'  => 'ezhomes_announcement',
        'type'     => 'checkbox',
    ) );

    $wp_customize->add_setting( 'ezhomes_announcement_text', array(
        'default'           => '<span class="highlight">FREE SHIPPING</span> on all orders over $999 | <span class="highlight">30-DAY</span> Risk-Free Trial',
        'sanitize_callback' => 'wp_kses_post',
    ) );

    $wp_customize->add_control( 'ezhomes_announcement_text', array(
        'label'   => __( 'Announcement Text', 'ezhomes' ),
        'section' => 'ezhomes_announcement',
        'type'    => 'textarea',
    ) );

    // Hero Section
    $wp_customize->add_section( 'ezhomes_hero', array(
        'title'    => __( 'Hero Section', 'ezhomes' ),
        'priority' => 35,
    ) );

    $wp_customize->add_setting( 'ezhomes_hero_title', array(
        'default'           => 'Furniture that Transform Your Space',
        'sanitize_callback' => 'sanitize_text_field',
    ) );

    $wp_customize->add_control( 'ezhomes_hero_title', array(
        'label'   => __( 'Hero Title', 'ezhomes' ),
        'section' => 'ezhomes_hero',
        'type'    => 'text',
    ) );

    $wp_customize->add_setting( 'ezhomes_hero_subtitle', array(
        'default'           => 'Modular, space-saving furniture designed to adapt to how you live. Ships in a compact box. Assembles in minutes.',
        'sanitize_callback' => 'sanitize_textarea_field',
    ) );

    $wp_customize->add_control( 'ezhomes_hero_subtitle', array(
        'label'   => __( 'Hero Subtitle', 'ezhomes' ),
        'section' => 'ezhomes_hero',
        'type'    => 'textarea',
    ) );

    $wp_customize->add_setting( 'ezhomes_hero_image', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ) );

    $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'ezhomes_hero_image', array(
        'label'   => __( 'Hero Background Image', 'ezhomes' ),
        'section' => 'ezhomes_hero',
    ) ) );

    // Contact Information Section
    $wp_customize->add_section( 'ezhomes_contact', array(
        'title'    => __( 'Contact Information', 'ezhomes' ),
        'priority' => 40,
    ) );

    $wp_customize->add_setting( 'ezhomes_phone', array(
        'default'           => '1300 123 456',
        'sanitize_callback' => 'sanitize_text_field',
    ) );

    $wp_customize->add_control( 'ezhomes_phone', array(
        'label'   => __( 'Phone Number', 'ezhomes' ),
        'section' => 'ezhomes_contact',
        'type'    => 'text',
    ) );

    $wp_customize->add_setting( 'ezhomes_email', array(
        'default'           => 'ezhomesinfo@gmail.com',
        'sanitize_callback' => 'sanitize_email',
    ) );

    $wp_customize->add_control( 'ezhomes_email', array(
        'label'   => __( 'Email Address', 'ezhomes' ),
        'section' => 'ezhomes_contact',
        'type'    => 'email',
    ) );

    // Social Links Section
    $wp_customize->add_section( 'ezhomes_social', array(
        'title'    => __( 'Social Media Links', 'ezhomes' ),
        'priority' => 45,
    ) );

    $social_networks = array( 'facebook', 'instagram', 'twitter', 'youtube', 'pinterest' );

    foreach ( $social_networks as $network ) {
        $wp_customize->add_setting( 'ezhomes_' . $network, array(
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw',
        ) );

        $wp_customize->add_control( 'ezhomes_' . $network, array(
            'label'   => ucfirst( $network ) . ' URL',
            'section' => 'ezhomes_social',
            'type'    => 'url',
        ) );
    }
}
add_action( 'customize_register', 'ezhomes_customize_register' );

/**
 * Add body classes
 */
function ezhomes_body_classes( $classes ) {
    if ( class_exists( 'WooCommerce' ) ) {
        if ( is_shop() || is_product_category() || is_product_tag() ) {
            $classes[] = 'shop-page';
        }
        if ( is_product() ) {
            $classes[] = 'single-product-page';
        }
    }

    if ( is_front_page() ) {
        $classes[] = 'front-page';
    }

    return $classes;
}
add_filter( 'body_class', 'ezhomes_body_classes' );

/**
 * Check if WooCommerce is active
 */
function ezhomes_is_woocommerce_active() {
    return class_exists( 'WooCommerce' );
}

/**
 * Get cart count
 */
function ezhomes_get_cart_count() {
    if ( ezhomes_is_woocommerce_active() && WC()->cart ) {
        return WC()->cart->get_cart_contents_count();
    }
    return 0;
}

/**
 * Add defer to scripts
 */
function ezhomes_script_loader_tag( $tag, $handle, $src ) {
    $defer_scripts = array( 'ezhomes-main', 'ezhomes-product-interactions', 'ezhomes-quick-add' );

    if ( in_array( $handle, $defer_scripts ) ) {
        return '<script src="' . esc_url( $src ) . '" defer></script>';
    }

    return $tag;
}
add_filter( 'script_loader_tag', 'ezhomes_script_loader_tag', 10, 3 );

/**
 * Preload critical assets
 */
function ezhomes_preload_assets() {
    ?>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <?php
}
add_action( 'wp_head', 'ezhomes_preload_assets', 1 );

/**
 * Get color code from color name for swatches
 */
function ezhomes_get_color_code( $color_name ) {
    $colors = array(
        // Neutrals
        'walnut'      => '#5D4E37',
        'oak'         => '#C4A77D',
        'black'       => '#1a1a1a',
        'white'       => '#ffffff',
        'charcoal'    => '#36454F',
        'cream'       => '#F5F5DC',
        'grey'        => '#808080',
        'gray'        => '#808080',
        'light-grey'  => '#D3D3D3',
        'dark-grey'   => '#696969',
        'space-grey'  => '#4A4A4A',
        'beige'       => '#F5F5DC',
        'tan'         => '#D2B48C',
        'natural'     => '#C4A77D',
        'sand'        => '#C2B280',
        'taupe'       => '#483C32',
        'ivory'       => '#FFFFF0',
        'stone'       => '#928E85',
        'slate'       => '#708090',
        'pewter'      => '#8B8B7A',
        'fog'         => '#D7D7D7',
        'dove'        => '#B0AFA9',
        'graphite'    => '#4A4A4A',
        'onyx'        => '#353935',
        // Blues
        'navy'        => '#1e3a5f',
        'ocean-blue'  => '#006994',
        'blue'        => '#0066cc',
        'light-blue'  => '#ADD8E6',
        'teal'        => '#008080',
        'midnight'    => '#191970',
        'ocean'       => '#006994',
        // Greens
        'olive'       => '#808000',
        'forest'      => '#228B22',
        'sage'        => '#9DC183',
        'green'       => '#228B22',
        'moss'        => '#8A9A5B',
        // Warm colors
        'rust'        => '#B7410E',
        'terracotta'  => '#E2725B',
        'coral'       => '#FF7F50',
        'burgundy'    => '#800020',
        'wine'        => '#722F37',
        'blush'       => '#DE5D83',
        'pink'        => '#FFC0CB',
        'rose'        => '#FF007F',
        'lavender'    => '#E6E6FA',
        'mauve'       => '#E0B0FF',
        'plum'        => '#8E4585',
        // Browns
        'chocolate'   => '#7B3F00',
        'espresso'    => '#3C2415',
        'mocha'       => '#967969',
        'caramel'     => '#FFD59A',
        'coffee'      => '#6F4E37',
        'cognac'      => '#9A463D',
        'camel'       => '#C19A6B',
        'honey'       => '#EB9605',
        'amber'       => '#FFBF00',
        'mustard'     => '#FFDB58',
        'gold'        => '#FFD700',
        // Oatmeal/Natural tones
        'oatmeal'     => '#D3C4AA',
        'mushroom'    => '#C9B8A5',
        'linen'       => '#FAF0E6',
    );
    
    $color_key = strtolower( str_replace( array( ' ', '_' ), '-', $color_name ) );
    return isset( $colors[ $color_key ] ) ? $colors[ $color_key ] : '#808080';
}

/**
 * Modify excerpt length
 */
function ezhomes_excerpt_length( $length ) {
    return 20;
}
add_filter( 'excerpt_length', 'ezhomes_excerpt_length' );

/**
 * Modify excerpt more
 */
function ezhomes_excerpt_more( $more ) {
    return '...';
}
add_filter( 'excerpt_more', 'ezhomes_excerpt_more' );

/**
 * Allow public access to WooCommerce products via REST API
 */
add_filter('woocommerce_rest_check_permissions', 'allow_public_wc_rest_api', 10, 4);

function allow_public_wc_rest_api($permission, $context, $object_id, $post_type) {
    // Allow public read access to products
    if ($context === 'read' && in_array($post_type, array('product', 'product_variation'))) {
        return true;
    }
    return $permission;
}
