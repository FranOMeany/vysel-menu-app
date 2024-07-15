<?php
@session_start();	//- Preserve $SESSION
date_default_timezone_set('America/Los_Angeles');

// set content return type
header('Content-Type: application/json; charset=utf-8');
// Setting up some server access controls to allow people to get information
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods:  POST, GET');

$request_body = file_get_contents('php://input');
$_POST = $_GET = json_decode($request_body, true);

require_once( "databaseClass.php" );

$results 					= Array();
$results['acctResults'] 	= 'No method has been specified';
$method                     = ( isset($_POST["method"]) ? $_POST["method"] : 0 );
$currentServer = str_replace( "www.", "", strtolower( $_SERVER["SERVER_NAME"] ) );

switch($method) {
    case 10:
        $dbSet = new databaseClass();
        $dbSet->dbConnect();

        $dbQuery = <<<EOF
                    SELECT tCus.*, tFod.fod_description_en AS cus_food_type_en, tFod.fod_description_es AS cus_food_type_es, 
                    CONCAT( tCus.cus_bus_city, ', ', tCus.cus_bus_state, ' ', tCus.cus_bus_zip ) AS cus_city_state_zip, 
                    CONCAT( tCus.cus_bus_address, ' ', tCus.cus_bus_city, ', ', tCus.cus_bus_state, ' ', tCus.cus_bus_zip ) AS cus_bus_full_address, 
                    IF( tCus.cus_bus_hours_mon = "", NULL, tCus.cus_bus_hours_mon ) AS cus_bus_hours_mon,
                    IF( tCus.cus_bus_hours_tue = "", NULL, tCus.cus_bus_hours_tue ) AS cus_bus_hours_tue,
                    IF( tCus.cus_bus_hours_wed = "", NULL, tCus.cus_bus_hours_wed ) AS cus_bus_hours_wed,
                    IF( tCus.cus_bus_hours_thu = "", NULL, tCus.cus_bus_hours_thu ) AS cus_bus_hours_thu,
                    IF( tCus.cus_bus_hours_fri = "", NULL, tCus.cus_bus_hours_fri ) AS cus_bus_hours_fri,
                    IF( tCus.cus_bus_hours_sat = "", NULL, tCus.cus_bus_hours_sat ) AS cus_bus_hours_sat,
                    IF( tCus.cus_bus_hours_sun = "", NULL, tCus.cus_bus_hours_sun ) AS cus_bus_hours_sun,
                    IF( tCus.cus_bus_phone = '' OR tCus.cus_bus_phone IS NULL, 'N/A', mask( NULLIF( REPLACE(REPLACE(REPLACE(REPLACE(tCus.cus_bus_phone, '-', ''), ' ', ''), '(', ''), ')', ''), '' ), '(###) ###-####' ) ) AS cus_bus_phone 
                    FROM tbl_customers tCus 
                    LEFT JOIN tbl_food_types tFod ON (tFod.fod_id = tCus.cus_bus_food_type) 
                    WHERE tCus.cus_account = '{$_POST['account']}'
                    EOF;
        $acctData = $dbSet->dbQuery( $dbQuery );
        $account  = ( isset( $acctData[0] ) ? $acctData[0] : null );

        $dbQuery = <<<EOF
                    SELECT tCus.cus_account, tItm.*, tFod.*                       
                    FROM tbl_customers tCus 
                    LEFT JOIN tbl_items tItm ON (tCus.cus_account = tItm.itm_account) 
                    LEFT JOIN tbl_food_types tFod ON (tFod.fod_id = tCus.cus_bus_food_type) 
                    WHERE tCus.cus_account = '{$_POST['account']}' 
                    ORDER BY tItm.itm_group_position, tItm.itm_group ASC
                    EOF;
        $displayItems = $dbSet->dbQuery( $dbQuery );


        $dbQuery = "SELECT * FROM tbl_categories WHERE cat_account = {$_POST['account']} ORDER BY cat_position * 1 ASC";
        $categories = $dbSet->dbQuery( $dbQuery );

        $dbSet->dbClose();

        $retArray = Array( "status" => "1", "displayItems" => $displayItems, "categories" => $categories, "server" => $currentServer, "account" => $account );
        $results['acctResults'] = json_encode( $retArray );
        break;
    default:
        break;
}

echo($results['acctResults']); // output/return back to the XMLHTTPRequest
?>