<?php
include ("config.php");
$con=mysqli_connect("localhost","root","12345678","electrony_2");


$elect_id=$_POST["elect_id"]; // step 1

$result=mysqli_query($con,"select * from devices where elect_id='$elect_id'"); // step 2
$resp=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($resp); // step 4


?>

