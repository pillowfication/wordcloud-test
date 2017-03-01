<!DOCTYPE html>
    <html lang = "en-US">

    <head>
        <meta charset="utf-8">
        <title>WordCloud18</title>
        <link href="/styles.css" rel="stylesheet">
        
    </head>



    <body>


        <div class="main">

            <h1>WordCloud18</h1>
            <input type="text" id="searchBar" list ="artist-datalist" placeholder="Search Artist"  >
            <datalist id="artist-datalist">

            </datalist>
            <span class="input-group-btn">
            <button id="searchButton" onclick="window.location.href='/wordcloud/'+document.getElementById('searchBar').value">Search</button>


       </div>


    </body>

    </html>
