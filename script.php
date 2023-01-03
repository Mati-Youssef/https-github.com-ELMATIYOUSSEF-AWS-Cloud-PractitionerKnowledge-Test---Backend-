<?php

include_once 'database/db.php';




class Questions extends DB{
    protected $option1 ;
    protected $option2 ;
    protected $option3 ;
    protected $option4 ;
    protected $qst ;
    function __construct($qst,$option1, $option2, $option3, $option4 ) {
        $this->option1= $option1;
        $this->option2 = $option2;
        $this->option3 = $option3;
        $this->option4 =$option4;
        $this->qst =$qst;
      }

    function createData(){
        $sql = "INSERT INTO question (qst,option1, option2, option3, option4) VALUES (?, ?, ?, ?, ?)";
        var_dump($this->connect());
            $stmt = $this ->connect()-> prepare($sql);
            $stmt->execute([$this->qst, $this->option1,$this->option2, $this->option3, $this->option4]);
            return 1;
    }


}

class Answer extends DB{
    protected $CorrectAnswer ;
    protected $Explication ;
    function __construct($Correct, $Exp) {
        $this->CorrectAnswer= $Correct;
        $this->Explication = $Exp;
      }

    function createData(){
        $sql = "INSERT INTO correctanswer (Answer, explicattion) VALUES (?, ?)";
            $stmt = $this ->connect()-> prepare($sql);
            $stmt->execute([ $this->CorrectAnswer,$this->Explication]);
            return 1;
    }


}

// $qst =$_POST['qst'];
// $option1 =$_POST['option1'];
// $option2 =$_POST['option2'];
// $option3 =$_POST['option3'];
// $option4 =$_POST['option4'];

// $Question = new Questions($qst,$option1,$option2,$option3,$option4);
// $Question ->createData();



// $answer =$_POST['ansr'];
// $Exp = $_POST['exp'];


// $Answer = new Answer($answer,$Exp);
// $Answer ->createData();




class Question extends DB{

     //public int $Qstid ;
    // public string $Qst ;
    // public string $option1 ;
    // public string $option2 ;
    // public string $option3 ;
    // public string $option4 ;
    // public array $Correctanswer ;

    // public function __construct(int $Qstid , string $Qst , string $option1,string $option2 , string $option3 , string $option4 ){

    //     $this ->Qstid = $Qstid ;
    //     $this ->Qst =$Qst ;
    //     $this ->option1 = $option1 ;
    //     $this ->option2 = $option2 ;
    //     $this ->option3 = $option3 ;
    //     $this ->option4 = $option4 ;
    //     $this ->Correctanswer =getcorrectanswer();

    // }

    public function getdataQstion(){
        $sql ="SELECT * FROM question INNER JOIN correctanswer c ON c.id =question.id;";
        $stmt = $this->connect()->query($sql);
        if (!$stmt) {
          // There was an error preparing the statement
          $error = $this->connect()->errorInfo();
          echo "Error preparing statement: " . $error[2];
        }
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result ;
     }
    //  public function getcorrectanswer(){
    //     $sql ="SELECT c.* FROM correctanswer c LEFT JOIN question ON c.id =question.id";
    //     $stmt = $this->connect()->query($sql);
    //     if (!$stmt) {
    //       // There was an error preparing the statement
    //       $error = $this->connect()->errorInfo();
    //       echo "Error preparing statement: " . $error[2];
    //     }
    //     $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //     return $result ;
    //  }

    //  public function getcorrectanswer(){
    //     $sql = "select * from correctanswer where id = ?";
    //     $stmt = $this ->connect()-> prepare($sql);
    //     $stmt->execute([$Qstid]);
    //     $result = $stmt->fetch();
    //     return $result;
    //  }

}


// class usr extends DB {

//     public string $name ;
//     public string $ip ;
//     public string $browser ;
//     public int $scor ;

//     public function __construct($name , $ip ='',$browser , $scor){
//         $this ->name =$name;
//         $this ->ip =$ip ;
//         $this ->browser = $browser;
//         $this ->scor =$scor ;
//     }
// }


$Qstion =new Question();
$data = $Qstion->getdataQstion();

// echo('<pre>');
// var_dump($data);
// echo('</pre>');
// die();

// $dt = array();
for ($i=0; $i<count($data);$i++) { 
   $dt[] = (object)array(
    
        "Qstid" => $data[$i]['id'],
        "Qst" => $data[$i]['qst'],
        "choices"=>[$data[$i]['option1'],$data[$i]['option2'],$data[$i]['option3'],$data[$i]['option4']],
        "correctanswer" => ["index"=>$data[$i]['Answer'],"Exp"=>$data[$i]['explicattion']]
    
);
}

echo('<pre>');
var_dump($dt);
echo('</pre>');

$json_data = json_encode($dt);
file_put_contents('Quiz.json', json_encode($dt));


/////////////////
// echo('<br> <hr>');
// echo('<pre>');
// var_dump($correct);
// echo('</pre>');

// for ($i=0; $i<count($correct);$i++) { 
//     $Right = array(
     
//          "Qstid" => $correct[$i]['id'],
//          "correctanswer" => ["index"=>$correct[$i]['Answer'],"Exp"=>$correct[$i]['explicattion']]
     
//  );

// }
// echo('<br> <hr>');
// echo('<pre>');
// var_dump($Right);
// echo('</pre>');

class usr extends DB {

  // insert info de user 

  protected $name ;
  protected $scor ;
  protected $ip ;
  protected $browser ;
  function __construct($name,$ip ='',$browser ='',$scor) {
      $this->name= $name;
      $this->scor = $scor ;
      $this->ip = $ip ;
      $this->browser = $browser ;
    }

  function createData(){
      $sql = "INSERT INTO usr (name, ip , browser,scor) VALUES (?,?,?,?)";
          $stmt = $this ->connect()-> prepare($sql);
          $stmt->execute([ $this->name,$this->ip,$this->browser ,$this->scor]);
          return 1;
  }

}

 
$name =@$_POST["name"];
$scor =@$_POST["scor"];

$ip_address = $_SERVER["REMOTE_ADDR"];
$user_agent = $_SERVER['HTTP_USER_AGENT'];
$date =date("m/d/y G.i:s<br>", time());

echo('<hr>'.'ip =');
print_r($ip_address);
echo('<hr>'.'browser');
print_r($user_agent);
echo('<hr>'.'name');
print_r($name);
echo('<hr>'.'scor');
print_r($scor);
$usr = new usr($name,$ip_address,$user_agent,$scor);
$usr->createData() ;