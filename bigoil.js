const checkboxes = document.querySelectorAll(".clue");
const engines = document.querySelectorAll(".engine-item");

engines.forEach((engine) => {
	engine.style.display = "block";
});

checkboxes.forEach((checkbox) => {
	checkbox.addEventListener("change", () => {
		engines.forEach((engine) => {
			const engineID = engine.id;
			const shouldShow =
				(!document.getElementById("clueNozzle1").checked || engineID === "engine1" || engineID === "engine2") &&
				(!document.getElementById("clueNozzle2").checked || engineID === "engine5" || engineID === "engine6") &&
				(!document.getElementById("clueNozzle3").checked || engineID === "engine7" || engineID === "engine8" || engineID === "engine9" || engineID === "engine11" || engineID === "engine12") &&
				(!document.getElementById("clueElementN").checked || engineID === "engine1" || engineID === "engine8" || engineID === "engine11") &&
				(!document.getElementById("clueElementD").checked || engineID === "engine2" || engineID === "engine5" || engineID === "engine9" || engineID === "engine12") &&
				(!document.getElementById("clueElementHe").checked || engineID === "engine6" || engineID === "engine7") &&
				(!document.getElementById("cluePressure5783").checked || engineID === "engine2" || engineID === "engine6" || engineID === "engine11" || engineID === "engine12") &&
				(!document.getElementById("cluePressure5812").checked || engineID === "engine1" || engineID === "engine5" || engineID === "engine7" || engineID === "engine8" || engineID === "engine9");

			engine.style.display = shouldShow ? "block" : "none";
		});
	});
});
