<?php
/**
 * The template for displaying all single posts
 *
 * @package ezhomes
 */

get_header();
?>

<main id="primary" class="site-main">
    <div class="container section">
        <?php
        while ( have_posts() ) :
            the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <header class="entry-header">
                    <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
                    <div class="entry-meta text-muted">
                        <?php
                        printf(
                            esc_html__( 'Posted on %s by %s', 'ezhomes' ),
                            '<time datetime="' . esc_attr( get_the_date( 'c' ) ) . '">' . esc_html( get_the_date() ) . '</time>',
                            '<span class="author">' . esc_html( get_the_author() ) . '</span>'
                        );
                        ?>
                    </div>
                </header>

                <?php if ( has_post_thumbnail() ) : ?>
                    <div class="post-thumbnail">
                        <?php the_post_thumbnail( 'large' ); ?>
                    </div>
                <?php endif; ?>

                <div class="entry-content">
                    <?php
                    the_content();

                    wp_link_pages( array(
                        'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'ezhomes' ),
                        'after'  => '</div>',
                    ) );
                    ?>
                </div>

                <footer class="entry-footer">
                    <?php
                    $categories = get_the_category_list( ', ' );
                    $tags = get_the_tag_list( '', ', ' );
                    
                    if ( $categories ) {
                        printf( '<span class="cat-links">' . esc_html__( 'Categories: %s', 'ezhomes' ) . '</span>', $categories );
                    }
                    
                    if ( $tags ) {
                        printf( '<span class="tags-links">' . esc_html__( 'Tags: %s', 'ezhomes' ) . '</span>', $tags );
                    }
                    ?>
                </footer>
            </article>

            <?php
            // If comments are open or there are at least one comment, load up the comment template.
            if ( comments_open() || get_comments_number() ) :
                comments_template();
            endif;

            the_post_navigation( array(
                'prev_text' => '<span class="nav-subtitle">' . esc_html__( 'Previous:', 'ezhomes' ) . '</span> <span class="nav-title">%title</span>',
                'next_text' => '<span class="nav-subtitle">' . esc_html__( 'Next:', 'ezhomes' ) . '</span> <span class="nav-title">%title</span>',
            ) );

        endwhile;
        ?>
    </div>
</main>

<?php
get_footer();
