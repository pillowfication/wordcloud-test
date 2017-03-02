<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>WordCloud18</title>
    <link href="/styles.css" / rel="stylesheet">
</head>

<body>
    <div id="wordpage">
        <h1 id="theWord"><?php echo $_GET['word'] ?></h1>
        <ol id="songList">
        <?php

          $songArray = explode(",", $_GET['songs']);
          $freqArray = explode(",", $_GET['freqs']);
          for ($x = 0; $x<count($songArray); $x++) {
            if ($freqArray[$x] == 0) {
              break;
            }
          ?>
            <li> <a href="<?php echo "/song/".$_GET['artist']."/".$songArray[$x]."/".$_GET['word']; ?>"> <?php echo $songArray[$x]."(".$freqArray[$x].")"; ?> </a></li>
          <?php  
          }
          ?>
        </ol>

        <button id="backtoCloud" onclick="window.location.href='/wordcloud/<?php echo $_GET['artist'] ?>'"">Back to Cloud</button>

</body>

</html>
