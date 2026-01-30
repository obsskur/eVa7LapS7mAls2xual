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
        identifiers: ["dogedoge12335"],
        info: [
            "Stealer Logs [Origin: www.roblox.com] [Unknown Date]: [Username: dogedoge12335] [Password: 0645840867]"
        ]
    },
    {
        identifiers: ["OriginallyMadeCob"],
        info: [
            "Stealer Logs [Origin: www.roblox.com] [Unknown Date]: [Username: OriginallyMadeCob] [Password: GwpPA5FUC7UuPfE]",
            "Stealer Logs [Origin: www.roblox.com] [Unknown Date]: [Username: OriginallyMadeCob] [Password: Kokko#2556]"
        ]
    },
    {
        identifiers: ["whokeii", "joperjimenez@yahoo.com", "Julius Christopher", "Cabelto Jimenez", "joper jimenez", "f100000442853045"],
        info: [
            "Twitter.com (Scraping Data) [2022-07]: [Username: Whokeii] [ProfileName: joper jimenez] [Email: joperjimenez@yahoo.com]",
            "Disqus.com [2012-07]: [Email: joperjimenez@yahoo.com] [Password: may22jinxt]",
            "Dailymotion.com [2016-10]: [Email: joperjimenez@yahoo.com] [Username: f100000442853045]",
            "Deezer.com [2019-09]: [Email: joperjimenez@yahoo.com] [Username: Julius Christopher, Cabelto Jimenez] [DOB: 1993-01-01] [Country: PH]"
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
        identifiers: [
            "Pathalogic", 
            "65.37.39.177", 
            "pathalogic@gmail.com", 
            "gderycehntf", 
            "bonan1996@yahoo.com", 
            "46.133.0.57",
            "NinaYancov", 
            "Nina.Yancov", 
            "Lala22"
        ],
        info: [
            "LiveJournal [2017-01]: [Username: pathalogic] [Password: Gari2388] [Email: pathalogic@gmail.com]",
            "Neopets.com [2013-05]: [Name: gderycehntf] [Password: ilikecheese66] [Country: US] [Email: bonan1996@yahoo.com] [DOB: 1976-06-01] [Username: pathalogic] [IP: 65.37.39.177]",
            "Parapa.mail.ru [2016-08]: [Email: pathalogic@gmail.com] [Password: Gari2388]",
            "Twitter.com [2015-11]: [Email: pathalogic@gmail.com] [Password: Gari2388]",
            "Wattpad.com [2020-05]: [Email: pathalogic@gmail.com] [Password: Gari2388] [IP: 46.133.0.57] [Username: NinaYancov] [Country: UA]",
            "Faucethub.io [Unknown Date]: [Email: pathalogic@gmail.com] [Password: Nani2308]",
            "Wattpad.com [2020-05]: [Email: pathalogic@gmail.com] [Password: gari238]",
            "Deezer.com [2019-09]: [Username: Nina.Yancov] [Country: GB] [Email: pathalogic@gmail.com]",
            "ClearVoiceSurveys.com [2015-07]: [DOB: 1988-08-23] [Email: pathalogic@gmail.com]",
            "Appen.com [2020-06]: [Name: Nani] [Email: pathalogic@gmail.com]",
            "GamesOfDesire [2021-12]: [Username: Lala22] [Password: gari2388] [Email: pathalogic@gmail.com]"
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

    const searchTerm = inputEl.value.trim().toLowerCase();

    if (!searchTerm) {
        resultsDisplay.innerHTML = '<div class="no-results">Enter an identifier to search</div>';
        return;
    }

    if (lastSearchEl) {
        lastSearchEl.textContent = searchTerm.length > 20 ? searchTerm.slice(0, 20) + "..." : searchTerm;
    }

    const matches = OSINT_DATABASE.filter(entry => {
        return entry.identifiers.some(id => id.toLowerCase().trim() === searchTerm);
    });

    if (matches.length === 0) {
        resultsDisplay.innerHTML = `<div class="no-results">No exact match found for "${escapeHtml(searchTerm)}"</div>`;
        return;
    }

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
