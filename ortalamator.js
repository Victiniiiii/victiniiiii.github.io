function switchMode(mode) {
    var rightrectangle = document.querySelector('.rightrectangle');
    var middleRectangle = document.querySelector('.middleRectangle');
    var rectangle = document.getElementById('rectangle');
    var result = document.getElementById('result');
    var noteInput = document.getElementById('noteInput');
    var calculateButton = document.getElementById('calculateButton');
    var examResultsText = document.getElementById('examResultsText');
    var examMode = document.getElementById('examMode');
    var examResultsMode = document.getElementById('examResultsMode');
    var faqMode = document.getElementById('faqMode');
    var stat22Mode = document.getElementById('stat22Mode');
    var stat22RectanglesContainer = document.getElementById('stat22RectanglesContainer');
    var stat22RectanglesContainer2 = document.getElementById('stat22RectanglesContainer2');
    var stat22RectanglesContainer3 = document.getElementById('stat22RectanglesContainer3');
    var nodonemMode = document.getElementById('nodonemMode')
    var donem1Mode = document.getElementById('donem1Mode');
    var donem2Mode = document.getElementById('donem2Mode');
    var donem3Mode = document.getElementById('donem3Mode');
    var donem4Mode = document.getElementById('donem4Mode');
    var donem5Mode = document.getElementById('donem5Mode');
    var donem6Mode = document.getElementById('donem6Mode');
    var donem7Mode = document.getElementById('donem7Mode');
    var donem8Mode = document.getElementById('donem8Mode');
    var rightrectangle = document.getElementById('rightrectangle');

    if (mode === 'STAT22') {
        examMode.style.display = 'none';
        examResultsMode.style.display = 'none';
        faqMode.style.display = 'none';
        stat22Mode.style.display = 'block';
        stat22RectanglesContainer.style.display = 'flex';
        stat22RectanglesContainer2.style.display = 'flex';
        stat22RectanglesContainer3.style.display = 'flex';
        nodonemMode.style.display = 'block';
        donem1Mode.style.display = 'none';
        donem2Mode.style.display = 'none';
        donem3Mode.style.display = 'none';
        donem4Mode.style.display = 'none';
        donem5Mode.style.display = 'none';
        donem6Mode.style.display = 'none';
        donem7Mode.style.display = 'none';
        donem8Mode.style.display = 'none';
        rightrectangle.style.display = 'block';
        stat22Mode.style.zIndex = '1';
        middleRectangle.style.zIndex = '0';
    } else if (mode === 'EXAM') {
        examMode.style.display = 'block';
        examResultsMode.style.display = 'none';
        faqMode.style.display = 'none';
        stat22Mode.style.display = 'none';
        stat22RectanglesContainer.style.display = 'none';
        stat22RectanglesContainer2.style.display = 'none';
        stat22RectanglesContainer3.style.display = 'none';
        result.style.display = 'block';
        noteInput.style.display = 'block';
        calculateButton.style.display = 'block';
        nodonemMode.style.display = 'none';
        donem1Mode.style.display = 'none';
        donem2Mode.style.display = 'none';
        donem3Mode.style.display = 'none';
        donem4Mode.style.display = 'none';
        donem5Mode.style.display = 'none';
        donem6Mode.style.display = 'none';
        donem7Mode.style.display = 'none';
        donem8Mode.style.display = 'none';
        rightrectangle.style.display = 'none';
    } else if (mode === 'EXAMRESULTS') {
        examMode.style.display = 'block';
        examResultsMode.style.display = 'block';
        faqMode.style.display = 'none';
        stat22Mode.style.display = 'none';
        stat22RectanglesContainer.style.display = 'none';
        stat22RectanglesContainer2.style.display = 'none';
        stat22RectanglesContainer3.style.display = 'none';
        result.style.display = 'block';
        noteInput.style.display = 'block';
        calculateButton.style.display = 'block';
        nodonemMode.style.display = 'none';
        donem1Mode.style.display = 'none';
        donem2Mode.style.display = 'none';
        donem3Mode.style.display = 'none';
        donem4Mode.style.display = 'none';
        donem5Mode.style.display = 'none';
        donem6Mode.style.display = 'none';
        donem7Mode.style.display = 'none';
        donem8Mode.style.display = 'none';
        rightrectangle.style.display = 'none';
        examResultsText.innerHTML = 'Lütfen geçerli bir vize notu giriniz.';
    } else if (mode === 'FAQ') {
        examMode.style.display = 'none';
        examResultsMode.style.display = 'none';
        faqMode.style.display = 'block';
        stat22Mode.style.display = 'none';
        stat22RectanglesContainer.style.display = 'none';
        stat22RectanglesContainer2.style.display = 'none';
        stat22RectanglesContainer3.style.display = 'none';
        result.style.display = 'none';
        noteInput.style.display = 'none';
        calculateButton.style.display = 'none';
        nodonemMode.style.display = 'none';
        donem1Mode.style.display = 'none';
        donem2Mode.style.display = 'none';
        donem3Mode.style.display = 'none';
        donem4Mode.style.display = 'none';
        donem5Mode.style.display = 'none';
        donem6Mode.style.display = 'none';
        donem7Mode.style.display = 'none';
        donem8Mode.style.display = 'none';
        rightrectangle.style.display = 'none';
    } else if (mode === 'DONEM1') {
        examMode.style.display = 'none';
        examResultsMode.style.display = 'none';
        faqMode.style.display = 'none';
        stat22Mode.style.display = 'block';
        stat22RectanglesContainer.style.display = 'flex';
        stat22RectanglesContainer2.style.display = 'flex';
        stat22RectanglesContainer3.style.display = 'flex';
        nodonemMode.style.display = 'none';
        donem1Mode.style.display = 'block';
        donem2Mode.style.display = 'none';
        donem3Mode.style.display = 'none';
        donem4Mode.style.display = 'none';
        donem5Mode.style.display = 'none';
        donem6Mode.style.display = 'none';
        donem7Mode.style.display = 'none';
        donem8Mode.style.display = 'none';
        rightrectangle.style.display = 'block';
        result.style.display = 'none';
        noteInput.style.display = 'none';
        calculateButton.style.display = 'none';
        rightrectangle.style.zIndex = '2';
        donem1Mode.style.zIndex = '1';
        stat22Mode.style.zIndex = '0';
        donem1Mode.innerHTML = getSemesterContent(1);
    } else if (mode === 'DONEM2') {
        examMode.style.display = 'none';
        examResultsMode.style.display = 'none';
        faqMode.style.display = 'none';
        stat22Mode.style.display = 'block';
        stat22RectanglesContainer.style.display = 'flex';
        stat22RectanglesContainer2.style.display = 'flex';
        stat22RectanglesContainer3.style.display = 'flex';
        nodonemMode.style.display = 'none';
        donem1Mode.style.display = 'none';
        donem2Mode.style.display = 'block';
        donem3Mode.style.display = 'none';
        donem4Mode.style.display = 'none';
        donem5Mode.style.display = 'none';
        donem6Mode.style.display = 'none';
        donem7Mode.style.display = 'none';
        donem8Mode.style.display = 'none';
        result.style.display = 'none';
        noteInput.style.display = 'none';
        calculateButton.style.display = 'none';
        rightrectangle.style.display = 'block';
        rightrectangle.style.zIndex = '2';
        donem2Mode.style.zIndex = '1';
        stat22Mode.style.zIndex = '0';
        donem2Mode.innerHTML = getSemesterContent(2);
    } else if (mode === 'DONEM3') {
        examMode.style.display = 'none';
        examResultsMode.style.display = 'none';
        faqMode.style.display = 'none';
        stat22Mode.style.display = 'block';
        stat22RectanglesContainer.style.display = 'flex';
        stat22RectanglesContainer2.style.display = 'flex';
        stat22RectanglesContainer3.style.display = 'flex';
        nodonemMode.style.display = 'none';
        donem1Mode.style.display = 'none';
        donem2Mode.style.display = 'none';
        donem3Mode.style.display = 'block';
        donem4Mode.style.display = 'none';
        donem5Mode.style.display = 'none';
        donem6Mode.style.display = 'none';
        donem7Mode.style.display = 'none';
        donem8Mode.style.display = 'none';
        result.style.display = 'none';
        noteInput.style.display = 'none';
        calculateButton.style.display = 'none';
        rightrectangle.style.display = 'block';
        rightrectangle.style.zIndex = '2';
        donem3Mode.style.zIndex = '1';
        stat22Mode.style.zIndex = '0';
        donem3Mode.innerHTML = getSemesterContent(3);
    } else if (mode === 'DONEM4') {
        examMode.style.display = 'none';
        examResultsMode.style.display = 'none';
        faqMode.style.display = 'none';
        stat22Mode.style.display = 'block';
        stat22RectanglesContainer.style.display = 'flex';
        stat22RectanglesContainer2.style.display = 'flex';
        stat22RectanglesContainer3.style.display = 'flex';
        nodonemMode.style.display = 'none';
        donem1Mode.style.display = 'none';
        donem2Mode.style.display = 'none';
        donem3Mode.style.display = 'none';
        donem4Mode.style.display = 'block';
        donem5Mode.style.display = 'none';
        donem6Mode.style.display = 'none';
        donem7Mode.style.display = 'none';
        donem8Mode.style.display = 'none';
        result.style.display = 'none';
        noteInput.style.display = 'none';
        calculateButton.style.display = 'none';
        rightrectangle.style.display = 'block';
        rightrectangle.style.zIndex = '2';
        donem4Mode.style.zIndex = '1';
        stat22Mode.style.zIndex = '0';
        donem4Mode.innerHTML = getSemesterContent(4);
    } else if (mode === 'DONEM5') {
        examMode.style.display = 'none';
        examResultsMode.style.display = 'none';
        faqMode.style.display = 'none';
        stat22Mode.style.display = 'block';
        stat22RectanglesContainer.style.display = 'flex';
        stat22RectanglesContainer2.style.display = 'flex';
        stat22RectanglesContainer3.style.display = 'flex';
        nodonemMode.style.display = 'none';
        donem1Mode.style.display = 'none';
        donem2Mode.style.display = 'none';
        donem3Mode.style.display = 'none';
        donem4Mode.style.display = 'none';
        donem5Mode.style.display = 'block';
        donem6Mode.style.display = 'none';
        donem7Mode.style.display = 'none';
        donem8Mode.style.display = 'none';
        result.style.display = 'none';
        noteInput.style.display = 'none';
        calculateButton.style.display = 'none';
        rightrectangle.style.display = 'block';
        rightrectangle.style.zIndex = '2';
        donem5Mode.style.zIndex = '1';
        stat22Mode.style.zIndex = '0';
        donem5Mode.innerHTML = getSemesterContent(5);
    } else if (mode === 'DONEM6') {
        examMode.style.display = 'none';
        examResultsMode.style.display = 'none';
        faqMode.style.display = 'none';
        stat22Mode.style.display = 'block';
        stat22RectanglesContainer.style.display = 'flex';
        stat22RectanglesContainer2.style.display = 'flex';
        stat22RectanglesContainer3.style.display = 'flex';
        nodonemMode.style.display = 'none';
        donem1Mode.style.display = 'none';
        donem2Mode.style.display = 'none';
        donem3Mode.style.display = 'none';
        donem4Mode.style.display = 'none';
        donem5Mode.style.display = 'none';
        donem6Mode.style.display = 'block';
        donem7Mode.style.display = 'none';
        donem8Mode.style.display = 'none';
        result.style.display = 'none';
        noteInput.style.display = 'none';
        calculateButton.style.display = 'none';
        rightrectangle.style.display = 'block';
        rightrectangle.style.zIndex = '2';
        donem6Mode.style.zIndex = '1';
        stat22Mode.style.zIndex = '0';
        donem6Mode.innerHTML = getSemesterContent(6);
    } else if (mode === 'DONEM7') {
        examMode.style.display = 'none';
        examResultsMode.style.display = 'none';
        faqMode.style.display = 'none';
        stat22Mode.style.display = 'block';
        stat22RectanglesContainer.style.display = 'flex';
        stat22RectanglesContainer2.style.display = 'flex';
        stat22RectanglesContainer3.style.display = 'flex';
        nodonemMode.style.display = 'none';
        donem1Mode.style.display = 'none';
        donem2Mode.style.display = 'none';
        donem3Mode.style.display = 'none';
        donem4Mode.style.display = 'none';
        donem5Mode.style.display = 'none';
        donem6Mode.style.display = 'none';
        donem7Mode.style.display = 'block';
        donem8Mode.style.display = 'none';
        rightrectangle.style.display = 'block';
        result.style.display = 'none';
        noteInput.style.display = 'none';
        calculateButton.style.display = 'none';
        rightrectangle.style.zIndex = '2';
        donem7Mode.style.zIndex = '1';
        stat22Mode.style.zIndex = '0';
        donem7Mode.innerHTML = getSemesterContent(7);
    } else if (mode === 'DONEM8') {
        examMode.style.display = 'none';
        examResultsMode.style.display = 'none';
        faqMode.style.display = 'none';
        stat22Mode.style.display = 'block';
        stat22RectanglesContainer.style.display = 'flex';
        stat22RectanglesContainer2.style.display = 'flex';
        stat22RectanglesContainer3.style.display = 'flex';
        nodonemMode.style.display = 'none';
        donem1Mode.style.display = 'none';
        donem2Mode.style.display = 'none';
        donem3Mode.style.display = 'none';
        donem4Mode.style.display = 'none';
        donem5Mode.style.display = 'none';
        donem6Mode.style.display = 'none';
        donem7Mode.style.display = 'none';
        donem8Mode.style.display = 'block';
        result.style.display = 'none';
        noteInput.style.display = 'none';
        calculateButton.style.display = 'none';
        rightrectangle.style.display = 'block';
        rightrectangle.style.zIndex = '2';
        donem8Mode.style.zIndex = '1';
        stat22Mode.style.zIndex = '0';
        donem8Mode.innerHTML = getSemesterContent(8);
    }
}

