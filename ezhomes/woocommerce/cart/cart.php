<?php
/**
 * Cart Page Template - ezhomes
 *
 * @package ezhomes
 */

defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_before_cart' );
?>

<div class="ezhomes-cart-page">
    <div class="container">
        <h1 class="cart-title">Your Cart</h1>
        
        <?php if ( WC()->cart->is_empty() ) : ?>
            
            <div class="cart-empty">
                <div class="empty-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                </div>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="btn-shop">
                    Continue Shopping
                </a>
            </div>
            
        <?php else : ?>
            
            <div class="cart-layout">
                <!-- Cart Items -->
                <div class="cart-items-section">
                    <form class="woocommerce-cart-form" action="<?php echo esc_url( wc_get_cart_url() ); ?>" method="post">
                        <?php do_action( 'woocommerce_before_cart_table' ); ?>
                        
                        <div class="cart-items">
                            <?php
                            foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) :
                                $_product   = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
                                $product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );
                                
                                if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters( 'woocommerce_cart_item_visible', true, $cart_item, $cart_item_key ) ) :
                                    $product_permalink = apply_filters( 'woocommerce_cart_item_permalink', $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '', $cart_item, $cart_item_key );
                            ?>
                                <div class="cart-item" data-key="<?php echo esc_attr( $cart_item_key ); ?>">
                                    <!-- Product Image -->
                                    <div class="item-image">
                                        <?php
                                        $thumbnail = apply_filters( 'woocommerce_cart_item_thumbnail', $_product->get_image( 'thumbnail' ), $cart_item, $cart_item_key );
                                        if ( $product_permalink ) {
                                            echo '<a href="' . esc_url( $product_permalink ) . '">' . $thumbnail . '</a>';
                                        } else {
                                            echo $thumbnail;
                                        }
                                        ?>
                                    </div>
                                    
                                    <!-- Product Details -->
                                    <div class="item-details">
                                        <h3 class="item-name">
                                            <?php
                                            if ( $product_permalink ) {
                                                echo '<a href="' . esc_url( $product_permalink ) . '">' . wp_kses_post( $_product->get_name() ) . '</a>';
                                            } else {
                                                echo wp_kses_post( $_product->get_name() );
                                            }
                                            ?>
                                        </h3>
                                        
                                        <?php
                                        // Show variation data
                                        echo wc_get_formatted_cart_item_data( $cart_item );
                                        ?>
                                        
                                        <div class="item-price">
                                            <?php echo apply_filters( 'woocommerce_cart_item_price', WC()->cart->get_product_price( $_product ), $cart_item, $cart_item_key ); ?>
                                        </div>
                                        
                                        <!-- Mobile: Remove button -->
                                        <div class="item-remove-mobile">
                                            <?php
                                            echo apply_filters(
                                                'woocommerce_cart_item_remove_link',
                                                sprintf(
                                                    '<a href="%s" class="remove-link" aria-label="%s" data-product_id="%s" data-product_sku="%s">Remove</a>',
                                                    esc_url( wc_get_cart_remove_url( $cart_item_key ) ),
                                                    esc_html__( 'Remove this item', 'woocommerce' ),
                                                    esc_attr( $product_id ),
                                                    esc_attr( $_product->get_sku() )
                                                ),
                                                $cart_item_key
                                            );
                                            ?>
                                        </div>
                                    </div>
                                    
                                    <!-- Quantity -->
                                    <div class="item-quantity">
                                        <?php
                                        if ( $_product->is_sold_individually() ) {
                                            $product_quantity = sprintf( '1 <input type="hidden" name="cart[%s][qty]" value="1" />', $cart_item_key );
                                        } else {
                                            $product_quantity = woocommerce_quantity_input(
                                                array(
                                                    'input_name'   => "cart[{$cart_item_key}][qty]",
                                                    'input_value'  => $cart_item['quantity'],
                                                    'max_value'    => $_product->get_max_purchase_quantity(),
                                                    'min_value'    => '0',
                                                    'product_name' => $_product->get_name(),
                                                ),
                                                $_product,
                                                false
                                            );
                                        }
                                        echo apply_filters( 'woocommerce_cart_item_quantity', $product_quantity, $cart_item_key, $cart_item );
                                        ?>
                                    </div>
                                    
                                    <!-- Subtotal -->
                                    <div class="item-subtotal">
                                        <?php echo apply_filters( 'woocommerce_cart_item_subtotal', WC()->cart->get_product_subtotal( $_product, $cart_item['quantity'] ), $cart_item, $cart_item_key ); ?>
                                    </div>
                                    
                                    <!-- Remove Button -->
                                    <div class="item-remove">
                                        <?php
                                        echo apply_filters(
                                            'woocommerce_cart_item_remove_link',
                                            sprintf(
                                                '<a href="%s" class="remove-btn" aria-label="%s" data-product_id="%s" data-product_sku="%s">&times;</a>',
                                                esc_url( wc_get_cart_remove_url( $cart_item_key ) ),
                                                esc_html__( 'Remove this item', 'woocommerce' ),
                                                esc_attr( $product_id ),
                                                esc_attr( $_product->get_sku() )
                                            ),
                                            $cart_item_key
                                        );
                                        ?>
                                    </div>
                                </div>
                            <?php
                                endif;
                            endforeach;
                            ?>
                        </div>
                        
                        <?php do_action( 'woocommerce_cart_contents' ); ?>
                        
                        <div class="cart-actions">
                            <?php if ( wc_coupons_enabled() ) : ?>
                                <div class="coupon-section">
                                    <input type="text" name="coupon_code" class="input-text coupon-input" id="coupon_code" value="" placeholder="Coupon code" />
                                    <button type="submit" class="btn-coupon" name="apply_coupon" value="<?php esc_attr_e( 'Apply coupon', 'woocommerce' ); ?>">Apply</button>
                                </div>
                            <?php endif; ?>
                            
                            <button type="submit" class="btn-update" name="update_cart" value="<?php esc_attr_e( 'Update cart', 'woocommerce' ); ?>">
                                <?php esc_html_e( 'Update cart', 'woocommerce' ); ?>
                            </button>
                            
                            <?php do_action( 'woocommerce_cart_actions' ); ?>
                            <?php wp_nonce_field( 'woocommerce-cart', 'woocommerce-cart-nonce' ); ?>
                        </div>
                        
                        <?php do_action( 'woocommerce_after_cart_contents' ); ?>
                        <?php do_action( 'woocommerce_after_cart_table' ); ?>
                    </form>
                </div>
                
                <!-- Cart Totals Sidebar -->
                <div class="cart-sidebar">
                    <div class="cart-totals-box">
                        <h3>Order Summary</h3>
                        
                        <div class="totals-row subtotal">
                            <span>Subtotal</span>
                            <span><?php wc_cart_totals_subtotal_html(); ?></span>
                        </div>
                        
                        <?php foreach ( WC()->cart->get_coupons() as $code => $coupon ) : ?>
                            <div class="totals-row coupon">
                                <span><?php wc_cart_totals_coupon_label( $coupon ); ?></span>
                                <span><?php wc_cart_totals_coupon_html( $coupon ); ?></span>
                            </div>
                        <?php endforeach; ?>
                        
                        <?php if ( WC()->cart->needs_shipping() && WC()->cart->show_shipping() ) : ?>
                            <div class="totals-row shipping">
                                <span>Shipping</span>
                                <span>
                                    <?php
                                    $shipping_total = WC()->cart->get_shipping_total();
                                    if ( $shipping_total > 0 ) {
                                        echo wc_price( $shipping_total );
                                    } else {
                                        echo '<span class="free-shipping">FREE</span>';
                                    }
                                    ?>
                                </span>
                            </div>
                        <?php endif; ?>
                        
                        <?php foreach ( WC()->cart->get_fees() as $fee ) : ?>
                            <div class="totals-row fee">
                                <span><?php echo esc_html( $fee->name ); ?></span>
                                <span><?php wc_cart_totals_fee_html( $fee ); ?></span>
                            </div>
                        <?php endforeach; ?>
                        
                        <?php if ( wc_tax_enabled() && ! WC()->cart->display_prices_including_tax() ) : ?>
                            <?php if ( 'itemized' === get_option( 'woocommerce_tax_total_display' ) ) : ?>
                                <?php foreach ( WC()->cart->get_tax_totals() as $code => $tax ) : ?>
                                    <div class="totals-row tax">
                                        <span><?php echo esc_html( $tax->label ); ?></span>
                                        <span><?php echo wp_kses_post( $tax->formatted_amount ); ?></span>
                                    </div>
                                <?php endforeach; ?>
                            <?php else : ?>
                                <div class="totals-row tax">
                                    <span><?php echo esc_html( WC()->countries->tax_or_vat() ); ?></span>
                                    <span><?php wc_cart_totals_taxes_total_html(); ?></span>
                                </div>
                            <?php endif; ?>
                        <?php endif; ?>
                        
                        <div class="totals-row total">
                            <span>Total</span>
                            <span><?php wc_cart_totals_order_total_html(); ?></span>
                        </div>
                        
                        <div class="checkout-button">
                            <?php do_action( 'woocommerce_proceed_to_checkout' ); ?>
                        </div>
                        
                        <!-- Trust Badges -->
                        <div class="cart-trust-badges">
                            <div class="trust-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                                <span>Secure Checkout</span>
                            </div>
                            <div class="trust-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="1" y="3" width="15" height="13"></rect>
                                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                                </svg>
                                <span>Free Shipping $999+</span>
                            </div>
                            <div class="trust-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="23 4 23 10 17 10"></polyline>
                                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                                </svg>
                                <span>30-Day Returns</span>
                            </div>
                        </div>
                        
                        <!-- Payment Methods -->
                        <div class="payment-methods">
                            <span>We Accept</span>
                            <div class="payment-icons">
                                <img src="https://cdn.shopify.com/s/files/1/0533/2089/files/visa.svg" alt="Visa" width="40">
                                <img src="https://cdn.shopify.com/s/files/1/0533/2089/files/mastercard.svg" alt="Mastercard" width="40">
                                <img src="https://cdn.shopify.com/s/files/1/0533/2089/files/amex.svg" alt="American Express" width="40">
                                <img src="https://cdn.shopify.com/s/files/1/0533/2089/files/afterpay.svg" alt="Afterpay" width="40">
                            </div>
                        </div>
                    </div>
                    
                    <!-- Continue Shopping -->
                    <a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="continue-shopping">
                        ← Continue Shopping
                    </a>
                </div>
            </div>
            
            <?php do_action( 'woocommerce_after_cart' ); ?>
            
        <?php endif; ?>
    </div>
</div>
