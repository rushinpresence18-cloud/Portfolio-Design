<?php
/**
 * Plugin Name: Rushin Presence Portfolio
 * Description: Adds the Rushin Presence portfolio to any page with the [rushin_portfolio] shortcode.
 * Version: 1.0.0
 * Author: Rushin Presence
 * License: GPL-2.0-or-later
 * Text Domain: rushin-portfolio
 */

if (!defined('ABSPATH')) {
    exit;
}

function rushin_portfolio_enqueue_assets() {
    if (!is_singular()) {
        return;
    }

    global $post;
    if (!$post || !has_shortcode($post->post_content, 'rushin_portfolio')) {
        return;
    }

    $plugin_url = plugin_dir_url(__FILE__);
    $plugin_path = plugin_dir_path(__FILE__);
    $css_path = $plugin_path . 'assets/portfolio.css';
    $js_path = $plugin_path . 'assets/portfolio.js';

    wp_enqueue_style(
        'rushin-portfolio-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
        array(),
        null
    );
    wp_enqueue_style(
        'rushin-portfolio-display-fonts',
        'https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=space-grotesk@400,500,600,700&display=swap',
        array(),
        null
    );
    wp_enqueue_style('rushin-portfolio', $plugin_url . 'assets/portfolio.css', array('rushin-portfolio-fonts', 'rushin-portfolio-display-fonts'), file_exists($css_path) ? filemtime($css_path) : '1.0.0');
    wp_enqueue_script('rushin-portfolio', $plugin_url . 'assets/portfolio.js', array(), file_exists($js_path) ? filemtime($js_path) : '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'rushin_portfolio_enqueue_assets');

function rushin_portfolio_shortcode() {
    $asset_base = plugin_dir_url(__FILE__) . 'public/';
    return '<div class="rushin-portfolio-root" data-asset-base="' . esc_url($asset_base) . '"></div>';
}
add_shortcode('rushin_portfolio', 'rushin_portfolio_shortcode');
