// ==========================================================================
// AUTOMATIC CLOUD REALTIME SYNC CONFIGURATION (JSONBIN.IO)
// ==========================================================================
const JSONBIN_BIN_ID = "6a71ccdaf5f4af5e29e9719a";      // e.g. "65a1234567890abcdef"
const JSONBIN_API_KEY = "$2a$10$3DoQDWPQyuqg9En5fBJDL.lYNc0sjtCJdPtFDqBH7KYRJHsk3PKha";  // e.g. "$2b$10$abc..."
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

/**
 * Unlocked NGO Core Command Application Script Module
 * Executive Admin & Indian Islamic Calendar Sync Core
 */

function getDynamicCurrentMonthTag() {
    const now = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthAbbr = monthNames[now.getMonth()];
    const yearTwoDigits = String(now.getFullYear()).slice(-2);
    return `${monthAbbr}-${yearTwoDigits}`;
}

let currentSystemBudgetThreshold = 13000;
let globalActiveSearchQuery = "";
let selectedActiveMonth = getDynamicCurrentMonthTag();
let adminActiveLogsMonth = getDynamicCurrentMonthTag();
let isAdminAuthenticated = false;

let customAdminPasswordToken = "Asdf*963.*963.";

let mealCounterConfig = {
    enabled: false,
    donorId: "DNR0001",
    month: getDynamicCurrentMonthTag()
};

let emergencyAlertConfig = {
    enabled: false,
    message: "Urgent ration support needed for Madarsa kitchen this week."
};

let activeReceiptContext = { donorId: null, profile: null };
let sessionStartTimestamp = Date.now();

let registryVisibility = {
    showPhone: true,
    showTotal: true,
    showStatus: true
};

let adminInactivityTimer = null;
const ADMIN_AUTO_LOCK_TIMEOUT_MS = 12 * 60 * 1000;
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

let systemGlobalBankState = {
    name: "HDFC BANK",
    account: "50100378702405",
    ifsc: "HDFC0001998"
};

let internalMessageInboxLedger = [
    { id: 1, type: "Message", sender: "Brother Bilal", content: "Assalamu Alaikum, I have completed the transaction for DNR0016. Please verify.", status: "Unread", note: "", date: "2026-07-18" }
];

let savedLetterheadArchive = [];

let systemMonthSequence = ["May-25", "Jun-25", "Jul-25", "Aug-25", "Sep-25", "Oct-25", "Nov-25", "Dec-25", "Jan-26", "Feb-26", "Mar-26", "Apr-26", "May-26", "Jun-26", "Jul-26", "Aug-26"];
const adminFutureMonths = [];
const monthLabelsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

for(let year = 26; year <= 28; year++) {
    monthLabelsArray.forEach(m => {
        let labelStr = `${m}-${year}`;
        if(!systemMonthSequence.includes(labelStr)) {
            adminFutureMonths.push(labelStr);
        }
    });
}

let dynamicMasterLedger = [];

let masterDonorsProfiles = [
    {"id": "DNR0001", "name": "HUMA BANU", "phone": "971502352026", "total": 0, "status": "Active Donor"},
    {"id": "DNR0002", "name": "MAHVEEN", "phone": "971501585691", "total": 0, "status": "Active Donor"},
    {"id": "DNR0003", "name": "MAIMOONA BANU", "phone": "971503403092", "total": 0, "status": "Rarely donor"},
    {"id": "DNR0004", "name": "SHIFA BEGUM", "phone": "9949457457", "total": 0, "status": "Active Donor"},
    {"id": "DNR0005", "name": "IFATH FATIMA", "phone": "97167467965", "total": 0, "status": "Active Donor"},
    {"id": "DNR0006", "name": "Huma didi friend", "phone": "—", "total": 0, "status": "Not Active since 4-6 months"},
    {"id": "DNR0007", "name": "Sharjeel bhaiyya wife", "phone": "—", "total": 0, "status": "Not Active since 4-6 months"},
    {"id": "DNR0008", "name": "SHAGUFTA SHIREEN", "phone": "6304625832", "total": 0, "status": "Not Active since 4-6 months"},
    {"id": "DNR0009", "name": "YOUNUS QUADRI", "phone": "8686180801", "total": 0, "status": "Not Active since 4-6 months"},
    {"id": "DNR0010", "name": "MALEKA", "phone": "9052297643", "total": 0, "status": "Active Donor"},
    {"id": "DNR0011", "name": "Abdul Raheem", "phone": "—", "total": 0, "status": "Not Active since 4-6 months"},
    {"id": "DNR0012", "name": "SYEDA SALEHA", "phone": "9550758307", "total": 0, "status": "Active Donor"},
    {"id": "DNR0013", "name": "Akber", "phone": "8074913361", "total": 0, "status": "Active Donor"},
    {"id": "DNR0014", "name": "Quadri", "phone": "971503152473", "total": 0, "status": "Not Active since 4-6 months"},
    {"id": "DNR0015", "name": "Ghazala banu", "phone": "—", "total": 0, "status": "Not Active since 4-6 months"},
    {"id": "DNR0016", "name": "Humera", "phone": "6300578876", "total": 0, "status": "Active Donor"},
    {"id": "DNR0017", "name": "unknown -muqeet", "phone": "—", "total": 0, "status": "Active Donor"}
];

let dynamicHadithPool = [
    { arabic: "أَنَا وَكَافِلُ الْيَتِيمِ فِي الْجَنَّةِ هَكَذَا", english: "I and the one who looks after an orphan will be in Paradise like this (joining forefinger and middle finger).", ref: "Sahih al-Bukhari, Hadith 6005" },
    { arabic: "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ", english: "Charity does not decrease wealth.", ref: "Sahih Muslim, Hadith 2588" },
    { arabic: "إِنَّ الصَّدَقَةَ لَتُطْفِئُ غَضَبَ الرَّبِّ وَتَدْفَعُ مِيتَةَ السُّوءِ", english: "Charity extinguishes the anger of the Lord and wards off an evil death.", ref: "Jami` at-Tirmidhi, Hadith 664" },
    { arabic: "الْخَلْقُ كُلُّهُمْ عِيَالُ اللَّهِ، فَأَحَبُّ الْخَلْقِ إِلَى اللَّهِ مَنْ أَحْسَنَ إِلَى عِيَالِهِ", english: "The most beloved people to Allah are those who are most beneficial to His creation.", ref: "Sunan al-Mu'jam al-Awsat" },
    { arabic: "اتَّقُوا النَّارَ وَلَوْ بِشِقَّ تَمْرَةٍ", english: "Guard yourself against the Hellfire even by giving half a date in charity.", ref: "Sahih al-Bukhari, Hadith 1417" }
];

let activeHadithIndex = 0;
let hadithAutoRotateTimer = null;

// 🌙 INDIAN ISLAMIC HOLIDAYS (CALCULATED FOR IST STANDARDS)
const indianIslamicHolidays = [
    { name: "Isra & Mi'raj", hijri: "27 Rajab 1447 AH", greg: "Jan 16, 2026" },
    { name: "Shab-e-Barat (Lailat al-Bara'at)", hijri: "15 Sha'ban 1447 AH", greg: "Feb 03, 2026" },
    { name: "Ramadan Fasting Begins", hijri: "1 Ramadan 1447 AH", greg: "Feb 18, 2026" },
    { name: "Laylat al-Qadr (Night of Power)", hijri: "27 Ramadan 1447 AH", greg: "Mar 16, 2026" },
    { name: "Eid-ul-Fitr (Ramadan Eid)", hijri: "1 Shawwal 1447 AH", greg: "Mar 20, 2026" },
    { name: "Day of Arafah (Hajj)", hijri: "9 Dhul-Hijjah 1447 AH", greg: "May 26, 2026" },
    { name: "Eid-ul-Adha (Bakrid)", hijri: "10 Dhul-Hijjah 1447 AH", greg: "May 27, 2026" },
    { name: "Islamic New Year (1448 AH)", hijri: "1 Muharram 1448 AH", greg: "Jun 16, 2026" },
    { name: "Day of Ashura", hijri: "10 Muharram 1448 AH", greg: "Jun 26, 2026" },
    { name: "Milad-un-Nabi (Prophet's Birthday)", hijri: "12 Rabi' al-Awwal 1448 AH", greg: "Aug 25, 2026" }
];

function getCurrentISTTimestamp() {
    const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
    const parts = new Intl.DateTimeFormat('en-CA', options).formatToParts(new Date());
    let year, month, day, hour, minute;
    for (let part of parts) {
        if (part.type === 'year') year = part.value;
        if (part.type === 'month') month = part.value;
        if (part.type === 'day') day = part.value;
        if (part.type === 'hour') hour = part.value;
        if (part.type === 'minute') minute = part.value;
    }
    return `${year}-${month}-${day} ${hour}:${minute} IST`;
}

window.addEventListener('DOMContentLoaded', async () => {
    initLiveBannerClock();
    initSessionUsageTimer();
    initIslamicCalendar();
    renderIslamicHolidaysGrid();
    initDailyHadith();
    startHadithAutoRotation();
    loadPersistentDatabaseState();
    check24HourSessionPersistence();
    await loadInitialJsonDataEngine();

    const currentTag = getDynamicCurrentMonthTag();
    if (!systemMonthSequence.includes(currentTag)) {
        systemMonthSequence.push(currentTag);
    }

    buildInterfaceControls();
    recalculateLifetimeDonationTotals();
    calculateMasterMetrics();
    renderDonorAttendanceLoyaltyMatrix();
    syncBankingUIRenderElements();
    setupInactivityListeners();

    switchSystemMonth(selectedActiveMonth);
});

