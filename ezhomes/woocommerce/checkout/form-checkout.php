<?php
/**
 * Checkout Form Template - ezhomes
 *
 * @package ezhomes
 */

defined( 'ABSPATH' ) || exit;

// Check if cart is empty
if ( ! $checkout ) {
    return;
}

do_action( 'woocommerce_before_checkout_form', $checkout );

// If checkout registration is disabled and not logged in, the user cannot checkout.
if ( ! $checkout->is_registration_enabled() && $checkout->is_registration_required() && ! is_user_logged_in() ) {
    echo esc_html( apply_filters( 'woocommerce_checkout_must_be_logged_in_message', __( 'You must be logged in to checkout.', 'woocommerce' ) ) );
    return;
}
?>

<div class="ezhomes-checkout-page">
    <div class="container">
        
        <!-- Progress Indicator -->
        <div class="checkout-progress">
            <div class="progress-step completed">
                <span class="step-number">1</span>
                <span class="step-label">Cart</span>
            </div>
            <div class="progress-line active"></div>
            <div class="progress-step active">
                <span class="step-number">2</span>
                <span class="step-label">Checkout</span>
            </div>
            <div class="progress-line"></div>
            <div class="progress-step">
                <span class="step-number">3</span>
                <span class="step-label">Confirmation</span>
            </div>
        </div>
        
        <form name="checkout" method="post" class="checkout woocommerce-checkout" action="<?php echo esc_url( wc_get_checkout_url() ); ?>" enctype="multipart/form-data">
            
            <div class="checkout-layout">
                
                <!-- Left Column: Customer Details -->
                <div class="checkout-main">
                    
                    <!-- Express Checkout -->
                    <div class="express-checkout">
                        <h3>Express Checkout</h3>
                        <div class="express-buttons">
                            <?php do_action( 'woocommerce_checkout_before_customer_details' ); ?>
                        </div>
                        <div class="express-divider">
                            <span>or continue below</span>
                        </div>
                    </div>
                    
                    <?php if ( $checkout->get_checkout_fields() ) : ?>
                        
                        <!-- Contact Information -->
                        <div class="checkout-section">
                            <h3>Contact Information</h3>
                            <?php if ( ! is_user_logged_in() && $checkout->is_registration_enabled() ) : ?>
                                <p class="login-prompt">
                                    Already have an account? 
                                    <a href="<?php echo esc_url( wc_get_page_permalink( 'myaccount' ) ); ?>">Log in</a>
                                </p>
                            <?php endif; ?>
                            
                            <div class="form-row-email">
                                <?php woocommerce_form_field( 'billing_email', array(
                                    'type'        => 'email',
                                    'label'       => __( 'Email address', 'woocommerce' ),
                                    'required'    => true,
                                    'class'       => array( 'form-row-wide' ),
                                    'input_class' => array( 'ezhomes-input' ),
                                    'placeholder' => 'your@email.com',
                                ), $checkout->get_value( 'billing_email' ) ); ?>
                            </div>
                            
                            <div class="form-row-phone">
                                <?php woocommerce_form_field( 'billing_phone', array(
                                    'type'        => 'tel',
                                    'label'       => __( 'Phone', 'woocommerce' ),
                                    'required'    => true,
                                    'class'       => array( 'form-row-wide' ),
                                    'input_class' => array( 'ezhomes-input' ),
                                    'placeholder' => '04XX XXX XXX',
                                ), $checkout->get_value( 'billing_phone' ) ); ?>
                            </div>
                        </div>
                        
                        <!-- Shipping Address -->
                        <div class="checkout-section">
                            <h3>Shipping Address</h3>
                            
                            <div id="customer_details">
                                <div class="woocommerce-billing-fields">
                                    <?php do_action( 'woocommerce_before_checkout_billing_form', $checkout ); ?>
                                    
                                    <div class="woocommerce-billing-fields__field-wrapper">
                                        <?php
                                        $fields = $checkout->get_checkout_fields( 'billing' );
                                        
                                        // Remove email and phone as we've already added them
                                        unset( $fields['billing_email'] );
                                        unset( $fields['billing_phone'] );
                                        
                                        foreach ( $fields as $key => $field ) {
                                            $field['input_class'] = array( 'ezhomes-input' );
                                            woocommerce_form_field( $key, $field, $checkout->get_value( $key ) );
                                        }
                                        ?>
                                    </div>
                                    
                                    <?php do_action( 'woocommerce_after_checkout_billing_form', $checkout ); ?>
                                </div>
                                
                                <?php if ( ! wc_ship_to_billing_address_only() && wc_shipping_enabled() ) : ?>
                                    <div class="woocommerce-shipping-fields">
                                        <?php do_action( 'woocommerce_before_checkout_shipping_form', $checkout ); ?>
                                        
                                        <div class="ship-to-different">
                                            <label class="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox">
                                                <input id="ship-to-different-address-checkbox" class="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox" <?php checked( apply_filters( 'woocommerce_ship_to_different_address_checked', 'shipping' === get_option( 'woocommerce_ship_to_destination' ) ? 1 : 0 ), 1 ); ?> type="checkbox" name="ship_to_different_address" value="1" />
                                                <span><?php esc_html_e( 'Ship to a different address?', 'woocommerce' ); ?></span>
                                            </label>
                                        </div>
                                        
                                        <div class="shipping_address" style="<?php echo ( ! get_option( 'woocommerce_ship_to_destination' ) ) ? 'display:none;' : ''; ?>">
                                            <div class="woocommerce-shipping-fields__field-wrapper">
                                                <?php
                                                $shipping_fields = $checkout->get_checkout_fields( 'shipping' );
                                                foreach ( $shipping_fields as $key => $field ) {
                                                    $field['input_class'] = array( 'ezhomes-input' );
                                                    woocommerce_form_field( $key, $field, $checkout->get_value( $key ) );
                                                }
                                                ?>
                                            </div>
                                        </div>
                                        
                                        <?php do_action( 'woocommerce_after_checkout_shipping_form', $checkout ); ?>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>
                        
                        <!-- Order Notes -->
                        <div class="checkout-section">
                            <h3>Additional Information</h3>
                            <?php do_action( 'woocommerce_before_order_notes', $checkout ); ?>
                            
                            <?php if ( apply_filters( 'woocommerce_enable_order_notes_field', 'yes' === get_option( 'woocommerce_enable_order_comments', 'yes' ) ) ) : ?>
                                <div class="woocommerce-additional-fields__field-wrapper">
                                    <?php foreach ( $checkout->get_checkout_fields( 'order' ) as $key => $field ) : ?>
                                        <?php 
                                        $field['input_class'] = array( 'ezhomes-input' );
                                        $field['placeholder'] = 'Notes about your order, e.g. special notes for delivery.';
                                        woocommerce_form_field( $key, $field, $checkout->get_value( $key ) ); 
                                        ?>
                                    <?php endforeach; ?>
                                </div>
                            <?php endif; ?>
                            
                            <?php do_action( 'woocommerce_after_order_notes', $checkout ); ?>
                        </div>
                        
                    <?php endif; ?>
                    
                </div>
                
                <!-- Right Column: Order Summary -->
                <div class="checkout-sidebar">
                    <div class="order-summary-box">
                        <h3>Order Summary</h3>
                        
                        <!-- Order Items -->
                        <div class="order-items">
                            <?php
                            foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) :
                                $_product = $cart_item['data'];
                                if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 ) :
                            ?>
                                <div class="order-item">
                                    <div class="item-image">
                                        <?php echo $_product->get_image( 'thumbnail' ); ?>
                                        <span class="item-qty"><?php echo $cart_item['quantity']; ?></span>
                                    </div>
                                    <div class="item-info">
                                        <span class="item-name"><?php echo $_product->get_name(); ?></span>
                                        <?php echo wc_get_formatted_cart_item_data( $cart_item ); ?>
                                    </div>
                                    <div class="item-price">
                                        <?php echo WC()->cart->get_product_subtotal( $_product, $cart_item['quantity'] ); ?>
                                    </div>
                                </div>
                            <?php
                                endif;
                            endforeach;
                            ?>
                        </div>
                        
                        <!-- Coupon -->
                        <?php if ( wc_coupons_enabled() ) : ?>
                            <div class="coupon-form">
                                <div class="coupon-toggle">
                                    <span>Have a coupon?</span>
                                    <button type="button" class="toggle-coupon">Add code</button>
                                </div>
                                <div class="coupon-fields" style="display: none;">
                                    <input type="text" name="coupon_code" class="coupon-input" placeholder="Discount code" />
                                    <button type="submit" class="btn-apply-coupon" name="apply_coupon">Apply</button>
                                </div>
                            </div>
                        <?php endif; ?>
                        
                        <!-- Totals -->
                        <div class="order-totals">
                            <div class="totals-row">
                                <span>Subtotal</span>
                                <span><?php wc_cart_totals_subtotal_html(); ?></span>
                            </div>
                            
                            <?php foreach ( WC()->cart->get_coupons() as $code => $coupon ) : ?>
                                <div class="totals-row coupon-discount">
                                    <span><?php wc_cart_totals_coupon_label( $coupon ); ?></span>
                                    <span><?php wc_cart_totals_coupon_html( $coupon ); ?></span>
                                </div>
                            <?php endforeach; ?>
                            
                            <?php if ( WC()->cart->needs_shipping() && WC()->cart->show_shipping() ) : ?>
                                <div class="totals-row shipping">
                                    <span>Shipping</span>
                                    <span>
                                        <?php
                                        $shipping = WC()->cart->get_shipping_total();
                                        echo $shipping > 0 ? wc_price( $shipping ) : '<span class="free">FREE</span>';
                                        ?>
                                    </span>
                                </div>
                            <?php endif; ?>
                            
                            <?php if ( wc_tax_enabled() && ! WC()->cart->display_prices_including_tax() ) : ?>
                                <div class="totals-row tax">
                                    <span>Tax (GST)</span>
                                    <span><?php wc_cart_totals_taxes_total_html(); ?></span>
                                </div>
                            <?php endif; ?>
                            
                            <div class="totals-row total">
                                <span>Total</span>
                                <span class="total-price"><?php wc_cart_totals_order_total_html(); ?></span>
                            </div>
                        </div>
                        
                        <!-- Delivery Estimate -->
                        <div class="delivery-estimate">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="1" y="3" width="15" height="13"></rect>
                                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                <circle cx="18.5" cy="18.5" r="2.5"></circle>
                            </svg>
                            <span>Estimated delivery: <strong>2-5 business days</strong></span>
                        </div>
                        
                        <!-- Payment Methods -->
                        <div id="payment" class="woocommerce-checkout-payment">
                            <?php if ( WC()->cart->needs_payment() ) : ?>
                                <h3>Payment Method</h3>
                                <ul class="wc_payment_methods payment_methods methods">
                                    <?php
                                    if ( ! empty( $available_gateways = WC()->payment_gateways->get_available_payment_gateways() ) ) {
                                        foreach ( $available_gateways as $gateway ) {
                                            wc_get_template( 'checkout/payment-method.php', array( 'gateway' => $gateway ) );
                                        }
                                    } else {
                                        echo '<li>' . apply_filters( 'woocommerce_no_available_payment_methods_message', WC()->customer->get_billing_country() ? esc_html__( 'Sorry, it seems that there are no available payment methods for your state. Please contact us if you require assistance or wish to make alternate arrangements.', 'woocommerce' ) : esc_html__( 'Please fill in your details above to see available payment methods.', 'woocommerce' ) ) . '</li>';
                                    }
                                    ?>
                                </ul>
                            <?php endif; ?>
                            
                            <div class="place-order">
                                <noscript>
                                    <?php esc_html_e( 'Since your browser does not support JavaScript, or it is disabled, please ensure you click the <em>Update Totals</em> button before placing your order. You may be charged more than the amount stated above if you fail to do so.', 'woocommerce' ); ?>
                                    <br/><button type="submit" class="button alt" name="woocommerce_checkout_update_totals" value="<?php esc_attr_e( 'Update totals', 'woocommerce' ); ?>"><?php esc_html_e( 'Update totals', 'woocommerce' ); ?></button>
                                </noscript>
                                
                                <?php wc_get_template( 'checkout/terms.php' ); ?>
                                
                                <?php do_action( 'woocommerce_review_order_before_submit' ); ?>
                                
                                <?php echo apply_filters( 'woocommerce_order_button_html', '<button type="submit" class="button alt btn-place-order" name="woocommerce_checkout_place_order" id="place_order" value="' . esc_attr( $order_button_text ?? __( 'Place order', 'woocommerce' ) ) . '" data-value="' . esc_attr( $order_button_text ?? __( 'Place order', 'woocommerce' ) ) . '">' . esc_html( $order_button_text ?? __( 'Place order', 'woocommerce' ) ) . '</button>' ); ?>
                                
                                <?php do_action( 'woocommerce_review_order_after_submit' ); ?>
                                
                                <?php wp_nonce_field( 'woocommerce-process_checkout', 'woocommerce-process-checkout-nonce' ); ?>
                            </div>
                        </div>
                        
                        <!-- Trust Badges -->
                        <div class="checkout-trust">
                            <div class="trust-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                                <span>Secure 256-bit SSL</span>
                            </div>
                            <div class="trust-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                                <span>5-Year Warranty</span>
                            </div>
                            <div class="trust-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="23 4 23 10 17 10"></polyline>
                                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                                </svg>
                                <span>30-Day Returns</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            
        </form>
        
    </div>
</div>

<?php do_action( 'woocommerce_after_checkout_form', $checkout ); ?>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Toggle coupon form
    const toggleBtn = document.querySelector('.toggle-coupon');
    const couponFields = document.querySelector('.coupon-fields');
    
    if (toggleBtn && couponFields) {
        toggleBtn.addEventListener('click', function() {
            couponFields.style.display = couponFields.style.display === 'none' ? 'flex' : 'none';
            toggleBtn.textContent = couponFields.style.display === 'none' ? 'Add code' : 'Cancel';
        });
    }
    
    // Toggle shipping address
    const shipDifferent = document.getElementById('ship-to-different-address-checkbox');
    const shippingAddress = document.querySelector('.shipping_address');
    
    if (shipDifferent && shippingAddress) {
        shipDifferent.addEventListener('change', function() {
            shippingAddress.style.display = this.checked ? 'block' : 'none';
        });
    }
});
</script>
