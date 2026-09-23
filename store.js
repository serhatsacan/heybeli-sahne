const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

// Ensure data directory and store file exist
function initStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(STORE_FILE)) {
    const initialData = {
      reservations: [
        {
          id: 'RES-8921',
          name: 'Murat Yılmaz',
          phone: '0532 450 11 22',
          date: '2026-09-25',
          guests: '4 Kişi',
          tableType: 'Sahne Önü VIP Masa',
          note: 'Evlilik yıldönümü kutlaması, pasta rica ediyoruz.',
          status: 'onaylandi',
          createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          ip: '127.0.0.1'
        },
        {
          id: 'RES-8920',
          name: 'Zeynep Kaya',
          phone: '0541 330 44 55',
          date: '2026-09-26',
          guests: '2 Kişi',
          tableType: 'Standart Meyhane Masası',
          note: 'Sahneyi gören sakin bir masa tercihimizdir.',
          status: 'yeni',
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          ip: '127.0.0.1'
        }
      ],
      clicks: [
        {
          id: 'CLK-101',
          type: 'whatsapp',
          source: 'mobile-bottom-bar',
          page: '/',
          device: 'Mobil (iOS)',
          timestamp: new Date(Date.now() - 3600000 * 3).toISOString()
        },
        {
          id: 'CLK-102',
          type: 'call',
          source: 'mobile-bottom-bar',
          page: '/program',
          device: 'Mobil (Android)',
          timestamp: new Date(Date.now() - 3600000 * 1).toISOString()
        }
      ]
    };
    fs.writeFileSync(STORE_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

// Read data
function readData() {
  try {
    initStore();
    const raw = fs.readFileSync(STORE_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Store read error:', err);
    return { reservations: [], clicks: [] };
  }
}

// Write data
function writeData(data) {
  try {
    initStore();
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Store write error:', err);
    return false;
  }
}

// Reservations API
function addReservation(item) {
  const data = readData();
  const newReservation = {
    id: 'RES-' + Math.floor(1000 + Math.random() * 9000),
    name: item.name,
    phone: item.phone,
    date: item.date,
    guests: item.guests || '2 Kişi',
    tableType: item.tableType || 'Standart Masa',
    note: item.note || '',
    status: 'yeni', // 'yeni' | 'onaylandi' | 'iptal'
    createdAt: new Date().toISOString(),
    ip: item.ip || 'Bilinmiyor'
  };

  data.reservations.unshift(newReservation);
  writeData(data);
  return newReservation;
}

function getReservations(filter = {}) {
  const data = readData();
  let list = data.reservations;

  if (filter.status && filter.status !== 'all') {
    list = list.filter(r => r.status === filter.status);
  }

  if (filter.search) {
    const q = filter.search.toLowerCase();
    list = list.filter(r => 
      (r.name && r.name.toLowerCase().includes(q)) || 
      (r.phone && r.phone.includes(q)) ||
      (r.id && r.id.toLowerCase().includes(q))
    );
  }

  return list;
}

function updateReservationStatus(id, newStatus) {
  const data = readData();
  const target = data.reservations.find(r => r.id === id);
  if (!target) return null;

  target.status = newStatus;
  target.updatedAt = new Date().toISOString();
  writeData(data);
  return target;
}

function deleteReservation(id) {
  const data = readData();
  const idx = data.reservations.findIndex(r => r.id === id);
  if (idx === -1) return false;

  data.reservations.splice(idx, 1);
  writeData(data);
  return true;
}

// Click Tracking API
function addClick(clickItem) {
  const data = readData();
  const newClick = {
    id: 'CLK-' + Math.floor(1000 + Math.random() * 9000),
    type: clickItem.type || 'whatsapp', // 'call' | 'whatsapp'
    source: clickItem.source || 'bilinmiyor', // 'mobile-bottom-bar', 'header', 'footer', etc.
    page: clickItem.page || '/',
    device: clickItem.device || 'Bilinmiyor',
    timestamp: new Date().toISOString(),
    ip: clickItem.ip || 'Bilinmiyor'
  };

  data.clicks.unshift(newClick);

  // Keep last 1000 clicks to prevent unbounded growth
  if (data.clicks.length > 1000) {
    data.clicks = data.clicks.slice(0, 1000);
  }

  writeData(data);
  return newClick;
}

function getClicks(limit = 100) {
  const data = readData();
  return data.clicks.slice(0, limit);
}

// Dashboard Summary Stats
function getStats() {
  const data = readData();
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const totalReservations = data.reservations.length;
  const newReservations = data.reservations.filter(r => r.status === 'yeni').length;
  const confirmedReservations = data.reservations.filter(r => r.status === 'onaylandi').length;
  const canceledReservations = data.reservations.filter(r => r.status === 'iptal').length;

  const totalCalls = data.clicks.filter(c => c.type === 'call').length;
  const totalWhatsapp = data.clicks.filter(c => c.type === 'whatsapp').length;

  const todayReservations = data.reservations.filter(r => r.createdAt && r.createdAt.startsWith(todayStr)).length;
  const todayCalls = data.clicks.filter(c => c.type === 'call' && c.timestamp && c.timestamp.startsWith(todayStr)).length;
  const todayWhatsapp = data.clicks.filter(c => c.type === 'whatsapp' && c.timestamp && c.timestamp.startsWith(todayStr)).length;
  const todayInteractions = todayReservations + todayCalls + todayWhatsapp;

  return {
    totalReservations,
    reservationsByStatus: { yeni: newReservations, onaylandi: confirmedReservations, iptal: canceledReservations },
    totalCalls,
    totalWhatsApp: totalWhatsapp,
    todayReservations,
    todayClicks: todayCalls + todayWhatsapp,
    todayTotal: todayInteractions,
    totalClicks: totalCalls + totalWhatsapp,
    reservations: {
      total: totalReservations,
      new: newReservations,
      confirmed: confirmedReservations,
      canceled: canceledReservations,
      today: todayReservations
    },
    clicks: {
      totalCalls,
      totalWhatsapp,
      todayCalls,
      todayWhatsapp
    }
  };
}

// CSV Export
function exportReservationsCSV() {
  const data = readData();
  const header = ['ID', 'Müşteri Adı', 'Telefon', 'Rezervasyon Tarihi', 'Kişi Sayısı', 'Masa Tipi', 'Durum', 'Kayıt Zamanı', 'Özel Not'];
  
  const rows = data.reservations.map(r => [
    `"${r.id}"`,
    `"${(r.name || '').replace(/"/g, '""')}"`,
    `"${r.phone || ''}"`,
    `"${r.date || ''}"`,
    `"${r.guests || ''}"`,
    `"${(r.tableType || '').replace(/"/g, '""')}"`,
    `"${r.status || ''}"`,
    `"${r.createdAt || ''}"`,
    `"${(r.note || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
  ]);

  return '\uFEFF' + [header.join(','), ...rows.map(row => row.join(','))].join('\r\n');
}

// Initialize on module load
initStore();

module.exports = {
  addReservation,
  getReservations,
  updateReservationStatus,
  deleteReservation,
  addClick,
  getClicks,
  getStats,
  exportReservationsCSV
};
