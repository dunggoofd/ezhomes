<?php
/**
 * Single Product Template
 * Matches the React ProductDetail design with all CRO features
 */

defined('ABSPATH') || exit;

get_header();

while (have_posts()) :
    the_post();
    global $product;
    
    $gallery_ids = $product->get_gallery_image_ids();
    $main_image = wp_get_attachment_url($product->get_image_id());
    $regular_price = $product->get_regular_price();
    $sale_price = $product->get_sale_price();
    $current_price = $product->get_price();
    $discount = $regular_price && $sale_price ? round((1 - $sale_price / $regular_price) * 100) : 0;
    
    // Get product attributes for variants
    $attributes = $product->get_attributes();
    
    // Get size options
    $size_options = [];
    if ($product->is_type('variable')) {
        $available_variations = $product->get_available_variations();
        foreach ($available_variations as $variation) {
            if (isset($variation['attributes']['attribute_pa_size'])) {
                $size_options[] = $variation['attributes']['attribute_pa_size'];
            }
        }
        $size_options = array_unique($size_options);
    }
    
    // Get color options
    $color_options = [];
    if ($product->is_type('variable')) {
        foreach ($available_variations as $variation) {
            if (isset($variation['attributes']['attribute_pa_color'])) {
                $color_options[] = $variation['attributes']['attribute_pa_color'];
            }
        }
        $color_options = array_unique($color_options);
    }
    
    // Delivery date calculation (2-5 business days for AU)
    $delivery_start = date('l, j M', strtotime('+2 weekdays'));
    $delivery_end = date('l, j M', strtotime('+5 weekdays'));
?>