function normalizeLedgerItem(item) {
    if(!item.mode) item.mode = "UPI";
    if(!item.date) item.date = getCurrentISTTimestamp();
    else if(!item.date.includes("IST")) item.date += " IST";
    if(!item.purpose) item.purpose = "Sadaqah";
    return item;
}

// 🌐 CLOUD DATA ENGINE — LOADS REALTIME LIVE DATA FROM JSONBIN FOR ALL GLOBAL BROWSERS
async function loadInitialJsonDataEngine() {
    try {
        const res = await fetch(`${JSONBIN_URL}/latest`, {
            method: 'GET',
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        if(res.ok) {
            const data = await res.json();
            if (Array.isArray(data.record) && data.record.length > 0) {
                dynamicMasterLedger = data.record.map(normalizeLedgerItem);
                localStorage.setItem('dynamicMasterLedger', JSON.stringify(dynamicMasterLedger));
                return;
            }
        }
    } catch(e) {
        console.warn("Falling back to local storage cache:", e);
    }

    if (localStorage.getItem('dynamicMasterLedger')) {
        dynamicMasterLedger = JSON.parse(localStorage.getItem('dynamicMasterLedger')).map(normalizeLedgerItem);
    }
}

// 💾 CLOUD DATA SAVER — AUTOMATICALLY SYNCED ACROSS ALL DEVICES GLOBALLY WHEN ADMIN UPDATES LEDGER
async function saveLedgerStateToStorage() {
    localStorage.setItem('dynamicMasterLedger', JSON.stringify(dynamicMasterLedger));
    updateExportTextAreaBox();

    try {
        const res = await fetch(JSONBIN_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_API_KEY
            },
            body: JSON.stringify(dynamicMasterLedger)
        });
        if(res.ok) {
            console.log("🟢 Realtime Cloud Sync Successful!");
        }
    } catch(e) {
        console.error("🔴 Cloud Sync Error:", e);
    }
}

// 🌙 ISLAMIC HOLIDAYS DRAWER RENDER ENGINE
function renderIslamicHolidaysGrid() {
    const grid = document.getElementById('islamicHolidaysGrid');
    if(!grid) return;
    grid.innerHTML = "";
    indianIslamicHolidays.forEach(h => {
        grid.innerHTML += `<div class="holiday-item">
            <span class="holiday-name">${h.name}</span>
            <span class="holiday-hijri">🌙 ${h.hijri}</span>
            <span class="holiday-greg">📅 ${h.greg} (India)</span>
        </div>`;
    });
}

// 📲 1-CLICK CROSS-DEVICE DATA SYNC & TRANSFER FUNCTIONS
function sendLedgerToWhatsApp() {
    const payload = JSON.stringify(dynamicMasterLedger);
    const text = encodeURIComponent(`*GIVING WITH LOVE — REALTIME LEDGER BACKUP DATA*\n\nPaste this data into the desktop dashboard sync area:\n\n${payload}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}

function sendLedgerToEmail() {
    const payload = JSON.stringify(dynamicMasterLedger, null, 2);
    const subject = encodeURIComponent("Giving with Love Realtime Data Sync Payload");
    const body = encodeURIComponent(`Assalamu Alaikum,\n\nHere is the latest ledger data payload for device transfer:\n\n${payload}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
}

function copyRawJsonToClipboard() {
    const payload = JSON.stringify(dynamicMasterLedger, null, 2);
    navigator.clipboard.writeText(payload);
    const area = document.getElementById('admRawJsonArea');
    if(area) area.value = payload;
    alert("📋 Data copied to clipboard! Open the desktop dashboard and click 'Paste/Import Sync' to complete transfer.");
}

function openQuickImportModal() {
    document.getElementById('quickImportModal').classList.add('visible');
}

function closeQuickImportModal() {
    document.getElementById('quickImportModal').classList.remove('visible');
}

function executeQuickImportData() {
    const raw = document.getElementById('quickPasteArea').value.trim() || (document.getElementById('admRawJsonArea') ? document.getElementById('admRawJsonArea').value.trim() : "");
    if(!raw) return;
    try {
        const parsed = JSON.parse(raw);
        if(Array.isArray(parsed)) {
            dynamicMasterLedger = parsed.map(normalizeLedgerItem);
            saveLedgerStateToStorage();
            recalculateLifetimeDonationTotals();
            calculateMasterMetrics();
            renderDonorAttendanceLoyaltyMatrix();
            switchSystemMonth(selectedActiveMonth);
            closeQuickImportModal();
            alert("🎉 Realtime data synchronized successfully across your devices!");
        }
    } catch(e) {
        alert("Invalid data format. Please check your pasted JSON payload.");
    }
}

// 🍲 MEAL COUNTER ADMIN CONTROL FUNCTIONS
function toggleMealCounterPublicVisibility() {
    const check = document.getElementById('mealCounterPublicToggle');
    mealCounterConfig.enabled = check ? check.checked : false;
    localStorage.setItem('mealCounterConfig', JSON.stringify(mealCounterConfig));
    applyMealCounterPublicVisibility();
}

function updateMealSponsorshipConfig() {
    const donorSel = document.getElementById('mealSponsorDonorSelect');
    const monthSel = document.getElementById('mealSponsorMonthSelect');
    if(donorSel) mealCounterConfig.donorId = donorSel.value;
    if(monthSel) mealCounterConfig.month = monthSel.value;
    localStorage.setItem('mealCounterConfig', JSON.stringify(mealCounterConfig));
    switchSystemMonth(selectedActiveMonth);
}

function applyMealCounterPublicVisibility() {
    const card = document.getElementById('publicMealCounterCard');
    if(card) {
        card.style.display = mealCounterConfig.enabled ? "block" : "none";
    }
}

function triggerSponsorCertFromCard() {
    openSponsorCertificateModal(mealCounterConfig.donorId, mealCounterConfig.month);
}

// 🤲 PUBLIC DUA REQUEST DESK ENGINE
function openPublicDuaModal() {
    document.getElementById('publicDuaModal').classList.add('visible');
}

function closePublicDuaModal() {
    document.getElementById('publicDuaModal').classList.remove('visible');
}

function dispatchPublicDuaRequest() {
    const sender = document.getElementById('duaSenderInput').value.trim() || "Anonymous Contributor";
    const narrative = document.getElementById('duaNarrativeInput').value.trim();
    if(!narrative) { alert("Please type your Du'a request narrative."); return; }

    const dateStr = getCurrentISTTimestamp().split(' ')[0];

    internalMessageInboxLedger.unshift({
        id: internalMessageInboxLedger.length + 1,
        type: "🤲 Du'a Request",
        sender: sender,
        content: narrative,
        status: "Unread",
        note: "",
        date: dateStr
    });

    const waText = encodeURIComponent(`🤲 *NEW PUBLIC DU'A REQUEST*\n\n*Sender:* ${sender}\n*Request:* ${narrative}\n*Date:* ${dateStr}\n\n_Giving with Love Community Desk_`);
    window.open(`https://api.whatsapp.com/send?phone=918074913361&text=${waText}`, '_blank');

    const mailSubject = encodeURIComponent(`New Public Du'a Request from ${sender}`);
    const mailBody = encodeURIComponent(`Assalamu Alaikum,\n\nA new public Du'a request has been submitted on the website portal:\n\nSender: ${sender}\nDate: ${dateStr}\n\nDu'a Narrative:\n${narrative}\n\nWarm regards,\nGiving with Love Automated Desk`);
    window.open(`mailto:helpingwithlove.team@gmail.com?subject=${mailSubject}&body=${mailBody}`, '_blank');

    alert("🎉 JazakAllah Khair! Your Du'a request has been submitted to the Admin Inbox, WhatsApp, and Email desk.");
    document.getElementById('duaSenderInput').value = "";
    document.getElementById('duaNarrativeInput').value = "";
    closePublicDuaModal();
    renderAdminMessageInboxTable();
}

function updateMealCounterWidget(monthlySum) {
    const totalMealsFunded = Math.floor(monthlySum / 100);
    const targetMeals = 150;
    const pct = Math.min(100, Math.round((totalMealsFunded / targetMeals) * 100));

    const headEl = document.getElementById('mealCounterHeading');
    const fillEl = document.getElementById('mealProgressBarFill');
    if(headEl) headEl.innerText = `${totalMealsFunded} / ${targetMeals} Meals Funded for ${mealCounterConfig.month}`;
    if(fillEl) fillEl.style.width = pct + "%";
}

function toggleEmergencyAlertBanner() {
    const check = document.getElementById('emergencyToggleCheck');
    emergencyAlertConfig.enabled = check ? check.checked : false;
    applyEmergencyBannerState();
}

function saveEmergencyAlertMessage() {
    const input = document.getElementById('emergencyMessageInput');
    if(input && input.value.trim() !== "") {
        emergencyAlertConfig.message = input.value.trim();
        localStorage.setItem('emergencyAlertConfig', JSON.stringify(emergencyAlertConfig));
        applyEmergencyBannerState();
        alert("Emergency alert banner text saved and synced.");
    }
}

function applyEmergencyBannerState() {
    const banner = document.getElementById('emergencyAlertBanner');
    const textEl = document.getElementById('emergencyAlertText');
    if(banner && textEl) {
        textEl.innerText = emergencyAlertConfig.message;
        banner.style.display = emergencyAlertConfig.enabled ? "flex" : "none";
    }
}

function renderDonorAttendanceLoyaltyMatrix() {
    const headerRow = document.getElementById('attendanceHeaderRow');
    const tbody = document.getElementById('attendanceTableBody');
    if(!headerRow || !tbody) return;

    const displayMonths = systemMonthSequence.slice(-6);

    let headHtml = `<th>Donor ID</th>`;
    displayMonths.forEach(m => headHtml += `<th style="text-align:center;">${m}</th>`);
    headerRow.innerHTML = headHtml;

    tbody.innerHTML = "";
    masterDonorsProfiles.forEach(donor => {
        let donorLabel = isAdminAuthenticated ? `<b>${donor.id} (${donor.name})</b>` : `<b>${donor.id}</b>`;
        let rowHtml = `<tr><td>${donorLabel}</td>`;

        displayMonths.forEach(m => {
            const hasPaid = dynamicMasterLedger.some(r => r.id === donor.id && r.month === m);
            if (hasPaid) {
                rowHtml += `<td style="text-align:center;"><span style="background:#10b981; color:#fff; font-weight:bold; padding:2px 8px; border-radius:10px; font-size:10px;">🟩 Paid</span></td>`;
            } else {
                rowHtml += `<td style="text-align:center;"><span style="background:#ef4444; color:#fff; font-weight:bold; padding:2px 8px; border-radius:10px; font-size:10px;">🟥 Missed</span></td>`;
            }
        });

        rowHtml += `</tr>`;
        tbody.innerHTML += rowHtml;
    });
}

function autoGenerateNextDonorId() {
    let maxNum = 0;
    masterDonorsProfiles.forEach(d => {
        if(d.id.startsWith("DNR")) {
            let numPart = parseInt(d.id.replace("DNR", ""), 10);
            if(!isNaN(numPart) && numPart > maxNum) maxNum = numPart;
        }
    });
    const nextId = "DNR" + String(maxNum + 1).padStart(4, '0');
    document.getElementById('regDonorId').value = nextId;
}

function openSponsorCertificateModal(donorId = null, targetMonth = null) {
    let dId = donorId || mealCounterConfig.donorId || "DNR0001";
    let mStr = targetMonth || mealCounterConfig.month || selectedActiveMonth;

    const profile = masterDonorsProfiles.find(p => p.id === dId) || { id: dId, name: "Sincere Supporter" };
    
    document.getElementById('certDonorDisplay').innerText = isAdminAuthenticated ? `${profile.id} (${profile.name})` : profile.id;
    document.getElementById('certMonthDisplay').innerText = mStr;
    document.getElementById('certDateDisplay').innerText = getCurrentISTTimestamp().split(' ')[0];
    document.getElementById('certIdDisplay').innerText = `GWL-CERT-${profile.id}-${mStr.replace('-', '')}`;

    document.getElementById('sponsorshipCertModal').classList.add('visible');
}

function closeSponsorshipCertModal() {
    document.getElementById('sponsorshipCertModal').classList.remove('visible');
}

function downloadSponsorshipCertPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'landscape' });
    
    const element = document.getElementById('sponsorshipCertPrintCard');
    html2canvas(element, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 10, 10, 277, 0);
        doc.save(`Sponsorship_Certificate_${document.getElementById('certIdDisplay').innerText}.pdf`);
    });
}

