// ================================
// TNI OSINT STATIC DATABASE
// ================================

const OSINT_DATABASE = [
    {
        identifiers: ["Cluudix", "cmarconell@gmail.com", "Claudia Marconell"],
        info: [
            "Twitter.com (Scraping Data) [2022-01]: [Username: Cluudix] [ProfileName: Claudia Marconell] [Email: cmarconell@gmail.com]",
            "Canva.com [2019-05]: [Username: ClaudiaMarconellSaez] [Email: cmarconell@gmail.com]",
            "Trello.com [2024-01]: [Name: Claudia Marconell] [Email: cmarconell@gmail.com]",
            "500px.com [2017-11]: [Username: ClaudiaMarconell] [City: Camp de Túria] [Country: Spain] [Name: Claudia Marconell] [Email: cmarconell@gmail.com]",
            "Promo.com [2020-06]: [Name: Claudia Marconell Saez] [Gender: Female] [Email: cmarconell@gmail.com]",
            "Instagram.com [2026-01]: [Username: cludix] [Email: cmarconell@gmail.com] [Location: Benimaclet, Valenciana, Spain ES]"
        ]
    },
    {
        identifiers: ["ilovetrolling_gamer"],
        info: [
            "Stealer Logs [Origin: www.roblox.com, accounts.google.com] [Unknown Date]: [Username: ilovetrolling_gamer] [Password: Justinejacob@1432!]",
            "Stealer Logs [Origin: www.roblox.com] [Unknown Date]: [Username: ilovetrolling_gamer] [Password: Justinejacob!]",
            "Stealer Logs [Origin: www.roblox.com] [Unknown Date]: [Username: ilovetrolling_gamer] [Password: Justinejacob@2841!]",
            "Stealer Logs [Origin: ox.com, www.roblox.com] [Unknown Date]: [Username: ilovetrolling_gamer] [Password: Justinejacob@0321!]"
        ]
    },
    {
        identifiers: ["trebz13", "katelynt1@hotmail.com", "trebz"],
        info: [
            "Stealer Logs [Origin: android-app:net.openvpn.openvpn] [Unknown Date]: [Username: trebz13] [Password: trebz]",
            "Zynga.com [2019-09]: [Username: Trebz13] [Password: katelyn3] [Email: katelynt1@hotmail.com]"
        ]
    },
    {
        identifiers: ["shadow_user42", "Shadow"],
        info: [
            "Alias: Shadow",
            "Platforms: 4chan, Reddit",
            "VPN Usage: ExpressVPN, NordVPN",
            "Threat Level: Low"
        ]
    },
    {
        identifiers: ["example123@gmail.com", "Alex Johnson"],
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
// SEARCH FUNCTION
// ================================

function searchData() {
    const inputEl = document.getElementById("searchInput");
    const resultsDisplay = document.getElementById("resultsDisplay");
    const lastSearchEl = document.getElementById("lastSearch");

    if (!inputEl || !resultsDisplay) return;

    // trim() removes accidental spaces at start/end
    const searchTerm = inputEl.value.trim().toLowerCase();

    if (!searchTerm) {
        resultsDisplay.innerHTML = '<div class="no-results">Enter an identifier to search</div>';
        return;
    }

    if (lastSearchEl) {
        lastSearchEl.textContent = searchTerm.length > 20 ? searchTerm.slice(0, 20) + "..." : searchTerm;
    }

    // Filter logic: Check if any identifier in the array matches the search term
    const matches = OSINT_DATABASE.filter(entry => {
        return entry.identifiers.some(id => id.toLowerCase().trim() === searchTerm);
    });

    if (matches.length === 0) {
        resultsDisplay.innerHTML = `<div class="no-results">No exact match found for "${escapeHtml(searchTerm)}"</div>`;
        return;
    }

    // Render results
    resultsDisplay.innerHTML = matches.map(entry => `
        <div class="result-card">
            <div class="identifier">${escapeHtml(entry.identifiers[0])}</div>
            ${entry.info.map(line => `<div class="data-content">${escapeHtml(line)}</div>`).join("")}
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
