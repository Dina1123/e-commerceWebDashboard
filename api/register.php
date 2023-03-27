<?php
include ("config.php");
$username=$_POST["username"];
$password=$_POST["password"];
$tel=$_POST["tel"];
$addr=$_POST["addr"];
$name=$_POST["name"];


$resp["status"]=mysqli_query($con,"insert into elect(username,password, tel, addr, name) VALUES('$username','$password','$tel','$addr','$name')");


if($resp["status"]){
    $result=mysqli_query($con,"select id from elect where username='$username'");
    $row=mysqli_fetch_assoc($result); // [{id:16}] . {id:16}
    $resp["id"]=$row["id"]; // {status:false} , {status:true,id:16}
}

echo json_encode($resp);
 // step 4
?>