function saveLetterheadToArchive() {
    const recipient = document.getElementById('lhRecipient').value.trim() || "To Whom It May Concern";
    const subject = document.getElementById('lhSubject').value.trim() || "Official Statement";
    const body = document.getElementById('lhBody').value.trim();

    if(!body) { alert("Please enter letter body content before archiving."); return; }

    savedLetterheadArchive.unshift({
        id: Date.now(),
        date: getCurrentISTTimestamp().split(' ')[0],
        recipient,
        subject,
        body
    });

    localStorage.setItem('savedLetterheadArchive', JSON.stringify(savedLetterheadArchive));
    renderLetterheadArchiveList();
    alert("📁 Letterhead document saved securely to browser archive.");
}

function renderLetterheadArchiveList() {
    const listEl = document.getElementById('letterheadArchiveList');
    if(!listEl) return;
    listEl.innerHTML = "";

    if(savedLetterheadArchive.length === 0) {
        listEl.innerHTML = "<div style='font-size:11px; color:#94a3b8; text-align:center;'>No archived letters saved yet.</div>";
        return;
    }

    savedLetterheadArchive.forEach(item => {
        listEl.innerHTML += `<div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.05); padding:6px 10px; border-radius:4px; font-size:11px;">
            <div>
                <strong style="color:#60a5fa;">${item.subject}</strong> <span style="color:#94a3b8;">(${item.recipient})</span>
            </div>
            <div style="display:flex; gap:6px;">
                <button class="btn-pill" style="font-size:10px; padding:2px 6px;" onclick="loadArchivedLetterhead(${item.id})">Reload</button>
                <button class="btn-mini-delete" style="font-size:9px;" onclick="deleteArchivedLetterhead(${item.id})">✖</button>
            </div>
        </div>`;
    });
}

function loadArchivedLetterhead(id) {
    const item = savedLetterheadArchive.find(x => x.id === id);
    if(item) {
        document.getElementById('lhRecipient').value = item.recipient;
        document.getElementById('lhSubject').value = item.subject;
        document.getElementById('lhBody').value = item.body;
        alert("Archived letter loaded into studio editor!");
    }
}

function deleteArchivedLetterhead(id) {
    savedLetterheadArchive = savedLetterheadArchive.filter(x => x.id !== id);
    localStorage.setItem('savedLetterheadArchive', JSON.stringify(savedLetterheadArchive));
    renderLetterheadArchiveList();
}

function runDataIntegrityDiagnostic() {
    const box = document.getElementById('diagnosticResultsBox');
    if(!box) return;
    box.innerHTML = "Scanning database lines for integrity anomalies...";

    let issues = [];

    dynamicMasterLedger.forEach((item, index) => {
        if(!item.id) issues.push(`Row ${index+1}: Missing Donor ID`);
        if(!item.amount || isNaN(item.amount) || item.amount <= 0) issues.push(`Row ${index+1} (${item.id}): Invalid donation amount`);
        if(!item.date) issues.push(`Row ${index+1} (${item.id}): Missing timestamp date`);
        if(!masterDonorsProfiles.some(p => p.id === item.id)) issues.push(`Row ${index+1} (${item.id}): Donor ID not linked in Directory Profiles`);
    });

    if(issues.length === 0) {
        box.innerHTML = `<span style="color:#10b981; font-weight:bold;">🟢 Diagnostic Passed: 100% Data Integrity Verified across ${dynamicMasterLedger.length} ledger entries!</span>`;
    } else {
        box.innerHTML = `<span style="color:#ef4444; font-weight:bold;">⚠️ Diagnostic Alerts (${issues.length} Issues Detected):</span><br>` + issues.map(i => `• ${i}`).join('<br>');
    }
}