<main class="single-product-page">
    <!-- Breadcrumb -->
    <div class="container breadcrumb-wrap">
        <a href="<?php echo esc_url(get_permalink(wc_get_page_id('shop'))); ?>" class="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Back to Shop
        </a>
    </div>

    <div class="container product-layout">
        <!-- Left: Image Gallery -->
        <div class="product-gallery">
            <!-- Thumbnails -->
            <div class="gallery-thumbnails">
                <button class="thumbnail active" data-image="<?php echo esc_url($main_image); ?>">
                    <img src="<?php echo esc_url($main_image); ?>" alt="<?php the_title_attribute(); ?>">
                </button>
                <?php foreach ($gallery_ids as $index => $gallery_id) : 
                    $gallery_url = wp_get_attachment_url($gallery_id);
                ?>
                <button class="thumbnail" data-image="<?php echo esc_url($gallery_url); ?>">
                    <img src="<?php echo esc_url($gallery_url); ?>" alt="<?php the_title_attribute(); ?> - <?php echo $index + 2; ?>">
                </button>
                <?php endforeach; ?>
            </div>

            <!-- Main Image -->
            <div class="gallery-main">
                <?php if ($discount > 0) : ?>
                <span class="discount-badge"><?php echo $discount; ?>% OFF</span>
                <?php endif; ?>
                <img id="main-product-image" src="<?php echo esc_url($main_image); ?>" alt="<?php the_title_attribute(); ?>">
                <button class="zoom-btn" aria-label="Zoom image">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                        <path d="M11 8v6"></path>
                        <path d="M8 11h6"></path>
                    </svg>
                </button>
            </div>

            <!-- Mobile Gallery Dots -->
            <div class="gallery-dots">
                <button class="gallery-dot active" data-index="0"></button>
                <?php foreach ($gallery_ids as $index => $gallery_id) : ?>
                <button class="gallery-dot" data-index="<?php echo $index + 1; ?>"></button>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- Right: Product Info -->
        <div class="product-info">
            <!-- Title & Rating -->
            <div class="product-header">
                <h1 class="product-title"><?php the_title(); ?></h1>
                <div class="product-rating">
                    <?php 
                    $rating = $product->get_average_rating();
                    $review_count = $product->get_review_count();
                    for ($i = 1; $i <= 5; $i++) :
                        $filled = $i <= floor($rating) ? 'filled' : '';
                    ?>
                    <svg class="star <?php echo $filled; ?>" width="20" height="20" viewBox="0 0 24 24">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <?php endfor; ?>
                    <a href="#reviews" class="review-count"><?php echo $review_count; ?> reviews</a>
                </div>
            </div>

            <!-- Size Selector -->
            <?php if (!empty($size_options)) : ?>
            <div class="size-selector">
                <p class="size-label">Size: <span id="selected-size"><?php echo ucfirst($size_options[0] ?? '180cm'); ?></span></p>
                <div class="size-options">
                    <?php foreach ($size_options as $index => $size) : 
                        $active = $index === 0 ? 'active' : '';
                    ?>
                    <button class="size-option <?php echo $active; ?>" data-size="<?php echo esc_attr($size); ?>">
                        <?php echo esc_html(ucfirst($size)); ?>
                    </button>
                    <?php endforeach; ?>
                </div>
            </div>
            <?php endif; ?>

            <!-- Finish/Color Selector -->
            <?php if (!empty($color_options)) : ?>
            <div class="finish-selector">
                <p class="finish-label">FINISH <span id="selected-finish"><?php echo ucfirst($color_options[0] ?? 'Select'); ?></span></p>
                <div class="finish-swatches">
                    <?php foreach ($color_options as $index => $color) : 
                        $active = $index === 0 ? 'active' : '';
                    ?>
                    <button class="finish-swatch <?php echo $active; ?>" data-color="<?php echo esc_attr($color); ?>" title="<?php echo ucfirst($color); ?>">
                        <span style="background-color: <?php echo esc_attr(ezhomes_get_color_code($color)); ?>"></span>
                    </button>
                    <?php endforeach; ?>
                </div>
            </div>
            <?php endif; ?>

            <!-- Stock Status -->
            <?php if ($product->is_in_stock()) : ?>
            <div class="stock-status in-stock">
                <span class="pulse"></span>
                <span class="status-text">
                    <?php if ($product->get_stock_quantity() && $product->get_stock_quantity() < 10) : ?>
                    Almost sold out
                    <?php else : ?>
                    In Stock
                    <?php endif; ?>
                </span>
                <span class="divider">|</span>
                <span>Ready to Ship</span>
            </div>
            <?php else : ?>
            <div class="stock-status out-of-stock">
                <span>Out of Stock</span>
            </div>
            <?php endif; ?>

            <!-- What's Included -->
            <div class="whats-included">
                <h3>WHAT'S INCLUDED</h3>
                <div class="included-items">
                    <div class="included-item">
                        <div class="item-image">
                            <img src="<?php echo esc_url($main_image); ?>" alt="<?php the_title_attribute(); ?>">
                        </div>
                        <div class="item-info">
                            <p class="item-title"><?php the_title(); ?></p>
                        </div>
                        <div class="item-price">
                            <?php if ($regular_price && $sale_price) : ?>
                            <span class="compare-price"><?php echo wc_price($regular_price); ?></span>
                            <?php endif; ?>
                            <span class="current-price"><?php echo wc_price($current_price); ?></span>
                        </div>
                    </div>
                    <div class="included-item">
                        <div class="item-image placeholder">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                            </svg>
                        </div>
                        <div class="item-info">
                            <p class="item-title">Tool-Free Assembly Kit</p>
                        </div>
                        <div class="item-price">
                            <span class="compare-price">$49</span>
                            <span class="current-price free">FREE</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Addons -->
            <?php
            $cross_sells = $product->get_cross_sell_ids();
            if (!empty($cross_sells)) :
            ?>
            <div class="product-addons">
                <div class="addons-header">
                    <h3>ADDONS:</h3>
                    <span class="addons-promo">SAVE UP TO 35% OFF ADD-ONS</span>
                </div>
                <div class="addon-items">
                    <?php foreach (array_slice($cross_sells, 0, 3) as $cross_sell_id) : 
                        $addon = wc_get_product($cross_sell_id);
                        if (!$addon) continue;
                    ?>
                    <div class="addon-item" data-product-id="<?php echo $cross_sell_id; ?>">
                        <div class="addon-image">
                            <?php echo $addon->get_image('thumbnail'); ?>
                        </div>
                        <div class="addon-info">
                            <p class="addon-title"><?php echo $addon->get_name(); ?></p>
                            <div class="addon-prices">
                                <?php if ($addon->get_regular_price() && $addon->get_sale_price()) : ?>
                                <span class="addon-compare"><?php echo wc_price($addon->get_regular_price()); ?></span>
                                <?php endif; ?>
                                <span class="addon-price"><?php echo wc_price($addon->get_price()); ?></span>
                            </div>
                        </div>
                        <div class="addon-quantity">
                            <button class="qty-btn minus">−</button>
                            <input type="number" class="addon-qty-input" value="0" min="0" max="10">
                            <button class="qty-btn plus">+</button>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
            <?php endif; ?>

            <!-- Price & Add to Cart -->
            <div class="product-purchase">
                <div class="price-display">
                    <?php if ($regular_price && $sale_price) : ?>
                    <span class="compare-at-price"><?php echo wc_price($regular_price); ?></span>
                    <?php endif; ?>
                    <span class="current-price"><?php echo wc_price($current_price); ?></span>
                    <?php if ($discount > 0) : ?>
                    <span class="savings">Save <?php echo wc_price($regular_price - $sale_price); ?></span>
                    <?php endif; ?>
                </div>

                <form class="cart" action="<?php echo esc_url(apply_filters('woocommerce_add_to_cart_form_action', $product->get_permalink())); ?>" method="post" enctype="multipart/form-data">
                    <?php do_action('woocommerce_before_add_to_cart_button'); ?>
                    
                    <input type="hidden" name="add-to-cart" value="<?php echo $product->get_id(); ?>">
                    <input type="hidden" name="quantity" value="1">
                    
                    <button type="submit" class="add-to-cart-btn" id="main-add-to-cart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        Add to Cart
                    </button>
                    
                    <?php do_action('woocommerce_after_add_to_cart_button'); ?>
                </form>

                <p class="afterpay-note">
                    or 4 interest-free payments of <?php echo wc_price($current_price / 4); ?> with 
                    <img src="https://static.afterpay.com/integration/product-page/logo-afterpay-colour.svg" alt="Afterpay" class="afterpay-logo">
                </p>
            </div>

            <!-- Trust Badges -->
            <div class="trust-badges">
                <div class="trust-badge">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="1" y="3" width="15" height="13"></rect>
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                        <circle cx="5.5" cy="18.5" r="2.5"></circle>
                        <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                    <span>Free Shipping</span>
                </div>
                <div class="trust-badge">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <span>5-Year Warranty</span>
                </div>
                <div class="trust-badge">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                    </svg>
                    <span>30-Day Returns</span>
                </div>
                <div class="trust-badge">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>10-Min Assembly</span>
                </div>
            </div>

            <!-- Delivery ETA -->
            <div class="delivery-eta">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                <div class="delivery-info">
                    <p class="delivery-title">Estimated Delivery</p>
                    <p class="delivery-date"><?php echo $delivery_start; ?> - <?php echo $delivery_end; ?></p>
                    <p class="delivery-note">Brisbane Metro: 2-3 business days</p>
                </div>
            </div>

            <!-- Payment Methods -->
            <div class="payment-methods">
                <p>Secure Payment</p>
                <div class="payment-icons">
                    <span class="payment-icon" title="Visa">VISA</span>
                    <span class="payment-icon" title="Mastercard">MC</span>
                    <span class="payment-icon" title="American Express">AMEX</span>
                    <span class="payment-icon" title="Apple Pay">
                        <svg width="40" height="16" viewBox="0 0 40 16"><text x="0" y="12" font-size="10" fill="currentColor">Pay</text></svg>
                    </span>
                    <span class="payment-icon" title="Google Pay">GPay</span>
                    <span class="payment-icon" title="PayPal">PayPal</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Product Tabs / Accordion -->
    <div class="container product-details-section">
        <div class="product-tabs">
            <button class="tab-btn active" data-tab="dimensions">Dimensions</button>
            <button class="tab-btn" data-tab="materials">Materials & Care</button>
            <button class="tab-btn" data-tab="weight">Weight & Support</button>
        </div>

        <div class="tab-content active" id="tab-dimensions">
            <div class="dimensions-grid">
                <div class="dimension-item">
                    <span class="dimension-label">Width</span>
                    <span class="dimension-value"><?php echo get_post_meta($product->get_id(), '_width', true) ?: '180cm'; ?></span>
                </div>
                <div class="dimension-item">
                    <span class="dimension-label">Depth</span>
                    <span class="dimension-value"><?php echo get_post_meta($product->get_id(), '_depth', true) ?: '95cm'; ?></span>
                </div>
                <div class="dimension-item">
                    <span class="dimension-label">Height</span>
                    <span class="dimension-value"><?php echo get_post_meta($product->get_id(), '_height', true) ?: '85cm'; ?></span>
                </div>
                <div class="dimension-item">
                    <span class="dimension-label">Seat Height</span>
                    <span class="dimension-value"><?php echo get_post_meta($product->get_id(), '_seat_height', true) ?: '45cm'; ?></span>
                </div>
            </div>
        </div>

        <div class="tab-content" id="tab-materials">
            <div class="materials-info">
                <h4>Upholstery</h4>
                <p><?php echo get_post_meta($product->get_id(), '_upholstery', true) ?: 'Premium linen-blend fabric, soft to touch with high durability rating'; ?></p>
                
                <h4>Frame</h4>
                <p><?php echo get_post_meta($product->get_id(), '_frame', true) ?: 'Solid timber frame with reinforced steel brackets'; ?></p>
                
                <h4>Care Instructions</h4>
                <ul>
                    <li>Vacuum regularly with upholstery attachment</li>
                    <li>Spot clean with mild detergent</li>
                    <li>Professional cleaning recommended annually</li>
                    <li>Keep away from direct sunlight to prevent fading</li>
                </ul>
            </div>
        </div>

        <div class="tab-content" id="tab-weight">
            <div class="weight-info">
                <div class="weight-item">
                    <span class="weight-label">Product Weight</span>
                    <span class="weight-value"><?php echo $product->get_weight() ? $product->get_weight() . 'kg' : '45kg'; ?></span>
                </div>
                <div class="weight-item">
                    <span class="weight-label">Max Load Capacity</span>
                    <span class="weight-value"><?php echo get_post_meta($product->get_id(), '_max_load', true) ?: '350kg'; ?></span>
                </div>
                <div class="weight-item">
                    <span class="weight-label">Seating Capacity</span>
                    <span class="weight-value"><?php echo get_post_meta($product->get_id(), '_seating_capacity', true) ?: '3 people'; ?></span>
                </div>
            </div>
        </div>
    </div>

    <!-- Reviews Section -->
    <div class="container reviews-section" id="reviews">
        <div class="reviews-header">
            <h2>Customer Reviews</h2>
            <div class="reviews-summary">
                <div class="rating-large">
                    <span class="rating-number"><?php echo number_format($rating, 1); ?></span>
                    <div class="rating-stars">
                        <?php for ($i = 1; $i <= 5; $i++) :
                            $filled = $i <= floor($rating) ? 'filled' : '';
                        ?>
                        <svg class="star <?php echo $filled; ?>" width="16" height="16" viewBox="0 0 24 24">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <?php endfor; ?>
                    </div>
                    <span class="review-total">Based on <?php echo $review_count; ?> reviews</span>
                </div>
            </div>
        </div>

        <div class="reviews-list">
            <?php
            $comments = get_comments(array(
                'post_id' => $product->get_id(),
                'status' => 'approve',
                'number' => 5,
            ));
            
            if (!empty($comments)) :
                foreach ($comments as $comment) :
                    $comment_rating = get_comment_meta($comment->comment_ID, 'rating', true);
            ?>
            <div class="review-card">
                <div class="review-header">
                    <div class="reviewer-info">
                        <span class="reviewer-name"><?php echo esc_html($comment->comment_author); ?></span>
                        <span class="review-date"><?php echo date('M j, Y', strtotime($comment->comment_date)); ?></span>
                    </div>
                    <div class="review-rating">
                        <?php for ($i = 1; $i <= 5; $i++) :
                            $filled = $i <= $comment_rating ? 'filled' : '';
                        ?>
                        <svg class="star <?php echo $filled; ?>" width="14" height="14" viewBox="0 0 24 24">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <?php endfor; ?>
                    </div>
                </div>
                <p class="review-text"><?php echo esc_html($comment->comment_content); ?></p>
                <?php if (get_comment_meta($comment->comment_ID, 'verified', true)) : ?>
                <span class="verified-badge">✓ Verified Purchase</span>
                <?php endif; ?>
            </div>
            <?php 
                endforeach;
            else :
            ?>
            <div class="no-reviews">
                <p>No reviews yet. Be the first to review this product!</p>
            </div>
            <?php endif; ?>
        </div>

        <?php if (comments_open()) : ?>
        <a href="#review_form" class="btn btn-outline write-review-btn">Write a Review</a>
        <?php endif; ?>
    </div>

    <!-- Related Products -->
    <?php
    $related_ids = wc_get_related_products($product->get_id(), 4);
    if (!empty($related_ids)) :
    ?>
    <div class="container related-products-section">
        <h2>You May Also Like</h2>
        <div class="products-grid">
            <?php foreach ($related_ids as $related_id) : 
                $related = wc_get_product($related_id);
                if (!$related) continue;
            ?>
            <a href="<?php echo get_permalink($related_id); ?>" class="product-card">
                <div class="product-image">
                    <?php echo $related->get_image('ezhomes-product'); ?>
                </div>
                <div class="product-info">
                    <h3 class="product-title"><?php echo $related->get_name(); ?></h3>
                    <div class="product-price">
                        <?php echo $related->get_price_html(); ?>
                    </div>
                </div>
            </a>
            <?php endforeach; ?>
        </div>
    </div>
    <?php endif; ?>

