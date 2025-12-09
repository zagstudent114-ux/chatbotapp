import { BookOpen, User, Activity, Apple, MessageSquare, Database, TrendingUp } from 'lucide-react';

export function TutorialPanel() {
  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Tutorial Penggunaan</h1>
          </div>
          <p className="text-white text-xl font-semibold mb-2">Nutrition by Coach Mury Kuswari</p>
          <p className="text-emerald-50 text-lg">
            Panduan lengkap menggunakan platform nutrisi untuk mencapai tujuan fitness Anda
          </p>
        </div>

        <div className="space-y-6">
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                <User className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-3">1. Membuat Akun</h2>
                <div className="space-y-2 text-gray-700">
                  <p>Untuk memulai, buat akun dengan mengisi:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Nama lengkap Anda</li>
                    <li>Email dan password</li>
                    <li>Usia (opsional)</li>
                    <li>Jenis olahraga/aktivitas Anda</li>
                    <li>Tujuan fitness (misalnya: membangun otot, menurunkan berat badan)</li>
                    <li>Pembatasan diet (jika ada)</li>
                  </ul>
                  <p className="mt-3 text-sm bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                    💡 <strong>Tips:</strong> Informasi profil ini membantu AI memberikan saran yang lebih personal dan relevan untuk Anda.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-teal-100 p-3 rounded-lg flex-shrink-0">
                <Activity className="w-6 h-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-3">2. Log Metrik Fitness</h2>
                <div className="space-y-2 text-gray-700">
                  <p>Klik tombol <strong>"Log Metrics"</strong> di panel sebelah kanan untuk mencatat:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Berat Badan</strong> (kg) - pantau perubahan berat</li>
                    <li><strong>Persentase Lemak Tubuh</strong> (%) - ukur komposisi tubuh</li>
                    <li><strong>Massa Otot</strong> (kg) - track pertumbuhan otot</li>
                    <li><strong>Performa Workout</strong> (1-10) - evaluasi kualitas latihan</li>
                    <li><strong>Skor Pemulihan</strong> (1-10) - monitor recovery Anda</li>
                  </ul>
                  <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm font-semibold mb-2">📊 Visualisasi Data</p>
                    <p className="text-sm">Grafik akan otomatis dibuat menampilkan trend berat badan, lemak tubuh, dan massa otot Anda dari waktu ke waktu.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                <Apple className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-3">3. Log Nutrisi</h2>
                <div className="space-y-2 text-gray-700">
                  <p>Klik tombol <strong>"Log Nutrition"</strong> untuk mencatat asupan makanan:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Jenis Makanan</strong> - sarapan, makan siang, makan malam, atau snack</li>
                    <li><strong>Deskripsi Makanan</strong> - apa yang Anda makan</li>
                    <li><strong>Kalori</strong> - total kalori</li>
                    <li><strong>Protein</strong> (gram)</li>
                    <li><strong>Karbohidrat</strong> (gram)</li>
                    <li><strong>Lemak</strong> (gram)</li>
                  </ul>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm font-semibold text-green-800">✅ Nutrisi Hari Ini</p>
                      <p className="text-xs text-green-700 mt-1">Lihat total kalori dan makro harian Anda di panel kanan</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm font-semibold text-yellow-800">⚡ Tips Cepat</p>
                      <p className="text-xs text-yellow-700 mt-1">Log makanan segera setelah makan untuk tracking yang akurat</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-3">4. Chat dengan AI Nutritionist</h2>
                <div className="space-y-3 text-gray-700">
                  <p>AI Nutritionist siap membantu Anda 24/7. Tanyakan apapun tentang:</p>

                  <div className="space-y-2">
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <p className="font-semibold text-gray-800 mb-1">💪 Contoh Pertanyaan:</p>
                      <div className="text-sm space-y-1">
                        <p className="italic">"Berapa protein yang harus saya konsumsi berdasarkan berat badan saya?"</p>
                        <p className="italic">"Buatkan meal plan untuk membangun otot"</p>
                        <p className="italic">"Bagaimana progress saya bulan ini?"</p>
                        <p className="italic">"Apa yang harus saya makan sebelum workout?"</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mt-4">
                    <p className="text-sm font-semibold text-emerald-800 mb-2">🤖 Kemampuan AI</p>
                    <ul className="text-sm text-emerald-700 space-y-1 list-disc list-inside ml-2">
                      <li>Menganalisis data metrik dan nutrisi Anda</li>
                      <li>Memberikan saran personal berdasarkan profil Anda</li>
                      <li>Menjawab pertanyaan dengan referensi dari knowledge base</li>
                      <li>Memberikan motivasi dan dukungan</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-3">5. Upload Knowledge Base</h2>
                <div className="space-y-2 text-gray-700">
                  <p>Tingkatkan kemampuan AI dengan menambahkan dokumen ke Knowledge Base:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Klik tab <strong>"Knowledge Base"</strong> di header</li>
                    <li>Masukkan judul dokumen</li>
                    <li>Pilih tipe dokumen:
                      <ul className="list-disc list-inside ml-6 mt-1 text-sm">
                        <li><strong>Nutrition Guideline</strong> - panduan nutrisi umum</li>
                        <li><strong>Meal Plan</strong> - rencana makan</li>
                        <li><strong>Fitness Protocol</strong> - protokol latihan</li>
                      </ul>
                    </li>
                    <li>Paste konten dokumen</li>
                    <li>Klik <strong>"Upload Document"</strong></li>
                  </ol>
                  <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm">
                      💡 AI akan otomatis mengambil informasi relevan dari dokumen ini saat menjawab pertanyaan Anda.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-lg flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-3">6. Monitor Progress</h2>
                <div className="space-y-2 text-gray-700">
                  <p>Pantau kemajuan Anda melalui berbagai fitur:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <div className="border border-gray-200 rounded-lg p-3">
                      <p className="font-semibold text-sm mb-1">📈 Grafik Trend</p>
                      <p className="text-xs text-gray-600">Visualisasi perubahan berat, lemak, dan otot dari waktu ke waktu</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-3">
                      <p className="font-semibold text-sm mb-1">📊 Ringkasan Metrik</p>
                      <p className="text-xs text-gray-600">Lihat nilai terbaru dan perubahan dari pengukuran sebelumnya</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-3">
                      <p className="font-semibold text-sm mb-1">🍽️ Total Nutrisi Harian</p>
                      <p className="text-xs text-gray-600">Tracking kalori dan makronutrien hari ini</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-3">
                      <p className="font-semibold text-sm mb-1">💬 Riwayat Chat</p>
                      <p className="text-xs text-gray-600">Semua percakapan tersimpan untuk referensi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-3">🎯 Tips Sukses</h2>
            <div className="space-y-2 text-emerald-50">
              <p>✓ <strong>Konsisten</strong> - Log metrik dan nutrisi secara rutin untuk hasil terbaik</p>
              <p>✓ <strong>Jujur</strong> - Input data yang akurat untuk saran yang tepat</p>
              <p>✓ <strong>Aktif Bertanya</strong> - Manfaatkan AI untuk mendapat insight tentang progress Anda</p>
              <p>✓ <strong>Upload Dokumen</strong> - Tambahkan panduan nutrisi favorit Anda ke knowledge base</p>
              <p>✓ <strong>Review Progress</strong> - Cek grafik mingguan untuk evaluasi kemajuan</p>
            </div>
          </section>

          <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-emerald-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">📱 Akses Mobile</h3>
            <p className="text-gray-700 text-sm">
              Aplikasi ini fully responsive! Anda bisa mengakses dari smartphone, tablet, atau desktop.
              Pada mobile, gunakan tab "Metrics" untuk melihat panel metrik yang tersembunyi.
            </p>
          </div>
        </div>

        <div className="text-center py-8">
          <p className="text-gray-600 mb-2">Siap memulai perjalanan fitness Anda?</p>
          <p className="text-2xl">💪 🥗 📈</p>
        </div>
      </div>
    </div>
  );
}
