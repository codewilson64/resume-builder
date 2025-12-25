export default function PrivacyPolicy() {
    return (
      <main className="bg-white">
        <section className="mx-auto max-w-4xl px-5 py-12 md:py-20">
          {/* Title */}
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Kebijakan Privasi
            </h1>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}
            </p>
          </header>
  
          {/* Content */}
          <div className="space-y-10 text-gray-700 leading-relaxed">
            <p>
              Karierly menghargai dan melindungi privasi pengguna. Kebijakan Privasi
              ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan
              melindungi informasi pribadi Anda saat menggunakan layanan Karierly.
            </p>
  
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                1. Informasi yang Kami Kumpulkan
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Informasi akun (nama, email, kata sandi)</li>
                <li>Data resume/CV yang Anda input ke dalam platform</li>
                <li>
                  Informasi pembayaran yang diproses oleh pihak ketiga (misalnya
                  payment gateway)
                </li>
              </ul>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                2. Penggunaan Informasi
              </h2>
              <p>Informasi yang dikumpulkan digunakan untuk:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Menyediakan dan mengelola layanan Karierly</li>
                <li>Meningkatkan kualitas dan fitur layanan</li>
                <li>Memproses transaksi pembayaran</li>
                <li>Memberikan dukungan dan layanan pelanggan</li>
              </ul>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                3. Keamanan Data
              </h2>
              <p>
                Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang
                wajar untuk melindungi data pribadi Anda dari akses, penggunaan,
                atau pengungkapan yang tidak sah.
              </p>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                4. Pembagian Informasi
              </h2>
              <p>
                Karierly tidak menjual atau menyewakan data pribadi Anda kepada
                pihak ketiga. Informasi hanya dapat dibagikan kepada mitra
                terpercaya untuk keperluan operasional, seperti pemrosesan
                pembayaran atau penyedia layanan teknis.
              </p>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                5. Hak Pengguna
              </h2>
              <p>
                Anda berhak untuk mengakses, memperbarui, atau menghapus data
                pribadi Anda melalui pengaturan akun atau dengan menghubungi tim
                Karierly.
              </p>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                6. Perubahan Kebijakan Privasi
              </h2>
              <p>
                Kebijakan Privasi ini dapat diperbarui dari waktu ke waktu.
                Perubahan akan diumumkan melalui situs Karierly dan berlaku sejak
                tanggal pembaruan.
              </p>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                7. Kontak
              </h2>
              <p>
                Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini,
                silakan hubungi kami melalui email resmi Karierly.
              </p>
            </section>
          </div>
        </section>
      </main>
    );
  }
  