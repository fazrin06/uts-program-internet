/* =========================================================
   FAZRIN SEMBAKO - SCRIPT
   Dipakai oleh semua halaman. Setiap bagian hanya berjalan
   jika elemennya ada di halaman tersebut.

   Alur belanja:
   Pilih produk -> + Keranjang -> buka keranjang -> isi data
   -> Pesan via WhatsApp (pesan otomatis berisi daftar & total)
========================================================= */

// Nomor WhatsApp pemilik toko: kode negara 62 + nomor, tanpa 0, +, atau spasi.
// Nomor toko: 0853-1567-3381
const FAZRIN_WA = "6285315673381";

/* ================================
   0. DATA PRODUK
================================ */
const fazrinProduk = {
    "paket-hemat":     { foto: "images/beras.jpg?v=9d25f330", nama: "Paket Hemat", harga: 119000, satuan: "Paket", kategori: "Paket Hemat", desc: "Paket kebutuhan dapur mingguan, lebih hemat Rp9.000 dibanding beli satuan.", spec: ["Isi: Beras Premium 5 Kg", "Isi: Minyak Goreng Sunco 2 L", "Isi: Gula Pasir 1 Kg"] },
    "paket-keluarga":  { foto: "images/minyak.jpg?v=e4c7f508", nama: "Paket Keluarga", harga: 169000, satuan: "Paket", kategori: "Paket Hemat", desc: "Paket paling lengkap untuk satu keluarga, lebih hemat Rp13.000.", spec: ["Isi: Beras 5 Kg, Minyak 2 L, Gula 1 Kg", "Isi: Telur 1 Kg, Mi Instan 5 bungkus", "Isi: Teh Celup Sosro 1 kotak"] },
    "paket-warung":    { foto: "images/kopi-gantung.jpg?v=8a05015a", nama: "Paket Warung", harga: 95000, satuan: "Paket", kategori: "Paket Hemat", desc: "Stok minuman sachet dan mi untuk warung, lebih hemat Rp9.000.", spec: ["Isi: Kopi Sachet 3 renteng", "Isi: Teajus & Finto 3 renteng", "Isi: Mi Instan 10 bungkus"] },
    "beras":           { foto: "images/beras.jpg?v=9d25f330", nama: "Beras Premium", harga: 72000, satuan: "5 Kg", kategori: "Bahan Pokok", desc: "Beras premium bersih dan pulen, cocok untuk konsumsi keluarga sehari-hari.", spec: ["Berat: 5 Kilogram", "Kualitas: Premium"] },
    "minyak":          { foto: "images/minyak.jpg?v=e4c7f508", nama: "Minyak Goreng Sunco", harga: 38000, satuan: "2 Liter", kategori: "Bahan Pokok", desc: "Minyak goreng Sunco jernih dan tidak cepat keruh, untuk menggoreng dan menumis.", spec: ["Isi: 2 Liter", "Kemasan: Pouch"] },
    "gula":            { foto: "images/gula.jpg?v=6e8a4f06", nama: "Gula Pasir", harga: 18000, satuan: "Kg", kategori: "Bahan Pokok", desc: "Gula pasir putih bersih dalam kemasan 1 kg, untuk minuman, kue, dan masakan.", spec: ["Berat: 1 Kilogram", "Jenis: Gula kristal putih"] },
    "tepung":          { foto: "images/tepung.jpg?v=eb949ecf", nama: "Tepung Terigu", harga: 12000, satuan: "Kg", kategori: "Bahan Pokok", desc: "Tepung terigu serbaguna kemasan 1 kg untuk gorengan, kue, dan roti.", spec: ["Berat: 1 Kilogram", "Jenis: Serbaguna"] },
    "telur":           { foto: "images/telur.jpg?v=f1721203", nama: "Telur Ayam", harga: 29000, satuan: "Kg", kategori: "Bahan Makanan", desc: "Telur ayam negeri segar, dipilih langsung dari peternak.", spec: ["Isi: ±16 butir per Kg", "Kondisi: Segar"] },
    "mi":              { foto: "images/mi.jpg?v=f2dd789c", nama: "Mi Instan", harga: 3500, satuan: "Bungkus", kategori: "Bahan Makanan", desc: "Aneka mi instan goreng dan kuah, praktis untuk stok di rumah.", spec: ["Berat: ±85 gram", "Varian: Goreng & kuah"] },
    "kopi":            { foto: "images/kopi.jpg?v=9feaa433", nama: "Kopi Bubuk 500 gram", harga: 35000, satuan: "500 g", kategori: "Minuman", desc: "Kopi bubuk asli kemasan 500 gram dengan aroma kuat dan rasa mantap.", spec: ["Berat: 500 gram", "Jenis: Kopi bubuk murni"] },
    "kopi-gantung":    { foto: "images/kopi-gantung.jpg?v=8a05015a", nama: "Kopi Sachet Aneka Merek", harga: 15000, satuan: "Renteng", kategori: "Minuman", desc: "Aneka kopi sachet seperti Kapal Api, Indocafe, Good Day, dan Luwak White Koffie. Dijual per renteng.", spec: ["Isi: 10 sachet per renteng", "Varian: Kapal Api, Indocafe, Good Day, Luwak, dll."] },
    "minuman-teh-jus": { foto: "images/minuman-teh-jus.jpg?v=ec64a1d6", nama: "Teajus & Finto", harga: 8000, satuan: "Renteng", kategori: "Minuman", desc: "Minuman serbuk Teajus (gula batu & apel) dan Finto stroberi. Tinggal seduh dengan air dingin.", spec: ["Isi: 10 sachet per renteng", "Varian: Teajus Gula Batu, Teajus Apel, Finto Stroberi"] },
    "teh":             { foto: "images/teh.jpg?v=79cbd2e0", nama: "Teh Celup Sosro", harga: 7500, satuan: "Kotak", kategori: "Minuman", desc: "Teh celup Sosro black tea dengan aroma khas untuk teh manis di rumah.", spec: ["Isi: 15 kantong teh per kotak", "Jenis: Black tea"] },
    "sabun":           { foto: "images/sabun.jpg?v=8d88a057", nama: "Sabun Lifebuoy", harga: 4500, satuan: "Batang", kategori: "Kebutuhan Rumah", desc: "Sabun mandi batang Lifebuoy dengan perlindungan dari kuman, tersedia beberapa varian.", spec: ["Berat: 60 gram per batang", "Varian: Total 10, Lemon Fresh, Cool Fresh, Matcha"] },
    "deterjen":        { foto: "images/deterjen.jpg?v=0cb2c807", nama: "Rinso Anti Noda", harga: 11000, satuan: "Bungkus", kategori: "Kebutuhan Rumah", desc: "Deterjen bubuk Rinso Anti Noda yang mengangkat noda membandel dengan wangi tahan lama.", spec: ["Berat: 770 gram per bungkus", "Varian wangi: Rose, Lavender, Classic Fresh"] }
};

