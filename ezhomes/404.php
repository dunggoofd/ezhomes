<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package ezhomes
 */

get_header();
?>

<main id="primary" class="site-main">
    <div class="container section">
        <div class="error-404 text-center" style="max-width: 600px; margin: 0 auto; padding: 4rem 0;">
            <h1 style="font-size: 8rem; line-height: 1; margin-bottom: 1rem; color: var(--ez-primary);">404</h1>
            <h2><?php esc_html_e( 'Page Not Found', 'ezhomes' ); ?></h2>
            <p class="text-muted" style="margin-bottom: 2rem;">
                <?php esc_html_e( 'Sorry, the page you are looking for doesn\'t exist or has been moved.', 'ezhomes' ); ?>
            </p>
            
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-primary">
                    <?php esc_html_e( 'Go Home', 'ezhomes' ); ?>
                </a>
                <?php if ( function_exists( 'wc_get_page_permalink' ) ) : ?>
                    <a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="btn btn-outline">
                        <?php esc_html_e( 'Browse Shop', 'ezhomes' ); ?>
                    </a>
                <?php endif; ?>
            </div>

            <div style="margin-top: 3rem;">
                <p class="text-muted" style="margin-bottom: 1rem;"><?php esc_html_e( 'Or try searching:', 'ezhomes' ); ?></p>
                <?php get_search_form(); ?>
            </div>
        </div>
    </div>
</main>

<?php
get_footer();
