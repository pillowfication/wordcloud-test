window.onload = function() {
	WordCloud(document.getElementById("canvas"), {
		list: [["Arthur", 12], ["Markus", 10], ["lol", 8] ["ten", 10]],
		gridSize: 8,
		weightFactor: 16,
		fontFamily: "sans-serif",
		color: "random-dark",
		backgroundColor: "#f0f0f0",
		rotateRatio: 0
	})
	console.log("hi")
}