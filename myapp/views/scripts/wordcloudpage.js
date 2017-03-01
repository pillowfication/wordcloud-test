window.onload = function() {
	WordCloud(document.getElementById("canvas"), {
		list: [["Arthur", 30], ["Markus", 20], ["lol", 40], ["ten", 50]],
		gridSize: 8,
		weightFactor: 1,
		fontFamily: "sans-serif",
		color: "random-dark",
		backgroundColor: "#f0f0f0",
		rotateRatio: 0,
		gridSize: 30
	})
	console.log("hi")
}