# Dokumentasi REST API --- Gym Management System

Dokumen ini berisi daftar endpoint, fungsi, dan contoh **Body JSON**
untuk pengujian melalui Postman.

## 1. Informasi umum

-   Base URL lokal: `http://localhost:3000`
-   Format request: `JSON`
-   Header untuk request yang memiliki body:
    -   `Content-Type: application/json`
-   Metode yang digunakan: `GET`, `POST`, `PATCH`, dan `DELETE`.

> Catatan: Contoh untuk `Trainers`, `Members`, `Training Sessions`, dan
> `Session Participants` mengikuti struktur DTO/entity yang sudah dibuat
> dan diuji dalam proyek. Bagian `Membership Plans` dan `Memberships`
> perlu dicocokkan lagi dengan DTO serta entity tim karena detail field
> lengkapnya belum terkonfirmasi. Khusus `Memberships`, gunakan nama
> properti `planId` (bukan `membershipPlanId`) jika DTO proyek memang
> memvalidasi `planId`.

------------------------------------------------------------------------

# 2. Trainers (Pelatih)

## Endpoint

  Method   Endpoint          Fungsi
  -------- ----------------- ------------------------
  POST     `/trainers`       Menambahkan pelatih
  GET      `/trainers`       Melihat semua pelatih
  GET      `/trainers/:id`   Melihat detail pelatih
  PATCH    `/trainers/:id`   Mengubah data pelatih
  DELETE   `/trainers/:id`   Menghapus pelatih

### POST `/trainers`

``` json
{
  "name": "Budi",
  "email": "budi@gmail.com",
  "phone": "081234567890",
  "specialization": "Fitness"
}
```

### PATCH `/trainers/1`

``` json
{
  "name": "Budi Santoso",
  "specialization": "Strength Training"
}
```

Untuk `GET` dan `DELETE`, tidak perlu Body JSON. Ganti `1` dengan ID
pelatih yang tersedia.

------------------------------------------------------------------------

# 3. Members (Anggota)

## Endpoint

  Method   Endpoint         Fungsi
  -------- ---------------- ---------------------------
  POST     `/members`       Mendaftarkan data anggota
  GET      `/members`       Melihat semua anggota
  GET      `/members/:id`   Melihat detail anggota
  PATCH    `/members/:id`   Mengubah data anggota
  DELETE   `/members/:id`   Menghapus anggota

### POST `/members`

``` json
{
  "name": "Andi",
  "email": "andi@gmail.com",
  "phone": "081234567891",
  "birthDate": "2002-05-15",
  "address": "Wonosobo"
}
```

### PATCH `/members/1`

``` json
{
  "phone": "081234567899",
  "address": "Tegal"
}
```

Untuk `GET` dan `DELETE`, tidak perlu Body JSON. Ganti `1` dengan ID
anggota yang tersedia.

------------------------------------------------------------------------

# 4. Membership Plans (Paket Keanggotaan)

## Endpoint yang perlu dicocokkan dengan controller proyek

  Method   Endpoint                  Fungsi
  -------- ------------------------- ----------------------
  POST     `/membership-plans`       Menambahkan paket
  GET      `/membership-plans`       Melihat semua paket
  GET      `/membership-plans/:id`   Melihat detail paket
  PATCH    `/membership-plans/:id`   Mengubah paket
  DELETE   `/membership-plans/:id`   Menghapus paket

### Contoh POST `/membership-plans` --- DRAFT

``` json
{
  "name": "Paket Bulanan",
  "price": 250000,
  "durationDays": 30,
  "description": "Akses gym selama 30 hari"
}
```

**Penting:** contoh field di atas adalah rancangan sementara, bukan
konfirmasi DTO proyek. Periksa `CreateMembershipPlanDto` dan controller.
Nama endpoint maupun properti body harus sama persis dengan kode yang
benar-benar digunakan tim.

