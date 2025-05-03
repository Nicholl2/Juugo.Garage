<?php
$host = "localhost";
$user = "root"; // default user XAMPP
$password = ""; // biasanya kosong di XAMPP
$database = "juugo_garage";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