function calculateFinalNote() {
    var noteInput = document.getElementById('noteInput');
    var examResultsText = document.getElementById('examResultsText');

    if (noteInput.value.trim() === "" || isNaN(noteInput.value) || noteInput.value < 0 || noteInput.value > 100) {
        examResultsText.innerHTML = 'Invalid input. Please enter a valid Midterm Note between 0 and 100.';
        switchMode('EXAMRESULTS');
        return;
    }

    if (document.getElementById('stat22Mode').style.display === 'block') {
        stat22SavedInputValue = noteInput.value;
    }

    var midtermNote = parseFloat(noteInput.value);
    var requiredFinalNoteAA = Math.max((87.5 - (midtermNote * 0.4)) / 0.6, 44);
    var requiredFinalNoteBA = Math.max((80.5 - (midtermNote * 0.4)) / 0.6, 44);
    var requiredFinalNoteBB = Math.max((73.5 - (midtermNote * 0.4)) / 0.6, 44);
    var requiredFinalNoteCB = Math.max((66.5 - (midtermNote * 0.4)) / 0.6, 44);
    var requiredFinalNoteCC = Math.max((59.5 - (midtermNote * 0.4)) / 0.6, 44);
    var requiredFinalNoteDC = Math.max((52.5 - (midtermNote * 0.4)) / 0.6, 44);
    var requiredFinalNoteDD = Math.max((45.5 - (midtermNote * 0.4)) / 0.6, 44);

    switchMode('EXAMRESULTS');
    examResultsText.innerHTML = `
    AA almak için: ${requiredFinalNoteAA > 100 ? 'Alamaz' : Math.trunc(requiredFinalNoteAA) + 1}<br>
    BA almak için: ${requiredFinalNoteBA > 100 ? 'Alamaz' : Math.trunc(requiredFinalNoteBA) + 1}<br>
    BB almak için: ${requiredFinalNoteBB > 100 ? 'Alamaz' : Math.trunc(requiredFinalNoteBB) + 1}<br>
    CB almak için: ${requiredFinalNoteCB > 100 ? 'Alamaz' : Math.trunc(requiredFinalNoteCB) + 1}<br>
    CC almak için: ${requiredFinalNoteCC > 100 ? 'Alamaz' : Math.trunc(requiredFinalNoteCC) + 1}<br>
    DC almak için: ${requiredFinalNoteDC > 100 ? 'Alamaz' : Math.trunc(requiredFinalNoteDC) + 1}<br>
    DD almak için: ${requiredFinalNoteDD > 100 ? 'Alamaz' : Math.trunc(requiredFinalNoteDD) + 1}<br>`;
}