/* ================================
   1. FUNGSI BANTU
================================ */
// Format angka menjadi Rupiah, contoh: 75000 -> "Rp75.000"
function fazrinRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

// Notifikasi kecil di bawah layar
let fazrinToastTimer;
function fazrinToast(teks) {
    const toast = document.getElementById("fazrin_toast");
    toast.textContent = teks;
    toast.classList.add("fazrin_show");
    clearTimeout(fazrinToastTimer);
    fazrinToastTimer = setTimeout(() => toast.classList.remove("fazrin_show"), 2200);
}

// Ulangi animasi CSS pada sebuah elemen
function fazrinAnimasi(el, namaClass) {
    el.classList.remove(namaClass);
    void el.offsetWidth;
    el.classList.add(namaClass);
}

// Buka WhatsApp dengan pesan yang sudah terisi
function fazrinBukaWhatsApp(pesan) {
    const link = "https://wa.me/" + FAZRIN_WA + "?text=" + encodeURIComponent(pesan);
    window.open(link, "_blank", "noopener");
}

/* ================================
   2. HEADER, MENU MOBILE, TOMBOL KE ATAS
================================ */
const fazrinHeader = document.getElementById("fazrin_header");
const fazrinToTop = document.getElementById("fazrin_to_top");
const fazrinMenuToggle = document.getElementById("fazrin_menu_toggle");
const fazrinMenu = document.getElementById("fazrin_menu");