### Contoh PATCH `/membership-plans/1` --- DRAFT

``` json
{
  "price": 275000,
  "description": "Akses gym selama 30 hari"
}
```

------------------------------------------------------------------------

# 5. Memberships (Keanggotaan)

Membership menghubungkan seorang anggota (`Member`) dengan paket
keanggotaan (`MembershipPlan`). Buat data anggota dan paket terlebih
dahulu agar ID yang dipakai sudah tersedia.

## Endpoint yang perlu dicocokkan dengan controller proyek

  Method   Endpoint             Fungsi
  -------- -------------------- --------------------------------
  POST     `/memberships`       Mendaftarkan anggota ke paket
  GET      `/memberships`       Melihat semua data keanggotaan
  GET      `/memberships/:id`   Melihat detail keanggotaan
  PATCH    `/memberships/:id`   Mengubah data keanggotaan
  DELETE   `/memberships/:id`   Menghapus data keanggotaan

### POST `/memberships` --- DRAFT

Jika DTO proyek menggunakan `memberId` dan `planId`, contoh minimalnya:

``` json
{
  "memberId": 1,
  "planId": 1
}
```

**Perhatikan tipe data:** `memberId` dan `planId` harus berupa angka
JSON, bukan teks. Benar: `"planId": 1`. Salah: `"planId": "1"`.

Jika DTO mewajibkan tanggal atau properti lain, tambahkan sesuai
`CreateMembershipDto`. Jangan menambahkan field yang tidak ada di DTO.

### PATCH `/memberships/1` --- DRAFT

Body untuk update belum dapat dipastikan tanpa melihat
`UpdateMembershipDto`. Isi hanya properti yang memang diizinkan oleh DTO
tersebut.

------------------------------------------------------------------------

# 6. Training Sessions (Sesi Latihan)

Sesi latihan dibuat oleh pelatih. Karena itu, buat data trainer terlebih
dahulu dan gunakan `trainerId` yang valid.

## Endpoint

  Method   Endpoint                   Fungsi
  -------- -------------------------- ----------------------
  POST     `/training-sessions`       Membuat sesi latihan
  GET      `/training-sessions`       Melihat semua sesi
  GET      `/training-sessions/:id`   Melihat detail sesi
  PATCH    `/training-sessions/:id`   Mengubah sesi
  DELETE   `/training-sessions/:id`   Menghapus sesi

### POST `/training-sessions`

``` json
{
  "title": "Fitness Beginner",
  "description": "Latihan fitness untuk pemula",
  "sessionDate": "2026-11-15",
  "startTime": "08:00",
  "endTime": "09:00",
  "capacity": 15,
  "trainerId": 1
}
```

### PATCH `/training-sessions/1`

``` json
{
  "title": "Fitness Beginner - Updated",
  "capacity": 20
}
```

Aturan penting: - `trainerId` harus merujuk ke trainer yang tersedia. -
`capacity` harus berupa angka minimal `1`. - `endTime` harus lebih besar
daripada `startTime`. - Format tanggal: `YYYY-MM-DD`. - Format waktu:
`HH:mm` atau `HH:mm:ss`. - Status sesi yang digunakan: `scheduled`,
`completed`, atau `cancelled` (jika mengirim status saat update).

Untuk `GET` dan `DELETE`, tidak perlu Body JSON.

------------------------------------------------------------------------

# 7. Session Participants (Peserta Sesi Latihan)

Entitas ini mencatat anggota yang mendaftar ke suatu sesi latihan. Buat
`Training Session` dan `Member` terlebih dahulu.