function selectSemester(semester) {
    var middleRectangle = document.querySelector('.middleRectangle');
    var semesterLessonsList = document.getElementById('semesterLessonsList');
    var semesterData = getSemesterData(semester);
    semesterLessonsList.innerHTML = semesterData.map(item => `<li>${item.subject}: ${createDropdownMenu(item.id, getCurrentGrade(item.id))}</li>`).join('');
}

function getSemesterData(semester) {
    var semesterData = [];
    switch (semester) {
        case 1:
            semesterData = [
                { id: 'inkilapi', subject: '(2) ATATÜRK İLKELERİ VE İNKILAP TARİHİ I' },
                { id: 'iktisadi', subject: '(3) İKTİSADA GİRİŞ I' },
                { id: 'scientifici', subject: '(3) SCIENTIFIC ENGLISH I' },
                { id: 'bilgisayar', subject: '(3) BİLGİSAYAR' },
                { id: 'kariyer', subject: '(2) KARİYER PLANLAMA' },
                { id: 'istatistik', subject: '(7) İSTATİSTİĞE GİRİŞ' },
                { id: 'isletmei', subject: '(3) İŞLETMEYE GİRİŞ I' },
                { id: 'matematiki', subject: '(5) MATEMATİK I' },
                { id: 'turkdilii', subject: '(2) TÜRK DİLİ I' },
            ];
            break;
        case 2:
            semesterData = [
                { id: 'inkilapii', subject: '(2) ATATÜRK İLKELERİ VE İNKILAP TARİHİ II' },
                { id: 'iktisadii', subject: '(3) İKTİSADA GİRİŞ II' },
                { id: 'scientificii', subject: '(3) SCIENTIFIC ENGLISH II' },
                { id: 'istbiluygi', subject: '(3) İSTATİSTİKTE BİLGİSAYAR UYGULAMALARI I' },
                { id: 'basic', subject: '(7) BASIC STATISTICS' },
                { id: 'isletmeii', subject: '(3) İŞLETMEYE GİRİŞ II' },
                { id: 'matematikii', subject: '(5) MATEMATİK II' },
                { id: 'turkdiliii', subject: '(2) TÜRK DİLİ II' },
                { id: 'uyg', subject: '(2) ÜNİVERSİTE YAŞAMINA GEÇİŞ' },
            ];
            break;
        case 3:
            semesterData = [
                { id: 'tbt', subject: '(3) TEMEL BİLGİ TEKNOLOJİLERİ' },
                { id: 'kemo', subject: '(3) KEMOMETRİ' },
                { id: 'prob', subject: '(7) PROBABILITY' },
                { id: 'applied', subject: '(6) APPLIED STATISTICS' },
                { id: 'istbiluygii', subject: '(2) İSTATİSTİKTE BİLGİSAYAR UYGULAMALARI II' },
                { id: 'matiii', subject: '(4) MATEMATİK III' },
                { id: 'dif', subject: '(3) DİFERANSİYEL DENKLEMLER' },
                { id: 'thu', subject: '(2) TOPLUMA HİZMET UYGULAMALARI' },
            ];
            break;
        case 4:
            semesterData = [
                { id: 'ntpg', subject: '(3) NESNE TABANLI PROGRAMLAMAYA GİRİŞ' },
                { id: 'matstat', subject: '(8) MATHEMATICAL STATISTICS' },
                { id: 'matris', subject: '(5) MATRİS TEORİSİ VE İSTATİSTİK UYGULAMALARI' },
                { id: 'algo', subject: '(5) İSTATİSTİKSEL UYGULAMALAR İLE ALGORİTMA TASARIMI' },
                { id: 'opr', subject: '(4) INTRODUCTION TO OPERATIONS RESEARCH' },
                { id: 'mativ', subject: '(5) MATEMATİK IV' },
            ];
            break;
        case 5:
            semesterData = [
                { id: 'veri', subject: '(4) VERİ TABANI' },
                { id: 'simu', subject: '(4) SIMULATION' },
                { id: 'bulanik', subject: '(4) BULANIK OLASILIK VE İSTATİSTİK' },
                { id: 'olateo', subject: '(4) OLASILIK TEORİSİ' },
                { id: 'katego', subject: '(4) KATEGORİK VERİ ANALİZİ' },
                { id: 'regresyon', subject: '(7) REGRESSION ANALYSIS' },
                { id: 'arastir', subject: '(6) ARAŞTIRMA YÖNTEMLERİ' },
                { id: 'isthazyaz', subject: '(6) İSTATİSTİKSEL HAZIR YAZILIMLAR' },
            ];
            break;
        case 6:
            semesterData = [
                { id: 'alan', subject: '(4) ALAN ARAŞTIRMALARI' },
                { id: 'verii', subject: '(5) VERİ TABANI PROGRAMLAMA' },
                { id: 'cassm', subject: '(4) COMPUTER AIDED SYSTEM SIMULATION AND MODELING' },
                { id: 'carti', subject: '(4) C++ İLE PROGRAMLAMA' },
                { id: 'skolas', subject: '(7) STOKASTİK SÜREÇLER' },
                { id: 'param', subject: '(6) PARAMETRİK OLMAYAN İSTATİSTİKSEL YÖNTEMLER' },
                { id: 'ornek', subject: '(6) ÖRNEKLEME' },
            ];
            break;
        case 7:
            semesterData = [
                { id: 'zaman', subject: '(5) ZAMAN SERİLERİ' },
                { id: 'explo', subject: '(5) EXPLORATORY DATA ANALYSIS' },
                { id: 'sra', subject: '(5) STATISTICAL RELIABILITY ANALYSIS' },
                { id: 'guncel', subject: '(5) GÜNCEL PROGRAMLAMA DİLLERİ' },
                { id: 'multi', subject: '(8) MULTIVARIATE STATISTICS' },
                { id: 'sqc', subject: '(7) STATISTICAL QUALITY CONTROL' },
                { id: 'kaynak', subject: '(5) KAYNAK TARAMA TEKNİKLERİ' },
            ];
            break;
        case 8:
            semesterData = [
                { id: 'robust', subject: '(5) ROBUST STATISTICS' },
                { id: 'sira', subject: '(5) SIRA İSTATİSTİKLERİ' },
                { id: 'ekonom', subject: '(5) EKONOMETRİK MODELLER' },
                { id: 'surec', subject: '(5) SÜREÇ KONTROLÜNDE PROBLEM ÇÖZME YÖNTEMLERİ' },
                { id: 'sanayi', subject: '(5) SANAYİ EKONOMİSİ' },
                { id: 'design', subject: '(8) DESIGN OF EXPERIMENTS' },
                { id: 'appmulti', subject: '(7) APPLICATIONS OF MULTIVARIATE STATISTICS' },
                { id: 'tez', subject: '(5) BİTİRME TEZİ' },
            ];
            break;
        default:
            semesterData = [];
    }
    return semesterData;
}

