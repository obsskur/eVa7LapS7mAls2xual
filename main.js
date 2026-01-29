// ================================
// TNI OSINT STATIC DATABASE
// ================================

const OSINT_DATABASE = [
    {
        identifier: "Cluudix",
        info: [
            "Twitter.com (Scraping Data) [2022-01]: [Username: Cluudix] [ProfileName: Claudia Marconell] [Email: cmarconell@gmail.com]",
            "Canva.com [2019-05]: [Username: ClaudiaMarconellSaez] [Email: cmarconell@gmail.com]",
            "Trello.com [2024-01]: [Name: Claudia Marconell] [Email: cmarconell@gmail.com]"
            "500px.com [2017-11]: [Username: ClaudiaMarconell] [City: Camp de Túria] [Country: Spain] [Name: Claudia Marconell] [Email: cmarconell@gmail.com]"
            "Promo.com [2020-06]: [Name: Claudia Marconell Saez] [Gender: Female] [Email: cmarconell@gmail.com]"
            "Instagram.com [2026-01]: [Username: cludix] [Email: cmarconell@gmail.com] [Location: Benimaclet, Valenciana, Spain ES]"
        ]
    },
    {
        identifier: "shadow_user42",
        info: [
            "Alias: Shadow",
            "Platforms: 4chan, Reddit",
            "VPN Usage: ExpressVPN, NordVPN",
            "Threat Level: Low"
        ]
    },
    {
        identifier: "example123@gmail.com",
        info: [
            "Name: Alex Johnson",
            "Location: San Francisco, CA",
            "Occupation: Software Engineer",
            "Notes: Uses public WiFi frequently"
        ]
    }
];

// ================================
// INIT
// ================================

document.addEventListener("DOMContentLoaded", () => {
    updateStats();
});

// ================================
// SEARCH FUNCTION (CASE-INSENSITIVE)
// ================================

function searchData() {
    const inputEl = document.getElementById("searchInput");
    const resultsDisplay = document.getElementById("resultsDisplay");
    const lastSearchEl = document.getElementById("lastSearch");

    if (!inputEl || !resultsDisplay) return;

    const searchTerm = inputEl.value.trim().toLowerCase();

    if (!searchTerm) {
        resultsDisplay.innerHTML =
            '<div class="no-results">Enter an identifier to search</div>';
        return;
    }

    lastSearchEl.textContent =
        searchTerm.length > 15 ? searchTerm.slice(0, 15) + "..." : searchTerm;

    const matches = OSINT_DATABASE.filter(entry =>
        entry.identifier.toLowerCase().includes(searchTerm)
    );

    if (matches.length === 0) {
        resultsDisplay.innerHTML =
            `<div class="no-results">No data found for "${escapeHtml(searchTerm)}"</div>`;
        return;
    }

    resultsDisplay.innerHTML = matches.map(entry => `
        <div class="result-card">
            <div class="identifier">${escapeHtml(entry.identifier)}</div>
            ${entry.info.map(line =>
                `<div class="data-content">${escapeHtml(line)}</div>`
            ).join("")}
        </div>
    `).join("");
}

// ================================
// STATS
// ================================

function updateStats() {
    const totalEntriesEl = document.getElementById("totalEntries");
    if (totalEntriesEl) {
        totalEntriesEl.textContent = OSINT_DATABASE.length;
    }
}

// ================================
// HELPERS
// ================================

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
