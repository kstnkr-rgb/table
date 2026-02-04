document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let number = document.getElementById('searchNumber').value;
    let resultElement = document.getElementById('result');

    // Загружаем CSV файл из репозитория
    fetch('data.csv')  // Путь к файлу CSV на GitHub Pages
        .then(response => response.text())
        .then(data => {
            // Разделяем данные на строки
            let rows = data.split('\n');
            let found = false;

            // Проходим по строкам и ищем совпадение
            for (let row of rows) {
                let columns = row.split(','); // Разделяем строки на колонки (для CSV)
                if (columns[0] === number) { // Если первое значение в строке совпадает с введённым числом
                    resultElement.innerText = `Информация: ${columns[1]}`; // Отображаем данные из второй колонки
                    found = true;
                    break;
                }
            }

            if (!found) {
                resultElement.innerText = 'Совпадений не найдено.';
            }
        })
        .catch(error => {
            console.error('Ошибка при чтении файла:', error);
            resultElement.innerText = 'Ошибка при чтении данных.';
        });
});
