# Aplikasi Galeri Foto

Aplikasi Galeri Foto adalah aplikasi mobile yang memungkinkan pengguna untuk melihat, mengambil, mengelola, dan menyimpan foto-foto mereka dengan mudah dan intuitif.

## Fitur Utama

- 📸 Pengambilan foto menggunakan kamera perangkat
- 🖼️ Tampilan galeri foto dalam bentuk grid
- ✅ Pemilihan multi-foto dengan gestur
- 🗑️ Penghapusan foto-foto yang dipilih
- 💾 Penyimpanan foto ke galeri perangkat
- 🔍 Tampilan foto layar penuh
- 📊 Bottom sheet untuk opsi tambahan

## Teknologi yang Digunakan

- React Native
- Expo
- React Navigation
- @gorhom/bottom-sheet
- react-native-gesture-handler
- expo-camera
- expo-file-system
- @react-native-async-storage/async-storage
- expo-media-library
- expo-haptics

## Instalasi

1. Pastikan Anda telah menginstal Node.js dan Expo CLI di sistem Anda.
2. Clone repositori ini: git clone https://github.com/username/aplikasi-galeri-foto.git
3. Masuk ke direktori proyek:
4. Instal dependensi:
5. Jalankan aplikasi:

## Penggunaan

- Buka aplikasi untuk melihat galeri foto Anda.
- Tekan tombol kamera untuk mengambil foto baru.
- Tekan lama pada foto untuk memulai mode pemilihan.
- Gunakan gestur untuk memilih beberapa foto sekaligus.
- Gunakan opsi di bottom sheet untuk menghapus atau menyimpan foto yang dipilih.
- Tekan foto untuk melihatnya dalam mode layar penuh.

## Struktur Proyek

aplikasi-galeri-foto/
├── App.js
├── screens/
│ ├── HomeScreen.js
│ ├── CameraScreen.js
│ └── FullScreenPhotoScreen.js
├── components/
│ ├── PhotoItem.js
│ ├── PhotoGrid.js
│ ├── CameraButton.js
│ └── BottomSheetContent.js
├── hooks/
│ └── usePhotoManagement.js
├── contexts/
│ └── PhotoContext.js
└── README.md

## Komponen Utama

1. App.js: Komponen utama yang mengatur navigasi.
2. HomeScreen.js: Layar utama yang menampilkan galeri foto.
3. CameraScreen.js: Layar untuk mengambil foto baru.
4. FullScreenPhotoScreen.js: Layar untuk menampilkan foto dalam ukuran penuh.
5. PhotoGrid.js: Komponen untuk menampilkan grid foto.
6. usePhotoManagement.js: Custom hook untuk logika manajemen foto.

## Kontribusi

Kontribusi selalu diterima dengan baik. Untuk perubahan besar, harap buka issue terlebih dahulu untuk mendiskusikan apa yang ingin Anda ubah.

## Lisensi

[MIT](https://choosealicense.com/licenses/mit/)
