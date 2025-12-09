<?php
/**
 * Thank You Page Template - ezhomes
 *
 * @package ezhomes
 */

defined( 'ABSPATH' ) || exit;
?>

<div class="ezhomes-thankyou-page">
    <div class="container">
        
        <?php if ( $order ) :
            do_action( 'woocommerce_before_thankyou', $order->get_id() );
        ?>
        
            <?php if ( $order->has_status( 'failed' ) ) : ?>
                
                <div class="order-failed">
                    <div class="failed-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                    </div>
                    <h1>Payment Failed</h1>
                    <p><?php esc_html_e( 'Unfortunately your order cannot be processed as the originating bank/merchant has declined your transaction. Please attempt your purchase again.', 'woocommerce' ); ?></p>
                    <a href="<?php echo esc_url( $order->get_checkout_payment_url() ); ?>" class="btn-retry">
                        Try Again
                    </a>
                </div>
                
            <?php else : ?>
                
                <!-- Success Header -->
                <div class="thankyou-header">
                    <div class="success-animation">
                        <div class="success-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </div>
                    <h1>Thank You for Your Order!</h1>
                    <p class="order-number">Order #<?php echo $order->get_order_number(); ?></p>
                    <p class="confirmation-email">
                        A confirmation email has been sent to<br>
                        <strong><?php echo $order->get_billing_email(); ?></strong>
                    </p>
                </div>
                
                <div class="thankyou-content">
                    
                    <!-- Order Timeline -->
                    <div class="order-timeline">
                        <div class="timeline-step completed">
                            <div class="step-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <span>Order Confirmed</span>
                        </div>
                        <div class="timeline-line"></div>
                        <div class="timeline-step">
                            <div class="step-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                </svg>
                            </div>
                            <span>Processing</span>
                        </div>
                        <div class="timeline-line"></div>
                        <div class="timeline-step">
                            <div class="step-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="1" y="3" width="15" height="13"></rect>
                                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                                </svg>
                            </div>
                            <span>Shipped</span>
                        </div>
                        <div class="timeline-line"></div>
                        <div class="timeline-step">
                            <div class="step-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                            </div>
                            <span>Delivered</span>
                        </div>
                    </div>
                    
                    <div class="thankyou-grid">
                        
                        <!-- Order Items -->
                        <div class="order-items-section">
                            <h3>Items Ordered</h3>
                            <div class="order-items">
                                <?php foreach ( $order->get_items() as $item_id => $item ) :
                                    $product = $item->get_product();
                                ?>
                                    <div class="order-item">
                                        <div class="item-image">
                                            <?php echo $product ? $product->get_image( 'thumbnail' ) : ''; ?>
                                        </div>
                                        <div class="item-details">
                                            <h4><?php echo wp_kses_post( $item->get_name() ); ?></h4>
                                            <?php
                                            $meta_data = $item->get_formatted_meta_data( '' );
                                            if ( $meta_data ) :
                                            ?>
                                                <div class="item-meta">
                                                    <?php foreach ( $meta_data as $meta ) : ?>
                                                        <span><?php echo wp_kses_post( $meta->display_key ); ?>: <?php echo wp_kses_post( $meta->display_value ); ?></span>
                                                    <?php endforeach; ?>
                                                </div>
                                            <?php endif; ?>
                                            <span class="item-qty">Qty: <?php echo $item->get_quantity(); ?></span>
                                        </div>
                                        <div class="item-price">
                                            <?php echo wc_price( $item->get_total() ); ?>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                            
                            <!-- Order Totals -->
                            <div class="order-summary-totals">
                                <div class="totals-row">
                                    <span>Subtotal</span>
                                    <span><?php echo wc_price( $order->get_subtotal() ); ?></span>
                                </div>
                                <?php if ( $order->get_shipping_total() > 0 ) : ?>
                                    <div class="totals-row">
                                        <span>Shipping</span>
                                        <span><?php echo wc_price( $order->get_shipping_total() ); ?></span>
                                    </div>
                                <?php else : ?>
                                    <div class="totals-row">
                                        <span>Shipping</span>
                                        <span class="free">FREE</span>
                                    </div>
                                <?php endif; ?>
                                <?php if ( $order->get_total_tax() > 0 ) : ?>
                                    <div class="totals-row">
                                        <span>Tax (GST)</span>
                                        <span><?php echo wc_price( $order->get_total_tax() ); ?></span>
                                    </div>
                                <?php endif; ?>
                                <?php if ( $order->get_total_discount() > 0 ) : ?>
                                    <div class="totals-row discount">
                                        <span>Discount</span>
                                        <span>-<?php echo wc_price( $order->get_total_discount() ); ?></span>
                                    </div>
                                <?php endif; ?>
                                <div class="totals-row total">
                                    <span>Total</span>
                                    <span><?php echo $order->get_formatted_order_total(); ?></span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Shipping & Billing Info -->
                        <div class="order-info-section">
                            
                            <!-- Shipping Address -->
                            <div class="info-box">
                                <h3>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    Shipping Address
                                </h3>
                                <address>
                                    <?php echo wp_kses_post( $order->get_formatted_shipping_address() ?: $order->get_formatted_billing_address() ); ?>
                                </address>
                            </div>
                            
                            <!-- Delivery Estimate -->
                            <div class="info-box delivery-box">
                                <h3>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="1" y="3" width="15" height="13"></rect>
                                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                        <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                        <circle cx="18.5" cy="18.5" r="2.5"></circle>
                                    </svg>
                                    Estimated Delivery
                                </h3>
                                <p class="delivery-date">
                                    <?php
                                    $delivery_start = date( 'l, F j', strtotime( '+2 days' ) );
                                    $delivery_end = date( 'l, F j', strtotime( '+5 days' ) );
                                    echo $delivery_start . ' - ' . $delivery_end;
                                    ?>
                                </p>
                                <p class="delivery-note">You'll receive tracking info via email once shipped.</p>
                            </div>
                            
                            <!-- Payment Method -->
                            <div class="info-box">
                                <h3>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                        <line x1="1" y1="10" x2="23" y2="10"></line>
                                    </svg>
                                    Payment Method
                                </h3>
                                <p><?php echo wp_kses_post( $order->get_payment_method_title() ); ?></p>
                            </div>
                            
                            <!-- Need Help? -->
                            <div class="info-box help-box">
                                <h3>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                    </svg>
                                    Need Help?
                                </h3>
                                <p>Contact our support team:</p>
                                <a href="mailto:hello@ezhomes.co" class="contact-link">hello@ezhomes.co</a>
                                <a href="tel:1300123456" class="contact-link">1300 123 456</a>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                    <!-- Actions -->
                    <div class="thankyou-actions">
                        <a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="btn-continue">
                            Continue Shopping
                        </a>
                        <?php if ( is_user_logged_in() ) : ?>
                            <a href="<?php echo esc_url( wc_get_account_endpoint_url( 'orders' ) ); ?>" class="btn-orders">
                                View All Orders
                            </a>
                        <?php endif; ?>
                    </div>
                    
                </div>
                
            <?php endif; ?>
            
        <?php else : ?>
            
            <div class="order-not-found">
                <h1>Thank You</h1>
                <p><?php esc_html_e( 'Your order has been received.', 'woocommerce' ); ?></p>
                <a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="btn-continue">
                    Continue Shopping
                </a>
            </div>
            
        <?php endif; ?>
        
    </div>
</div>
