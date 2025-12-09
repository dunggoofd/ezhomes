<?php
/**
 * Template for displaying search forms
 *
 * @package ezhomes
 */
?>

<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
    <label style="width: 100%; display: flex; gap: 0.5rem;">
        <span class="screen-reader-text"><?php esc_html_e( 'Search for:', 'ezhomes' ); ?></span>
        <input 
            type="search" 
            class="search-field" 
            placeholder="<?php echo esc_attr__( 'Search products...', 'ezhomes' ); ?>" 
            value="<?php echo get_search_query(); ?>" 
            name="s"
            style="flex: 1; padding: 0.75rem 1rem; border: 1px solid var(--ez-border); border-radius: var(--radius-md); font-size: 1rem;"
        />
        <button 
            type="submit" 
            class="search-submit btn btn-primary"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
            </svg>
            <span class="screen-reader-text"><?php esc_html_e( 'Search', 'ezhomes' ); ?></span>
        </button>
    </label>
</form>
