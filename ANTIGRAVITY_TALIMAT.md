# 🚀 Heybeli Sahne — Antigravity IDE Çalışma ve Başlangıç Talimatı

Bu doküman, projeye yeni dahil olan bir ekip arkadaşının **Google Antigravity IDE** kullanarak projede sıfır hata ve tam bağlamla çalışmaya başlaması için hazırlanmış kapsamlı rehberdir.

---

## 📋 1. Hızlı Başlangıç Adımları (Geliştirici İçin)

1. **Repoyu Klonlayın veya Açın:**
   ```bash
   git clone https://github.com/serhatsacan/heybeli-sahne.git
   cd heybeli-sahne
   ```
2. **Antigravity IDE'de Çalışma Alanı Olarak Açın:**
   - Antigravity IDE üzerinden `File -> Open Folder` diyerek `heybeli-sahne` dizinini açın.
   - Bu dizini **Active Workspace** olarak ayarlayın.
3. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```
4. **Yerel Geliştirme Sunucusunu Çalıştırın:**
   ```bash
   npm run dev
   # Sunucu http://localhost:3002 üzerinde çalışacaktır
   ```

---

## 💬 2. Antigravity IDE'ye Verilecek İlk Başlangıç Komutu (Kopyala & Yapıştır)

Antigravity IDE chat kutusuna aşağıdaki talimat bloğunu aynen yapıştırarak doğrudan başlayabilirsiniz:

```markdown
Merhaba Antigravity,

Heybeli Sahne (https://heybelisahne.com) web platformu üzerinde çalışıyoruz.
Projenin mimari kuralları, tasarım dili ve sunucu standartları AGENTS.md ve PROJECT_CONTEXT.md dosyalarında tanımlıdır.

Lütfen başlamadan önce şu kritik kuralları aklında tut:

1. SUNUCU & PORT İZOLASYONU:
   - DigitalOcean Droplet IP: 164.92.251.18
   - Port 3001: desingicmimarlik.com (PM2: ysnmimarlik) -> KESİNLİKLE DOKUNULMAZ, DURDURULMAZ, ASLA ETKİLENMEZ.
   - Port 3002: heybelisahne.com (PM2: heybeli-sahne) -> Bizim projemiz.
   - Deploy komutu: `npm run deploy` (Git push + SSH remote pull & pm2 reload heybeli-sahne).

2. TASARIM DİLİ (LUXURY EDITORIAL & FINE DINING):
   - Kesinlikle neon, SaaS kartları, yuvarlak hap kartlar veya gece kulübü parlamaları kullanılmaz.
   - Renk Paleti: Obsidian gece siyahı (#0B0C0E), Sıcak Fildişi (#F2EEE7), Keten (#D8D0C3), Antika Pirinç Altın (#C49A55).
   - Tipografi: Cormorant Garamond / Playfair Display (Serif başlıklar) ve Plus Jakarta Sans (Gövde).
   - Köşe yuvarlamaları: 0px - 2px arası minimalist.

3. MOBİL & TEKNİK STANDARTLAR:
   - Sabit mobil aksiyon çubuğu (.mobile-bottom-bar) korunmalıdır.
   - Form input font boyutu iOS auto-zoom engellemesi için mobilde en az 16px olmalıdır.
   - Schema.org (Restaurant, Event, FAQPage, Menu) ve Geo meta tag'leri korunmalıdır.
   - AI arama standartları (llms.txt, llms-full.txt, robots.txt) güncel tutulmalıdır.
   - Sunucu sıkıştırması (compression) ve HTTP/2 ayarları bozulmamalıdır.

Projeyi incele, hazır olduğunu ve anladığını özetleyerek sonraki görevi bekle.
```

---

## 🏗️ 3. Proje Mimarisi & Dosya Haritası

```
heybeli-sahne/
├── AGENTS.md                  # Antigravity IDE kalıcı çalışma ve sistem kuralları
├── ANTIGRAVITY_TALIMAT.md     # Ekip içi hızlı başlangıç ve talimat rehberi (Bu dosya)
├── PROJECT_CONTEXT.md         # Sunucu ve mimari bağlam notları
├── server.js                  # Express.js backend (Gzip compression, static caching, SEO routes)
├── events-data.js             # Sahne sanatçıları, menü ve mekan veri tabanı
├── package.json               # Bağımlılıklar ve deploy scripti
└── public/
    ├── index.html             # Ana Sayfa (Editorial vitrin, konser takvimi, FAQ akordiyonu)
    ├── program.html           # Sahne Programı ve konser galaları
    ├── menu.html              # Fiks menüler ve gurme Ege mezeleri
    ├── rezervasyon.html       # Online masa ve VIP loca rezervasyon formu
    ├── iletisim.html          # İletişim, konum, vale ve yol tarifi
    ├── galeri.html            # Mekan ve sahne fotoğraf galerisi
    ├── style.css              # Tekil Luxury Editorial Tasarım Sistemi ve Mobil UX
    ├── app.js                 # Mobil menü drawer, FAQ akordiyon ve rezervasyon AJAX
    ├── llms.txt               # LLM / AI modelleri için özet Markdown rehberi
    ├── llms-full.txt          # Perplexity / ChatGPT için detaylı menü & fiyat referansı
    ├── robots.txt             # Arama motorları ve AI crawler direktifleri
    └── sitemap.xml            # Otomatik indeksleme haritası
```

---

## 🚀 4. Canlıya Dağıtım (Deployment) Standartları

Tüm değişiklikler Git üzerinden yönetilir ve tek komutla DigitalOcean sunucusuna canlıya alınır:

```bash
# 1. Değişiklikleri yerel sunucuda test edin
npm run dev

# 2. Git commit oluşturun
git add .
git commit -m "feat: yapılan geliştirme açıklaması"

# 3. Canlı sunucuya dağıtın
npm run deploy
```

`npm run deploy` komutu arka planda şu adımları güvenle yürütür:
1. Değişiklikleri GitHub `main` dalına push eder.
2. `164.92.251.18` sunucusuna SSH ile bağlanır.
3. `/var/www/heybeli-sahne` dizinine gidip `git pull origin main` yapar.
4. Yeni bağımlılık varsa `npm install --production` çalıştırır.
5. Yalnızca Port 3002'deki süreci yenilemek için `pm2 reload heybeli-sahne` çalıştırır (Port 3001'deki diğer proje asla etkilenmez).

---

## 🧪 5. Canlı Doğrulama Komutları

Geliştirme sonrası canlı ortamı doğrulamak için aşağıdaki komutları kullanabilirsiniz:

```bash
# Canlı başlıkları, HTTP/2 ve Gzip sıkıştırmasını kontrol et
curl -s -D - -o /dev/null -H "Accept-Encoding: gzip" https://heybelisahne.com/

# Statik CSS önbelleklemesini kontrol et
curl -s -D - -o /dev/null -H "Accept-Encoding: gzip" https://heybelisahne.com/style.css

# AI AEO endpoint'lerini kontrol et
curl -s -o /dev/null -w "%{http_code}\n" https://heybelisahne.com/llms.txt
curl -s -o /dev/null -w "%{http_code}\n" https://heybelisahne.com/llms-full.txt

# PM2 süreç kararlılığını kontrol et
ssh root@164.92.251.18 'pm2 status'
```
