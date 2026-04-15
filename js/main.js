
const currentDate = new Date();

const monthYearElement = document.getElementById("monthYear");
const datesElement = document.getElementById("dates");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");


/* */







/* */

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Correctly get the first day of the month (0 = Sun, 1 = Mon...)
    // Since your calendar starts on Monday, we adjust the index
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const monthYearString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    monthYearElement.textContent = monthYearString;

    let datesHTML = '';

   // 1. Inactive dates from previous month
    for (let i = firstDayIndex; i > 0; i--) {
        datesHTML += `<div class="date dateinactive">${lastDayOfPrevMonth - i + 1}</div>`;
    }

    // 2. Active dates of current month
    for (let i = 1; i <= lastDayOfMonth; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const isToday = date.toDateString() === new Date().toDateString() ? 'dateactive' : '';
        datesHTML += `<div class="date ${isToday}">${i}</div>`;
    }

    // 3. Inactive dates from next month to fill the grid
    const totalSlots = 42; // Standard 6-row calendar grid
    const remainingSlots = totalSlots - (firstDayIndex + lastDayOfMonth);
    for (let i = 1; i <= remainingSlots; i++) {
        datesHTML += `<div class="date dateinactive">${i}</div>`;
    }

    datesElement.innerHTML = datesHTML;
}

prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
})

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
})

updateCalendar();
