<?php
/**
 * Shop Archive Template
 * Matches the React Shop page design with promo banner, category filters, and product grid
 */

defined('ABSPATH') || exit;

get_header();

// Get product categories
$categories = get_terms([
    'taxonomy' => 'product_cat',
    'hide_empty' => true,
    'parent' => 0,
]);
?>

<!-- Promo Banner -->
<div class="promo-banner">
    <div class="container">
        <p>
            Enjoy <span class="highlight">35% OFF</span> for a limited time — 
            <span class="highlight">Order now</span> for delivery before Christmas!
        </p>
    </div>
</div>

<main class="shop-page">
    <div class="container section">
        
        <!-- Category Filters -->
        <div class="category-filters">
            <?php foreach ($categories as $category) : ?>
            <a href="<?php echo esc_url(get_term_link($category)); ?>" 
               class="category-pill <?php echo is_product_category($category->slug) ? 'active' : ''; ?>">
                <?php echo esc_html($category->name); ?>
            </a>
            <?php endforeach; ?>
            <a href="<?php echo esc_url(get_permalink(wc_get_page_id('shop'))); ?>" 
               class="category-pill <?php echo is_shop() && !is_product_category() ? 'active' : ''; ?>">
                All Products
            </a>
        </div>

        <!-- Products Grid -->
        <?php if (woocommerce_product_loop()) : ?>
        
        <div class="products-grid">
            <?php
            while (have_posts()) :
                the_post();
                global $product;
                
                $gallery_ids = $product->get_gallery_image_ids();
                $main_image = wp_get_attachment_url($product->get_image_id());
                $regular_price = $product->get_regular_price();
                $sale_price = $product->get_sale_price();
                $discount = $regular_price && $sale_price ? round((1 - $sale_price / $regular_price) * 100) : 0;
                $rating = $product->get_average_rating();
                $review_count = $product->get_review_count();
                $monthly = $product->get_price() / 36;
                
                // Get color variations
                $color_variations = [];
                if ($product->is_type('variable')) {
                    $variations = $product->get_available_variations();
                    foreach ($variations as $variation) {
                        if (isset($variation['attributes']['attribute_pa_color'])) {
                            $color = $variation['attributes']['attribute_pa_color'];
                            if (!in_array($color, array_column($color_variations, 'color'))) {
                                $color_variations[] = [
                                    'color' => $color,
                                    'code' => ezhomes_get_color_code($color),
                                ];
                            }
                        }
                    }
                }
            ?>
            
            <a href="<?php the_permalink(); ?>" class="product-card">
                <!-- Image Container -->
                <div class="product-card-image">
                    <img src="<?php echo esc_url($main_image); ?>" 
                         alt="<?php the_title_attribute(); ?>"
                         loading="lazy">
                    
                    <!-- Badges -->
                    <div class="product-badges">
                        <?php if ($product->is_on_sale()) : ?>
                        <span class="product-badge sale">Summer Sale</span>
                        <?php endif; ?>
                        
                        <?php if ($discount > 0) : ?>
                        <span class="product-badge discount"><?php echo $discount; ?>% OFF</span>
                        <?php endif; ?>
                        
                        <?php 
                        // New product badge (within last 30 days)
                        $created = strtotime($product->get_date_created());
                        if ($created && (time() - $created) < (30 * DAY_IN_SECONDS)) :
                        ?>
                        <span class="product-badge new">New</span>
                        <?php endif; ?>
                    </div>

                    <!-- Quick Add Overlay -->
                    <div class="quick-add-overlay">
                        <button type="button" class="quick-add-btn ajax-add-to-cart" 
                                data-quick-add="<?php echo $product->get_id(); ?>"
                                data-product-id="<?php echo $product->get_id(); ?>"
                                data-product-type="<?php echo $product->get_type(); ?>"
                                onclick="event.preventDefault(); event.stopPropagation();">
                            Quick Add
                        </button>
                    </div>
                </div>

                <!-- Product Info -->
                <div class="product-card-info">
                    <!-- Color Swatches -->
                    <?php if (!empty($color_variations)) : ?>
                    <div class="product-card-swatches">
                        <?php foreach (array_slice($color_variations, 0, 6) as $color) : ?>
                        <span class="product-card-swatch" 
                              style="background-color: <?php echo esc_attr($color['code']); ?>"
                              title="<?php echo esc_attr(ucfirst($color['color'])); ?>">
                        </span>
                        <?php endforeach; ?>
                    </div>
                    <?php endif; ?>

                    <!-- Title & Price -->
                    <div class="product-card-header">
                        <h3 class="product-card-title"><?php the_title(); ?></h3>
                        <div class="product-card-price">
                            <?php if ($regular_price && $sale_price) : ?>
                            <span class="compare"><?php echo wc_price($regular_price); ?></span>
                            <?php endif; ?>
                            <span class="current"><?php echo wc_price($product->get_price()); ?></span>
                        </div>
                    </div>

                    <!-- Rating -->
                    <?php if ($rating > 0) : ?>
                    <div class="product-card-rating">
                        <div class="stars">
                            <?php for ($i = 1; $i <= 5; $i++) : 
                                $filled = $i <= floor($rating) ? 'filled' : '';
                            ?>
                            <svg class="<?php echo $filled; ?>" width="14" height="14" viewBox="0 0 24 24">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <?php endfor; ?>
                        </div>
                        <span class="count"><?php echo number_format($review_count); ?> reviews</span>
                    </div>
                    <?php endif; ?>

                    <!-- Monthly Payment -->
                    <p class="product-card-monthly">
                        $<?php echo number_format($monthly, 2); ?> /mo
                    </p>
                </div>
            </a>
            
            <?php endwhile; ?>
        </div>

        <!-- Pagination -->
        <div class="shop-pagination">
            <?php
            echo paginate_links([
                'prev_text' => '← Previous',
                'next_text' => 'Next →',
            ]);
            ?>
        </div>

        <?php else : ?>
        
        <div class="products-empty">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <h3>No products found</h3>
            <p>Try adjusting your filters or browse all products.</p>
            <a href="<?php echo esc_url(get_permalink(wc_get_page_id('shop'))); ?>" class="btn btn-primary">
                View All Products
            </a>
        </div>

        <?php endif; ?>
    </div>
</main>

<?php get_footer(); ?>
