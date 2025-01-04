// Импорт КТП
chrome.storage.local.get(['isEnabledImportKTP'], function(data) {
    if (document.location.href.match("https://spo.ruobr.ru/study/ktp/*/") && data.isEnabledImportKTP == true) {
        const button = document.createElement("button");
        button.className = "btn btn-primary";
        button.innerHTML = "Импорт";
        button.onclick = function() {
            // Создаем форму
            let importDiv = document.createElement("div");
            importDiv.id = "ImportForm";
            
            // Создаём подпись для поля ввода разделителя
            let labelDelimiter = document.createElement("label");
            labelDelimiter.innerHTML = "Разделитель: ";
            
            // Создаем input для ввода разделителя
            let inputDelimiter = document.createElement("input");
            inputDelimiter.type = "text";
            inputDelimiter.name = "delimiter";
            inputDelimiter.value = ";";
            
            // Создаём input для выбора файла
            let inputFile = document.createElement("input");
            inputFile.type = "file";
            inputFile.name = "file";
            inputFile.accept = ".csv";
    
            // Создаём кнопку Импорт для работы с файлом
            let buttonImport = document.createElement("button");
            buttonImport.type = "submit";
            buttonImport.className = "btn btn-primary";
            buttonImport.innerHTML = "Импорт";
            buttonImport.onclick = function() {
                importKTP(inputFile.files[0], inputDelimiter.value);
            }
    
            // Добавляем форму в div
            labelDelimiter.appendChild(inputDelimiter);
            importDiv.appendChild(labelDelimiter);
            importDiv.appendChild(inputFile);
            importDiv.appendChild(buttonImport);
            // Добавляем форму в документ
            document.body.appendChild(importDiv);
        }
        let controls = document.querySelectorAll(".controls div");
        controls[1].appendChild(button);
    }
});

// Экспорт КТП
chrome.storage.local.get(['isEnabledExportKTP'], function(data) {
    if (document.location.href.match("https://spo.ruobr.ru/study/ktp/*/") && data.isEnabledExportKTP == true) {
        const button = document.createElement("button");
        button.className = "btn btn-primary";
        button.innerHTML = "Экспорт";
        button.onclick = function() {
            exportKTP();
        }
        let controls = document.querySelectorAll(".controls div");
        controls[1].appendChild(button);
    }
});
// Очистить КТП
chrome.storage.local.get(['isEnabledClearKTP'], function(data) {
    if (document.location.href.match("https://spo.ruobr.ru/study/ktp/*/") && data.isEnabledClearKTP == true) {
        const button = document.createElement("button");
        button.className = "btn btn-primary";
        button.innerHTML = "Очистить";
        button.onclick = function() {
            clearKTP();
        }
        let controls = document.querySelectorAll(".controls div");
        controls[1].appendChild(button);
    }
});
// Функция для импорта КТП из файла
function importKTP(file, delimiter) {
    // Читаем файл
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        // Получаем данные из файла
        let data = reader.result;
        // Разбиваем данные на строки
        let lines = data.split("\n");
        // Проходимся по строкам
        for (let i = 1; i < lines.length - 1; i++) {
            // Разбиваем строку на столбцы
            let data = lines[i].split(delimiter);
            if (data[0] != "") {
                var xhr = new XMLHttpRequest();
                str = "https://spo.ruobr.ru/study/ktp/" + window.location.href.split("/")[5] + "/add/"
                xhr.open("POST", str, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                var request = `ktp_subject=${window.location.href.split("/")[5]}&order_num=${i - 1}&name=${data[0]}&duration=${data[1]}&text=${data[2]}&hw=&csrfmiddlewaretoken=${document.cookie.split(";")[0].split("=")[1]}`;
                console.log(request);
                xhr.send(request);
            }
        }
    }
    location.reload(5);
}
// Очистить КТП
function clearKTP() {
    // Получаем таблицу
    let table = document.querySelector("table");
    // Получаем все строки
    let rows = table.querySelectorAll("tr");
    // Проходимся по строкам
    for (let i = 1; i < rows.length; i++) {
        // Получаем id строки
        let id = rows[i].getAttribute('id');
        // Получаем ссылку на удаление
        let link = window.location.href + "delete/" + id + "/";
        var formData = new FormData(document.forms.person);
        // добавить к пересылке ещё пару ключ - значение
        formData.append("csrfmiddlewaretoken", `${document.cookie.split(";")[0].split("=")[1]}`);

        // Отправляем POST запрос на удаление
        var xhr = new XMLHttpRequest();
        xhr.open("POST", link);
        xhr.send(formData);
        console.log(link);
    }
    location.reload();
}
// Экспорт КТП в файл csv
function exportKTP() {
    // Переменная для хранения данных в файл
    let data = "";
    // Получаем таблицу
    let table = document.querySelector("table");
    // Получаем все строки
    let rows = table.querySelectorAll("tr");
    // Проходимся по строкам
    for (let i = 1; i < rows.length; i++) {
        // Строка 
        let row = rows[i];
        // Получаем все ячейки
        let cells = row.querySelectorAll("td");
        // Проходимся по ячейкам
        for (let j = 1; j < cells.length - 2; j++) {
            if (cells[j].innerText != "—"){
                if (j == 1) {
                    // Получаем значение ячейки
                    let value = cells[j].innerText.slice(2);
                    // Добавляем значение в строку
                    data += value + ",";
                }else if (j == 3) {
                    data += cells[j].innerHTML.match("Да").index != 0 ? "Да" : "Нет";
                    data += ",";
                }else {
                    data += cells[j].innerText + ",";
                }
            }
            else{
                data += ",";
            }
        }
        data += "\n";
        
    }
    
    console.log(data);
}