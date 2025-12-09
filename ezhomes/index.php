<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 *
 * @package ezhomes
 */

get_header();
?>

<main id="primary" class="site-main">
    <div class="container">
        
        <?php if ( have_posts() ) : ?>
            
            <?php if ( is_home() && ! is_front_page() ) : ?>
                <header class="page-header section-header">
                    <h1 class="page-title"><?php single_post_title(); ?></h1>
                </header>
            <?php endif; ?>

            <div class="posts-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; padding: 3rem 0;">
                
                <?php while ( have_posts() ) : the_post(); ?>
                    
                    <article id="post-<?php the_ID(); ?>" <?php post_class( 'product-card' ); ?>>
                        
                        <?php if ( has_post_thumbnail() ) : ?>
                            <div class="product-image">
                                <a href="<?php the_permalink(); ?>">
                                    <?php the_post_thumbnail( 'medium_large' ); ?>
                                </a>
                            </div>
                        <?php endif; ?>
                        
                        <div class="product-info">
                            <h2 class="product-title">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h2>
                            
                            <div class="entry-summary">
                                <?php the_excerpt(); ?>
                            </div>
                            
                            <a href="<?php the_permalink(); ?>" class="btn btn-primary btn-sm">
                                Read More
                            </a>
                        </div>
                        
                    </article>
                    
                <?php endwhile; ?>
                
            </div>

            <?php
            // Pagination
            the_posts_pagination( array(
                'mid_size'  => 2,
                'prev_text' => '&larr; Previous',
                'next_text' => 'Next &rarr;',
            ) );
            ?>

        <?php else : ?>

            <section class="no-results section">
                <div class="section-header">
                    <h1><?php esc_html_e( 'Nothing Found', 'ezhomes' ); ?></h1>
                    <p><?php esc_html_e( 'It seems we can&rsquo;t find what you&rsquo;re looking for.', 'ezhomes' ); ?></p>
                </div>
                
                <?php if ( is_search() ) : ?>
                    <p class="text-center"><?php esc_html_e( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'ezhomes' ); ?></p>
                    <?php get_search_form(); ?>
                <?php else : ?>
                    <div class="text-center">
                        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-primary">
                            <?php esc_html_e( 'Go Home', 'ezhomes' ); ?>
                        </a>
                    </div>
                <?php endif; ?>
            </section>

        <?php endif; ?>
        
    </div>
</main>

<?php
get_footer();
