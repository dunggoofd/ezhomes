<?php
/**
 * The sidebar containing the main widget area
 *
 * @package ezhomes
 */

if ( ! is_active_sidebar( 'shop-sidebar' ) ) {
    return;
}
?>

<aside id="secondary" class="widget-area">
    <?php dynamic_sidebar( 'shop-sidebar' ); ?>
</aside>
