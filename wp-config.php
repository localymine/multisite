<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link https://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'multisite');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         ',+J)Lj|<91QeIpu&PK{!;9~34iW66!KE4Wv8.{2A`24jc1|p%i&i+/-~uYpUE},R');
define('SECURE_AUTH_KEY',  '&JoE:a#a+?R$U_VRP; w},3xIlI+*XJa16X]n$h#`>6fu+y](F!;:1#VV!r)8[3@');
define('LOGGED_IN_KEY',    'Y$<59i80dvqXSF3`3zu ]rsI@-rvbnE%*>t7Iylka?U&=VfkubuyE7{-|!4U;QNr');
define('NONCE_KEY',        '|-t;k+cj<}{]bxXwS|&kMVIE5~2M^%LBU8~j|!00mGI-(~UV_E6js$tk]k#|apJC');
define('AUTH_SALT',        'yk9vf2`ub|RkB>+7!)|0+RDWfa<:63Gi&EsL9i5y;^#E^q.mg8RX;m&KpDb.)weO');
define('SECURE_AUTH_SALT', 'z-{{Pv9^hjD?|].R5iLMPXy&t6P_m`)ZIzcA7+b;vISdMg-Q!1|;;29-+lfrU=6w');
define('LOGGED_IN_SALT',   'KE:{CTY-WF{XOot v|kS+:,*s*[%E3>#=p06>Z`*XN`/PS#t+2jj-g}${ok$iqA)');
define('NONCE_SALT',       '8N UpgaZ[//Gtx?h!|)>3|z/Ez0-C._JVwI_v Ywi-JbV*|~hNWjPeu0qsL@Ptq#');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* Multisite */
//define( 'WP_ALLOW_MULTISITE', true );
define('MULTISITE', true);
define('SUBDOMAIN_INSTALL', false);
define('DOMAIN_CURRENT_SITE', 'multisite.localhost');
define('PATH_CURRENT_SITE', '/');
define('SITE_ID_CURRENT_SITE', 1);
define('BLOG_ID_CURRENT_SITE', 1);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
