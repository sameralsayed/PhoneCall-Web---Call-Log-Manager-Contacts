// script.js
// Fake Call Logs Data
let callLogs = [
    { id: 1, type: "missed", name: "Sarah Chen", number: "+1 (415) 555-0192", time: "Today 09:41", duration: "0:00", icon: "fas fa-phone-slash" },
    { id: 2, type: "incoming", name: "Michael Torres", number: "+1 (310) 555-2847", time: "Today 08:15", duration: "4:22", icon: "fas fa-phone" },
    { id: 3, type: "outgoing", name: "Emma Rodriguez", number: "+1 (212) 555-6734", time: "Yesterday 19:05", duration: "12:09", icon: "fas fa-phone" },
    { id: 4, type: "missed", name: "Unknown", number: "+44 20 7946 0958", time: "Yesterday 14:30", duration: "0:00", icon: "fas fa-phone-slash" },
    { id: 5, type: "incoming", name: "David Kim", number: "+1 (650) 555-1289", time: "Mar 28", duration: "8:45", icon: "fas fa-phone" }
];

// Fake Contacts
let contacts = [
    { id: 1, name: "Sarah Chen", number: "+1 (415) 555-0192", favorite: true },
    { id: 2, name: "Michael Torres", number: "+1 (310) 555-2847", favorite: false },
    { id: 3, name: "Emma Rodriguez", number: "+1 (212) 555-6734", favorite: true },
    { id: 4, name: "David Kim", number: "+1 (650) 555-1289", favorite: false },
    { id: 5, name: "Priya Sharma", number: "+91 98765 43210", favorite: false }
];

let blockedNumbers = ["+1 (555) 666-7777", "+44 20 7946 0958"];

function renderCallLogs(filteredLogs) {
    const container = document.getElementById('callLogList');
    container.innerHTML = filteredLogs.map(log => `
        <div class="list-group-item d-flex align-items-center call-item ${log.type}" onclick="showCallDetails(${log.id})">
            <i class="${log.icon} fa-2x me-4 ${log.type === 'missed' ? 'text-danger' : log.type === 'incoming' ? 'text-success' : 'text-primary'}"></i>
            <div class="flex-grow-1">
                <h6 class="mb-0">${log.name}</h6>
                <small class="text-muted">${log.number} • ${log.time}</small>
            </div>
            <div class="text-end">
                <small class="d-block">${log.duration}</small>
                <i onclick="callBack('${log.number}');event.stopImmediatePropagation()" class="fas fa-phone text-primary"></i>
            </div>
        </div>
    `).join('');
}

function filterLogs(type) {
    document.querySelectorAll('.btn-group button').forEach(btn => btn.classList.remove('active'));
    if (type === 'all') document.getElementById('filter-all').classList.add('active');
    else if (type === 'incoming') document.getElementById('filter-incoming').classList.add('active');
    else if (type === 'outgoing') document.getElementById('filter-outgoing').classList.add('active');
    else if (type === 'missed') document.getElementById('filter-missed').classList.add('active');

    let filtered = callLogs;
    if (type !== 'all') filtered = callLogs.filter(log => log.type === type);
    renderCallLogs(filtered);
}

function showCallDetails(id) {
    const log = callLogs.find(l => l.id === id);
    if (!log) return;
    alert(`📞 Call Details\n\nName: ${log.name}\nNumber: ${log.number}\nTime: ${log.time}\nDuration: ${log.duration}\nType: ${log.type.toUpperCase()}`);
}

function callBack(number) {
    alert(`📲 Calling ${number}... (Demo simulation)`);
}

function renderContacts(filteredContacts) {
    const container = document.getElementById('contactsList');
    container.innerHTML = filteredContacts.map(contact => `
        <div class="col-12 col-sm-6 col-md-4">
            <div class="contact-card card h-100 shadow-sm border-0">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style="width:52px;height:52px;font-size:1.4rem;">
                            ${contact.name[0]}
                        </div>
                        <div class="flex-grow-1">
                            <h6 class="mb-0">${contact.name}</h6>
                            <small class="text-muted">${contact.number}</small>
                        </div>
                        ${contact.favorite ? `<i class="fas fa-star text-warning"></i>` : ''}
                    </div>
                </div>
                <div class="card-footer bg-transparent border-0 d-flex justify-content-between">
                    <button onclick="callBack('${contact.number}');event.stopImmediatePropagation()" class="btn btn-sm btn-outline-primary"><i class="fas fa-phone"></i></button>
                    <button onclick="toggleFavorite(${contact.id});event.stopImmediatePropagation()" class="btn btn-sm btn-outline-warning"><i class="fas fa-star"></i></button>
                </div>
            </div>
        </div>
    `).join('');
}