function createDropdownMenu(id, currentGrade) {
    var grades = ['AA', 'BA', 'BB', 'CB', 'CC', 'DC', 'DD', 'FD', 'FF', '--'];
    var dropdownMenu = `<select id="${id}">`;

    grades.forEach(grade => {
        var selected = grade === currentGrade ? 'selected' : '';
        dropdownMenu += `<option value="${grade}" ${selected}>${grade}</option>`;
    });

    dropdownMenu += '</select>';
    return dropdownMenu;
}

window.onclick = function (event) {
    if (!event.target.matches('.modeButton') && !event.target.matches('.semesterButton')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = 'none';
            }
        }
    }
}

function toggleDropdown(dropdownId) {
    var dropdownContent = document.getElementById(dropdownId);
    if (dropdownContent.style.display === 'block')
    {dropdownContent.style.display = 'none';}
    else
    {dropdownContent.style.display = 'block';}
}

function getCurrentGrade(id) {
    var dropdown = document.getElementById(id);
    return dropdown ? dropdown.value : '--';
}

function getSemesterContent(semester) {
    var semesterData = getSemesterData(semester);
    var content = '<ul>';

    semesterData.forEach(function (lesson) {
        content += `<li>${lesson.subject}: ${createDropdownMenu(lesson.id, getCurrentGrade(lesson.id))}</li>`;
    });

    content += '</ul>';
    return content;
}

