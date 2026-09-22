# Heybeli Sahne 🎤 🥂
> **Yeni Nesil Meyhane & Canlı Performans Sahnesi**  
> *Ünlü sanatçıların canlı performansları, Ege mezeleri, VIP localar ve modern eğlence kültürü.*

---

## 🌟 Proje Özeti
- **Domain:** [https://heybelisahne.com](https://heybelisahne.com) (veya `http://heybelisahne.com`)
- **Sunucu:** DigitalOcean Ubuntu Droplet (`164.92.251.18`)
- **Uygulama Portu:** `3002` (Node.js / Express)
- **Süreç Yöneticisi:** PM2 (`heybeli-sahne`)
- **Web Sunucusu / Reverse Proxy:** Nginx (`/etc/nginx/sites-available/heybelisahne.com`)
- **SSL Sertifikası:** Let's Encrypt Certbot
- **İkinci Proje İzolasyonu:** Sunucuda port 3001'de çalışan `desingicmimarlik.com` projesinden tamamen bağımsızdır.

---

## 📁 Dizin Yapısı
```
heybeli-sahne/
├── events-data.js        # Canlı konserler, sanatçılar, fiks menüler ve mekan veri tabanı
├── server.js             # Express web sunucusu (Port 3002, API'lar & rota yönlendirme)
├── package.json          # Node bağımlılıkları & otomatik deploy betiği
├── .gitignore            # Git istisnaları
├── README.md             # Dokümantasyon
├── PROJECT_CONTEXT.md    # Mimari & sunucu notları
└── public/               # Statik frontend dosyaları
    ├── index.html        # Ana sayfa (Hero, Canlı Sanatçılar, Gastronomi, Rezervasyon)
    ├── program.html      # Canlı konser takvimi & filtreleme
    ├── menu.html         # Fiks menüler, mezeler & ara sıcaklar
    ├── galeri.html       # Sahne ve atmosfer fotoğraf galerisi
    ├── rezervasyon.html  # Masa ve VIP loca rezervasyon sayfası
    ├── iletisim.html     # Konum, ulaşım rehberi, vale ve iletişim
    ├── style.css         # "Midnight Glamour & Neon Stage" özel tasarım sistemi
    ├── app.js            # Dinamik filtreleme, rezervasyon ve UI etkileşimleri
    ├── robots.txt        # SEO robot direktifleri
    ├── sitemap.xml       # Arama motoru haritası
    └── llms.txt          # Yapay zeka ve arama crawler özeti
```

---

## 🚀 Hızlı Başlangıç (Yerel Çalıştırma)
```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme modunda başlatın
npm run dev

# Tarayıcıda açın
http://localhost:3002
```

---

## 🔄 Otomatik Canlıya Alma (Deploy)
Tek bir komutla yerel değişiklikleri GitHub'a iter ve DigitalOcean sunucusuna otomatik olarak çekip PM2 sürecini kesintisiz yeniden yükler:
```bash
npm run deploy
```

---

## 📌 Sunucu Bilgileri & Port Eşlemesi
| Proje | Alan Adı | Port | PM2 Adı | Nginx Konfigürasyonu |
| :--- | :--- | :--- | :--- | :--- |
| **Design İç Mimarlık** | `desingicmimarlik.com` | `3001` | `ysnmimarlik` | `/etc/nginx/sites-available/default` |
| **Heybeli Sahne** | `heybelisahne.com` | `3002` | `heybeli-sahne` | `/etc/nginx/sites-available/heybelisahne.com` |