window.addEventListener("scroll", () => {
    fazrinHeader.classList.toggle("fazrin_scrolled", window.scrollY > 10);
    fazrinToTop.classList.toggle("fazrin_show", window.scrollY > 500);
}, { passive: true });

fazrinToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

function fazrinTutupMenu() {
    fazrinMenu.classList.remove("fazrin_open");
    fazrinMenuToggle.setAttribute("aria-expanded", "false");
}

fazrinMenuToggle.addEventListener("click", () => {
    const terbuka = fazrinMenu.classList.toggle("fazrin_open");
    fazrinMenuToggle.setAttribute("aria-expanded", terbuka);
});

// Tutup menu saat klik di luar menu
document.addEventListener("click", (event) => {
    if (!fazrinMenu.contains(event.target) && !fazrinMenuToggle.contains(event.target)) fazrinTutupMenu();
});

/* ================================
   3. ANIMASI MUNCUL SAAT SCROLL
================================ */
const fazrinObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fazrin_in");
            fazrinObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".fazrin_reveal").forEach((el) => fazrinObserver.observe(el));

/* ================================
   4. EFEK RIAK (RIPPLE) PADA TOMBOL
================================ */
document.addEventListener("click", (event) => {
    const tombol = event.target.closest(".fazrin_button");
    if (!tombol) return;

    const kotak = tombol.getBoundingClientRect();
    const riak = document.createElement("span");
    riak.className = "fazrin_ripple";
    riak.style.left = (event.clientX - kotak.left) + "px";
    riak.style.top = (event.clientY - kotak.top) + "px";
    tombol.appendChild(riak);
    riak.addEventListener("animationend", () => riak.remove());
});

/* ================================
   5. KERANJANG BELANJA
   Disimpan di localStorage agar tetap ada saat pindah halaman.
   Bentuk data: { "kopi-gantung": 2, sabun: 1 }
================================ */
let fazrinKeranjang = {};
try {
    fazrinKeranjang = JSON.parse(localStorage.getItem("fazrin_keranjang")) || {};
} catch (e) {
    fazrinKeranjang = {};
}

// Buang produk lama yang sudah tidak dijual lagi dari keranjang
Object.keys(fazrinKeranjang).forEach((id) => {
    if (!fazrinProduk[id] || !(fazrinKeranjang[id] > 0)) delete fazrinKeranjang[id];
});

function fazrinSimpanKeranjang() {
    try {
        localStorage.setItem("fazrin_keranjang", JSON.stringify(fazrinKeranjang));
    } catch (e) { /* abaikan jika penyimpanan diblokir */ }
}

const fazrinCart = document.getElementById("fazrin_cart");
const fazrinOverlay = document.getElementById("fazrin_overlay");
const fazrinCartList = document.getElementById("fazrin_cart_list");
const fazrinOrderForm = document.getElementById("fazrin_order_form");
const fazrinOrderBtn = document.getElementById("fazrin_order_wa");
const fazrinMetode = document.getElementById("fazrin_order_metode");
const fazrinAlamatWrap = document.getElementById("fazrin_alamat_wrap");

function fazrinBukaKeranjang() {
    fazrinTutupMenu();
    fazrinCart.classList.add("fazrin_open");
    fazrinCart.setAttribute("aria-hidden", "false");
    fazrinOverlay.hidden = false;
    document.body.classList.add("fazrin_lock");
}

function fazrinTutupKeranjang() {
    fazrinCart.classList.remove("fazrin_open");
    fazrinCart.setAttribute("aria-hidden", "true");
    fazrinOverlay.hidden = true;
    document.body.classList.remove("fazrin_lock");
}

