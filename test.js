function isPointInPolygon(point, polygon) {
	let x = point[0],
		y = point[1];
	let inside = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		let xi = polygon[i][0],
			yi = polygon[i][1];
		let xj = polygon[j][0],
			yj = polygon[j][1];
		let intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
		if (intersect) inside = !inside;
	}
	return inside;
}

function randomPointInPolygon(polygon) {
	let minX = polygon[0][0];
	let maxX = polygon[0][0];
	let minY = polygon[0][1];
	let maxY = polygon[0][1];
	for (let i = 1; i < polygon.length; i++) {
		minX = Math.min(minX, polygon[i][0]);
		maxX = Math.max(maxX, polygon[i][0]);
		minY = Math.min(minY, polygon[i][1]);
		maxY = Math.max(maxY, polygon[i][1]);
	}
	let point;
	do {
		point = [Math.random() * (maxX - minX) + minX, Math.random() * (maxY - minY) + minY];
	} while (!isPointInPolygon(point, polygon));
	return point;
}

let map = L.map("map").setView([37.955, 27.375], 10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 19,
}).addTo(map);

districtsData.forEach((district) => {
	const polygon = L.polygon(district.designcoordinates, { fill: true, color: "green" }).addTo(map);
	districtLayers.push({ name: district.name, layer: polygon, state: 1, bounds: district.bounds });

	if (district.state === 1) {
		initiallyGreenDistricts.push({ bounds: district.bounds });
	}
});