function searchContacts() {
    const query = document.getElementById('contactSearch').value.toLowerCase().trim();
    let filtered = contacts;
    if (query) {
        filtered = contacts.filter(c => c.name.toLowerCase().includes(query));
    }
    renderContacts(filtered);
}

function toggleFavorite(id) {
    const contact = contacts.find(c => c.id === id);
    if (contact) {
        contact.favorite = !contact.favorite;
        renderContacts(contacts);
        renderFavorites();
    }
}

function renderFavorites() {
    const favs = contacts.filter(c => c.favorite);
    const container = document.getElementById('favoritesList');
    container.innerHTML = favs.length ? favs.map(contact => `
        <div class="col-12 col-sm-6 col-md-4">
            <div class="contact-card card h-100 shadow-sm border-0 bg-white">
                <div class="card-body text-center">
                    <div class="rounded-circle bg-warning text-white d-flex align-items-center justify-content-center mx-auto mb-3" style="width:72px;height:72px;font-size:2rem;">
                        ${contact.name[0]}
                    </div>
                    <h6>${contact.name}</h6>
                    <small class="text-muted">${contact.number}</small>
                </div>
                <div class="card-footer d-flex justify-content-center gap-3">
                    <button onclick="callBack('${contact.number}')" class="btn btn-primary btn-sm"><i class="fas fa-phone"></i></button>
                </div>
            </div>
        </div>
    `).join('') : `<div class="col-12 text-center text-muted py-5">No favorites yet. Mark contacts as favorite!</div>`;
}

function renderBlocked() {
    const container = document.getElementById('blockedList');
    container.innerHTML = blockedNumbers.map((num, index) => `
        <div class="list-group-item d-flex justify-content-between align-items-center">
            <div><i class="fas fa-ban text-danger me-3"></i> ${num}</div>
            <button onclick="unblockNumber(${index});event.stopImmediatePropagation()" class="btn btn-sm btn-outline-success">Unblock</button>
        </div>
    `).join('');
}

function addToBlockList() {
    const num = prompt("Enter number to block (demo):", "+1 (555) 999-8888");
    if (num) {
        blockedNumbers.unshift(num);
        renderBlocked();
        alert(`🚫 ${num} has been blocked!`);
    }
}

function unblockNumber(index) {
    blockedNumbers.splice(index, 1);
    renderBlocked();
}

function showAfterCallDemo() {
    const modal = new bootstrap.Modal(document.getElementById('afterCallModal'));
    // Random caller for demo
    const names = ["John Doe", "Emma Watson", "Alex Rivera"];
    document.getElementById('demoCallerName').textContent = names[Math.floor(Math.random()*names.length)];
    document.getElementById('demoCallerNumber').innerHTML = `+1 (555) 777-1234 • ${Math.floor(Math.random()*5)+1}:${Math.floor(Math.random()*59)} min`;
    modal.show();
}

function demoAction(action) {
    const modal = bootstrap.Modal.getInstance(document.getElementById('afterCallModal'));
    modal.hide();
    if (action === 'call') alert("📲 Calling back... (demo)");
    else if (action === 'message') alert("💬 Opening messaging app... (demo)");
    else if (action === 'save') alert("✅ Contact saved successfully!");
    else if (action === 'block') {
        blockedNumbers.unshift("+1 (555) 777-1234");
        renderBlocked();
        alert("🚫 Number blocked!");
    }
}

// Initialize app
window.onload = function() {
    renderCallLogs(callLogs);
    renderContacts(contacts);
    renderFavorites();
    renderBlocked();
    
    console.log('%c🚀 PhoneCall Web loaded – Full call log & contacts manager ready!', 'color:#0d6efd; font-size:14px; font-weight:bold;');
};
