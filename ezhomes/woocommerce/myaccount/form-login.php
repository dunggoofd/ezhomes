<?php
/**
 * Login/Register Form Template - ezhomes
 *
 * @package ezhomes
 */

defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_before_customer_login_form' );
?>

<div class="ezhomes-login-page">
    <div class="container">
        
        <div class="auth-container">
            
            <?php if ( 'yes' === get_option( 'woocommerce_enable_myaccount_registration' ) ) : ?>
                
                <!-- Tabs for Login/Register -->
                <div class="auth-tabs">
                    <button class="auth-tab active" data-tab="login">Sign In</button>
                    <button class="auth-tab" data-tab="register">Create Account</button>
                </div>
                
            <?php endif; ?>
            
            <!-- Login Form -->
            <div class="auth-panel active" id="login-panel">
                <div class="auth-header">
                    <h1>Welcome Back</h1>
                    <p>Sign in to access your account and order history</p>
                </div>
                
                <form class="woocommerce-form woocommerce-form-login login" method="post">
                    
                    <?php do_action( 'woocommerce_login_form_start' ); ?>
                    
                    <div class="form-group">
                        <label for="username"><?php esc_html_e( 'Email address', 'woocommerce' ); ?> <span class="required">*</span></label>
                        <input type="text" class="ezhomes-input" name="username" id="username" autocomplete="username" placeholder="your@email.com" value="<?php echo ( ! empty( $_POST['username'] ) ) ? esc_attr( wp_unslash( $_POST['username'] ) ) : ''; ?>" required />
                    </div>
                    
                    <div class="form-group">
                        <label for="password"><?php esc_html_e( 'Password', 'woocommerce' ); ?> <span class="required">*</span></label>
                        <div class="password-input-wrapper">
                            <input class="ezhomes-input" type="password" name="password" id="password" autocomplete="current-password" placeholder="Enter your password" required />
                            <button type="button" class="toggle-password" aria-label="Show password">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="form-options">
                        <label class="woocommerce-form__label woocommerce-form__label-for-checkbox woocommerce-form-login__rememberme">
                            <input class="woocommerce-form__input woocommerce-form__input-checkbox" name="rememberme" type="checkbox" id="rememberme" value="forever" />
                            <span><?php esc_html_e( 'Remember me', 'woocommerce' ); ?></span>
                        </label>
                        <a href="<?php echo esc_url( wp_lostpassword_url() ); ?>" class="forgot-password">
                            <?php esc_html_e( 'Forgot password?', 'woocommerce' ); ?>
                        </a>
                    </div>
                    
                    <?php do_action( 'woocommerce_login_form' ); ?>
                    
                    <button type="submit" class="btn-submit" name="login" value="<?php esc_attr_e( 'Log in', 'woocommerce' ); ?>">
                        <?php esc_html_e( 'Sign In', 'woocommerce' ); ?>
                    </button>
                    
                    <?php wp_nonce_field( 'woocommerce-login', 'woocommerce-login-nonce' ); ?>
                    
                    <?php do_action( 'woocommerce_login_form_end' ); ?>
                    
                </form>
                
                <?php if ( 'yes' === get_option( 'woocommerce_enable_myaccount_registration' ) ) : ?>
                    <div class="auth-footer">
                        <p>Don't have an account? <button type="button" class="switch-tab" data-tab="register">Create one</button></p>
                    </div>
                <?php endif; ?>
            </div>
            
            <?php if ( 'yes' === get_option( 'woocommerce_enable_myaccount_registration' ) ) : ?>
                
                <!-- Register Form -->
                <div class="auth-panel" id="register-panel">
                    <div class="auth-header">
                        <h1>Create Account</h1>
                        <p>Join ezhomes for exclusive benefits and faster checkout</p>
                    </div>
                    
                    <form method="post" class="woocommerce-form woocommerce-form-register register" <?php do_action( 'woocommerce_register_form_tag' ); ?>>
                        
                        <?php do_action( 'woocommerce_register_form_start' ); ?>
                        
                        <?php if ( 'no' === get_option( 'woocommerce_registration_generate_username' ) ) : ?>
                            <div class="form-group">
                                <label for="reg_username"><?php esc_html_e( 'Username', 'woocommerce' ); ?> <span class="required">*</span></label>
                                <input type="text" class="ezhomes-input" name="username" id="reg_username" autocomplete="username" placeholder="Choose a username" value="<?php echo ( ! empty( $_POST['username'] ) ) ? esc_attr( wp_unslash( $_POST['username'] ) ) : ''; ?>" required />
                            </div>
                        <?php endif; ?>
                        
                        <div class="form-group">
                            <label for="reg_email"><?php esc_html_e( 'Email address', 'woocommerce' ); ?> <span class="required">*</span></label>
                            <input type="email" class="ezhomes-input" name="email" id="reg_email" autocomplete="email" placeholder="your@email.com" value="<?php echo ( ! empty( $_POST['email'] ) ) ? esc_attr( wp_unslash( $_POST['email'] ) ) : ''; ?>" required />
                        </div>
                        
                        <?php if ( 'no' === get_option( 'woocommerce_registration_generate_password' ) ) : ?>
                            <div class="form-group">
                                <label for="reg_password"><?php esc_html_e( 'Password', 'woocommerce' ); ?> <span class="required">*</span></label>
                                <div class="password-input-wrapper">
                                    <input type="password" class="ezhomes-input" name="password" id="reg_password" autocomplete="new-password" placeholder="Create a password" required />
                                    <button type="button" class="toggle-password" aria-label="Show password">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </button>
                                </div>
                                <p class="password-hint">At least 8 characters with a mix of letters and numbers</p>
                            </div>
                        <?php else : ?>
                            <p class="password-info"><?php esc_html_e( 'A link to set a new password will be sent to your email address.', 'woocommerce' ); ?></p>
                        <?php endif; ?>
                        
                        <?php do_action( 'woocommerce_register_form' ); ?>
                        
                        <!-- Benefits -->
                        <div class="register-benefits">
                            <h4>Account Benefits</h4>
                            <ul>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>Track your orders easily</span>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>Faster checkout experience</span>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>Exclusive member discounts</span>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>Early access to new products</span>
                                </li>
                            </ul>
                        </div>
                        
                        <button type="submit" class="btn-submit" name="register" value="<?php esc_attr_e( 'Register', 'woocommerce' ); ?>">
                            <?php esc_html_e( 'Create Account', 'woocommerce' ); ?>
                        </button>
                        
                        <p class="terms-notice">
                            By creating an account, you agree to our 
                            <a href="<?php echo esc_url( get_privacy_policy_url() ); ?>">Privacy Policy</a> and 
                            <a href="#">Terms of Service</a>.
                        </p>
                        
                        <?php wp_nonce_field( 'woocommerce-register', 'woocommerce-register-nonce' ); ?>
                        
                        <?php do_action( 'woocommerce_register_form_end' ); ?>
                        
                    </form>
                    
                    <div class="auth-footer">
                        <p>Already have an account? <button type="button" class="switch-tab" data-tab="login">Sign in</button></p>
                    </div>
                </div>
                
            <?php endif; ?>
            
        </div>
        
    </div>
</div>

<?php do_action( 'woocommerce_after_customer_login_form' ); ?>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabs = document.querySelectorAll('.auth-tab, .switch-tab');
    const panels = document.querySelectorAll('.auth-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Update tabs
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            document.querySelector(`.auth-tab[data-tab="${targetTab}"]`)?.classList.add('active');
            
            // Update panels
            panels.forEach(p => p.classList.remove('active'));
            document.getElementById(`${targetTab}-panel`).classList.add('active');
        });
    });
    
    // Password visibility toggle
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            
            // Update icon
            this.innerHTML = type === 'password' 
                ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'
                : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
        });
    });
});
</script>
