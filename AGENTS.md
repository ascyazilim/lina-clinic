# Lina Clinic - AGENTS.md

Bu dosya, Lina Clinic reposunda calisan ajanlar ve gelistiriciler icin proje baglami, sinirlar ve uygulama kurallarini tanimlar.

## Proje Ozeti

Lina Clinic, Lina Guzellik Merkezi icin gelistirilecek fullstack bir tanitim sitesi ve randevu yonetim sistemidir.

Uygulama iki ana amaca hizmet eder:

1. Hizmetlerin sade ve bilgilendirici sekilde tanitilmasi
2. Kullanici randevu talebi ve admin/calisan tarafinda randevu yonetimi

Ilk surum mikroservis degil, moduler monolith olarak gelistirilecektir.

## Repo Yapisi

- `backend`: Spring Boot backend uygulamasi
- `frontend`: React + TypeScript + Material UI frontend uygulamasi
- `docs`: API contract, proje plani ve teknik notlar

## Teknoloji Yigini

### Backend

- Java 17
- Spring Boot 3
- Maven
- PostgreSQL
- Spring Data JPA
- Spring Security + JWT
- Flyway
- Bean Validation
- Lombok
- Springdoc OpenAPI
- Moduler monolith mimari

### Frontend

- React
- TypeScript
- Vite
- Material UI
- React Router
- Axios
- MUI X Date Pickers
- Dayjs

## Calisma Sinirlari

- Backend gorevlerinde sadece `backend` klasoru altinda degisiklik yap.
- Frontend gorevlerinde sadece `frontend` klasoru altinda degisiklik yap.
- `docs` klasoru yalnizca dokumantasyon, plan ve teknik notlar icin kullanilir.
- Frontend gelistirmelerinde backend dosyalari sadece API yapilarini anlamak icin okunabilir.
- Frontend tarafindan backend entity nesneleri dogrudan tuketilmemelidir; DTO kullanilmalidir.
- Gereksiz karmasiklik ekleme. Kod temiz, katmanli ve anlasilir olmali.

## Mimari Ilkeler

- Sistem mikroservis olarak degil, moduler monolith olarak kurgulanmalidir.
- Katmanli yapi korunmalidir. Tipik akis: controller -> service -> repository.
- Domain mantigi controller katmanina yigilmamalidir.
- API contract acik, tahmin edilebilir ve surdurulebilir olmali.
- Entity modelleri dogrudan response olarak donulmemelidir.
- DTO, request/response modelleri ve gerekli mapper yapilari kullanilmalidir.
- Veritabani sema degisikliklerinde Flyway migration kullanilmalidir.

## API Kurallari

- Public endpointler `/api/public` ile baslamalidir.
- Admin endpointler `/api/admin` ile baslamalidir.
- Kimlik dogrulama ve yetkilendirme Spring Security + JWT ile kurgulanmalidir.
- Request dogrulamalari icin validation anotasyonlari kullanilmalidir.
- OpenAPI/Swagger dokumantasyonu Springdoc OpenAPI ile desteklenmelidir.

## Randevu Sistemi Kurallari

Kullanici, su bilgilerle randevu talebi olusturur:

- ad
- soyad
- telefon
- hizmet
- tarih
- saat

Zorunlu davranislar:

- Kullanici sadece backend'in dondurdugu uygun saatleri secebilir.
- Randevu olusturma islemleri `@Transactional` olmalidir.
- Ayni calisan ve ayni saat araligi icin cakisan randevu olusturulmasi engellenmelidir.
- Admin/calisan panelinde randevular listelenebilmeli, onaylanabilmeli, iptal edilebilmeli ve tamamlandi olarak isaretlenebilmelidir.

## Hizmet Kategorileri

### 1. Lazer Uygulamalari

- Lazer Epilasyon
- Dovme Sildirme
- Lazer Cilt Uygulamalari

### 2. Estetik Uygulamalari

- Dudak Dolgusu
- Dolgu Tedavileri
- Ameliyatsiz Estetik Uygulamalari

### 3. Cilt Bakimi ve Cilt Problemleri

- Leke Tedavileri
- Sivilce Tedavisi
- Medikal Cilt Bakimi

### 4. Vucut Sekillendirme

- Bolgesel Incelme
- Vucut Sekillendirme
- Selulit Bakimi

### 5. Sac Uygulamalari

- Sac Ekimi
- Sac Mezoterapisi
- PRP Sac Uygulamalari

## Icerik ve Dil Kurallari

- Hizmet aciklamalari sade, bilgilendirici ve reklam dili icermeyen bir tonda yazilmalidir.
- Tipbi veya estetik sonuc garantisi ima eden dil kullanilmaz.
- Asagidaki ifadeler kullanilmaz:
  - `kesin sonuc`
  - `garantili`
  - `%100 basari`
  - `en iyi`
  - `kampanya`
  - `indirim`
  - `tamamen agrisiz`
  - `mucizevi sonuc`

## Backend Icin Beklentiler

- Paketleme ve modullendirme, moduler monolith yaklasimini desteklemelidir.
- Persistence katmaninda Spring Data JPA kullanilmalidir.
- Veritabani degisiklikleri migration ile izlenmelidir; elle sema yonetimi yapilmaz.
- Transaction sinirlari service katmaninda tanimlanmalidir.
- Guvenlik, DTO ayrimi ve validation atlanmamalidir.

## Frontend Icin Beklentiler

- React + TypeScript yapisi korunmalidir.
- UI tarafinda Material UI temel alinmalidir.
- Tarih/saat secimleri icin uygun yerlerde MUI X Date Pickers ve Dayjs kullanilmalidir.
- Router yapisi React Router ile kurulmalidir.
- API iletisiminde Axios kullanilmalidir.
- Frontend, uygun saat seceneklerini backend'ten gelen veriye gore gostermelidir.
- Frontend backend kurallarini tahmin ederek degil, API contract'a gore calismalidir.

## Degisiklik Yaparken

- Gorevin kapsami hangi klasorse degisiklikleri orada sinirli tut.
- Backend ve frontend arasindaki sinirlari koru.
- Veri modelleri, endpoint isimlendirmeleri ve akislarda tutarlilik sagla.
- Yeni davranis eklerken mevcut kurallarla celismedigini kontrol et.
- Temiz, okunabilir ve bakimi kolay cozumleri tercih et.
