<?php
/**
 * The front page template file
 *
 * @package ezhomes
 */

get_header();
?>

<main id="primary" class="site-main">

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-background">
            <?php 
            $hero_image = get_theme_mod( 'ezhomes_hero_image' );
            if ( $hero_image ) : 
            ?>
                <img src="<?php echo esc_url( $hero_image ); ?>" alt="<?php esc_attr_e( 'Hero background', 'ezhomes' ); ?>" loading="eager">
            <?php else : ?>
                <img src="<?php echo esc_url( EZHOMES_URI . '/assets/images/hero-sofa.jpg' ); ?>" alt="<?php esc_attr_e( 'Hero background', 'ezhomes' ); ?>" loading="eager">
            <?php endif; ?>
        </div>
        
        <div class="container">
            <div class="hero-content animate-slide-up">
                <span class="hero-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                    </svg>
                    <?php esc_html_e( 'Modular Living', 'ezhomes' ); ?>
                </span>
                
                <h1><?php echo esc_html( get_theme_mod( 'ezhomes_hero_title', 'Furniture that Transform Your Space' ) ); ?></h1>
                
                <p><?php echo esc_html( get_theme_mod( 'ezhomes_hero_subtitle', 'Modular, space-saving furniture designed to adapt to how you live. Ships in a compact box. Assembles in minutes.' ) ); ?></p>
                
                <div class="hero-buttons">
                    <a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="btn btn-accent btn-lg">
                        <?php esc_html_e( 'Shop Now', 'ezhomes' ); ?>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                    <a href="#how-it-works" class="btn btn-outline btn-lg">
                        <?php esc_html_e( 'How It Works', 'ezhomes' ); ?>
                    </a>
                </div>
                
                <div class="hero-features">
                    <div class="hero-feature">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="1" y="3" width="15" height="13"></rect>
                            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                            <circle cx="5.5" cy="18.5" r="2.5"></circle>
                            <circle cx="18.5" cy="18.5" r="2.5"></circle>
                        </svg>
                        <?php esc_html_e( 'Free Shipping', 'ezhomes' ); ?>
                    </div>
                    <div class="hero-feature">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <?php esc_html_e( '10-Min Setup', 'ezhomes' ); ?>
                    </div>
                    <div class="hero-feature">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                        <?php esc_html_e( '5-Year Warranty', 'ezhomes' ); ?>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Products Section -->
    <section class="products-section section">
        <div class="container">
            <header class="section-header">
                <h2><?php esc_html_e( 'Best Sellers', 'ezhomes' ); ?></h2>
                <p><?php esc_html_e( 'Discover our most popular compression sofas loved by thousands of Australian homes.', 'ezhomes' ); ?></p>
            </header>
            
            <?php if ( ezhomes_is_woocommerce_active() ) : ?>
                <?php
                $args = array(
                    'post_type'      => 'product',
                    'posts_per_page' => 6,
                    'meta_key'       => 'total_sales',
                    'orderby'        => 'meta_value_num',
                    'order'          => 'DESC',
                );
                
                $products = new WP_Query( $args );
                
                if ( $products->have_posts() ) :
                ?>
                    <div class="products-grid">
                        <?php while ( $products->have_posts() ) : $products->the_post(); 
                            global $product;
                        ?>
                            <article class="product-card">
                                <div class="product-image">
                                    <a href="<?php the_permalink(); ?>">
                                        <?php if ( has_post_thumbnail() ) : ?>
                                            <?php the_post_thumbnail( 'ezhomes-product' ); ?>
                                        <?php else : ?>
                                            <img src="<?php echo esc_url( wc_placeholder_img_src( 'ezhomes-product' ) ); ?>" alt="<?php the_title_attribute(); ?>">
                                        <?php endif; ?>
                                    </a>
                                    
                                    <?php if ( $product->is_on_sale() ) : ?>
                                        <span class="product-badge"><?php esc_html_e( 'Sale', 'ezhomes' ); ?></span>
                                    <?php endif; ?>
                                </div>
                                
                                <div class="product-info">
                                    <h3 class="product-title">
                                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                    </h3>
                                    
                                    <div class="product-price">
                                        <?php if ( $product->is_on_sale() ) : ?>
                                            <span class="original"><?php echo $product->get_regular_price() ? wc_price( $product->get_regular_price() ) : ''; ?></span>
                                        <?php endif; ?>
                                        <span class="current"><?php echo $product->get_price_html(); ?></span>
                                    </div>
                                    
                                    <div class="product-meta">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <rect x="1" y="3" width="15" height="13"></rect>
                                                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                                <circle cx="18.5" cy="18.5" r="2.5"></circle>
                                            </svg>
                                            <?php esc_html_e( 'Free Shipping', 'ezhomes' ); ?>
                                        </span>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                            <?php esc_html_e( '10-min assembly', 'ezhomes' ); ?>
                                        </span>
                                    </div>
                                </div>
                            </article>
                        <?php endwhile; ?>
                    </div>
                    
                    <div class="text-center" style="margin-top: var(--spacing-2xl);">
                        <a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="btn btn-primary btn-lg">
                            <?php esc_html_e( 'View All Products', 'ezhomes' ); ?>
                        </a>
                    </div>
                    
                <?php wp_reset_postdata(); endif; ?>
            <?php else : ?>
                <p class="text-center"><?php esc_html_e( 'Please install and activate WooCommerce to display products.', 'ezhomes' ); ?></p>
            <?php endif; ?>
        </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="how-it-works section">
        <div class="container">
            <header class="section-header">
                <h2><?php esc_html_e( 'How It Works', 'ezhomes' ); ?></h2>
                <p><?php esc_html_e( 'From order to lounging in 3 simple steps', 'ezhomes' ); ?></p>
            </header>
            
            <div class="steps-grid">
                <div class="step-card">
                    <span class="step-number">1</span>
                    <h3><?php esc_html_e( 'Order Online', 'ezhomes' ); ?></h3>
                    <p><?php esc_html_e( 'Choose your perfect sofa and we\'ll ship it directly to your door in a compact, manageable box.', 'ezhomes' ); ?></p>
                </div>
                
                <div class="step-card">
                    <span class="step-number">2</span>
                    <h3><?php esc_html_e( 'Easy Delivery', 'ezhomes' ); ?></h3>
                    <p><?php esc_html_e( 'Our compression technology means your sofa arrives in a box small enough to fit through any door.', 'ezhomes' ); ?></p>
                </div>
                
                <div class="step-card">
                    <span class="step-number">3</span>
                    <h3><?php esc_html_e( 'Quick Assembly', 'ezhomes' ); ?></h3>
                    <p><?php esc_html_e( 'Unbox, unfold, and enjoy. No tools required. Your sofa is ready in under 10 minutes.', 'ezhomes' ); ?></p>
                </div>
            </div>
        </div>
    </section>

    <!-- Trust Section -->
    <?php echo do_shortcode( '[trust_bar]' ); ?>

    <!-- Newsletter Section -->
    <section class="newsletter-section section">
        <div class="container">
            <div class="newsletter-inner">
                <h2><?php esc_html_e( 'Join the ezhomes Family', 'ezhomes' ); ?></h2>
                <p><?php esc_html_e( 'Subscribe for exclusive offers, styling tips, and early access to new arrivals.', 'ezhomes' ); ?></p>
                
                <form class="newsletter-form" action="#" method="post">
                    <input type="email" name="email" placeholder="<?php esc_attr_e( 'Enter your email', 'ezhomes' ); ?>" required>
                    <button type="submit" class="btn btn-primary">
                        <?php esc_html_e( 'Subscribe', 'ezhomes' ); ?>
                    </button>
                </form>
                
                <p style="font-size: 0.75rem; color: hsl(var(--color-muted-foreground)); margin-top: var(--spacing-md);">
                    <?php esc_html_e( 'By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.', 'ezhomes' ); ?>
                </p>
            </div>
        </div>
    </section>

</main>

<?php
get_footer();
