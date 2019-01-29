
window.onload = function() {
	WordCloud(document.getElementById("canvas"), {
		list: window.list,
		gridSize: Math.round(16 * 2000/1024),
		weightFactor: function(size) {
			return Math.pow(size, 2.3) * 2000/1024;
			},
		fontFamily: 'Finger Paint, cursive, sans-serif',
		color: "random-light",
		rotateRatio: 0,
		hover: window.drawBox,
		backgroundColor: "#001f00",
		hover: function(item, dimension) {
			if (!dimension) {
				document.getElementById('box').setAttribute('hidden', true)
				return;
			}

			document.getElementById('box').removeAttribute('hidden');
			document.getElementById('box').style.left = dimension.x/2 + 'px';
			document.getElementById('box').style.top = dimension.y/2 + 'px';
			document.getElementById('box').style.width = dimension.w/2 + 'px';
			document.getElementById('box').style.height = dimension.h/2 + 'px';
			console.log(document.getElementById('box').style)
		},
		click: function(item) {
			var list=document.getElementsByTagName('h1')[0]
				.innerHTML.split(',').map(function(artist){
					return artist.trim();
			})[0]
			window.location.href='/wordsearch/'+item[0]+'/'+list;
		}
	});
};
