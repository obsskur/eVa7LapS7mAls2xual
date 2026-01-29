// ================================
// TNI OSINT STATIC DATABASE
// ================================

// Data format:
// [start]
// identifier: string
// info: array of strings
// [end]

const OSINT_DATABASE = [
    {
        identifier: "John Pork",
        info: [
            "Location: America",
            "Hobbies: Playing Minecraft",
            "TikTok: https://tiktok.com/@johnpork"
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

    // 👉 add infinite entries here
];

// ================================
// SEARCH FUNCTION
// ================================

function searchData() {
    if (!isAuthenticated) return;

    const searchTerm = document
        .getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();

    const resultsDisplay = document.getElementById("resultsDisplay");

    if (!searchTerm) {
        resultsDisplay.innerHTML =
            '<div class="no-results">Enter an identifier to search</div>';
        return;
    }

    const result = OSINT_DATABASE.find(entry =>
        entry.identifier.toLowerCase() === searchTerm
    );

    document.getElementById("lastSearch").textContent =
        searchTerm.length > 15 ? searchTerm.slice(0, 15) + "..." : searchTerm;

    if (!result) {
        resultsDisplay.innerHTML =
            `<div class="no-results">No data found for "${escapeHtml(searchTerm)}"</div>`;
        return;
    }

    let infoHtml = result.info
        .map(line => `<div class="data-content">${escapeHtml(line)}</div>`)
        .join("<br>");

    resultsDisplay.innerHTML = `
        <div class="result-card">
            <div class="result-header">
                <div class="identifier">${escapeHtml(result.identifier)}</div>
            </div>
            ${infoHtml}
        </div>
    `;
}

// ================================
// STATS (STATIC)
// ================================

function updateStats() {
    document.getElementById("totalEntries").textContent = OSINT_DATABASE.length;
    document.getElementById("databaseSize").textContent = "STATIC";
}

// ================================
// HELPERS
// ================================

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
