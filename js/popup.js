
// CheckBox относящиеся к КТП
const importKTP = document.getElementById('importKTP');
const clearKTP = document.getElementById('clearKTP');
const exportKTP = document.getElementById('exportKTP');

// CheckBox относящиеся к журналу
const themesJournal = document.getElementById('themesJournal');
const absentJournal = document.getElementById('absentJournal');
const presentJournal = document.getElementById('presentJournal');

// Загрузка checkBox из localStorage
chrome.storage.local.get(['isEnabledImportKTP'], function(data) {
  if (data.isEnabledImportKTP == true) {
    importKTP.checked = true;
  }else{
    importKTP.checked = false;
  }
});
// Очистка КТП
chrome.storage.local.get(['isEnabledClearKTP'], function(data) {
  if (data.isEnabledClearKTP == true) {
    clearKTP.checked = true;
  }else{
    clearKTP.checked = false;
  }
});
// Экспорт КТП
chrome.storage.local.get(['isEnabledExportKTP'], function(data) {
  if (data.isEnabledExportKTP == true) {
    exportKTP.checked = true;
  }else{
    exportKTP.checked = false;
  }
});
// Обработка импорт КТП
importKTP.addEventListener('change', function() {
  if (this.checked) {
    chrome.storage.local.set({ 'isEnabledImportKTP': true });
  }else{
    chrome.storage.local.set({ 'isEnabledImportKTP': false });
  }
});
// Обработка очистки КТП
clearKTP.addEventListener('change', function() {
  if (this.checked) {
    chrome.storage.local.set({ 'isEnabledClearKTP': true });
  }else{
    chrome.storage.local.set({ 'isEnabledClearKTP': false });
  }
});
// Обработки экспорта КТП
exportKTP.addEventListener('change', function() {
  if (this.checked) {
    chrome.storage.local.set({ 'isEnabledExportKTP': true });
  }else{
    chrome.storage.local.set({ 'isEnabledExportKTP': false });
  }
});
// Показывать темы
chrome.storage.local.get(['isEnabledJournalThemes'], function(data) {
  if (data.isEnabledJournalThemes == true) {
    themesJournal.checked = true;
  }else{
    themesJournal.checked = false;
  }
});
// Показывать количество отсутствующих
chrome.storage.local.get(['isEnabledAbsentCount'], function(data) {
  if (data.isEnabledAbsentCount == true) {
    absentJournal.checked = true;
  }else{
    absentJournal.checked = false;
  }
});
// Показывать количество присутствующих
chrome.storage.local.get(['isEnabledPresentCount'], function(data) {
  if (data.isEnabledPresentCount == true) {
    presentJournal.checked = true;
  }else{
    presentJournal.checked = false;
  }
});
// Обработка переключателя количества отсутствующих
themesJournal.addEventListener('change', function() {
  if (this.checked) {
    chrome.storage.local.set({ 'isEnabledJournalThemes': true });
  }else{
    chrome.storage.local.set({ 'isEnabledJournalThemes': false });
  }
});
// Обработка переключателя количества отсутствующих
absentJournal.addEventListener('change', function() {
  if (this.checked) {
    chrome.storage.local.set({ 'isEnabledAbsentCount': true });
  }else{
    chrome.storage.local.set({ 'isEnabledAbsentCount': false });
  }
});
// Обработка переключателя количества присутствующих
presentJournal.addEventListener('change', function() {
  if (this.checked) {
    chrome.storage.local.set({ 'isEnabledPresentCount': true });
  }else{
    chrome.storage.local.set({ 'isEnabledPresentCount': false });
  }
});