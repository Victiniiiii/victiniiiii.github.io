function effectivehpcalculate() {
    let hp = document.getElementById("hp").value;
    let def = document.getElementById("def").value;

    if ((hp > 0) && (def > 0) && (hp < 100000000000000000) & (def < 100000000000000000)) {
        let effectivehp = hp * ( 1 + ( def / 100));
        document.getElementById("output").innerText = effectivehp.toFixed(0) + " Effective HP";
    } else {
        document.getElementById("output").innerText = "Please double-check your values.";
    }    
}