function fazrinTambahKeranjang(id, jumlah = 1) {
    fazrinKeranjang[id] = (fazrinKeranjang[id] || 0) + jumlah;
    fazrinSimpanKeranjang();
    fazrinRenderKeranjang();
    document.querySelectorAll("[data-fazrin-cart-count]").forEach((b) => fazrinAnimasi(b, "fazrin_bump"));
    fazrinToast("✓ " + fazrinProduk[id].nama + " masuk keranjang");
}

function fazrinUbahJumlah(id, perubahan) {
    fazrinKeranjang[id] += perubahan;
    if (fazrinKeranjang[id] <= 0) delete fazrinKeranjang[id];
    fazrinSimpanKeranjang();
    fazrinRenderKeranjang();
}

function fazrinRenderKeranjang() {
    const ids = Object.keys(fazrinKeranjang).filter((id) => fazrinProduk[id]);
    let total = 0;
    let jumlahBarang = 0;

    fazrinCartList.innerHTML = "";
    ids.forEach((id) => {
        const p = fazrinProduk[id];
        const qty = fazrinKeranjang[id];
        total += p.harga * qty;
        jumlahBarang += qty;

        const li = document.createElement("li");
        li.className = "fazrin_cart_item";
        li.innerHTML = `
            <img src="${p.foto}" alt="">
            <div>
                <h4></h4>
                <p>${fazrinRupiah(p.harga * qty)}</p>
            </div>
            <div class="fazrin_qty">
                <button type="button" data-fazrin-qty="-1" aria-label="Kurangi">−</button>
                <output>${qty}</output>
                <button type="button" data-fazrin-qty="1" aria-label="Tambah">+</button>
            </div>`;
        li.querySelector("h4").textContent = p.nama;
        li.dataset.fazrinId = id;
        fazrinCartList.appendChild(li);
    });

    const kosong = ids.length === 0;
    document.getElementById("fazrin_cart_empty").hidden = !kosong;
    fazrinOrderForm.hidden = kosong;
    fazrinOrderBtn.disabled = kosong;
    document.getElementById("fazrin_cart_total").textContent = fazrinRupiah(total);
    document.querySelectorAll("[data-fazrin-cart-count]").forEach((b) => (b.textContent = jumlahBarang));

    // Tandai tombol produk yang sudah ada di keranjang
    document.querySelectorAll("[data-fazrin-add]").forEach((btn) => {
        const qty = fazrinKeranjang[btn.dataset.fazrinAdd];
        btn.classList.toggle("fazrin_added", Boolean(qty));
        btn.textContent = qty ? "✓ " + qty + " di keranjang" : "+ Keranjang";
    });
}

// Klik tombol "+ Keranjang" di kartu produk & tombol +/- di keranjang
document.addEventListener("click", (event) => {
    const add = event.target.closest("[data-fazrin-add]");
    if (add) fazrinTambahKeranjang(add.dataset.fazrinAdd);

    const qtyBtn = event.target.closest("[data-fazrin-qty]");
    if (qtyBtn) {
        const id = qtyBtn.closest(".fazrin_cart_item").dataset.fazrinId;
        fazrinUbahJumlah(id, Number(qtyBtn.dataset.fazrinQty));
    }
});

document.getElementById("fazrin_cart_open").addEventListener("click", fazrinBukaKeranjang);
document.getElementById("fazrin_cart_close").addEventListener("click", fazrinTutupKeranjang);
fazrinOverlay.addEventListener("click", fazrinTutupKeranjang);
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") fazrinTutupKeranjang();
});

// Kolom alamat hanya muncul jika memilih "Diantar ke rumah"
fazrinMetode.addEventListener("change", () => {
    fazrinAlamatWrap.hidden = fazrinMetode.value !== "Diantar ke rumah";
});

