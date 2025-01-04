// Показать темы
chrome.storage.local.get(['isEnabledJournalThemes'], function(data) {
    if (document.location.href.match("https://spo.ruobr.ru/deanery/progress/group_journal/*") && data.isEnabledJournalThemes == true) {
        var table = document
        .getElementById('tableData')
        .getElementsByTagName('thead')[0];
        var row = table.insertRow(1);

        var cell = row.insertCell();
        var themes = document.createTextNode('Темы');
        cell.appendChild(themes);

        for (let c = 1; c < document.getElementById('tableData').getElementsByClassName('info')[3].getElementsByTagName('th').length; c++) {
            cell = row.insertCell();
            var pElem = document.createElement('div');
            pElem.classList.add('themeName');
            
            var theme = document.createTextNode(
                table.rows[2].cells[c].getElementsByTagName('a')[0].getAttribute('title')
            );
            pElem.appendChild(theme);
            cell.appendChild(pElem);
            cell.id = 'cellName';
        }
    }
});
// Показать количество отсутствующих
chrome.storage.local.get(['isEnabledAbsentCount'], function(data) {
    if (document.location.href.match("https://spo.ruobr.ru/deanery/progress/group_journal/*") && data.isEnabledAbsentCount == true) {
        var table = document
        .getElementById('tableData')
        .getElementsByTagName('tbody')[0];
        var absentRow = table.insertRow();
        var absentCell = absentRow.insertCell();
        var absentText = document.createTextNode('Отсутствовало:');
        absentCell.appendChild(absentText);
        let pairCount = document.getElementById('tableData').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td').length;
        let studCount = document.querySelectorAll('[fio]').length;
        console.log(studCount);
        let count = 0;
        for (var i = 1; i < pairCount; i++) {
            for (let j = 0; j < studCount; j++) {
                if (table.rows[j].cells[i].getElementsByTagName("span")[1].innerHTML == ' Н') {
                    count++;
                }
            }
            absentCell = absentRow.insertCell();
            absentText = document.createTextNode(count);
            absentCell.appendChild(absentText);
            count = 0;
        }
        
    }
});
// Показать количество отсутствующих
chrome.storage.local.get(['isEnabledPresentCount'], function(data) {
    if (document.location.href.match("https://spo.ruobr.ru/deanery/progress/group_journal/*") && data.isEnabledPresentCount == true) {
        var table = document
        .getElementById('tableData')
        .getElementsByTagName('tbody')[0];
        var presentRow = table.insertRow();
        var presentCell = presentRow.insertCell();
        var presentText = document.createTextNode('Присутствовало:');
        presentCell.appendChild(presentText);
        let pairCount = document.getElementById('tableData').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td').length;
        let studCount = document.querySelectorAll('[fio]').length;
        console.log(studCount);
        let count = 0;
        for (var i = 1; i < pairCount; i++) {
            for (let j = 0; j < studCount; j++) {
                if (table.rows[j].cells[i].getElementsByTagName("span")[1].innerHTML == ' Н') {
                    count++;
                }
            }
            presentCell = presentRow.insertCell();
            presentText = document.createTextNode(studCount - count);
            presentCell.appendChild(presentText);
            count = 0;
        }
    }
});
