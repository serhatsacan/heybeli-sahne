# Heybeli Sahne - Sistem ve Mimari Bağlamı

## 1. Mimari Prensipler
- **Hafif ve Performanslı Mimari:** Ağır JavaScript framework'leri (React/Vue) yerine saf Vanilla CSS ve optimize edilmiş Vanilla JS tercih edildi. Bu sayede mobil cihazlarda anında açılış (0ms hydration delay) ve pürüzsüz 60fps kaydırma sağlandı.
- **Port ve Servis İzolasyonu:**
  - `desingicmimarlik.com`: Port `3001` (PM2 süreci: `ysnmimarlik`)
  - `heybelisahne.com`: Port `3002` (PM2 süreci: `heybeli-sahne`)
  - Her iki proje aynı Ubuntu Droplet (`164.92.251.18`) üzerinde bağımsız çalışır; birbirinin bellek, konfigürasyon veya port alanına müdahale etmez.

## 2. Nginx Sanal Sunucu Standardı
- Dosya konumu: `/etc/nginx/sites-available/heybelisahne.com`
- Sembolik bağ: `/etc/nginx/sites-enabled/heybelisahne.com`
- Nginx `server_name` blokları sayesinde gelen HTTP/HTTPS isteklerinin `Host` başlığına göre `3001` ya da `3002` portuna ters proxy (reverse proxy) yapılması sağlanır.

## 3. Dağıtım ve CI/CD
- GitHub Repo: `https://github.com/serhatsacan/heybeli-sahne.git`
- Sunucu Dizini: `/var/www/heybeli-sahne`
- Deploy Komutu: `npm run deploy` (Git commit & push sonrasında SSH üzerinden `git pull && npm install --production && pm2 reload heybeli-sahne` çalıştırır).