// Kirim pesanan ke WhatsApp
fazrinOrderBtn.addEventListener("click", () => {
    const nama = document.getElementById("fazrin_order_nama");
    const alamat = document.getElementById("fazrin_order_alamat");
    const catatan = document.getElementById("fazrin_order_catatan").value.trim();
    const pesanError = document.getElementById("fazrin_order_error");
    const diantar = fazrinMetode.value === "Diantar ke rumah";

    nama.classList.remove("fazrin_invalid");
    alamat.classList.remove("fazrin_invalid");
    pesanError.textContent = "";

    if (nama.value.trim().length < 3) {
        fazrinAnimasi(nama, "fazrin_invalid");
        pesanError.textContent = "Isi nama minimal 3 huruf.";
        nama.focus();
        return;
    }
    if (diantar && alamat.value.trim().length < 10) {
        fazrinAnimasi(alamat, "fazrin_invalid");
        pesanError.textContent = "Isi alamat lengkap untuk pengantaran.";
        alamat.focus();
        return;
    }

    let total = 0;
    const daftar = Object.keys(fazrinKeranjang).map((id, i) => {
        const p = fazrinProduk[id];
        const qty = fazrinKeranjang[id];
        total += p.harga * qty;
        return `${i + 1}. ${p.nama} x${qty} (${p.satuan}) = ${fazrinRupiah(p.harga * qty)}`;
    }).join("\n");

    const pesan =
`Halo Fazrin Sembako, saya mau pesan:

${daftar}

*Total: ${fazrinRupiah(total)}*

Nama: ${nama.value.trim()}
Pengambilan: ${fazrinMetode.value}` +
(diantar ? `\nAlamat: ${alamat.value.trim()}` : "") +
(catatan ? `\nCatatan: ${catatan}` : "") +
`

Mohon dicek ketersediaannya. Terima kasih!`;

    fazrinBukaWhatsApp(pesan);
    fazrinToast("Membuka WhatsApp…");
});

fazrinRenderKeranjang();

/* ================================
   6. HOME: ANGKA BERJALAN & TESTIMONI
================================ */
const fazrinCounterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.fazrinCount);
        const mulai = performance.now();

        function langkah(sekarang) {
            const progres = Math.min((sekarang - mulai) / 1500, 1);
            const halus = 1 - Math.pow(1 - progres, 3); // ease-out
            el.textContent = Math.floor(target * halus).toLocaleString("id-ID") + (progres === 1 && target >= 100 ? "+" : "");
            if (progres < 1) requestAnimationFrame(langkah);
        }
        requestAnimationFrame(langkah);
        fazrinCounterObserver.unobserve(el);
    });
}, { threshold: 0.5 });

document.querySelectorAll("[data-fazrin-count]").forEach((el) => fazrinCounterObserver.observe(el));

const fazrinTestiItems = document.querySelectorAll(".fazrin_testi_item");
const fazrinTestiDots = document.getElementById("fazrin_testi_dots");

if (fazrinTestiItems.length && fazrinTestiDots) {
    let fazrinTestiIndex = 0;
    let fazrinTestiTimer;

    fazrinTestiItems.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", "Testimoni " + (i + 1));
        dot.addEventListener("click", () => fazrinTampilTesti(i));
        fazrinTestiDots.appendChild(dot);
    });

    function fazrinTampilTesti(i) {
        fazrinTestiIndex = i;
        fazrinTestiItems.forEach((item, n) => item.classList.toggle("fazrin_testi_show", n === i));
        fazrinTestiDots.querySelectorAll("button").forEach((d, n) => d.classList.toggle("fazrin_active", n === i));
        clearInterval(fazrinTestiTimer);
        fazrinTestiTimer = setInterval(() => fazrinTampilTesti((fazrinTestiIndex + 1) % fazrinTestiItems.length), 4500);
    }

    fazrinTampilTesti(0);
}

/* ================================
   7. PRODUK: PENCARIAN & FILTER KATEGORI
================================ */
const fazrinSearch = document.getElementById("fazrin_search");
const fazrinFilter = document.getElementById("fazrin_filter");