</main>

<!-- Sticky Add to Cart (Mobile) -->
<div class="sticky-add-to-cart" id="sticky-atc">
    <div class="sticky-product-info">
        <span class="sticky-title"><?php echo wp_trim_words(get_the_title(), 4); ?></span>
        <span class="sticky-price"><?php echo wc_price($current_price); ?></span>
    </div>
    <button class="sticky-add-btn" onclick="document.getElementById('main-add-to-cart').click()">
        Add to Cart
    </button>
</div>

<style>
/* Additional Product Page Styles */
.size-selector {
    background: var(--ez-surface, #f9fafb);
    border-radius: var(--radius-lg, 12px);
    padding: var(--spacing-lg, 1.5rem);
}

.size-label {
    font-size: 0.875rem;
    color: var(--ez-foreground-muted, #6b7280);
    margin-bottom: 0.75rem;
}

.size-label span {
    color: var(--ez-foreground, #1a1a1a);
    font-weight: 500;
}

.size-options {
    display: flex;
    gap: 0.75rem;
}

.size-option {
    padding: 0.75rem 1.5rem;
    border: 2px solid var(--ez-border, #e5e7eb);
    border-radius: var(--radius-md, 8px);
    font-weight: 500;
    color: var(--ez-foreground-muted, #6b7280);
    background: var(--ez-background, #fff);
    cursor: pointer;
    transition: all 0.2s ease;
}

.size-option:hover {
    border-color: var(--ez-foreground-muted, #6b7280);
}

.size-option.active {
    border-color: var(--ez-primary, #c9a55c);
    color: var(--ez-foreground, #1a1a1a);
    background: rgba(201, 165, 92, 0.05);
}

.trust-badges {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    padding: var(--spacing-lg, 1.5rem) 0;
    border-top: 1px solid var(--ez-border, #e5e7eb);
}

.trust-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--ez-foreground-muted, #6b7280);
}

.trust-badge svg {
    color: var(--ez-primary, #c9a55c);
    flex-shrink: 0;
}

.delivery-eta {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: var(--spacing-md, 1rem);
    background: var(--ez-surface, #f9fafb);
    border-radius: var(--radius-lg, 12px);
    margin: var(--spacing-md, 1rem) 0;
}

.delivery-eta svg {
    color: var(--ez-success, #16a34a);
    flex-shrink: 0;
    margin-top: 2px;
}

.delivery-title {
    font-size: 0.75rem;
    color: var(--ez-foreground-muted, #6b7280);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 0.25rem;
}

.delivery-date {
    font-weight: 600;
    color: var(--ez-foreground, #1a1a1a);
    margin: 0 0 0.25rem;
}

.delivery-note {
    font-size: 0.75rem;
    color: var(--ez-foreground-muted, #6b7280);
    margin: 0;
}

.payment-methods {
    text-align: center;
    padding: var(--spacing-md, 1rem) 0;
}

.payment-methods p {
    font-size: 0.75rem;
    color: var(--ez-foreground-muted, #6b7280);
    margin-bottom: 0.5rem;
}

.payment-icons {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.payment-icon {
    font-size: 0.625rem;
    padding: 0.25rem 0.5rem;
    background: var(--ez-surface, #f9fafb);
    border-radius: 4px;
    color: var(--ez-foreground-muted, #6b7280);
}

.afterpay-logo {
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 4px;
}

.add-to-cart-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.add-to-cart-btn svg {
    flex-shrink: 0;
}

.item-image.placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--ez-surface, #f9fafb);
}

.item-image.placeholder svg {
    color: var(--ez-foreground-muted, #6b7280);
}

/* Product Tabs */
.product-details-section {
    padding: var(--spacing-3xl, 4rem) 0;
    border-top: 1px solid var(--ez-border, #e5e7eb);
}

.product-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: var(--spacing-xl, 2rem);
    border-bottom: 1px solid var(--ez-border, #e5e7eb);
}

.tab-btn {
    padding: 1rem 1.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--ez-foreground-muted, #6b7280);
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: -1px;
}

.tab-btn:hover {
    color: var(--ez-foreground, #1a1a1a);
}

.tab-btn.active {
    color: var(--ez-foreground, #1a1a1a);
    border-bottom-color: var(--ez-primary, #c9a55c);
}

.tab-content {
    display: none;
}

.tab-content.active {
    display: block;
}

.dimensions-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

@media (min-width: 768px) {
    .dimensions-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

.dimension-item,
.weight-item {
    padding: 1rem;
    background: var(--ez-surface, #f9fafb);
    border-radius: var(--radius-md, 8px);
    text-align: center;
}

.dimension-label,
.weight-label {
    display: block;
    font-size: 0.75rem;
    color: var(--ez-foreground-muted, #6b7280);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
}

.dimension-value,
.weight-value {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--ez-foreground, #1a1a1a);
}

.materials-info h4 {
    font-size: 1rem;
    margin: 1.5rem 0 0.5rem;
}

.materials-info h4:first-child {
    margin-top: 0;
}

.materials-info ul {
    list-style: disc;
    padding-left: 1.5rem;
    color: var(--ez-foreground-muted, #6b7280);
}

.materials-info li {
    margin-bottom: 0.5rem;
}

.weight-info {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

/* Reviews */
.reviews-section {
    padding: var(--spacing-3xl, 4rem) 0;
    border-top: 1px solid var(--ez-border, #e5e7eb);
}

.reviews-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-xl, 2rem);
    flex-wrap: wrap;
    gap: 1rem;
}

.reviews-header h2 {
    margin: 0;
}

.rating-large {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.rating-number {
    font-size: 2rem;
    font-weight: 700;
    color: var(--ez-foreground, #1a1a1a);
}

.rating-stars {
    display: flex;
    gap: 2px;
}

.rating-stars .star {
    fill: var(--ez-border, #e5e7eb);
    stroke: var(--ez-border, #e5e7eb);
}

.rating-stars .star.filled {
    fill: var(--ez-primary, #c9a55c);
    stroke: var(--ez-primary, #c9a55c);
}

.review-total {
    font-size: 0.875rem;
    color: var(--ez-foreground-muted, #6b7280);
}

.reviews-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: var(--spacing-xl, 2rem);
}

.review-card {
    padding: var(--spacing-lg, 1.5rem);
    background: var(--ez-surface, #f9fafb);
    border-radius: var(--radius-lg, 12px);
}

.review-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.75rem;
}

.reviewer-name {
    font-weight: 600;
    color: var(--ez-foreground, #1a1a1a);
}

.review-date {
    font-size: 0.75rem;
    color: var(--ez-foreground-muted, #6b7280);
    display: block;
    margin-top: 0.25rem;
}

.review-rating .star {
    fill: var(--ez-border, #e5e7eb);
    stroke: var(--ez-border, #e5e7eb);
}

.review-rating .star.filled {
    fill: var(--ez-primary, #c9a55c);
    stroke: var(--ez-primary, #c9a55c);
}

.review-text {
    color: var(--ez-foreground-muted, #6b7280);
    line-height: 1.6;
    margin: 0;
}

.verified-badge {
    display: inline-block;
    margin-top: 0.75rem;
    font-size: 0.75rem;
    color: var(--ez-success, #16a34a);
}

.write-review-btn {
    display: inline-flex;
}

.no-reviews {
    text-align: center;
    padding: var(--spacing-2xl, 3rem);
    color: var(--ez-foreground-muted, #6b7280);
}

/* Related Products */
.related-products-section {
    padding: var(--spacing-3xl, 4rem) 0;
    border-top: 1px solid var(--ez-border, #e5e7eb);
}

.related-products-section h2 {
    text-align: center;
    margin-bottom: var(--spacing-xl, 2rem);
}

/* Sticky Add to Cart */
.sticky-add-to-cart {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--ez-background, #fff);
    border-top: 1px solid var(--ez-border, #e5e7eb);
    padding: 0.75rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
    transform: translateY(100%);
    transition: transform 0.3s ease;
    box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1);
}

.sticky-add-to-cart.visible {
    transform: translateY(0);
}

@media (min-width: 1024px) {
    .sticky-add-to-cart {
        display: none;
    }
}

.sticky-product-info {
    display: flex;
    flex-direction: column;
}

.sticky-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--ez-foreground, #1a1a1a);
}

.sticky-price {
    font-size: 1rem;
    font-weight: 700;
    color: var(--ez-foreground, #1a1a1a);
}

.sticky-add-btn {
    background: var(--ez-foreground, #1a1a1a);
    color: var(--ez-background, #fff);
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-md, 8px);
    font-weight: 600;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: none;
    cursor: pointer;
}

/* Mobile Gallery Dots */
.gallery-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem 0;
}

@media (min-width: 768px) {
    .gallery-dots {
        display: none;
    }
}

.gallery-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--ez-border, #e5e7eb);
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all 0.2s ease;
}

.gallery-dot.active {
    background: var(--ez-primary, #c9a55c);
    width: 24px;
    border-radius: 4px;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Gallery thumbnail clicks
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    const galleryDots = document.querySelectorAll('.gallery-dot');
    
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            galleryDots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
            if (galleryDots[index]) galleryDots[index].classList.add('active');
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.src = this.dataset.image;
                mainImage.style.opacity = '1';
            }, 150);
        });
    });

    galleryDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            if (thumbnails[index]) thumbnails[index].click();
        });
    });

    // Size selector
    const sizeOptions = document.querySelectorAll('.size-option');
    const selectedSize = document.getElementById('selected-size');
    
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            if (selectedSize) {
                selectedSize.textContent = this.dataset.size;
            }
        });
    });

    // Finish swatch clicks
    const swatches = document.querySelectorAll('.finish-swatch');
    const selectedFinish = document.getElementById('selected-finish');
    
    swatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            swatches.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            if (selectedFinish) {
                selectedFinish.textContent = this.dataset.color.charAt(0).toUpperCase() + this.dataset.color.slice(1);
            }
        });
    });

    // Addon quantity controls
    document.querySelectorAll('.addon-item').forEach(item => {
        const minusBtn = item.querySelector('.minus');
        const plusBtn = item.querySelector('.plus');
        const input = item.querySelector('.addon-qty-input');

        minusBtn.addEventListener('click', () => {
            const val = parseInt(input.value) || 0;
            input.value = Math.max(0, val - 1);
        });

        plusBtn.addEventListener('click', () => {
            const val = parseInt(input.value) || 0;
            input.value = Math.min(10, val + 1);
        });
    });

    // Product tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById('tab-' + tabId).classList.add('active');
        });
    });

    // Sticky Add to Cart
    const mainAddToCart = document.getElementById('main-add-to-cart');
    const stickyBar = document.getElementById('sticky-atc');

    if (mainAddToCart && stickyBar) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stickyBar.classList.remove('visible');
                } else {
                    stickyBar.classList.add('visible');
                }
            });
        }, { threshold: 0 });

        observer.observe(mainAddToCart);
    }
});
</script>

<?php endwhile; ?>

<?php get_footer(); ?>