function downloadDataJsonFileBackup() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dynamicMasterLedger, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `donations_backup_${getCurrentISTTimestamp().split(' ')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function updateAdminPasswordToken() {
    const input = document.getElementById('newAdminPassInput');
    if(input && input.value.trim().length >= 6) {
        customAdminPasswordToken = input.value.trim();
        localStorage.setItem('customAdminPasswordToken', customAdminPasswordToken);
        input.value = "";
        alert("🔑 Admin password token updated successfully!");
    } else {
        alert("Password token must be at least 6 characters long.");
    }
}

function generateJazakallahNoteCard() {
    const cardText = `جَزَاكُمُ ٱللَّٰهُ خَيْرًا\n\nOfficial Acknowledgment — Giving with Love\nThank you for your generous contribution supporting 50 orphan children.\n\nReceipt Ref: ${document.getElementById('rcptNo').innerText}\nAmount: ${document.getElementById('rcptAmount').innerText}\n\nMay Allah bless and multiply your wealth with continuous Barakah!`;
    navigator.clipboard.writeText(cardText);
    alert("🖼️ JazakAllah Thank-You Note copied to clipboard!");
}

function toggleReceiptTaxDisclaimer() {
    const check = document.getElementById('rcptTaxCheck');
    const box = document.getElementById('rcptTaxDisclaimerBox');
    if(box) box.style.display = (check && check.checked) ? "block" : "none";
}

function changeReceiptStampStyle(val) {
    const label = document.getElementById('rcptStampLabel');
    if(label) label.innerText = val;
}

function initSessionUsageTimer() {
    setInterval(() => {
        const elapsedSec = Math.floor((Date.now() - sessionStartTimestamp) / 1000);
        const mins = Math.floor(elapsedSec / 60);
        const secs = elapsedSec % 60;
        
        const padM = String(mins).padStart(2, '0');
        const padS = String(secs).padStart(2, '0');
        
        const timerEl = document.getElementById('sessionTimerDisplay');
        if (timerEl) {
            timerEl.innerText = `⏳ Active Session: ${padM}m ${padS}s`;
        }
    }, 1000);
}

function openStarDonorsModal() {
    recalculateLifetimeDonationTotals();
    renderStarDonorsTable();
    document.getElementById('starDonorsModal').classList.add('visible');
}

function closeStarDonorsModal() {
    document.getElementById('starDonorsModal').classList.remove('visible');
}

function renderStarDonorsTable() {
    const tbody = document.getElementById('starDonorsTableBody');
    if(!tbody) return;
    tbody.innerHTML = "";

    const sortedDonors = [...masterDonorsProfiles].sort((a, b) => b.total - a.total);
    const starDonors = sortedDonors.filter(d => d.total >= 1000);

    if(starDonors.length === 0) {
        tbody.innerHTML = "<tr><td colspan='3' style='text-align:center; color:#94a3b8; padding:15px;'>No Star Donors cataloged yet. Contributions will appear here automatically.</td></tr>";
        return;
    }

    starDonors.forEach((donor) => {
        let awardName = "";
        let badgeStyle = "";

        if (donor.total >= 50000) {
            awardName = "🏆 Legend Guardian";
            badgeStyle = "background:linear-gradient(135deg, #f59e0b, #b45309); color:#fff;";
        } else if (donor.total >= 25000) {
            awardName = "🥇 Diamond Patron";
            badgeStyle = "background:linear-gradient(135deg, #38bdf8, #0284c7); color:#fff;";
        } else if (donor.total >= 10000) {
            awardName = "🥈 Platinum Benefactor";
            badgeStyle = "background:linear-gradient(135deg, #cbd5e1, #64748b); color:#0f172a;";
        } else {
            awardName = "🥉 Gold Supporter";
            badgeStyle = "background:linear-gradient(135deg, #fef08a, #ca8a04); color:#451a03;";
        }

        let donorLabel = isAdminAuthenticated ? `<b>${donor.id} (${donor.name})</b>` : `<b>${donor.id}</b>`;

        tbody.innerHTML += `<tr>
            <td><span class="badge-status" style="${badgeStyle} font-weight:bold; padding:4px 8px; border-radius:12px;">${awardName}</span></td>
            <td>${donorLabel}</td>
            <td><b style="color:#10b981;">₹${donor.total.toLocaleString('en-IN')}</b></td>
        </tr>`;
    });
}

function generateAiLetterPreset(type) {
    const subjectInput = document.getElementById('lhSubject');
    const bodyInput = document.getElementById('lhBody');

    if (type === 'acknowledgment') {
        subjectInput.value = "Official Acknowledgment & Expression of Gratitude";
        bodyInput.value = "Assalamu Alaikum Warahmatullahi Wabarakatuh,\n\nWe express our deepest gratitude for your sincere contribution toward 'Giving with Love'. Your support directly sustains the daily meals, shelter, and Islamic education for 50 orphan children in our Madarsa care.\n\nYour contribution has been recorded in our verified open ledger. May Allah (SWT) accept your purification capital, multiply your wealth, and shower continuous Barakah upon your family.";
    } else if (type === 'urgent_support') {
        subjectInput.value = "Urgent Monthly Operational Appeal — Madarsa Care";
        bodyInput.value = "Assalamu Alaikum Warahmatullahi Wabarakatuh,\n\nThis letter is an urgent appeal to support our monthly budget requirement for the care of 50 orphan children under our initiative. Our monthly target threshold covers essential nutrition, medical care, and housing costs.\n\nWe kindly request all respected brothers and sisters to complete their committed Zakat and Sadaqah contributions at the earliest to prevent operational deficits. JazakAllah Khair for your unwavering dedication.";
    } else if (type === 'verification') {
        subjectInput.value = "Certificate of Verification — Donor & Contribution Record";
        bodyInput.value = "To Whom It May Concern,\n\nThis official document certifies that the donor listed herein has actively supported 'Giving with Love' Community Initiative in Hyderabad, India.\n\nAll funds received are allocated 100% toward the welfare, housing, and education of orphaned youth in full compliance with Sharia lines. We confirm that all ledger transactions are open and fully auditable by community members.";
    }
}

function generateAiLetterFromCustomTopic() {
    const topic = document.getElementById('aiTopicInput').value.trim();
    if (!topic) { alert("Please type a topic or keyword first!"); return; }

    const subjectInput = document.getElementById('lhSubject');
    const bodyInput = document.getElementById('lhBody');

    subjectInput.value = `Official Communication regarding ${topic}`;
    bodyInput.value = `Assalamu Alaikum Warahmatullahi Wabarakatuh,\n\nThis official letter is issued by the leadership of 'Giving with Love' regarding: ${topic}.\n\nWe operate with absolute transparency to ensure that every contribution and decision made directly serves the best interests of the 50 orphan children under our Madarsa shelter.\n\nMay Allah (SWT) reward you abundantly for your support.\n\nWarm regards,\nSyed Akber Hussaini (Lead Administrator)`;
}

function initDailyHadith() {
    renderActiveHadithDisplay();
}

function renderActiveHadithDisplay() {
    const current = dynamicHadithPool[activeHadithIndex];
    if(!current) return;
    document.getElementById('hadithArabicText').innerText = current.arabic;
    document.getElementById('hadithEnglishText').innerText = `"${current.english}"`;
    document.getElementById('hadithReferenceText').innerText = `— ${current.ref}`;
}

function startHadithAutoRotation() {
    if(hadithAutoRotateTimer) clearInterval(hadithAutoRotateTimer);
    hadithAutoRotateTimer = setInterval(() => {
        activeHadithIndex = (activeHadithIndex + 1) % dynamicHadithPool.length;
        renderActiveHadithDisplay();
    }, 12000);
}

function triggerHadithPoolShuffle() {
    activeHadithIndex = Math.floor(Math.random() * dynamicHadithPool.length);
    renderActiveHadithDisplay();
}

function switchAdminSubTab(targetTabId, el) {
    document.querySelectorAll('.admin-module-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.admin-nav-tabs .admin-tab-btn').forEach(b => b.classList.remove('active'));
    
    const panel = document.getElementById(`adm-tab-${targetTabId.replace('adm-', '')}`);
    if(panel) panel.classList.add('active');
    if(el) el.classList.add('active');
}

function openLetterheadPreviewModal() {
    const recipient = document.getElementById('lhRecipient').value.trim() || "To Whom It May Concern";
    const subject = document.getElementById('lhSubject').value.trim() || "Official Institutional Communication";
    const body = document.getElementById('lhBody').value.trim() || "This is an official communication statement issued by Giving with Love leadership.";

    const dateStr = new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'long', day: 'numeric' });
    const refNum = `GWL/2026/OFF-${Math.floor(1000 + Math.random() * 9000)}`;

    document.getElementById('lhPreviewRecipient').innerText = recipient;
    document.getElementById('lhPreviewSubject').innerText = subject;
    document.getElementById('lhPreviewBody').innerText = body;
    document.getElementById('lhPreviewDate').innerText = dateStr;
    document.getElementById('lhPreviewRef').innerText = refNum;

    document.getElementById('letterheadPreviewModal').classList.add('visible');
}

function closeLetterheadModal() {
    document.getElementById('letterheadPreviewModal').classList.remove('visible');
}

function downloadLetterheadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    
    const element = document.getElementById('letterheadPrintCard');
    html2canvas(element, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 10, 10, 190, 0);
        doc.save(`GivingWithLove_Official_Letter_${document.getElementById('lhPreviewRef').innerText.replace(/\//g, '-')}.pdf`);
    });
}

function check24HourSessionPersistence() {
    const savedExpiry = localStorage.getItem('adminSessionExpiry');
    if (savedExpiry) {
        const expiryTime = parseInt(savedExpiry, 10);
        if (new Date().getTime() < expiryTime) {
            isAdminAuthenticated = true;
            document.getElementById('adminWorkspace').classList.add('active');
            document.getElementById('adminControlBtn').innerText = "🔒 Secure Logout";
            renderAdminMessageInboxTable();
            resetAdminInactivityTimer();
        } else {
            localStorage.removeItem('adminSessionExpiry');
        }
    }
}

function toggleRegistryColumnVisibility() {
    registryVisibility.showPhone = document.getElementById('visPhoneCheck').checked;
    registryVisibility.showTotal = document.getElementById('visTotalCheck').checked;
    registryVisibility.showStatus = document.getElementById('visStatusCheck').checked;
    
    localStorage.setItem('registryVisibility', JSON.stringify(registryVisibility));
    renderMasterDonorRegistry();
}

function addQuickAmount(val) {
    const input = document.getElementById('admAmount');
    if(input) {
        let current = parseInt(input.value) || 0;
        input.value = current + val;
    }
}

function filterAuditTable(query) {
    globalActiveSearchQuery = query.toLowerCase();
    const monthlyDataset = dynamicMasterLedger.filter(r => r.month === selectedActiveMonth);
    renderDataTable(monthlyDataset);
}

function toggleOpeningContactForm() {
    const card = document.getElementById('openingContactFormCard');
    if(card) {
        card.style.display = (card.style.display === 'none' || card.style.display === '') ? 'block' : 'none';
    }
}