if (fazrinSearch && fazrinFilter) {
    const kartu = document.querySelectorAll("#fazrin_product_list .fazrin_product_card");
    const pesanKosong = document.getElementById("fazrin_empty");
    let kategoriAktif = "semua";

    function fazrinTerapkanFilter() {
        const kata = fazrinSearch.value.trim().toLowerCase();
        let jumlahTampil = 0;

        kartu.forEach((card) => {
            const cocok = (kategoriAktif === "semua" || card.dataset.fazrinKategori === kategoriAktif)
                && card.dataset.fazrinNama.includes(kata);
            card.classList.toggle("fazrin_hide", !cocok);
            if (cocok) {
                jumlahTampil++;
                card.classList.add("fazrin_in");
                fazrinAnimasi(card, "fazrin_pop");
            }
        });

        pesanKosong.hidden = jumlahTampil > 0;
    }

    function fazrinPilihKategori(kategori) {
        kategoriAktif = kategori;
        fazrinFilter.querySelectorAll(".fazrin_chip").forEach((chip) => {
            chip.classList.toggle("fazrin_active", chip.dataset.fazrinFilter === kategori);
        });
        fazrinTerapkanFilter();
    }

    fazrinFilter.addEventListener("click", (event) => {
        const chip = event.target.closest(".fazrin_chip");
        if (chip) fazrinPilihKategori(chip.dataset.fazrinFilter);
    });

    fazrinSearch.addEventListener("input", fazrinTerapkanFilter);

    // Jika dibuka dari halaman Kategori, contoh: produk.html?kategori=pokok
    const kategoriUrl = new URLSearchParams(location.search).get("kategori");
    if (kategoriUrl && fazrinFilter.querySelector(`[data-fazrin-filter="${kategoriUrl}"]`)) {
        fazrinPilihKategori(kategoriUrl);
    }
}

/* ================================
   8. GALERI: LIGHTBOX
================================ */
const fazrinLightbox = document.getElementById("fazrin_lightbox");

if (fazrinLightbox) {
    const foto = document.getElementById("fazrin_lightbox_img");

    document.querySelectorAll(".fazrin_gallery_card").forEach((card) => {
        card.addEventListener("click", () => {
            foto.src = card.dataset.fazrinImg;
            foto.alt = card.dataset.fazrinTitle;
            document.getElementById("fazrin_lightbox_title").textContent = card.dataset.fazrinTitle;
            document.getElementById("fazrin_lightbox_desc").textContent = card.dataset.fazrinDesc;
            fazrinLightbox.hidden = false;
        });
    });

    function fazrinTutupLightbox() {
        fazrinLightbox.hidden = true;
    }

    document.getElementById("fazrin_lightbox_close").addEventListener("click", fazrinTutupLightbox);
    fazrinLightbox.addEventListener("click", (event) => {
        if (event.target === fazrinLightbox) fazrinTutupLightbox();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") fazrinTutupLightbox();
    });
}

/* ================================
   9. DETAIL PRODUK (BERDASARKAN ?id=)
================================ */
const fazrinDetailNama = document.getElementById("fazrin_detail_nama");

