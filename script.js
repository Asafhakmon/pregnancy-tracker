const specialGuidelines = [
    { title: "מידע גנטי (ייעוץ גנטי) + בדיקת דם לסקר גנטי", description: "מומלץ לבצע לפני ההריון או בתחילת ההריון" },
    { title: "בדיקת DNA עוברי בדם האם", description: "בדיקה שאינה כוללת סיכון לבריאות, בתשלום מעל גיל 10" },
    { title: "בדיקת מי שפיר מתבצעת החל משבוע 18", description: "" },
    { title: "לבעלות סוג דם RH שלילי", description: "זריקת חיסון עם אנטי D בשבוע 28" }
];


const tests = [
    // First Trimester (Weeks 1–13)
    { weeks: [6, 7, 8], test: "אולטרסאונד ראשוני ודופק העובר", description: "לאישור ההריון, בדיקת דופק והערכת מיקום ההריון" },
    { weeks: [6], test: "מעקב מיילדת", description: "" },
    { weeks: [12], test: "בדיקות דם ראשוניות", description: "ספירת דם, סוג דם ו-Rh, בדיקות סוכר, נוגדנים למחלות (CMV, טוקסופלזמה, אדמת, HIV ועוד)" },
    { weeks: [11, 12, 13], test: "בדיקת שקיפות עורפית", description: "להערכת הסיכון לתסמונת דאון בשילוב עם בדיקת דם" },
    { weeks: [12, 13, 14], test: "מעקב מיילדת", description: "" },

    // Second Trimester (Weeks 14–27)
    { weeks: [14, 15], test: "סקירת מערכות מוקדמת", description: "זיהוי מומים מבניים בעובר" },
    { weeks: [16], test: "בדיקת חלבון עוברי", description: "להערכת הסיכון לתסמונת דאון ומומים פתוחים בעמוד השדרה ובמוח" },
    { weeks: [16, 17, 18], test: "דיקור מי שפיר (לפי צורך)", description: "לאיתור מומים או מחלות גנטיות בעובר" },
    { weeks: [18, 19, 20], test: "מעקב מיילדת", description: "" },
    { weeks: [21, 22], test: "סקירת מערכות מאוחרת", description: "בדיקה מקיפה נוספת של מבנה גוף העובר" },
    { weeks: [22, 23, 24], test: "מעקב מיילדת", description: "" },

    // Third Trimester (Weeks 28–40+)
    { weeks: [24, 25], test: "בדיקות העמסת סוכר (50 גרם)", description: "לאיתור סוכרת הריון" },
    { weeks: [26], test: "שאלון איתור דיכאון", description: "יש למלא שאלון לאיתור דיכאון משבוע זה" },
    { weeks: [26, 27, 28], test: "מעקב מיילדת", description: "" },
    { weeks: [27], test: "חיסון שעלת", description: "מומלץ לקבל חיסון נגד שעלת כדי להגן על התינוק בתקופה הראשונה לאחר הלידה" },
    { weeks: [30, 31, 32], test: "אולטרסאונד מעקב גדילה", description: "לבדיקת קצב גדילת העובר ומנח" },
    { weeks: [30, 31, 32 , 33, 34, 35, 36, 37, 38, 39], test: "מעקב מיילדת", description: "" },
    { weeks: [35], test: "בדיקת GBS", description: "בדיקת חיידק סטרפטוקוקוס B" },
    { weeks: [40], test: "מעקב הריון עודף", description: "ניטור עוברי ואולטרסאונד להערכת מצב העובר והצורך בזירוז לידה" }
];


function formatDate(date) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('he-IL', options); // Format for Hebrew locale
}

function getWeekDates(lmpDate, weekNumber) {
    const startDate = new Date(lmpDate);
    startDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return {
        start: formatDate(startDate),
        end: formatDate(endDate),
    };
}


function calculatePregnancyWeek(lmpDate) {
    const today = new Date();
    const lmp = new Date(lmpDate);
    const diffInDays = Math.floor((today - lmp) / (1000 * 60 * 60 * 24));
    return Math.floor(diffInDays / 7) + 1; // Add 1 for the starting week
}
function generateTestTable(lmpDate) {
    const calendarDiv = document.getElementById("calendar");
    calendarDiv.innerHTML = ""; // Clear previous content

    // Create table
    const table = document.createElement("table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>שם הבדיקה</th>
                <th>תיאור</th>
                <th>שבועות רלוונטיים</th>
                <th>טווח תאריכים</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    const tbody = table.querySelector("tbody");

    // Populate table rows with tests
    tests.forEach(test => {
        const firstWeek = Math.min(...test.weeks);
        const lastWeek = Math.max(...test.weeks);

        const { start, end } = getWeekDates(lmpDate, firstWeek);
        const lastEndDate = getWeekDates(lmpDate, lastWeek).end;

        const weeksRange = test.weeks.join(", ");

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${test.test}</td>
            <td>${test.description || "אין מידע נוסף"}</td>
            <td>${weeksRange}</td>
            <td>${start} - ${lastEndDate}</td>
        `;
        tbody.appendChild(row);
    });

    // Append the table to the calendarDiv
    calendarDiv.appendChild(table);
}

document.getElementById("calculate").addEventListener("click", () => {
    const lmpDate = document.getElementById("lmp").value;
    if (!lmpDate) {
        alert("אנא הזיני תאריך מחזור אחרון תקין.");
        return;
    }

    const currentWeek = calculatePregnancyWeek(lmpDate);
    document.getElementById("result").textContent = `את בשבוע ${currentWeek}`;
    generateTestTable(lmpDate);
});






