<!DOCTYPE html>
<html lang = "en">

<head>
    <meta charset="utf-8">
    <title>Word Cloud</title>
    <link href="/styles.css" rel="stylesheet">
    <script>window.list = [<?php $array = explode(",", $_GET['list']); echo "['".$array[0]."',9],"; for ($x = 1; $x < count($array)/4; $x++){ echo "['".$array[$x]."',5],";} for ($x = count($array)/4; $x < count($array)/2; $x++){ echo "['".$array[$x]."',4],";} for ($x = count($array)/2; $x < 3*count($array)/2; $x++){ echo "['".$array[$x]."',3],";} for ($x = 3*count($array)/2; $x < count($array); $x++){ echo "['".$array[$x]."',2],";} ?>] </script>
    <script src="/wordcloud2.js"> </script>
    <script src="/wordcloudpage.js"> </script>
    <meta property="og:url" content="http://localhost:3000/">
    <meta property="og:title" content="<?php echo $_GET['artist'] ?>">

</head>

<body>
    <div id="fb-root"></div>
    <script>(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>

    <h1> <?php if ($_GET['artist2'] !== "") {echo $_GET['artist1'].", ".$_GET['artist2'];}else {echo $_GET['artist1'];} ?> </h1>
    <div id="wordcloudImage">
    <div class="span12" id="canvas-container">
      <canvas id="canvas" class="canvas" width="2340" height="1520" style="width: 1170px; height: 760px"></canvas>
      <div id='box' hidden />
    </div>
    </div>
    <div class="cloudSearchArea">
      <input type="search" id="searchBar2" placeholder="Search Artist">
      <button id= "mergeButton"  onclick ="window.location.href='/merge/<?php echo $_GET['artist1']."/" ?>'+document.getElementById('searchBar2').value"> Add to Cloud</button>
      <button id="searchButton2" onclick="window.location.href='/wordcloud/'+document.getElementById('searchBar2').value">Search</button>
      <div class="fb-share-button" data-href="http://localhost:3000/" data-size="large" data-layout="button" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A3000%2F&amp;src=sdkpreparse">Share</a></div>

    </div>

</body>



</html>
