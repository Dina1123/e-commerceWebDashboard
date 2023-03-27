<?php
include("config.php");
$con=mysqli_connect("localhost","root","12345678","electrony_2");

$elect_id=$_POST["id"];
$d_name=$_POST["d_name"];
$type=$_POST["type"];
$qty=$_POST["qty"];
$price=$_POST["price"];
$decr=$_POST["decr"];


$img_name=round(microtime(true) * 1000).substr($_FILES["img"]["name"],strrpos($_FILES["img"]["name"],'.'));//1
move_uploaded_file($_FILES["img"]["tmp_name"],"../uploads/$img_name"); // step 1

$resp["status"]=mysqli_query($con,"insert into devices(elect_id, d_name,type,qty, price, decr,  img) values('$elect_id','$d_name','$type','$qty','$price','$decr','uploads/$img_name')"); // step 2 & 3

echo json_encode($resp); // step 4
?>