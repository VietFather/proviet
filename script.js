// Ваши данные из Supabase
const SUPABASE_URL = 'https://fpcmktwqhbwwollythsu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwY21rdHdxaGJ3d29sbHl0aHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MDIzNzQsImV4cCI6MjA1OTk3ODM3NH0.iPNCkz3_rYPr38kuifVvu88BcRObW_Wlabn8H37UKKE';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const tableBody = document.getElementById('tableBody');
const searchInput = document.getElementById('searchInput');
let allData = [];

async function fetchData() {
    // Имя вашей таблицы было изменено здесь на 'search_content'
    const { data, error } = await supabase
        .from('search_content') 
        .select('*');

    if (error) {
        console.error('Ошибка при получении данных:', error);
        tableBody.innerHTML = `<tr><td colspan="4">Ошибка при загрузке данных: ${error.message}</td></tr>`;
        return;
    }
    allData = data;
    renderTable(allData);
}

function renderTable(data) {
    tableBody.innerHTML = '';
    if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4">Ничего не найдено.</td></tr>';
        return;
    }
    data.forEach(item => {
        const row = document.createElement('tr');
        // Вставляем данные из ваших столбцов: name, description, formatted_address, tags
        row.innerHTML = `
            <td>${item.name || ''}</td>
            <td>${item.description || ''}</td>
            <td>${item.formatted_address || ''}</td>
            <td>${(item.tags || []).join(', ')}</td>
        `;
        tableBody.appendChild(row);
    });
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    if (!searchTerm) {
        renderTable(allData);
        return;
    }

    const filteredData = allData.filter(item => {
        // Поиск по названию, описанию и тегам
        const nameMatch = item.name && item.name.toLowerCase().includes(searchTerm);
        const descriptionMatch = item.description && item.description.toLowerCase().includes(searchTerm);
        const tagsMatch = item.tags && item.tags.join(' ').toLowerCase().includes(searchTerm);
        
        return nameMatch || descriptionMatch || tagsMatch;
    });
    renderTable(filteredData);
});

// Запускаем получение данных при загрузке страницы
fetchData();