if (fazrinDetailNama) {
    let id = new URLSearchParams(location.search).get("id");
    if (!fazrinProduk[id]) id = Object.keys(fazrinProduk)[0];
    const produk = fazrinProduk[id];
    let jumlah = 1;

    document.title = produk.nama + " - Fazrin Sembako";
    const fotoDetail = document.getElementById("fazrin_detail_img");
    fotoDetail.src = produk.foto;
    fotoDetail.alt = produk.nama;
    document.getElementById("fazrin_bc_nama").textContent = produk.nama;
    document.getElementById("fazrin_detail_kategori").textContent = produk.kategori;
    fazrinDetailNama.textContent = produk.nama;
    document.getElementById("fazrin_detail_harga").innerHTML = fazrinRupiah(produk.harga) + " <small>/ " + produk.satuan + "</small>";
    document.getElementById("fazrin_detail_desc").textContent = produk.desc;

    const spec = document.getElementById("fazrin_detail_spec");
    spec.innerHTML = "";
    produk.spec.forEach((s) => {
        const [label, isi] = s.split(": ");
        const li = document.createElement("li");
        li.innerHTML = "<strong></strong> ";
        li.firstChild.textContent = label + ":";
        li.append(isi);
        spec.appendChild(li);
    });

    // Sembunyikan produk yang sedang dibuka dari daftar "Produk Lainnya"
    const kartuSama = document.querySelector(`.fazrin_product_card[data-fazrin-id="${id}"]`);
    if (kartuSama) kartuSama.remove();
    // Tampilkan maksimal 4 produk lain
    document.querySelectorAll(".fazrin_product_card").forEach((kartu, i) => {
        if (i >= 4) kartu.remove();
    });

    const totalEl = document.getElementById("fazrin_qty_total");
    const jumlahEl = document.getElementById("fazrin_qty_val");

    function fazrinUpdateJumlah(perubahan) {
        jumlah = Math.max(1, jumlah + perubahan);
        jumlahEl.textContent = jumlah;
        totalEl.textContent = fazrinRupiah(produk.harga * jumlah);
        fazrinAnimasi(totalEl, "fazrin_pop");
    }

    document.getElementById("fazrin_qty_min").addEventListener("click", () => fazrinUpdateJumlah(-1));
    document.getElementById("fazrin_qty_plus").addEventListener("click", () => fazrinUpdateJumlah(1));
    document.getElementById("fazrin_detail_add").addEventListener("click", () => fazrinTambahKeranjang(id, jumlah));
    document.getElementById("fazrin_detail_buy").addEventListener("click", () => {
        fazrinTambahKeranjang(id, jumlah);
        fazrinBukaKeranjang();
    });
    fazrinUpdateJumlah(0);
}

/* ================================
   10. KONTAK: VALIDASI & KIRIM PESAN KE WHATSAPP
================================ */
const fazrinForm = document.getElementById("fazrin_form");

if (fazrinForm) {
    const nama = document.getElementById("fazrin_nama");
    const email = document.getElementById("fazrin_email");
    const subjek = document.getElementById("fazrin_subjek");
    const pesan = document.getElementById("fazrin_pesan");
    const counter = document.getElementById("fazrin_counter");
    const hasil = document.getElementById("fazrin_hasil");

    function fazrinHitungKarakter() {
        counter.textContent = pesan.value.length + "/300";
    }
    pesan.addEventListener("input", fazrinHitungKarakter);

    function fazrinTampilError(input, teks) {
        fazrinForm.querySelector(`[data-fazrin-for="${input.id}"]`).textContent = teks;
        if (teks) fazrinAnimasi(input, "fazrin_invalid");
        else input.classList.remove("fazrin_invalid");
        return teks === "";
    }

    fazrinForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const valid = [
            fazrinTampilError(nama, nama.value.trim().length < 3 ? "Nama minimal 3 huruf." : ""),
            fazrinTampilError(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? "" : "Format email belum benar."),
            fazrinTampilError(pesan, pesan.value.trim().length < 10 ? "Pesan minimal 10 karakter." : "")
        ].every(Boolean);

        if (!valid) {
            fazrinToast("Periksa kembali isian formulir.");
            return;
        }

        fazrinBukaWhatsApp(
            `Halo Fazrin Sembako, saya ${nama.value.trim()} (${email.value.trim()}).\n` +
            `Subjek: ${subjek.value}\n\n${pesan.value.trim()}`
        );

        hasil.innerHTML = "";
        const judul = document.createElement("h3");
        judul.textContent = "✅ Terima kasih, " + nama.value.trim() + "!";
        const isi = document.createElement("p");
        isi.textContent = "Pesan Anda sudah disiapkan di WhatsApp. Tekan kirim di WhatsApp agar pesan sampai ke kami.";
        hasil.append(judul, isi);
        hasil.hidden = false;

        fazrinForm.reset();
        fazrinHitungKarakter();
    });
}
