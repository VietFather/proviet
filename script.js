// Ваши данные из Supabase
const SUPABASE_URL = 'https://fpcmktwqhbwwollythsu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwY21rdHdxaGJ3d29sbHl0aHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MDIzNzQsImV4cCI6MjA1OTk3ODM3NH0.iPNCkz3_rYPr38kuifVvu88BcRObW_Wlabn8H37UKKE';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const tableBody = document.getElementById('tableBody');
const searchInput = document.getElementById('searchInput');
let allData = [];

async function fetchData() {
    // Получаем все данные из таблицы 'search_content'
    const { data, error } = await supabase
        .from('search_content') 
        .select('*');

    if (error) {
        console.error('Ошибка при получении данных:', error);
        tableBody.innerHTML = `<tr><td colspan="2">Ошибка при загрузке данных: ${error.message}</td></tr>`;
        return;
    }
    allData = data;
    renderTable(allData);
}

// ИЗМЕНЕНИЕ 1: Функция отображения данных
function renderTable(data) {
    tableBody.innerHTML = '';
    if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="2">Ничего не найдено.</td></tr>';
        return;
    }
    data.forEach(item => {
        const row = document.createElement('tr');
        // Теперь мы выводим только столбцы 'name' и 'ai_reviews_summary'
        row.innerHTML = `
            <td>${item.name || 'Без названия'}</td>
            <td>${item.ai_reviews_summary || 'Нет данных'}</td>
        `;
        tableBody.appendChild(row);
    });
}

// ИЗМЕНЕНИЕ 2: Логика поиска
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    if (!searchTerm) {
        renderTable(allData);
        return;
    }

    const filteredData = allData.filter(item => {
        // Поиск ведется ТОЛЬКО по полю 'ai_reviews_summary'
        const summaryMatch = item.ai_reviews_summary && item.ai_reviews_summary.toLowerCase().includes(searchTerm);
        
        return summaryMatch;
    });
    renderTable(filteredData);
});

// Запускаем получение данных при загрузке страницы
fetchData();
