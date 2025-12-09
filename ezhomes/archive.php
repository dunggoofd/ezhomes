<?php
/**
 * The template for displaying archive pages
 *
 * @package ezhomes
 */

get_header();
?>

<main id="primary" class="site-main">
    <div class="container section">
        <?php if ( have_posts() ) : ?>
            <header class="archive-header section-header">
                <?php
                the_archive_title( '<h1 class="archive-title">', '</h1>' );
                the_archive_description( '<div class="archive-description text-muted">', '</div>' );
                ?>
            </header>

            <div class="posts-grid">
                <?php
                while ( have_posts() ) :
                    the_post();
                    ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class( 'post-card' ); ?>>
                        <?php if ( has_post_thumbnail() ) : ?>
                            <a href="<?php the_permalink(); ?>" class="post-thumbnail">
                                <?php the_post_thumbnail( 'ezhomes-product' ); ?>
                            </a>
                        <?php endif; ?>
                        
                        <div class="post-card-content">
                            <header class="entry-header">
                                <?php the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '">', '</a></h2>' ); ?>
                            </header>

                            <div class="entry-summary">
                                <?php the_excerpt(); ?>
                            </div>

                            <a href="<?php the_permalink(); ?>" class="btn btn-outline btn-sm">
                                <?php esc_html_e( 'Read More', 'ezhomes' ); ?>
                            </a>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>

            <?php
            the_posts_pagination( array(
                'mid_size'  => 2,
                'prev_text' => '&larr; ' . esc_html__( 'Previous', 'ezhomes' ),
                'next_text' => esc_html__( 'Next', 'ezhomes' ) . ' &rarr;',
            ) );
            ?>

        <?php else : ?>
            <div class="no-results text-center">
                <h1><?php esc_html_e( 'Nothing Found', 'ezhomes' ); ?></h1>
                <p class="text-muted"><?php esc_html_e( 'It seems we can&rsquo;t find what you&rsquo;re looking for.', 'ezhomes' ); ?></p>
            </div>
        <?php endif; ?>
    </div>
</main>

<?php
get_footer();
