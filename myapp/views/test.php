<!DOCTYPE HTML>
<html>
	<head>
		<title>Example</title>
	</head>
	<body>

<?php $array = explode(",", $_GET['list']); for ($x = 0; $x < 14; $x++){ $rand = rand(5,26); if($x != 12) {echo "['".$array[$x]."',".$rand."],";}else {echo "['".$array[$x]."',".$rand."]";} } ?>
	</body>
</html>