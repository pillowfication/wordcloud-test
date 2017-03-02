
window.onload = function() {
	WordCloud(document.getElementById("canvas"), {
		list: window.list,
		gridSize: Math.round(16 * 2000/1024),
		weightFactor: function(size) {
			return Math.pow(size, 2.3) * 2000/1024;
			},
		fontFamily: 'Finger Paint, cursive, sans-serif',
		color: "random-dark",
		rotateRatio: 0,
		hover: window.drawBox,
		backgroundColor: "#ffe0e0",
		/**
		hover: function(item, dimension) {
			if (!dimension) {
				document.getElementById('box').setAttribute('hidden', true)
				return;
			}

			document.getElementById('box').setAttribute('hidden',false);
			document.getElementById('box').style.left = dimension.x + 'px';
			document.getElementById('box').style.top = dimension.y + 'px';
			document.getElementById('box').style.width = dimension.w + 'px';
			document.getElementById('box').style.height = dimension.h + 'px';
			console.log(document.getElementById('box').style)
		},
		*/
		click: function(item) {
			var list=document.getElementsByTagName('h1')[0]
				.innerHTML.split(',').map(function(artist){
					return artist.trim();
			})[0]
			window.location.href='/wordsearch/'+item[0]+'/'+list;
		}
	});
};
