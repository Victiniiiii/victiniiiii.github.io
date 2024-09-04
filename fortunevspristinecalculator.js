function calculateFortunevsPristine(x) {
    let fortune = document.getElementById(`FvPinput${x}`).value;
    let pristine = document.getElementById(`FvPinput${x+2}`).value;

    if ((fortune > 0) && (pristine > 0) && (fortune < 10000) && (pristine < 100)) {
        let expecteddrop = (( 1 + pristine * 0.79) * (1 + fortune / 100) * 3).toFixed(0)
        document.getElementById(`FvPoutput${x}`).innerText = expecteddrop+" Flawed Gemstones";
    } else {
        document.getElementById(`FvPoutput${x}`).innerText = "Please double-check your values.";
    }    
}