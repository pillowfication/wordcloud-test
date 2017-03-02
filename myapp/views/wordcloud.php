<!DOCTYPE html>
<html lang = "en">

<head>
    <meta charset="utf-8">
    <title>Lyrics Cloud</title>
    <link href="/styles.css" rel="stylesheet">
    <script src="/wordcloud2.js"> </script>
    <script src="/wordcloudpage.js"> </script>
    <script>window.list = [<?php foreach ($_GET['list'] as $item)  echo "['".$item."'," .10."]," ; ?>];</script>
</head>

<body>
    <h1> <?php echo $_GET['artist_name']; ?> </h1>
    <div id="wordcloudImage">
      <canvas id="canvas" class="canvas"></canvas>
    </div>
    <div class="cloudSearchArea">
      <input type="search" id="searchBar2" placeholder="Search Artist">
      <button id= "mergeButton"  onclick = "nothing()"> Add to Cloud</button>
      <button id="searchButton2" onclick="window.location.href='/wordcloud/'+document.getElementById('searchBar2').value">Search</button>
      <button id="facebookButton" onclick="nothing()">Share on Facebook!</button>
      <button id="tempButton" onclick="var list=document.getElementsByTagName('h1')[0].innerHTML.split(',').map(function(artist){return artist.trim();}).join('/');window.location.href='/wordsearch/'+document.getElementById('searchBar2').value+'/'+list">Temp</button>


    </div>
</body>



</html>