function dispatchHeroPublicMessage() {
    const sender = document.getElementById('heroMsgSender').value.trim() || "Anonymous Hero Visitor";
    const content = document.getElementById('heroMsgText').value.trim();
    if(!content) { alert("Please type a message before sending."); return; }
    
    internalMessageInboxLedger.unshift({ 
        id: internalMessageInboxLedger.length + 1,
        type: "Message",
        sender, 
        content, 
        status: "Unread",
        note: "",
        date: getCurrentISTTimestamp().split(' ')[0] 
    });
    
    alert("🎉 Transmission complete! Your message has been sent directly to the Admin Inbox.");
    document.getElementById('heroMsgSender').value = ""; 
    document.getElementById('heroMsgText').value = "";
    toggleOpeningContactForm();
    renderAdminMessageInboxTable();
}

function loadPersistentDatabaseState() {
    if (localStorage.getItem('masterDonorsProfiles')) {
        let stored = JSON.parse(localStorage.getItem('masterDonorsProfiles'));
        stored.forEach(sp => {
            let fresh = masterDonorsProfiles.find(mp => mp.id === sp.id);
            if(fresh && fresh.phone !== "—") {
                sp.phone = fresh.phone;
            }
        });
        masterDonorsProfiles = stored;
    } else {
        saveProfilesStateToStorage();
    }
    
    if (localStorage.getItem('systemGlobalBankState')) {
        systemGlobalBankState = JSON.parse(localStorage.getItem('systemGlobalBankState'));
    }
    if (localStorage.getItem('currentSystemBudgetThreshold')) {
        currentSystemBudgetThreshold = parseInt(localStorage.getItem('currentSystemBudgetThreshold'));
        const inputField = document.getElementById('admTargetLimitInput');
        if(inputField) inputField.value = currentSystemBudgetThreshold;
    }
    if (localStorage.getItem('registryVisibility')) {
        registryVisibility = JSON.parse(localStorage.getItem('registryVisibility'));
        document.getElementById('visPhoneCheck').checked = registryVisibility.showPhone;
        document.getElementById('visTotalCheck').checked = registryVisibility.showTotal;
        document.getElementById('visStatusCheck').checked = registryVisibility.showStatus;
    }
    if (localStorage.getItem('customAdminPasswordToken')) {
        customAdminPasswordToken = localStorage.getItem('customAdminPasswordToken');
    }
    if (localStorage.getItem('mealCounterConfig')) {
        mealCounterConfig = JSON.parse(localStorage.getItem('mealCounterConfig'));
        document.getElementById('mealCounterPublicToggle').checked = mealCounterConfig.enabled;
        applyMealCounterPublicVisibility();
    }
    if (localStorage.getItem('emergencyAlertConfig')) {
        emergencyAlertConfig = JSON.parse(localStorage.getItem('emergencyAlertConfig'));
        document.getElementById('emergencyToggleCheck').checked = emergencyAlertConfig.enabled;
        document.getElementById('emergencyMessageInput').value = emergencyAlertConfig.message;
        applyEmergencyBannerState();
    }
    if (localStorage.getItem('savedLetterheadArchive')) {
        savedLetterheadArchive = JSON.parse(localStorage.getItem('savedLetterheadArchive'));
        renderLetterheadArchiveList();
    }
}

function saveProfilesStateToStorage() {
    localStorage.setItem('masterDonorsProfiles', JSON.stringify(masterDonorsProfiles));
}

function recalculateLifetimeDonationTotals() {
    masterDonorsProfiles.forEach(donor => {
        donor.total = dynamicMasterLedger
            .filter(record => record.id === donor.id)
            .reduce((sum, item) => sum + item.amount, 0);
    });
    saveProfilesStateToStorage();
}

function initLiveBannerClock() {
    const runClock = () => {
        const clockEl = document.getElementById('liveClockDisplay');
        if(clockEl) {
            const istTime = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
            clockEl.innerText = "⏱️ Live Clock (IST): " + istTime;
        }
    };
    runClock(); setInterval(runClock, 1000);
}