function calculateGPA() {
    var totalPoints = 0;
    var totalCredits = 0;
    var donem1Data = getSemesterData(1);
    var donem2Data = getSemesterData(2);
    var donem3Data = getSemesterData(3);
    var donem4Data = getSemesterData(4);
    var donem5Data = getSemesterData(5);
    var donem6Data = getSemesterData(6);
    var donem7Data = getSemesterData(7);
    var donem8Data = getSemesterData(8);

    function calculateSemesterAverage(semesterData) {
        var totalPoints = 0;
        var totalCredits = 0;

        for (var i = 0; i < semesterData.length; i++) {
            var lessonId = semesterData[i].id;
            var grade = getCurrentGrade(lessonId);
            if (grade !== '--') {
                var points = lessonPoints[lessonId];
                var gradeValue = convertGradeToValue(grade);
                totalPoints += points * gradeValue;
                totalCredits += points;
            }
        }

        return totalCredits !== 0 ? (totalPoints / totalCredits) : 0.0;
    }

    var lessonPoints = {
        'inkilapi': 2,
        'iktisadi': 3,
        'scientifici': 3,
        'bilgisayar': 3,
        'kariyer': 2,
        'istatistik': 7,
        'isletmei': 3,
        'matematiki': 5,
        'turkdilii': 2,

        'inkilapii': 2,
        'iktisadii': 3,
        'scientificii': 3,
        'istbiluygi': 3,
        'basic': 7,
        'isletmeii': 3,
        'matematikii': 5,
        'turkdiliii': 2,
        'uyg': 2,

        'tbt': 3,
        'kemo': 3,
        'prob': 7,
        'applied': 6,
        'istbiluygii': 2,
        'matiii': 4,
        'dif': 3,
        'thu': 2,

        'ntpg': 3,
        'matstat': 8,
        'matris': 5,
        'algo': 5,
        'opr': 4,
        'mativ': 5,

        'veri': 4,
        'bulanik': 4,
        'regresyon': 7,
        'arastir': 6,
        'isthazyaz': 6,
        'olateo': 4,
        'simu': 4,
        'katego': 4,

        'alan': 4,
        'cassm': 4,
        'carti': 4,
        'skolas': 7,
        'param': 6,
        'ornek': 6,
        'verii': 5,

        'zaman': 5,
        'explo': 5,
        'sra': 5,
        'guncel': 5,
        'multi': 8,
        'sqc': 7,
        'kaynak': 5,

        'robust': 5,
        'sira': 5,
        'ekonom': 5,
        'surec': 5,
        'sanayi': 5,
        'design': 8,
        'appmulti': 7,
        'tez': 5,

    };

    for (var lessonId in lessonPoints) {
        var grade = getCurrentGrade(lessonId);
        if (grade !== '--') {
            var points = lessonPoints[lessonId];
            var gradeValue = convertGradeToValue(grade);
            totalPoints += points * gradeValue;
            totalCredits += points;
        }
    }

    var gpa = totalCredits !== 0 ? (totalPoints / totalCredits).toFixed(2) : 0.0;
    document.getElementById('calculatedGPA').innerText = gpa;

    for (var semester = 1; semester <= 2; semester++) {
    var semesterData = getSemesterData(semester);

    var semesterTotalPoints = 0;
    var semesterTotalCredits = 0;

    for (var i = 0; i < semesterData.length; i++) {
        var lessonId = semesterData[i].id;
        var grade = getCurrentGrade(lessonId);
        if (grade !== '--') {
            var points = lessonPoints[lessonId];
            var gradeValue = convertGradeToValue(grade);
            semesterTotalPoints += points * gradeValue;
            semesterTotalCredits += points;
        }
    }

    document.getElementById(`donem${semester}ort`).innerText = (semesterTotalCredits !== 0 ? (semesterTotalPoints / semesterTotalCredits) : 0.0).toFixed(2);

    totalPoints += semesterTotalPoints;
    totalCredits += semesterTotalCredits;
    }

    var donem1ort = calculateSemesterAverage(donem1Data);
    var donem2ort = calculateSemesterAverage(donem2Data);
    var donem3ort = calculateSemesterAverage(donem3Data);
    var donem4ort = calculateSemesterAverage(donem4Data);
    var donem5ort = calculateSemesterAverage(donem5Data);
    var donem6ort = calculateSemesterAverage(donem6Data);
    var donem7ort = calculateSemesterAverage(donem7Data);
    var donem8ort = calculateSemesterAverage(donem8Data);

    document.getElementById('donem1ort').innerText = donem1ort.toFixed(2);
    document.getElementById('donem2ort').innerText = donem2ort.toFixed(2);
    document.getElementById('donem3ort').innerText = donem3ort.toFixed(2);
    document.getElementById('donem4ort').innerText = donem4ort.toFixed(2);
    document.getElementById('donem5ort').innerText = donem5ort.toFixed(2);
    document.getElementById('donem6ort').innerText = donem6ort.toFixed(2);
    document.getElementById('donem7ort').innerText = donem7ort.toFixed(2);
    document.getElementById('donem8ort').innerText = donem8ort.toFixed(2);

    var donem1ort = parseFloat(document.getElementById('donem1ort').innerText);
    var donem2ort = parseFloat(document.getElementById('donem2ort').innerText);
    var donem3ort = parseFloat(document.getElementById('donem3ort').innerText);
    var donem4ort = parseFloat(document.getElementById('donem4ort').innerText);
    var donem5ort = parseFloat(document.getElementById('donem5ort').innerText);
    var donem6ort = parseFloat(document.getElementById('donem6ort').innerText);
    var donem7ort = parseFloat(document.getElementById('donem7ort').innerText);
    var donem8ort = parseFloat(document.getElementById('donem8ort').innerText);

    var totalPointsYear1 = 0;
    var totalCreditsYear1 = 0;

    var totalPointsYear2 = 0;
    var totalCreditsYear2 = 0;

    var totalPointsYear3 = 0;
    var totalCreditsYear3 = 0;

    var totalPointsYear4 = 0;
    var totalCreditsYear4 = 0;

    for (var semester = 1; semester <= 8; semester++) {
        var semesterData = getSemesterData(semester);

        var semesterTotalPoints = 0;
        var semesterTotalCredits = 0;

        for (var i = 0; i < semesterData.length; i++) {
            var lessonId = semesterData[i].id;
            var grade = getCurrentGrade(lessonId);

            if (grade !== '--') {
                var points = lessonPoints[lessonId];
                var gradeValue = convertGradeToValue(grade);
                semesterTotalPoints += points * gradeValue;
                semesterTotalCredits += points;
            }
        }

        switch (semester) {
            case 1:
            case 2:
                totalPointsYear1 += semesterTotalPoints;
                totalCreditsYear1 += semesterTotalCredits;
                break;
            case 3:
            case 4:
                totalPointsYear2 += semesterTotalPoints;
                totalCreditsYear2 += semesterTotalCredits;
                break;
            case 5:
            case 6:
                totalPointsYear3 += semesterTotalPoints;
                totalCreditsYear3 += semesterTotalCredits;
                break;
            case 7:
            case 8:
                totalPointsYear4 += semesterTotalPoints;
                totalCreditsYear4 += semesterTotalCredits;
                break;
        }
    }

    var gpaYear1 = totalCreditsYear1 !== 0 ? (totalPointsYear1 / totalCreditsYear1).toFixed(2) : 0.0;
    var gpaYear2 = totalCreditsYear2 !== 0 ? (totalPointsYear2 / totalCreditsYear2).toFixed(2) : 0.0;
    var gpaYear3 = totalCreditsYear3 !== 0 ? (totalPointsYear3 / totalCreditsYear3).toFixed(2) : 0.0;
    var gpaYear4 = totalCreditsYear4 !== 0 ? (totalPointsYear4 / totalCreditsYear4).toFixed(2) : 0.0;

    document.getElementById('gpaYear1').innerText = gpaYear1;
    document.getElementById('gpaYear2').innerText = gpaYear2;
    document.getElementById('gpaYear3').innerText = gpaYear3;
    document.getElementById('gpaYear4').innerText = gpaYear4;

    return {
        donem1ort: donem1ort,
        donem2ort: donem2ort,
        donem3ort: donem3ort,
        donem4ort: donem4ort,
        donem5ort: donem5ort,
        donem6ort: donem6ort,
        donem7ort: donem7ort,
        donem8ort: donem8ort,
        gpaYear1: gpaYear1,
        gpaYear2: gpaYear2,
        gpaYear3: gpaYear3,
        gpaYear4: gpaYear4,
    };
}

function convertGradeToValue(grade) {
    var gradeValues = {
        'AA': 4.0,
        'BA': 3.5,
        'BB': 3.0,
        'CB': 2.5,
        'CC': 2.0,
        'DC': 1.5,
        'DD': 1.0,
        'FD': 0.5,
        'FF': 0.0,
    };
    return gradeValues[grade] || 0.0;
}

switchMode('STAT22');