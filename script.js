// Ваши данные из Supabase
const SUPABASE_URL = 'https://fpcmktwqhbwwollythsu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwY21rdHdxaGJ3d29sbHl0aHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MDIzNzQsImV4cCI6MjA1OTk3ODM3NH0.iPNCkz3_rYPr38kuifVvu88BcRObW_Wlabn8H37UKKE';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const tableBody = document.getElementById('tableBody');
const searchInput = document.getElementById('searchInput');
let allData = [];

async function fetchData() {
    // !!! ВАЖНО: Замените 'имя_вашей_таблицы' на реальное имя вашей таблицы в Supabase
    const { data, error } = await supabase
        .from('имя_вашей_таблицы') 
        .select('*');

    if (error) {
        console.error('Ошибка при получении данных:', error);
        tableBody.innerHTML = `<tr><td colspan="3">Ошибка при загрузке данных: ${error.message}</td></tr>`;
        return;
    }
    allData = data;
    renderTable(allData);
}

function renderTable(data) {
    tableBody.innerHTML = '';
    if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="3">Ничего не найдено.</td></tr>';
        return;
    }
    data.forEach(item => {
        const row = document.createElement('tr');
        // !!! ВАЖНО: Замените 'id', 'name' и 'city' на реальные имена столбцов вашей таблицы
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.city}</td>
        `;
        tableBody.appendChild(row);
    });
}

searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = allData.filter(item => {
        // Убедитесь, что эти поля существуют в вашей таблице и по ним можно искать
        return item.name.toLowerCase().includes(searchTerm) || 
               item.city.toLowerCase().includes(searchTerm);
    });
    renderTable(filteredData);
});

// Запускаем получение данных при загрузке страницы
fetchData();