function initIslamicCalendar() {
    const today = new Date();
    const gregStr = today.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const hijriStr = new Intl.DateTimeFormat('en-FR-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(today);
    const calEl = document.getElementById('islamicCalendarDisplay');
    if(calEl) calEl.innerText = `📅 ${gregStr}  |  🌙 ${hijriStr} AH (Makkah / Madinah Standard)`;
}

function commitInstitutionalBankOverride() {
    const bankName = document.getElementById('admBankNameInput').value.trim();
    const bankAcc = document.getElementById('admBankAccInput').value.trim();
    const bankIfsc = document.getElementById('admBankIfscInput').value.trim();
    if(!bankName || !bankAcc || !bankIfsc) { alert("Complete all bank parameters."); return; }
    systemGlobalBankState.name = bankName; systemGlobalBankState.account = bankAcc; systemGlobalBankState.ifsc = bankIfsc;
    localStorage.setItem('systemGlobalBankState', JSON.stringify(systemGlobalBankState));
    syncBankingUIRenderElements(); alert("Live banking parameters saved securely.");
}

function commitCustomHadithOverride() {
    const arab = document.getElementById('admHadithArabicInput').value.trim();
    const eng = document.getElementById('admHadithEnglishInput').value.trim();
    const ref = document.getElementById('admHadithRefInput').value.trim();
    if(!arab || !eng || !ref) { alert("Complete all Hadith fields."); return; }
    
    dynamicHadithPool.unshift({ arabic: arab, english: eng, ref: ref });
    activeHadithIndex = 0;
    renderActiveHadithDisplay();
    alert("Active dashboard Hadith updated successfully.");
}

function transitionToDashboard() {
    document.getElementById('greetingPage').classList.remove('active');
    document.getElementById('dashboardPage').classList.add('active');
    switchSystemMonth(selectedActiveMonth);
}

function navigateSubPage(targetTabId, element) {
    document.querySelectorAll('.app-sub-section').forEach(view => view.classList.remove('active'));
    document.querySelectorAll('.navigation-tabs-container .nav-tab-btn').forEach(btn => btn.classList.remove('active'));
    
    const targetPage = document.getElementById(`sub-page-${targetTabId}`);
    if(targetPage) targetPage.classList.add('active');
    if(element) element.classList.add('active');
}

function toggleCustomPurposeInput(val) {
    const wrap = document.getElementById('customPurposeWrap');
    if(wrap) {
        wrap.style.display = (val === 'Others') ? 'block' : 'none';
    }
}

function buildInterfaceControls() {
    const primarySelect = document.getElementById('controlMonthSelect');
    const adminSelect = document.getElementById('admMonth');
    const adminLogsSelect = document.getElementById('admLogsMonthSelect');
    const adminLogDonorSelect = document.getElementById('admDonorIdSelect');
    const adminStatusSelect = document.getElementById('admStatusDonorSelect');
    const mealSponsorDonorSelect = document.getElementById('mealSponsorDonorSelect');
    const mealSponsorMonthSelect = document.getElementById('mealSponsorMonthSelect');
    
    if(primarySelect) primarySelect.innerHTML = ""; 
    if(adminSelect) adminSelect.innerHTML = ""; 
    if(adminLogsSelect) adminLogsSelect.innerHTML = "";
    if(adminLogDonorSelect) adminLogDonorSelect.innerHTML = ""; 
    if(adminStatusSelect) adminStatusSelect.innerHTML = "";
    if(mealSponsorDonorSelect) mealSponsorDonorSelect.innerHTML = "";
    if(mealSponsorMonthSelect) mealSponsorMonthSelect.innerHTML = "";

    systemMonthSequence.forEach(m => {
        let opt = document.createElement('option'); opt.value = m; opt.innerText = m;
        if(m === selectedActiveMonth) opt.selected = true;
        if(primarySelect) primarySelect.appendChild(opt);

        let optM = document.createElement('option'); optM.value = m; optM.innerText = m;
        if(m === mealCounterConfig.month) optM.selected = true;
        if(mealSponsorMonthSelect) mealSponsorMonthSelect.appendChild(optM);
    });

    const combinedAdminPool = [...systemMonthSequence, ...adminFutureMonths];
    combinedAdminPool.forEach(m => {
        let opt1 = document.createElement('option'); opt1.value = m; opt1.innerText = m;
        if(m === selectedActiveMonth) opt1.selected = true;
        if(adminSelect) adminSelect.appendChild(opt1);

        let opt2 = document.createElement('option'); opt2.value = m; opt2.innerText = m;
        if(m === adminActiveLogsMonth) opt2.selected = true;
        if(adminLogsSelect) adminLogsSelect.appendChild(opt2);
    });

    masterDonorsProfiles.forEach(d => {
        let label = isAdminAuthenticated ? `${d.id} (${d.name})` : `${d.id} - 🔒 Hidden Profile`;
        if(adminLogDonorSelect) adminLogDonorSelect.innerHTML += `<option value="${d.id}">${label}</option>`;
        if(adminStatusSelect) adminStatusSelect.innerHTML += `<option value="${d.id}">${d.id} ${isAdminAuthenticated ? ' - ('+d.name+')' : ''}</option>`;
        
        let optS = document.createElement('option'); optS.value = d.id; optS.innerText = `${d.id} (${d.name})`;
        if(d.id === mealCounterConfig.donorId) optS.selected = true;
        if(mealSponsorDonorSelect) mealSponsorDonorSelect.appendChild(optS);
    });
    updateExportTextAreaBox();
}

function dispatchPublicMessageToInbox() {
    const sender = document.getElementById('msgSenderHandle').value.trim() || "Anonymous Contributor";
    const content = document.getElementById('msgNarrativeText').value.trim();
    if(!content) { alert("Message narrative empty."); return; }
    internalMessageInboxLedger.unshift({ id: internalMessageInboxLedger.length + 1, type: "Message", sender, content, status: "Unread", note: "", date: getCurrentISTTimestamp().split(' ')[0] });
    alert("🎉 Transmission complete. Message dispatched to Admin inbox.");
    document.getElementById('msgSenderHandle').value = ""; document.getElementById('msgNarrativeText').value = "";
    renderAdminMessageInboxTable();
}

function renderAdminMessageInboxTable() {
    const tbody = document.getElementById('adminMessageInboxTableBody'); tbody.innerHTML = "";
    if(!isAdminAuthenticated) { tbody.innerHTML = "<tr><td colspan='4'>🔒 Unlocked Session Required</td></tr>"; return; }
    
    if(internalMessageInboxLedger.length === 0) {
        tbody.innerHTML = "<tr><td colspan='4' style='text-align:center; color:#94a3b8;'>No active messages or Du'a requests.</td></tr>";
        return;
    }

    internalMessageInboxLedger.forEach(msg => {
        let typeBadge = msg.type === "🤲 Du'a Request" ? "background:#f59e0b; color:#fff;" : "background:#3b82f6; color:#fff;";
        
        tbody.innerHTML += `<tr>
            <td>
                <span class="badge-status" style="${typeBadge} font-size:10px; font-weight:bold;">${msg.type || 'Message'}</span><br>
                <b>${msg.sender}</b><br><small style="color:#64748b; font-size:10px;">${msg.date}</small>
            </td>
            <td><div style="white-space:normal; max-width:240px; word-break:break-all;">${msg.content}</div></td>
            <td>
                <input type="text" value="${msg.note || ''}" placeholder="Type resolution note..." style="font-size:10px; padding:3px 6px;" onchange="saveAdminInboxNote(${msg.id}, this.value)">
            </td>
            <td>
                <button class="btn-core" style="padding:3px 6px; font-size:0.7rem;" onclick="markMessageRead(${msg.id})">Read</button>
                <button class="btn-mini-delete" onclick="purgeMessage(${msg.id})">Del</button>
            </td>
        </tr>`;
    });
}

function saveAdminInboxNote(id, noteText) {
    let m = internalMessageInboxLedger.find(x => x.id === id);
    if(m) { m.note = noteText; alert("Admin note saved!"); }
}

function markMessageRead(id) { let m = internalMessageInboxLedger.find(x => x.id === id); if(m) m.status = "Read"; renderAdminMessageInboxTable(); }
function purgeMessage(id) { internalMessageInboxLedger = internalMessageInboxLedger.filter(x => x.id !== id); renderAdminMessageInboxTable(); }

function adjustAdminTargetLimit() {
    const val = parseInt(document.getElementById('admTargetLimitInput').value);
    if(!isNaN(val) && val > 0) { 
        currentSystemBudgetThreshold = val; 
        localStorage.setItem('currentSystemBudgetThreshold', currentSystemBudgetThreshold);
        switchSystemMonth(selectedActiveMonth); 
        alert("Target requirement adjusted successfully."); 
    }
}

function commitNewDonorProfileRegistration() {
    const id = document.getElementById('regDonorId').value.trim().toUpperCase();
    const name = document.getElementById('regDonorName').value.trim();
    const phone = document.getElementById('regDonorPhone').value.trim();
    const status = document.getElementById('regDonorStatus').value;
    if(!id || !name || !phone) { alert("Complete all data points."); return; }
    masterDonorsProfiles.push({ id, name, phone, total: 0, status });
    document.getElementById('regDonorId').value = ""; document.getElementById('regDonorName').value = ""; document.getElementById('regDonorPhone').value = "";
    saveProfilesStateToStorage();
    buildInterfaceControls(); 
    switchSystemMonth(selectedActiveMonth); 
    renderDonorAttendanceLoyaltyMatrix();
    alert("Profile cataloged permanently.");
}

function commitAdminEntry() {
    const id = document.getElementById('admDonorIdSelect').value;
    const val = parseInt(document.getElementById('admAmount').value);
    const m = document.getElementById('admMonth').value;
    const mode = document.getElementById('admPaymentModeSelect') ? document.getElementById('admPaymentModeSelect').value : "UPI";
    
    let purpose = document.getElementById('admPurposeSelect') ? document.getElementById('admPurposeSelect').value : "Sadaqah";
    if(purpose === "Others") {
        const customP = document.getElementById('admCustomPurposeInput').value.trim();
        purpose = customP ? customP : "Custom Contribution";
    }

    const date = getCurrentISTTimestamp();

    if(!id || isNaN(val) || val <= 0) { alert("Provide valid input values."); return; }
    
    dynamicMasterLedger.push({ id, amount: val, month: m, mode: mode, date: date, purpose: purpose });
    
    if(!systemMonthSequence.includes(m)) {
        systemMonthSequence.push(m);
    }
    
    saveLedgerStateToStorage();
    recalculateLifetimeDonationTotals();
    buildInterfaceControls(); 
    calculateMasterMetrics(); 
    renderDonorAttendanceLoyaltyMatrix();
    switchSystemMonth(m);
    switchAdminLogsMonth(m);
    document.getElementById('admAmount').value = ""; 
    if(document.getElementById('admCustomPurposeInput')) document.getElementById('admCustomPurposeInput').value = "";
    alert(`🎉 Entry logged for ${m} at ${date}! Data synced automatically to cloud.`);
}

function updateTransactionPaymentMode(masterIndex, newMode) {
    if(dynamicMasterLedger[masterIndex]) {
        dynamicMasterLedger[masterIndex].mode = newMode;
        saveLedgerStateToStorage();
        switchAdminLogsMonth(adminActiveLogsMonth);
        switchSystemMonth(selectedActiveMonth);
    }
}

function updateTransactionPurpose(masterIndex, newPurpose) {
    if(dynamicMasterLedger[masterIndex]) {
        if(newPurpose === "Others") {
            let userPrompt = prompt("Specify custom purpose / reason for donation:", dynamicMasterLedger[masterIndex].purpose || "");
            if(userPrompt && userPrompt.trim() !== "") {
                dynamicMasterLedger[masterIndex].purpose = userPrompt.trim();
            }
        } else {
            dynamicMasterLedger[masterIndex].purpose = newPurpose;
        }
        saveLedgerStateToStorage();
        switchAdminLogsMonth(adminActiveLogsMonth);
        switchSystemMonth(selectedActiveMonth);
    }
}

function switchAdminLogsMonth(m) {
    adminActiveLogsMonth = m;
    const logsDataset = dynamicMasterLedger.filter(r => r.month === m);
    renderAdminEditLogsTable(logsDataset);
}

function commitAdminStatusUpdate() {
    const id = document.getElementById('admStatusDonorSelect').value;
    const name = document.getElementById('admStatusName').value.trim();
    const phone = document.getElementById('admStatusPhone').value.trim();
    const status = document.getElementById('admStatusValueSelect').value;
    let p = masterDonorsProfiles.find(x => x.id === id);
    if(p && name && phone) { 
        p.name = name; p.phone = phone; p.status = status; 
        saveProfilesStateToStorage();
        alert("Registry updated successfully."); 
        buildInterfaceControls(); 
        switchSystemMonth(selectedActiveMonth); 
    }
}

function switchSystemMonth(m) {
    selectedActiveMonth = m;
    const monthlyDataset = dynamicMasterLedger.filter(r => r.month === m);
    const monthlySum = monthlyDataset.reduce((sum, item) => sum + item.amount, 0);
    
    if(document.getElementById('currentMonthTotalDisplay')) document.getElementById('currentMonthTotalDisplay').innerText = "₹" + monthlySum.toLocaleString('en-IN');
    if(document.getElementById('activeDonorCountDisplay')) document.getElementById('activeDonorCountDisplay').innerText = new Set(monthlyDataset.map(item => item.id)).size;
    if(document.getElementById('inactiveDonorCountDisplay')) document.getElementById('inactiveDonorCountDisplay').innerText = masterDonorsProfiles.filter(p => p.status === "Not Active since 4-6 months").length;

    const pct = Math.min(100, Math.round((monthlySum / currentSystemBudgetThreshold) * 100));
    const fillEl = document.getElementById('goalProgressBarFill');
    const textEl = document.getElementById('goalPercentText');
    if(fillEl) fillEl.style.width = pct + "%";
    if(textEl) textEl.innerText = `${pct}% (₹${monthlySum.toLocaleString('en-IN')} / ₹${currentSystemBudgetThreshold.toLocaleString('en-IN')})`;

    updateMealCounterWidget(monthlySum);

    const alertBox = document.getElementById('budgetAlertBox');
    if (alertBox) {
        if (monthlySum >= currentSystemBudgetThreshold) {
            alertBox.className = "budget-alert-banner budget-met";
            alertBox.innerHTML = `🟢 <strong>Operational Target Achieved:</strong> Collected balance of ₹${monthlySum.toLocaleString('en-IN')} matches our target (₹${currentSystemBudgetThreshold.toLocaleString('en-IN')})!`;
        } else {
            alertBox.className = "budget-alert-banner budget-short";
            alertBox.innerHTML = `⚠️ <strong>Critical Operational Deficit Alert:</strong> Madarsa expenses require at least ₹${currentSystemBudgetThreshold.toLocaleString('en-IN')} monthly to support all 50 orphan children.`;
        }
    }
    renderDataTable(monthlyDataset); renderMasterDonorRegistry();
    if(!adminActiveLogsMonth) switchAdminLogsMonth(m);
}

function renderAdminEditLogsTable(dataset) {
    const tbody = document.getElementById('adminEditLogsTableBody'); 
    if(!tbody) return;
    tbody.innerHTML = "";
    if(!isAdminAuthenticated) return;

    if(dataset.length === 0) {
        tbody.innerHTML = "<tr><td colspan='4' style='text-align:center; color:#64748b; font-size:12px; padding:15px;'>No donation records logged for this target month.</td></tr>";
        return;
    }

    dataset.forEach((item, idx) => {
        let mode = item.mode || "UPI";
        let date = item.date || "N/A";
        let purpose = item.purpose || "Sadaqah";
        let masterIndex = dynamicMasterLedger.indexOf(item);
        
        tbody.innerHTML += `<tr>
            <td><b>${item.id}</b><br><small style="color:#64748b; font-size:10px;">📅 ${date}</small></td>
            <td><b>₹${item.amount.toLocaleString('en-IN')}</b></td>
            <td>
                <div style="display:flex; flex-direction:column; gap:4px;">
                    <select class="btn-core" style="padding:2px 4px; font-size:10px; background:#0f172a; color:#fbbf24; border:1px solid #d97706;" onchange="updateTransactionPurpose(${masterIndex}, this.value)">
                        <option value="Sadaqah" ${purpose==='Sadaqah'?'selected':''}>🤲 Sadaqah</option>
                        <option value="For Madarsa" ${purpose==='For Madarsa'?'selected':''}>📚 For Madarsa</option>
                        <option value="Qurbani Sadaqah" ${purpose==='Qurbani Sadaqah'?'selected':''}>🐑 Qurbani Sadaqah</option>
                        <option value="1 Time Meal" ${purpose==='1 Time Meal'?'selected':''}>🍲 1 Time Meal</option>
                        <option value="Zakat" ${purpose==='Zakat'?'selected':''}>🌙 Zakat</option>
                        <option value="Others" ${!['Sadaqah','For Madarsa','Qurbani Sadaqah','1 Time Meal','Zakat'].includes(purpose)?'selected':''}>✏️ ${purpose}</option>
                    </select>
                    <select class="btn-core" style="padding:2px 4px; font-size:10px; background:#0f172a; color:#fff;" onchange="updateTransactionPaymentMode(${masterIndex}, this.value)">
                        <option value="UPI" ${mode==='UPI'?'selected':''}>💳 UPI</option>
                        <option value="BANK" ${mode==='BANK'?'selected':''}>🏦 BANK</option>
                        <option value="CASH" ${mode==='CASH'?'selected':''}>💵 CASH</option>
                    </select>
                </div>
            </td>
            <td>
                <button class="btn-core bg-navy" style="padding:3px 7px; font-size:11px; width:auto;" onclick="openReceiptModal('${item.id}', ${item.amount}, '${item.month}', '${mode}', '${date}', ${idx}, '${purpose.replace(/'/g, "\\'")}')">🧾 Receipt</button>
                <button class="btn-mini-delete" onclick="purgeLedgerRow('${item.id}', ${item.amount}, '${item.month}')">❌ Delete</button>
            </td>
        </tr>`;
    });
}

function purgeLedgerRow(id, amount, month) {
    if(confirm("Confirm entry deletion line item?")) {
        let idx = dynamicMasterLedger.findIndex(x => x.id === id && x.amount === amount && x.month === month);
        if(idx !== -1) {
            dynamicMasterLedger.splice(idx, 1);
            saveLedgerStateToStorage();
            recalculateLifetimeDonationTotals();
            calculateMasterMetrics(); 
            renderDonorAttendanceLoyaltyMatrix();
            switchAdminLogsMonth(adminActiveLogsMonth);
            switchSystemMonth(selectedActiveMonth); 
            alert("Record deleted from dynamic database.");
        }
    }
}

function renderDataTable(data) {
    const tbody = document.getElementById('dynamicTableBody'); 
    if(!tbody) return;
    tbody.innerHTML = "";
    let filtered = data;
    if(globalActiveSearchQuery) {
        filtered = data.filter(item => item.id.toLowerCase().includes(globalActiveSearchQuery));
    }
    if(filtered.length === 0) { tbody.innerHTML = "<tr><td colspan='5' style='text-align:center;'>No Matching Audit Entries</td></tr>"; return; }
    
    filtered.forEach((item, idx) => {
        let profile = masterDonorsProfiles.find(d => d.id === item.id);
        let status = profile ? profile.status : "Active Donor";
        let badge = status === "Rarely donor" ? "status-rare" : (status.includes("Not Active") ? "status-inactive" : "status-active");
        let mode = item.mode || "UPI";
        let date = item.date || "N/A";
        let purpose = item.purpose || "Sadaqah";

        tbody.innerHTML += `<tr>
            <td><b>${item.id}</b></td>
            <td><span class="badge-status ${badge}">${status}</span></td>
            <td><b>₹${item.amount.toLocaleString('en-IN')}</b></td>
            <td>
                <div style="display:flex; flex-direction:column; gap:2px;">
                    <span class="badge-status" style="background:#fef3c7; color:#b45309; font-weight:bold; width:fit-content;">🎯 ${purpose}</span>
                    <div style="font-size:11px; color:#0369a1; font-weight:bold;">💳 Mode: ${mode}</div>
                    <div style="font-size:10px; color:#64748b;">📅 ${date}</div>
                </div>
            </td>
            <td>
                <button class="btn-core bg-navy" style="padding:3px 8px; font-size:11px;" onclick="openReceiptModal('${item.id}', ${item.amount}, '${item.month}', '${mode}', '${date}', ${idx}, '${purpose.replace(/'/g, "\\'")}')">🧾 Receipt</button>
            </td>
        </tr>`;
    });
}

function renderMasterDonorRegistry() {
    const thead = document.getElementById('masterDonorTableHeader');
    const tbody = document.getElementById('masterDonorTableBody'); 
    if(!thead || !tbody) return;
    
    let headerHtml = `<tr><th>Auditable Donor ID</th>`;
    if(registryVisibility.showPhone) headerHtml += `<th>Associated Mobile</th>`;
    if(registryVisibility.showTotal) headerHtml += `<th>Lifetime Capital</th>`;
    if(registryVisibility.showStatus) headerHtml += `<th>Active Status</th>`;
    headerHtml += `</tr>`;
    thead.innerHTML = headerHtml;

    tbody.innerHTML = "";
    masterDonorsProfiles.forEach(d => {
        let badge = d.status === "Rarely donor" ? "status-rare" : (d.status.includes("Not Active") ? "status-inactive" : "status-active");
        let phone = isAdminAuthenticated ? (d.phone || '—') : "🔒 Hidden Matrix";
        let idText = isAdminAuthenticated ? `<b>${d.id} (${d.name})</b>` : `<b>${d.id}</b>`;
        
        let rowHtml = `<tr><td>${idText}</td>`;
        if(registryVisibility.showPhone) rowHtml += `<td><span style="font-family:monospace; color:var(--emerald-light); font-weight:700;">${phone}</span></td>`;
        if(registryVisibility.showTotal) rowHtml += `<td><b>₹${d.total.toLocaleString('en-IN')}</b></td>`;
        if(registryVisibility.showStatus) rowHtml += `<td><span class="badge-status ${badge}">${d.status}</span></td>`;
        rowHtml += `</tr>`;
        
        tbody.innerHTML += rowHtml;
    });
}

function executeWhatsAppBroadcastReminder() {
    window.open('https://chat.whatsapp.com/FNuEkHfLjZM4nIna0Wv4rT', '_blank');
}

function toggleAdminState() {
    if(isAdminAuthenticated) {
        isAdminAuthenticated = false;
        clearTimeout(adminInactivityTimer);
        localStorage.removeItem('adminSessionExpiry');
        document.getElementById('adminWorkspace').classList.remove('active');
        document.getElementById('adminControlBtn').innerText = "🔑 Admin Access";
        buildInterfaceControls();
        switchSystemMonth(selectedActiveMonth);
        renderAdminMessageInboxTable();
        alert("🔒 Signed out successfully. Admin session locked.");
    } else { 
        document.getElementById('authGatewayModal').classList.add('visible'); 
    }
}

function dismissAuthGate() { document.getElementById('authGatewayModal').classList.remove('visible'); }

function validateAuthGateAttempt() {
    const user = document.getElementById('gateUser').value;
    const pass = document.getElementById('gatePass').value;

    if(user === "admin" && pass === customAdminPasswordToken) {
        isAdminAuthenticated = true; dismissAuthGate();
        
        const rememberMe = document.getElementById('rememberSessionCheck').checked;
        if (rememberMe) {
            const expiryTimestamp = new Date().getTime() + TWENTY_FOUR_HOURS_MS;
            localStorage.setItem('adminSessionExpiry', expiryTimestamp.toString());
        } else {
            localStorage.removeItem('adminSessionExpiry');
        }

        const auditTimeEl = document.getElementById('auditSessionTime');
        const auditDevEl = document.getElementById('auditSessionDevice');
        if(auditTimeEl) auditTimeEl.innerText = getCurrentISTTimestamp();
        if(auditDevEl) auditDevEl.innerText = `${navigator.platform} (${navigator.userAgent.slice(0, 20)}...)`;

        document.getElementById('adminWorkspace').classList.add('active');
        document.getElementById('adminControlBtn').innerText = "🔒 Secure Logout";
        buildInterfaceControls(); loadPersistentDatabaseState(); switchSystemMonth(selectedActiveMonth); renderAdminMessageInboxTable();
        resetAdminInactivityTimer();
    } else { alert("Security failure. Invalid access credentials."); }
}

function setupInactivityListeners() {
    ['mousemove', 'mousedown', 'keypress', 'touchstart', 'scroll'].forEach(evt => {
        window.addEventListener(evt, () => {
            if(isAdminAuthenticated) resetAdminInactivityTimer();
        });
    });
}

function resetAdminInactivityTimer() {
    clearTimeout(adminInactivityTimer);
    adminInactivityTimer = setTimeout(() => {
        if(isAdminAuthenticated) {
            if(!localStorage.getItem('adminSessionExpiry')) {
                isAdminAuthenticated = false;
                document.getElementById('adminWorkspace').classList.remove('active');
                document.getElementById('adminControlBtn').innerText = "🔑 Admin Access";
                buildInterfaceControls();
                switchSystemMonth(selectedActiveMonth);
                alert("⏰ Admin session auto-locked due to 12 minutes of inactivity.");
            }
        }
    }, ADMIN_AUTO_LOCK_TIMEOUT_MS);
}

function calculateMasterMetrics() {
    const matrix = document.getElementById('timelineMatrix'); 
    if(!matrix) return;
    matrix.innerHTML = "";
    systemMonthSequence.forEach(m => {
        const sum = dynamicMasterLedger.filter(r => r.month === m).reduce((a,r) => a + r.amount, 0);
        matrix.innerHTML += `<div class="timeline-node ${m === selectedActiveMonth ? 'active' : ''}" onclick="switchSystemMonth('${m}')">${m} <span>₹${sum.toLocaleString('en-IN')}</span></div>`;
    });
}

function syncPhoneInputField(donorId) {
    const p = masterDonorsProfiles.find(d => d.id === donorId);
    if(p) {
        document.getElementById('admStatusName').value = p.name || "";
        document.getElementById('admStatusPhone').value = p.phone || "";
        document.getElementById('admStatusValueSelect').value = p.status || "Active Donor";
    }
}

function syncBankingUIRenderElements() {
    document.getElementById('pubBankName').innerText = systemGlobalBankState.name;
    document.getElementById('pubBankAcc').innerText = systemGlobalBankState.account;
    document.getElementById('pubBankIfsc').innerText = systemGlobalBankState.ifsc;
}

function updateExportTextAreaBox() {
    const targetBox = document.getElementById('admRawJsonArea');
    if(targetBox) { targetBox.value = JSON.stringify(dynamicMasterLedger, null, 2); }
}

function generateRawJsonExport() {
    updateExportTextAreaBox();
    document.getElementById('admRawJsonArea').select();
    navigator.clipboard.writeText(document.getElementById('admRawJsonArea').value);
    alert("📋 Code copied!");
}

function importRawJsonMatrix() {
    const rawInput = document.getElementById('admRawJsonArea').value.trim();
    if(!rawInput) return;
    try {
        const parsed = JSON.parse(rawInput);
        if(Array.isArray(parsed)) {
            dynamicMasterLedger = parsed.map(normalizeLedgerItem);
            saveLedgerStateToStorage();
            recalculateLifetimeDonationTotals();
            buildInterfaceControls();
            calculateMasterMetrics();
            renderDonorAttendanceLoyaltyMatrix();
            switchAdminLogsMonth(adminActiveLogsMonth);
            switchSystemMonth(selectedActiveMonth);
            alert("Local application cache adjusted and rendered successfully.");
        }
    } catch(e) { alert("Invalid structural JSON text syntax layout."); }
}

function openReceiptModal(donorId, amount, month, mode = "UPI", dateStr = null, index = 0, purpose = "Sadaqah") {
    const profile = masterDonorsProfiles.find(p => p.id === donorId);
    activeReceiptContext = { donorId, profile };
    
    if(!dateStr || dateStr === "N/A") {
        dateStr = getCurrentISTTimestamp();
    } else if(!dateStr.includes("IST")) {
        dateStr += " IST";
    }

    const genTimeStr = getCurrentISTTimestamp();
    const fixedReceiptId = `GWL-${month.toUpperCase().replace('-', '')}-${donorId}`;

    if(document.getElementById('rcptNo')) document.getElementById('rcptNo').innerText = fixedReceiptId;
    if(document.getElementById('rcptMonth')) document.getElementById('rcptMonth').innerText = month;
    if(document.getElementById('rcptAmount')) document.getElementById('rcptAmount').innerText = `₹${amount.toLocaleString('en-IN')}`;
    if(document.getElementById('rcptMode')) document.getElementById('rcptMode').innerText = mode;
    if(document.getElementById('rcptDate')) document.getElementById('rcptDate').innerText = dateStr;
    if(document.getElementById('rcptGenTime')) document.getElementById('rcptGenTime').innerText = genTimeStr;
    if(document.getElementById('rcptPurpose')) document.getElementById('rcptPurpose').innerText = purpose;
    
    const nameToggleBox = document.getElementById('adminReceiptNameToggle');
    const nameCheck = document.getElementById('rcptIncludeNameCheck');
    
    if(isAdminAuthenticated) {
        if(nameToggleBox) nameToggleBox.style.display = "block";
    } else {
        if(nameToggleBox) nameToggleBox.style.display = "none";
        if(nameCheck) nameCheck.checked = false;
    }

    renderReceiptDonorDisplay();
    document.getElementById('receiptPreviewModal').classList.add('visible');
}

function toggleReceiptDonorNameDisplay() {
    renderReceiptDonorDisplay();
}

function renderReceiptDonorDisplay() {
    const rcptDonorEl = document.getElementById('rcptDonor');
    if(!rcptDonorEl || !activeReceiptContext.donorId) return;

    const nameCheck = document.getElementById('rcptIncludeNameCheck');
    const shouldIncludeName = isAdminAuthenticated && nameCheck && nameCheck.checked;

    if (shouldIncludeName && activeReceiptContext.profile && activeReceiptContext.profile.name) {
        rcptDonorEl.innerText = `${activeReceiptContext.donorId} (${activeReceiptContext.profile.name})`;
    } else {
        rcptDonorEl.innerText = activeReceiptContext.donorId;
    }
}

function closeReceiptModal() {
    document.getElementById('receiptPreviewModal').classList.remove('visible');
}

function downloadSingleReceiptPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: [105, 160] });
    
    const element = document.getElementById('receiptPrintCard');
    html2canvas(element, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 4, 4, 97, 152);
        doc.save(`Receipt_${document.getElementById('rcptNo').innerText}.pdf`);
    });
}

