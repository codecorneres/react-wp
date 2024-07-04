<?php
/**
 * Twenty Twenty-Four functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Twenty Twenty-Four
 * @since Twenty Twenty-Four 1.0
 */

/* begin register javascript */

function bh24_registerTheme() {
	wp_enqueue_style('custom', get_template_directory_uri() . '/assets/css/custom.css', array());
	wp_enqueue_script('jquery_min','https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js',array(), '', true);
	
	wp_enqueue_script('custom', get_template_directory_uri() . '/assets/js/custom.js', array(), '', true);
	
  }
  
add_action('wp_enqueue_scripts', 'bh24_registerTheme');
  
/* end register javascript */

/**
 * Register block styles.
 */

if ( ! function_exists( 'twentytwentyfour_block_styles' ) ) :
	/**
	 * Register custom block styles
	 *
	 * @since Twenty Twenty-Four 1.0
	 * @return void
	 */
	function twentytwentyfour_block_styles() {

		register_block_style(
			'core/details',
			array(
				'name'         => 'arrow-icon-details',
				'label'        => __( 'Arrow icon', 'twentytwentyfour' ),
				/*
				 * Styles for the custom Arrow icon style of the Details block
				 */
				'inline_style' => '
				.is-style-arrow-icon-details {
					padding-top: var(--wp--preset--spacing--10);
					padding-bottom: var(--wp--preset--spacing--10);
				}

				.is-style-arrow-icon-details summary {
					list-style-type: "\2193\00a0\00a0\00a0";
				}

				.is-style-arrow-icon-details[open]>summary {
					list-style-type: "\2192\00a0\00a0\00a0";
				}',
			)
		);
		register_block_style(
			'core/post-terms',
			array(
				'name'         => 'pill',
				'label'        => __( 'Pill', 'twentytwentyfour' ),
				/*
				 * Styles variation for post terms
				 * https://github.com/WordPress/gutenberg/issues/24956
				 */
				'inline_style' => '
				.is-style-pill a,
				.is-style-pill span:not([class], [data-rich-text-placeholder]) {
					display: inline-block;
					background-color: var(--wp--preset--color--base-2);
					padding: 0.375rem 0.875rem;
					border-radius: var(--wp--preset--spacing--20);
				}

				.is-style-pill a:hover {
					background-color: var(--wp--preset--color--contrast-3);
				}',
			)
		);
		register_block_style(
			'core/list',
			array(
				'name'         => 'checkmark-list',
				'label'        => __( 'Checkmark', 'twentytwentyfour' ),
				/*
				 * Styles for the custom checkmark list block style
				 * https://github.com/WordPress/gutenberg/issues/51480
				 */
				'inline_style' => '
				ul.is-style-checkmark-list {
					list-style-type: "\2713";
				}

				ul.is-style-checkmark-list li {
					padding-inline-start: 1ch;
				}',
			)
		);
		register_block_style(
			'core/navigation-link',
			array(
				'name'         => 'arrow-link',
				'label'        => __( 'With arrow', 'twentytwentyfour' ),
				/*
				 * Styles for the custom arrow nav link block style
				 */
				'inline_style' => '
				.is-style-arrow-link .wp-block-navigation-item__label:after {
					content: "\2197";
					padding-inline-start: 0.25rem;
					vertical-align: middle;
					text-decoration: none;
					display: inline-block;
				}',
			)
		);
		register_block_style(
			'core/heading',
			array(
				'name'         => 'asterisk',
				'label'        => __( 'With asterisk', 'twentytwentyfour' ),
				'inline_style' => "
				.is-style-asterisk:before {
					content: '';
					width: 1.5rem;
					height: 3rem;
					background: var(--wp--preset--color--contrast-2, currentColor);
					clip-path: path('M11.93.684v8.039l5.633-5.633 1.216 1.23-5.66 5.66h8.04v1.737H13.2l5.701 5.701-1.23 1.23-5.742-5.742V21h-1.737v-8.094l-5.77 5.77-1.23-1.217 5.743-5.742H.842V9.98h8.162l-5.701-5.7 1.23-1.231 5.66 5.66V.684h1.737Z');
					display: block;
				}

				/* Hide the asterisk if the heading has no content, to avoid using empty headings to display the asterisk only, which is an A11Y issue */
				.is-style-asterisk:empty:before {
					content: none;
				}

				.is-style-asterisk:-moz-only-whitespace:before {
					content: none;
				}

				.is-style-asterisk.has-text-align-center:before {
					margin: 0 auto;
				}

				.is-style-asterisk.has-text-align-right:before {
					margin-left: auto;
				}

				.rtl .is-style-asterisk.has-text-align-left:before {
					margin-right: auto;
				}",
			)
		);
	}
endif;

add_action( 'init', 'twentytwentyfour_block_styles' );

/**
 * Enqueue block stylesheets.
 */