## Endpoint

  -----------------------------------------------------------------------------------------------
  Method                  Endpoint                                        Fungsi
  ----------------------- ----------------------------------------------- -----------------------
  POST                    `/session-participants`                         Mendaftarkan anggota ke
                                                                          sesi

  GET                     `/session-participants`                         Melihat semua peserta

  GET                     `/session-participants/:id`                     Melihat detail
                                                                          pendaftaran

  GET                     `/session-participants/by-session/:sessionId`   Melihat peserta
                                                                          berdasarkan sesi

  GET                     `/session-participants/by-member/:memberId`     Melihat sesi
                                                                          berdasarkan anggota

  PATCH                   `/session-participants/:id`                     Mengubah status
                                                                          kehadiran

  DELETE                  `/session-participants/:id`                     Menghapus pendaftaran
                                                                          peserta
  -----------------------------------------------------------------------------------------------

### POST `/session-participants`

``` json
{
  "trainingSessionId": 1,
  "memberId": 1
}
```

### PATCH `/session-participants/1`

``` json
{
  "attendanceStatus": "attended"
}
```

Nilai `attendanceStatus` yang didukung: - `registered` --- sudah
terdaftar. - `attended` --- sudah hadir. - `cancelled` --- pendaftaran
dibatalkan.

Aturan bisnis yang diterapkan: - Satu anggota tidak boleh didaftarkan
dua kali pada sesi yang sama. - Jumlah peserta aktif tidak boleh
melebihi kapasitas sesi. - Sesi harus berstatus `scheduled` agar peserta
dapat mendaftar. - Status peserta yang sudah `attended` tidak dapat
diubah kembali. - `GET` dan `DELETE` tidak memerlukan Body JSON.

------------------------------------------------------------------------

# 8. Urutan pengujian di Postman

Gunakan urutan berikut agar foreign key/relasi memiliki data induk
terlebih dahulu.

1.  `POST /trainers` --- buat pelatih.
2.  `POST /members` --- buat anggota.
3.  `POST /membership-plans` --- buat paket (sesuaikan DTO).
4.  `POST /memberships` --- hubungkan `memberId` dan `planId` (sesuaikan
    DTO).
5.  `POST /training-sessions` --- buat sesi dengan `trainerId` yang
    valid.
6.  `POST /session-participants` --- daftarkan anggota dengan
    `trainingSessionId` dan `memberId` yang valid.
7.  Jalankan seluruh endpoint `GET` untuk memeriksa data.
8.  Uji `PATCH` untuk perubahan data/status.
9.  Uji `DELETE` setelah memastikan aturan relasi dan data yang akan
    dihapus.

## 9. Cara menggunakan di Postman

1.  Jalankan backend NestJS.
2.  Pastikan PostgreSQL aktif.
3.  Buka Postman dan pilih metode request.
4.  Masukkan URL, misalnya `http://localhost:3000/members`.
5.  Untuk `POST` atau `PATCH`, pilih **Body → raw → JSON**.
6.  Tempel contoh JSON yang sesuai.
7.  Klik **Send** dan periksa response.

## 10. Catatan saat terjadi error

  -----------------------------------------------------------------------
  Pesan error                         Hal yang perlu diperiksa
  ----------------------------------- -----------------------------------
  `must be an integer number`         Pastikan ID/angka dikirim sebagai
                                      angka tanpa tanda kutip, misalnya
                                      `1`, bukan `"1"`.

  `must be a string`                  Pastikan nilai dikirim sebagai
                                      teks.

  `must be a valid date`              Periksa format tanggal, misalnya
                                      `2026-11-15`.

  `not found`                         Pastikan ID relasi benar-benar ada
                                      di database.

  `already exists` / duplicate        Periksa apakah data dengan email
                                      atau pasangan relasi yang sama
                                      sudah terdaftar.

  `capacity` / batas peserta          Periksa kapasitas sesi dan jumlah
                                      peserta aktif.
  -----------------------------------------------------------------------

> Dokumentasi ini adalah panduan pengujian. Kode DTO, controller, dan
> service di repository tetap menjadi acuan utama. Jika nama route atau
> field di kode berbeda, sesuaikan dokumen ini dengan implementasi
> aktual.
