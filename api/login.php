<?php
include("config.php");
$username=$_POST["username"];
$password=$_POST["password"];//1
$result=mysqli_query($con,"select id,name from elect where username='$username' and password='$password'");

if(mysqli_num_rows($result)==0)
    $resp["status"]=false;
else{
    $resp["status"]=true;
    $row=mysqli_fetch_assoc($result); // {id:17,name:}
    $resp["id"]=$row["id"];  // {status:false} - {status:true,id:17}
    $resp["name"]=$row["name"];  // {status:false} - {status:true,id:17}

}

echo json_encode($resp); // step 4
?>