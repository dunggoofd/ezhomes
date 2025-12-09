<?php
/**
 * The template for displaying comments
 *
 * @package ezhomes
 */

if ( post_password_required() ) {
    return;
}
?>

<div id="comments" class="comments-area" style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--ez-border);">

    <?php if ( have_comments() ) : ?>
        <h2 class="comments-title" style="margin-bottom: 1.5rem;">
            <?php
            $comment_count = get_comments_number();
            if ( '1' === $comment_count ) {
                printf(
                    esc_html__( 'One thought on &ldquo;%1$s&rdquo;', 'ezhomes' ),
                    '<span>' . wp_kses_post( get_the_title() ) . '</span>'
                );
            } else {
                printf(
                    esc_html( _nx( '%1$s thought on &ldquo;%2$s&rdquo;', '%1$s thoughts on &ldquo;%2$s&rdquo;', $comment_count, 'comments title', 'ezhomes' ) ),
                    number_format_i18n( $comment_count ),
                    '<span>' . wp_kses_post( get_the_title() ) . '</span>'
                );
            }
            ?>
        </h2>

        <ol class="comment-list" style="list-style: none; padding: 0;">
            <?php
            wp_list_comments( array(
                'style'       => 'ol',
                'short_ping'  => true,
                'avatar_size' => 50,
            ) );
            ?>
        </ol>

        <?php
        the_comments_navigation();

        if ( ! comments_open() ) :
            ?>
            <p class="no-comments text-muted"><?php esc_html_e( 'Comments are closed.', 'ezhomes' ); ?></p>
        <?php endif; ?>

    <?php endif; ?>

    <?php
    comment_form( array(
        'class_form'         => 'comment-form',
        'title_reply'        => esc_html__( 'Leave a Comment', 'ezhomes' ),
        'title_reply_before' => '<h3 id="reply-title" class="comment-reply-title" style="margin-top: 2rem; margin-bottom: 1rem;">',
        'title_reply_after'  => '</h3>',
    ) );
    ?>

</div>
