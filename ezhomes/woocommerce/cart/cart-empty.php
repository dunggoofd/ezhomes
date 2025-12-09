<?php
/**
 * Empty Cart Page Template - ezhomes
 *
 * @package ezhomes
 */

defined( 'ABSPATH' ) || exit;
?>

<div class="ezhomes-cart-empty">
    <div class="empty-cart-content">
        <div class="empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
        </div>
        
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.<br>Discover our space-saving furniture collection.</p>
        
        <?php if ( wc_get_page_id( 'shop' ) > 0 ) : ?>
            <a class="btn-shop" href="<?php echo esc_url( apply_filters( 'woocommerce_return_to_shop_redirect', wc_get_page_permalink( 'shop' ) ) ); ?>">
                <?php esc_html_e( 'Start Shopping', 'woocommerce' ); ?>
            </a>
        <?php endif; ?>
        
        <!-- Featured Products Suggestion -->
        <div class="suggested-products">
            <h3>Popular Picks</h3>
            <div class="products-row">
                <?php
                $args = array(
                    'post_type'      => 'product',
                    'posts_per_page' => 3,
                    'meta_key'       => 'total_sales',
                    'orderby'        => 'meta_value_num',
                    'order'          => 'DESC',
                );
                $products = new WP_Query( $args );
                
                if ( $products->have_posts() ) :
                    while ( $products->have_posts() ) : $products->the_post();
                        global $product;
                ?>
                    <a href="<?php the_permalink(); ?>" class="suggested-product">
                        <?php echo $product->get_image( 'thumbnail' ); ?>
                        <span class="product-name"><?php the_title(); ?></span>
                        <span class="product-price"><?php echo $product->get_price_html(); ?></span>
                    </a>
                <?php
                    endwhile;
                    wp_reset_postdata();
                endif;
                ?>
            </div>
        </div>
        
    </div>
</div>

<?php do_action( 'woocommerce_cart_is_empty' ); ?>
