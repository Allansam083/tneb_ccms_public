// Initialize localStorage if empty
if (!localStorage.getItem('divisions')) {
    localStorage.setItem('divisions', JSON.stringify([]));
}
if (!localStorage.getItem('complaints')) {
    localStorage.setItem('complaints', JSON.stringify([]));
}
if (!localStorage.getItem('actionLog')) {
    localStorage.setItem('actionLog', JSON.stringify([]));
}

function logAction(action) {
    const log = JSON.parse(localStorage.getItem('actionLog') || '[]');
    const timestamp = new Date().toISOString();
    log.push({ timestamp, action });
    localStorage.setItem('actionLog', JSON.stringify(log));
    console.log(`[${timestamp}] ${action}`);
    writeToSystemLog(action);
}

function getLogEntries() {
    return JSON.parse(localStorage.getItem('actionLog') || '[]');
}

function clearLog() {
    localStorage.setItem('actionLog', JSON.stringify([]));
    clearSystemLog();
    console.log('Logs cleared');
}

function generateComplaintId() {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `TNB${timestamp}${random}`;
}

function writeToSystemLog(action) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${action}\n`;
    let systemLog = localStorage.getItem('system_log.txt') || '';
    systemLog += logEntry;
    localStorage.setItem('system_log.txt', systemLog);
}

function getSystemLog() {
    return localStorage.getItem('system_log.txt') || '';
}

function clearSystemLog() {
    localStorage.setItem('system_log.txt', '');
}