if ( ! function_exists( 'twentytwentyfour_block_stylesheets' ) ) :
	/**
	 * Enqueue custom block stylesheets
	 *
	 * @since Twenty Twenty-Four 1.0
	 * @return void
	 */
	function twentytwentyfour_block_stylesheets() {
		/**
		 * The wp_enqueue_block_style() function allows us to enqueue a stylesheet
		 * for a specific block. These will only get loaded when the block is rendered
		 * (both in the editor and on the front end), improving performance
		 * and reducing the amount of data requested by visitors.
		 *
		 * See https://make.wordpress.org/core/2021/12/15/using-multiple-stylesheets-per-block/ for more info.
		 */
		wp_enqueue_block_style(
			'core/button',
			array(
				'handle' => 'twentytwentyfour-button-style-outline',
				'src'    => get_parent_theme_file_uri( 'assets/css/button-outline.css' ),
				'ver'    => wp_get_theme( get_template() )->get( 'Version' ),
				'path'   => get_parent_theme_file_path( 'assets/css/button-outline.css' ),
			)
		);
	}
endif;

add_action( 'init', 'twentytwentyfour_block_stylesheets' );

/**
 * Register pattern categories.
 */

if ( ! function_exists( 'twentytwentyfour_pattern_categories' ) ) :
	/**
	 * Register pattern categories
	 *
	 * @since Twenty Twenty-Four 1.0
	 * @return void
	 */
	function twentytwentyfour_pattern_categories() {

		register_block_pattern_category(
			'twentytwentyfour_page',
			array(
				'label'       => _x( 'Pages', 'Block pattern category', 'twentytwentyfour' ),
				'description' => __( 'A collection of full page layouts.', 'twentytwentyfour' ),
			)
		);
	}
endif;

add_action( 'init', 'twentytwentyfour_pattern_categories' );


// ============ new code ====
function api_data_fun($args){

	// $query = new WP_Query( $args ); 
	$token = base64_encode( 'code:admin123' ) ;

    // $ch = curl_init();

    // curl_setopt($ch, CURLOPT_URL,'http://localhost/react-wp/wp-json/api/v1/token');
    // curl_setopt($ch, CURLOPT_POST, 1);

    // # Admin credentials here
    // curl_setopt($ch, CURLOPT_POSTFIELDS, "username=code&password=admin123"); 

    // // receive server response ...
    // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // $server_output = curl_exec ($ch);
    // if ($server_output === false) {
    //     die('Error getting JWT token on WordPress for API integration.');
    // }
    // $server_output = json_decode($server_output);

    // if ($server_output === null && json_last_error() !== JSON_ERROR_NONE) {
    //     die('Invalid response getting JWT token on WordPress for API integration.');
    // }

    // if (!empty($server_output->token)) {
    //     $token = $server_output->token; # Token is here
		
    //     curl_close ($ch);
	// 	return new WP_REST_Response($token);
    //     //return true;
    // } else {
    //     die('Invalid response getting JWT token on WordPress for API integration.');
    // }
    // return false;

		return new WP_REST_Response($token);
	}

	function at_rest_init(){
		// route url: domain.com/wp-json/$namespace/$route
		$namespace = 'api/v1';
		$route     = 'token';

		register_rest_route($namespace, $route, array(
			'methods'   		  => WP_REST_Server::READABLE,
			'callback'  		  => 'api_data_fun',
			//'args'                => array('post_type' => 'post','posts_per_page'   => -1),
			'args'                => array(),
			'permission_callback' => '__return_true'
		));
	}

	add_action('rest_api_init', 'at_rest_init');

	// ===========================

	add_action( 'init', 'generate_user_token' );

	function generate_user_token(){
		$token = get_token();
		//$token = get_token();
		//print_r($token);
		if( is_wp_error($token) ) return $token;

		//store and show token so user can user it on client side.
	}

	function get_token(){

		if ( !$user_id = get_current_user_id() ){
			return new WP_Error('user_not_logged','Cannot get token, user is not logged');
		}

		$args = array(
			'body' => array( 
				'username' => 'code',
				'password' => 'admin123'
			),
		);

		$request = wp_remote_post( get_rest_url(null,'jwt-auth/v1/token'), $args );
		if (is_wp_error($request)) return $request;

		$response = wp_remote_retrieve_body( $request );
		if (is_wp_error($response)) return $response;

		$response = json_decode($response, true);

		//check for errors
		$code = ( isset($response['code']) ) ? $response['code'] : null;
		$message = ( isset($response['message']) ) ? $response['message'] : null;
		$data = ( isset($response['data']) ) ? $response['data'] : null;
		$status = ( isset($data['status']) ) ? $data['status'] : null;

		if ( $code && ($status >= 400) ){
			return new WP_Error($code,$message,$data );
		}
		//print_r($response);
		//echo $response['token'];
		return $response['token'];
		//exit();
	}
	add_action('wp_ajax_get_token', 'get_token');
	add_action('wp_ajax_nopriv_get_token', 'get_token');





