<?php
class databaseClass {
    private $conn;
    private $sqlTrans = array();
    private $debug = TRUE;
    private $elapsed;
    private $messages = array("error"=>array(), "debug"=>array());
    private $errorMessage;
    private $environment;
    public $dbSet = 'MySQL';
    public $lastResult = null;
    
    /**
     * Constructor function.
     */
    public function __construct() {
        date_default_timezone_set('America/Los_Angeles');
        
        $currentServer = str_replace( "www.", "", strtolower( $_SERVER["SERVER_NAME"] ) );
        $this->environment = ( in_array( $currentServer, Array( "localhost", "dev.menus.com", "dev.admin.menus.com" ) ) ? "Test" : "WebHost" );
        return(true);
    }
    /**
    *- __destruct
    *- This is the destructor.
    *- @access public
    *- @return none
    */
    public function __destruct() {
        return;
    }
    /**
     *- __call
     *- this is a catch-all to handle the unlikely situation where someone calls a non-existent method on the class
     *- @access public
     *- @param string $method The method name that calling code is trying to call
     *- @param array  $args  The arguments that were included in the errant method call
     *- @return FALSE this method always returns false
     */
    public function __call($method, $args) {
        $error = __FUNCTION__. ' attempted to call non-existent '. $method .' method on databaseClass class with '. print_r( $args, true );
        error_log( $error );
        return FALSE;
    }
    
    public function dbConnect() {
        
        $dbInfo = $this->setDatabase( $this->dbSet );
        
        //error_log( print_r($this, TRUE) );
        //error_log( print_r($dbInfo, TRUE) );
        
        switch($this->dbSet) {
            case "MySQL":
                $dbLink = false;
                $retry = 10;
                $attempts = 0;
                while( $attempts < $retry ) {
                    $dbLink = mysqli_connect($dbInfo['dbhost'], $dbInfo['dbusername'], $dbInfo['dbuserpass']);
                    if(!$dbLink) {
                        sleep(1);	//- Pace connection
                    } else { break; }
                    $attempts++;
                }
                
                if(!$dbLink) {
                    error_log('Could not connect db: ' . mysqli_error( $dbLink ));
                    $this->conn = null;
                    return false;
                }
                
                $this->conn = $dbLink;
                
                @mysqli_select_db( $dbLink, $dbInfo['dbSchema'] ) or error_log('Could not connect db: ' . mysqli_error( $dbLink ));
                
                $r = mysqli_query( $this->conn, "SELECT DATABASE()" ) or error_log('Could not get db name: ' . mysqli_error( $dbLink ) );
                
                //mysqli_query( $this->conn, "SET sql_mode = ''" );        //- To avoid Error 1366: Incorrect integer value: '' produced by the 'mask' function created for BOCC
                break;
            default:
                return( false );
        }
        
        return( true );
        
    }
    
    public function setDatabase( $dbSet ) {
        $dbInfo = Array();
        
        switch( $dbSet ) {
            case "MySQL":
                if( $this->environment == "Test" ) {
                    $dbInfo['dbhost'] 		= '127.0.0.1:3306';
                    $dbInfo['dbPath'] 		= '';
                    $dbInfo['dbSchema'] 	= 'mimbro';
                    $dbInfo['dbusername'] 	= 'root';
                    $dbInfo['dbuserpass'] 	= 'windows';
                } else {
                    
                }
                break;
            case "MSSQL":
                break;
            default:
                break;
        
        }
        return($dbInfo);
    }
    
    
    public function dbQuery($query, $return_type = null) {
        $data = true;
        $stmtId = false;
        
        $this->sqlTrans[] = $query;
        
        switch( $this->dbSet ) {
            case "MySQL":
                $stmtId = mysqli_query( $this->conn, $query );
                if (!$stmtId) {
                    error_log('db Query error: ' . mysqli_error( $this->conn ) );
                    return false;
                }
                $this->lastResult = $stmtId;
                break;
            default:
                break;
        }
        
        $query_type = $this->parseQueryStatement($query);
        
        if ($query_type)
        {
            switch ($query_type)
            {
                case "select":
                    $data = $this->fetch($stmtId, $return_type);
                    break;
                case "insert":
                    switch($this->dbSet)
                    {
                        case 'MySQL':
                            $data = mysqli_affected_rows($this->conn);
                            break;
                        default:
                            break;
                    }
                    break;
                case "update":
                    switch($this->dbSet)
                    {
                        case 'MySQL':
                            $data = mysqli_affected_rows($this->conn);
                            break;
                        default:
                            break;
                    }
                    break;
                case "delete":
                    switch($this->dbSet)
                    {
                        case 'MySQL':
                            $data = mysqli_affected_rows($this->conn);
                            break;
                        default:
                            break;
                    }
                    break;
                case "show":
                    switch($this->dbSet)
                    {
                        case 'MySQL':
                            $data = $this->fetch($stmtId, $return_type);
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    $data = "unknown";
                    break;
            }
        }
        else
        {
            $data = "unknown";
        }
        
        if($this->dbSet == 'MySQL') {	//- My SQL
            switch ($query_type)
            {
                case "insert":
                case "update":
                case "delete":
                    mysqli_query( $this->conn, "COMMIT" );
                    break;
                default:
                    break;
            }
        }
        
        return $data;
    }
    
    public function dbClose() {
        switch ($this->dbSet) {
            //- MySQL Database
            case 'MySQL':
                mysqli_close( $this->conn );
                $this->conn = null;
                break;
                
            default:
                break;
        }
        return( true );
    }
    
    
    private function fetch($stmtId, $return) {
        $data = Array();
        
        switch ($this->dbSet)
        {
            //- MySQL Database
            case 'MySQL':
                switch ($return)
                {
                    case "object":
                        $x=0;
                        while ($row = mysqli_fetch_object($stmtId))
                        {
                            $data->$x = $row;
                            $x++;
                        }
                        break;
                        
                    default:
                        while ($row = mysqli_fetch_array($stmtId, MYSQLI_ASSOC ) )
                        {
                            //if( !is_array( $row ) ) { $row = []; }
                            $data[] = $row;
                            
                        }
                        break;
                }
                break;
                
            default:
                break;
                
        }
        
        $data = ( count( $data ) > 0 ? $data : false );
        return $data;
    }
    
    private function parseQueryStatement($sql) {
        $head = strtolower(substr($sql, 0, 10));  // assuming that the sql type is available in the first 10 characters
        if (strstr($head, "select")) {
            return "select";
        }elseif(strstr($head, "insert")) {
            return "insert";
        }elseif(strstr($head, "update")) {
            return "update";
        }elseif(strstr($head, "delete")) {
            return "delete";
        }elseif(strstr($head, "show")) {
            return "show";
        }else{
            return FALSE;
        }
    }
}
?>