<!DOCTYPE html>
<html lang = "en">

<head>
    <meta charset="utf-8">
    <title>Lyrics Cloud</title>
    <link href="/styles.css" rel="stylesheet">
    <script src="../../node_modules/wordcloud/src/wordcloud2.js"> </script>
    <script src="scripts/wordcloudpage.js"> </script>
</head>

<body>
    <h1> <?php echo $_GET['artist_name']; ?> </h1>
    <div id="wordcloudImage">
      <canvas id="canvas" class="canvas"> </canvas>
    </div>
    <div class="cloudSearchArea">
      <input type="search" id="searchBar2" placeholder="Search Artist">
      <button id= "mergeButton"  onclick = "nothing()"> Add to Cloud</button>
      <button id="searchButton2" onclick="window.location.href='/wordcloud/'+document.getElementById('searchBar2').value">Search</button>
      <button id="facebookButton" onclick="nothing()">Share on Facebook!</button>
      <button id="tempButton" onclick="window.location.href='/wordsearch/'+document.getElementById('searchBar2').value">Temp</button>


    </div>
</body>



</html>
