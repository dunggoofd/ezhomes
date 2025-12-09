    <!-- Site Footer -->
    <footer id="colophon" class="site-footer">
        <div class="container">
            <div class="footer-grid">
                
                <!-- Brand Column -->
                <div class="footer-brand">
                    <?php if ( has_custom_logo() ) : ?>
                        <?php the_custom_logo(); ?>
                    <?php else : ?>
                        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-logo" style="color: #fff;">
                            <?php bloginfo( 'name' ); ?>
                        </a>
                    <?php endif; ?>
                    
                    <p><?php esc_html_e( 'Premium compression furniture designed for modern living. Easy delivery, quick assembly, zero compromise on comfort.', 'ezhomes' ); ?></p>
                    
                    <!-- Social Links -->
                    <div class="footer-social">
                        <?php if ( get_theme_mod( 'ezhomes_facebook' ) ) : ?>
                            <a href="<?php echo esc_url( get_theme_mod( 'ezhomes_facebook' ) ); ?>" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                        <?php endif; ?>
                        
                        <?php if ( get_theme_mod( 'ezhomes_instagram' ) ) : ?>
                            <a href="<?php echo esc_url( get_theme_mod( 'ezhomes_instagram' ) ); ?>" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                        <?php endif; ?>
                        
                        <?php if ( get_theme_mod( 'ezhomes_youtube' ) ) : ?>
                            <a href="<?php echo esc_url( get_theme_mod( 'ezhomes_youtube' ) ); ?>" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                                </svg>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>

                <!-- Shop Column -->
                <div class="footer-column">
                    <h4><?php esc_html_e( 'Shop', 'ezhomes' ); ?></h4>
                    <ul>
                        <?php if ( function_exists( 'wc_get_page_permalink' ) ) : ?>
                            <li><a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>"><?php esc_html_e( 'All Products', 'ezhomes' ); ?></a></li>
                        <?php endif; ?>
                        <li><a href="<?php echo esc_url( home_url( '/product-category/sofas/' ) ); ?>"><?php esc_html_e( 'Sofas', 'ezhomes' ); ?></a></li>
                        <li><a href="<?php echo esc_url( home_url( '/product-category/sofa-beds/' ) ); ?>"><?php esc_html_e( 'Sofa Beds', 'ezhomes' ); ?></a></li>
                        <li><a href="<?php echo esc_url( home_url( '/product-category/accessories/' ) ); ?>"><?php esc_html_e( 'Accessories', 'ezhomes' ); ?></a></li>
                    </ul>
                </div>

                <!-- Support Column -->
                <div class="footer-column">
                    <h4><?php esc_html_e( 'Support', 'ezhomes' ); ?></h4>
                    <ul>
                        <li><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Contact Us', 'ezhomes' ); ?></a></li>
                        <li><a href="<?php echo esc_url( home_url( '/faq/' ) ); ?>"><?php esc_html_e( 'FAQs', 'ezhomes' ); ?></a></li>
                        <li><a href="<?php echo esc_url( home_url( '/shipping/' ) ); ?>"><?php esc_html_e( 'Shipping Info', 'ezhomes' ); ?></a></li>
                        <li><a href="<?php echo esc_url( home_url( '/returns/' ) ); ?>"><?php esc_html_e( 'Returns & Warranty', 'ezhomes' ); ?></a></li>
                    </ul>
                </div>

                <!-- Company Column -->
                <div class="footer-column">
                    <h4><?php esc_html_e( 'Company', 'ezhomes' ); ?></h4>
                    <ul>
                        <li><a href="<?php echo esc_url( home_url( '/about/' ) ); ?>"><?php esc_html_e( 'About Us', 'ezhomes' ); ?></a></li>
                        <li><a href="<?php echo esc_url( home_url( '/reviews/' ) ); ?>"><?php esc_html_e( 'Reviews', 'ezhomes' ); ?></a></li>
                        <li><a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>"><?php esc_html_e( 'Privacy Policy', 'ezhomes' ); ?></a></li>
                        <li><a href="<?php echo esc_url( home_url( '/terms/' ) ); ?>"><?php esc_html_e( 'Terms & Conditions', 'ezhomes' ); ?></a></li>
                    </ul>
                </div>

            </div>

            <!-- Footer Bottom -->
            <div class="footer-bottom">
                <p>
                    &copy; <?php echo esc_html( date( 'Y' ) ); ?> 
                    <?php bloginfo( 'name' ); ?>. 
                    <?php esc_html_e( 'All rights reserved.', 'ezhomes' ); ?>
                </p>
                
                <div class="payment-icons">
                    <span title="Visa">VISA</span>
                    <span title="Mastercard">MC</span>
                    <span title="American Express">AMEX</span>
                    <span title="Afterpay">Afterpay</span>
                    <span title="Zip">Zip</span>
                    <span title="PayPal">PayPal</span>
                </div>
            </div>
        </div>
    </footer>

</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
