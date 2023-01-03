  <?php

class DB{
    static public function connect(){
      try {
        //code...
         $db = new PDO("mysql:host=localhost;dbname=quiz","root","");
        $db ->exec("set names utf8");
        $db -> setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_WARNING);
        return $db ;
      } catch (PDOException $e) {
        echo "rrrr".$e;
      }
      
    }
}

?>