function triggerPDFDownload() {
    const { jsPDF } = window.jspdf; const doc = new jsPDF();
    doc.setFont("Helvetica", "bold"); doc.text(`Giving with Love Transparency Statement - ${selectedActiveMonth}`, 14, 20);
    const data = dynamicMasterLedger.filter(r => r.month === selectedActiveMonth).map(i => [i.id, masterDonorsProfiles.find(d => d.id === i.id)?.status || "Active Donor", `Rs. ${i.amount}`, i.purpose || "Sadaqah", i.mode || "UPI", i.date || "N/A"]);
    doc.autoTable({ startY: 28, head: [['Donor ID', 'Status', 'Value', 'Purpose', 'Mode', 'Date (IST)']], body: data, theme: 'grid', headStyles: { fillColor: [4, 47, 46] } });
    doc.save(`GivingWithLove_Statement_${selectedActiveMonth}.pdf`);
}

function triggerExcelDownload() {
    const headers = [['Auditable Donor ID', 'Engagement Status', 'Value', 'Purpose / Reason', 'Payment Mode', 'Timestamp (IST)']];
    dynamicMasterLedger.filter(r => r.month === selectedActiveMonth).forEach(i => headers.push([i.id, masterDonorsProfiles.find(d => d.id === i.id)?.status || "Active Donor", i.amount, i.purpose || "Sadaqah", i.mode || "UPI", i.date || "N/A"]));
    const book = XLSX.utils.book_new(); const sheet = XLSX.utils.aoa_to_sheet(headers);
    XLSX.utils.book_append_sheet(book, sheet, "Audit Ledger Workspace"); XLSX.writeFile(book, `GivingWithLove_Ledger_${selectedActiveMonth}.xlsx`);
}

function purgeEntireLedgerLogs() { 
    if(confirm("🚨 CRITICAL WARNING: Wipe all custom database entries?")) { 
        dynamicMasterLedger = []; 
        saveLedgerStateToStorage();
        recalculateLifetimeDonationTotals();
        calculateMasterMetrics(); 
        renderDonorAttendanceLoyaltyMatrix();
        switchAdminLogsMonth(adminActiveLogsMonth);
        switchSystemMonth(selectedActiveMonth); 
    } 
}

function resetProfilesToDefault() { 
    if(confirm("Reset donor profile directory to default phone numbers without losing ledger logs?")) { 
        localStorage.removeItem('masterDonorsProfiles');
        location.reload();
    } 
}

function smoothScrollToCoordinates(yCoord) {
    window.scrollTo({ top: yCoord, behavior: 'smooth' });
}
