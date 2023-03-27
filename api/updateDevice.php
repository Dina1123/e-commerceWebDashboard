<?php
include("config.php");
$id=$_POST["id"];
$d_name=$_POST["d_name"];
$price=$_POST["price"];
$decr=$_POST["decr"];
$type=$_POST["type"];
$qty=$_POST["qty"];

if($_FILES["img"]){
    $result=mysqli_query($con,"select img from devices where id=$id");
    $row=mysqli_fetch_assoc($result); // {img:'uploads/786123876128937.jpg'}
    unlink("../".$row["img"]);

    $img_name=round(microtime(true) * 1000).substr($_FILES["img"]["name"],strrpos($_FILES["img"]["name"],'.'));
    move_uploaded_file($_FILES["img"]["tmp_name"],"../uploads/$img_name");
    $resp["status"]=mysqli_query($con,"update devices set d_name='$d_name',price='$price',decr='$decr',qty='$qty',img='uploads/$img_name',type='$type' where id=$id");

} // step 1
else{
    $resp["status"]=mysqli_query($con,"update devices set d_name='$d_name',price='$price',qty='$qty',decr='$decr',type='$type' where id=$id");

}

echo json_encode($resp); // step 4

?>