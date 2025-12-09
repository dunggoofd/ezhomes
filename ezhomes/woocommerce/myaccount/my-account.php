<?php
/**
 * My Account Page Template - ezhomes
 *
 * @package ezhomes
 */

defined( 'ABSPATH' ) || exit;

$current_user = wp_get_current_user();
?>

<div class="ezhomes-myaccount-page">
    <div class="container">
        
        <!-- Account Header -->
        <div class="account-header">
            <div class="user-info">
                <div class="user-avatar">
                    <?php echo get_avatar( $current_user->ID, 80 ); ?>
                </div>
                <div class="user-details">
                    <h1>Welcome back, <?php echo esc_html( $current_user->display_name ); ?>!</h1>
                    <p><?php echo esc_html( $current_user->user_email ); ?></p>
                </div>
            </div>
        </div>
        
        <div class="account-layout">
            
            <!-- Sidebar Navigation -->
            <div class="account-sidebar">
                <nav class="account-nav">
                    <?php foreach ( wc_get_account_menu_items() as $endpoint => $label ) : ?>
                        <a href="<?php echo esc_url( wc_get_account_endpoint_url( $endpoint ) ); ?>" 
                           class="nav-item <?php echo wc_get_account_menu_item_classes( $endpoint ); ?>">
                            <?php
                            // Icons for each menu item
                            $icons = array(
                                'dashboard'       => '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
                                'orders'          => '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>',
                                'downloads'       => '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
                                'edit-address'    => '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
                                'edit-account'    => '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
                                'customer-logout' => '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>',
                            );
                            echo isset( $icons[ $endpoint ] ) ? $icons[ $endpoint ] : '';
                            ?>
                            <span><?php echo esc_html( $label ); ?></span>
                        </a>
                    <?php endforeach; ?>
                </nav>
            </div>
            
            <!-- Main Content -->
            <div class="account-content">
                <?php
                /**
                 * My Account content.
                 */
                do_action( 'woocommerce_account_content' );
                ?>
            </div>
            
        </div>
        
    </div>
</div>
