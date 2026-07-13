// ===== DATA PRODUK =====
const products = [
    { id: 1, name: 'Paracetamol 500mg', category: 'obat', price: 12500, original: 15000, desc: 'Pereda demam & nyeri, 10 tablet', icon: '&#x1F48A;', badge: 'bestseller', rating: 4.8, reviews: 2340, stock: 'available' },
    { id: 2, name: 'Vitamin C 1000mg', category: 'vitamin', price: 45000, original: 55000, desc: 'Imunitas & antioksidan, 30 tablet', icon: '&#x1F34B;', badge: 'bestseller', rating: 4.9, reviews: 1856, stock: 'available' },
    { id: 3, name: 'Masker Medis 50pcs', category: 'alat', price: 35000, original: 50000, desc: '3 ply, earloop nyaman, disposable', icon: '&#x1F637;', badge: 'sale', rating: 4.6, reviews: 3421, stock: 'available' },
    { id: 4, name: 'Termometer Digital', category: 'alat', price: 89000, original: 120000, desc: 'Akurat & cepat, LCD backlight', icon: '&#x1F321;', badge: 'bestseller', rating: 4.7, reviews: 987, stock: 'available' },
    { id: 5, name: 'Obat Flu & Batuk', category: 'obat', price: 18500, original: 22000, desc: 'Relief flu symptoms, 10 kapsul', icon: '&#x1F927;', badge: 'new', rating: 4.5, reviews: 654, stock: 'available' },
    { id: 6, name: 'Vitamin D3 1000IU', category: 'vitamin', price: 52000, original: 65000, desc: 'Tulang & imunitas, 30 softgel', icon: '&#x2600;', badge: 'new', rating: 4.8, reviews: 1123, stock: 'available' },
    { id: 7, name: 'Tensimeter Digital', category: 'alat', price: 245000, original: 299000, desc: 'Monitor tekanan darah, lengan atas', icon: '&#x1F49A;', badge: 'sale', rating: 4.9, reviews: 456, stock: 'limited' },
    { id: 8, name: 'Obat Maag', category: 'obat', price: 22000, original: 28000, desc: 'Redakan asam lambung, 10 tablet', icon: '&#x1F48A;', badge: 'new', rating: 4.4, reviews: 789, stock: 'available' },
    { id: 9, name: 'Multivitamin Anak', category: 'vitamin', price: 38000, original: 48000, desc: 'Nutrisi lengkap untuk tumbuh kembang', icon: '&#x1F476;', badge: 'bestseller', rating: 4.7, reviews: 2100, stock: 'available' },
    { id: 10, name: 'Oksimeter Pulse', category: 'alat', price: 175000, original: 220000, desc: 'Pengukur oksigen darah & detak jantung', icon: '&#x1F4A5;', badge: 'sale', rating: 4.6, reviews: 334, stock: 'limited' },
    { id: 11, name: 'Minyak Kayu Putih', category: 'ibu-anak', price: 28000, original: 35000, desc: 'Aromaterapi & pereda masuk angin', icon: '&#x1F331;', badge: 'bestseller', rating: 4.8, reviews: 5678, stock: 'available' },
    { id: 12, name: 'Bedak Bayi', category: 'ibu-anak', price: 15000, original: 20000, desc: 'Lembut & wangi, aman untuk kulit bayi', icon: '&#x1F476;', badge: 'new', rating: 4.5, reviews: 1234, stock: 'available' },
    { id: 13, name: 'Sunscreen SPF 50', category: 'kecantikan', price: 85000, original: 110000, desc: 'Perlindungan UV, non-greasy, 50ml', icon: '&#x2600;', badge: 'sale', rating: 4.7, reviews: 890, stock: 'available' },
    { id: 14, name: 'Serum Vitamin C', category: 'kecantikan', price: 120000, original: 155000, desc: 'Mencerahkan & anti-aging, 30ml', icon: '&#x1F48E;', badge: 'new', rating: 4.6, reviews: 445, stock: 'limited' },
    { id: 15, name: 'Antibiotik Amoxicillin', category: 'obat', price: 35000, original: 42000, desc: 'Antibiotik spektrum luas, 10 kapsul', icon: '&#x1F48A;', badge: 'sale', rating: 4.5, reviews: 678, stock: 'available' },
    { id: 16, name: 'Probiotik', category: 'vitamin', price: 68000, original: 85000, desc: 'Kesehatan pencernaan, 30 kapsul', icon: '&#x1F9EC;', badge: 'new', rating: 4.8, reviews: 556, stock: 'available' },
];

let cart = [];
let isLoggedIn = false;
let currentFilter = 'all';

// ===== RENDER PRODUCTS =====
function renderProducts(filter = 'all') {
    const grid = document.getElementById('productsGrid');
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

    if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--gray-400);"><i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>Produk tidak ditemukan</div>';
        return;
    }

    grid.innerHTML = filtered.map(product => {
        const stars = generateStars(product.rating);
        const stockClass = product.stock === 'available' ? 'stock-available' : 'stock-limited';
        const stockText = product.stock === 'available' ? 'Stok Tersedia' : 'Stok Terbatas';

        return `
            <div class="product-card">
                <div class="product-image">
                    <span style="font-size: 3.5rem;">${product.icon}</span>
                    <span class="product-badge badge-${product.badge}">${product.badge === 'bestseller' ? 'Terlaris' : product.badge === 'new' ? 'Baru' : 'Diskon'}</span>
                    <button class="quick-view-btn" onclick="showQuickView(${product.id})">
                        <i class="fas fa-eye"></i> Lihat
                    </button>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category.toUpperCase()}</div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-rating">
                        ${stars}
                        <span>(${product.reviews.toLocaleString('id-ID')})</span>
                    </div>
                    <div class="product-stock ${stockClass}">
                        <span class="stock-dot"></span> ${stockText}
                    </div>
                    <div class="product-desc">${product.desc}</div>
                    <div class="product-footer">
                        <div class="product-price">
                            <span class="current">Rp ${product.price.toLocaleString('id-ID')}</span>
                            <span class="original">Rp ${product.original.toLocaleString('id-ID')}</span>
                        </div>
                        <button class="add-to-cart" onclick="addToCart(${product.id})" title="Tambah ke keranjang">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

function setFilter(category, btn) {
    currentFilter = category;

    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
    btn.classList.add('active');

    renderProducts(category);
}

function showQuickView(productId) {
    const product = products.find(p => p.id === productId);
    showToast(`${product.name} - Rp ${product.price.toLocaleString('id-ID')}\n${product.desc}`, 'success');
}

// ===== CART FUNCTIONS =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCart();
    showToast(`${product.name} ditambahkan ke keranjang`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQty(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) removeFromCart(productId);
        else updateCart();
    }
}

function updateCart() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cartCount').textContent = count;

    const cartItems = document.getElementById('cartItems');
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    document.getElementById('cartTotal').textContent = `Rp ${total.toLocaleString('id-ID')}`;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-basket"></i>
                <span>Keranjang masih kosong</span>
            </div>`;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.icon}</div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="price">Rp ${(item.price * item.qty).toLocaleString('id-ID')}</div>
                    <div class="cart-item-actions">
                        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                        <span style="font-weight: 600; font-size: 0.8125rem; min-width: 20px; text-align: center;">${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                    </div>
                    <div class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i> Hapus</div>
                </div>
            </div>
        `).join('');
    }
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
    document.getElementById('cartOverlay').classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) {
        showToast('Keranjang masih kosong!', 'error');
        return;
    }
    if (!isLoggedIn) {
        toggleCart();
        openModal('loginModal');
        showToast('Silakan login terlebih dahulu', 'error');
        return;
    }
    toggleCart();
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    document.getElementById('checkoutSubtotal').textContent = `Rp ${total.toLocaleString('id-ID')}`;
    document.getElementById('checkoutTotal').textContent = `Rp ${(total + 15000).toLocaleString('id-ID')}`;
    openModal('checkoutModal');
}

function onPaymentChange(method) {
    const detailsDiv = document.getElementById('paymentDetails');
    const uploadGroup = document.getElementById('uploadBuktiGroup');

    if (!method) {
        detailsDiv.style.display = 'none';
        uploadGroup.style.display = 'none';
        return;
    }

    detailsDiv.style.display = 'block';
    uploadGroup.style.display = 'block';

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0) + 15000;

    if (method === 'bca') {
        detailsDiv.innerHTML = `
            <div class="payment-details-box">
                <h4><i class="fas fa-university"></i> Transfer Bank BCA</h4>
                <div style="text-align: center; margin-bottom: 1rem;">
                    <img src="bca.png" alt="BCA Logo" style="max-width: 120px; height: auto;">
                </div>
                <div class="payment-info-row">
                    <span class="label">Bank</span>
                    <span class="value">BCA</span>
                </div>
                <div class="payment-info-row">
                    <span class="label">No. Rekening</span>
                    <span class="value">1234-5678-9012 <button class="copy-btn" onclick="copyToClipboard('123456789012')">Copy</button></span>
                </div>
                <div class="payment-info-row">
                    <span class="label">Atas Nama</span>
                    <span class="value">PT. MediCare Pharmacy</span>
                </div>
                <div class="payment-info-row">
                    <span class="label">Total Transfer</span>
                    <span class="value" style="color: var(--primary); font-size: 1rem;">Rp ${total.toLocaleString('id-ID')}</span>
                </div>
                <div style="margin-top: 0.75rem; padding: 0.625rem; background: #fef3c7; border-radius: var(--radius-sm); font-size: 0.75rem; color: #92400e;">
                    <i class="fas fa-info-circle"></i> Transfer sesuai nominal agar verifikasi lebih cepat
                </div>
            </div>
        `;
    } else if (method === 'dana') {
        detailsDiv.innerHTML = `
            <div class="payment-details-box">
                <h4><i class="fas fa-wallet"></i> E-Wallet DANA</h4>
                <div style="text-align: center; margin-bottom: 1rem;">
                    <img src="gopay.png" alt="DANA Logo" style="max-width: 120px; height: auto;">
                </div>
                <div class="payment-info-row">
                    <span class="label">Nomor DANA</span>
                    <span class="value">0852-8069-4058 <button class="copy-btn" onclick="copyToClipboard('085280694058')">Copy</button></span>
                </div>
                <div class="payment-info-row">
                    <span class="label">Atas Nama</span>
                    <span class="value">MediCare Pharmacy</span>
                </div>
                <div class="payment-info-row">
                    <span class="label">Total Transfer</span>
                    <span class="value" style="color: var(--primary); font-size: 1rem;">Rp ${total.toLocaleString('id-ID')}</span>
                </div>
                <div style="margin-top: 0.75rem; padding: 0.625rem; background: #fef3c7; border-radius: var(--radius-sm); font-size: 0.75rem; color: #92400e;">
                    <i class="fas fa-info-circle"></i> Pastikan nominal transfer sesuai total pesanan
                </div>
            </div>
        `;
    } else if (method === 'qris') {
        // Generate a simple QR code placeholder using an API
        const qrisData = `MediCare-${Date.now()}`;
        detailsDiv.innerHTML = `
            <div class="payment-details-box">
                <h4><i class="fas fa-qrcode"></i> Pembayaran QRIS</h4>
                <div class="qris-container">
                    <img src="qris.png" alt="QRIS Code" style="max-width: 220px; width: 100%; border-radius: var(--radius-sm);">
                    <p>Scan kode QRIS ini dengan aplikasi e-wallet atau mobile banking Anda</p>
                </div>
                <div class="payment-info-row" style="margin-top: 0.75rem;">
                    <span class="label">Total Bayar</span>
                    <span class="value" style="color: var(--primary); font-size: 1rem;">Rp ${total.toLocaleString('id-ID')}</span>
                </div>
                <div style="margin-top: 0.75rem; padding: 0.625rem; background: #fef3c7; border-radius: var(--radius-sm); font-size: 0.75rem; color: #92400e;">
                    <i class="fas fa-info-circle"></i> QRIS berlaku selama 1 jam. Screenshot bukti pembayaran untuk diupload.
                </div>
            </div>
        `;
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Nomor berhasil disalin!', 'success');
    }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Nomor berhasil disalin!', 'success');
    });
}

let buktiFile = null;

function onBuktiSelected(input) {
    if (input.files && input.files[0]) {
        buktiFile = input.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('buktiPreviewImg').src = e.target.result;
            document.getElementById('buktiPreview').style.display = 'block';
            document.getElementById('uploadBuktiArea').classList.add('has-file');
            document.getElementById('buktiIcon').className = 'fas fa-check-circle';
            document.getElementById('buktiText').textContent = buktiFile.name;
            showToast('Bukti transfer berhasil diupload', 'success');
        };
        reader.readAsDataURL(buktiFile);
    }
}

function removeBukti() {
    buktiFile = null;
    document.getElementById('buktiInput').value = '';
    document.getElementById('buktiPreview').style.display = 'none';
    document.getElementById('uploadBuktiArea').classList.remove('has-file');
    document.getElementById('buktiIcon').className = 'fas fa-receipt';
    document.getElementById('buktiText').textContent = 'Klik untuk upload bukti transfer';
}

function processOrder() {
    const name = document.getElementById('checkoutName').value.trim();
    const phone = document.getElementById('checkoutPhone').value.trim();
    const address = document.getElementById('checkoutAddress').value.trim();
    const payment = document.getElementById('checkoutPayment').value;

    if (!name || !phone || !address || !payment) {
        showToast('Lengkapi semua data pembeli!', 'error');
        return;
    }

    if (!buktiFile) {
        showToast('Upload bukti transfer wajib!', 'error');
        document.getElementById('uploadBuktiArea').style.borderColor = 'var(--danger)';
        document.getElementById('uploadBuktiArea').style.background = '#fef2f2';
        setTimeout(() => {
            document.getElementById('uploadBuktiArea').style.borderColor = '';
            document.getElementById('uploadBuktiArea').style.background = '';
        }, 2000);
        return;
    }

    generateNota(name, phone, address, payment);

    cart = [];
    updateCart();
    closeModal('checkoutModal');

    // Reset payment form
    document.getElementById('checkoutPayment').value = '';
    document.getElementById('paymentDetails').style.display = 'none';
    document.getElementById('uploadBuktiGroup').style.display = 'none';
    removeBukti();

    openModal('notaModal');
    showToast('Pesanan berhasil! Nota telah dibuat.', 'success');
}
// ===== NOTA FUNCTIONS =====
function generateNota(name, phone, address, payment) {
    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const orderId = 'MC-' + now.getTime().toString().slice(-8);

    const paymentLabels = {
        'bca': 'Transfer Bank BCA',
        'dana': 'E-Wallet DANA',
        'qris': 'QRIS'
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const ongkir = 15000;
    const total = subtotal + ongkir;

    const itemsHtml = cart.map(item => `
        <tr>
            <td style="padding: 8px 0; border-bottom: 1px dashed #e2e8f0;">
                <div style="font-weight: 600; color: #1e293b;">${item.name}</div>
                <div style="font-size: 0.75rem; color: #94a3b8;">${item.qty} x Rp ${item.price.toLocaleString('id-ID')}</div>
            </td>
            <td style="padding: 8px 0; border-bottom: 1px dashed #e2e8f0; text-align: right; font-weight: 600; color: #1e293b; white-space: nowrap;">
                Rp ${(item.price * item.qty).toLocaleString('id-ID')}
            </td>
        </tr>
    `).join('');

    const notaHtml = `
        <div id="notaPrintArea" style="padding: 1.5rem; font-family: 'Inter', sans-serif; color: #1e293b;">
            <div style="text-align: center; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 2px solid #059669;">
                <div style="font-size: 1.5rem; font-weight: 800; color: #059669; margin-bottom: 0.25rem;">
                    <i class="fas fa-mortar-pestle"></i> MediCare Pharmacy
                </div>
                <div style="font-size: 0.75rem; color: #64748b;">Apotek Online Terpercaya</div>
                <div style="font-size: 0.75rem; color: #64748b; margin-top: 0.25rem;">Kendari, Indonesia | 0852-8069-4058</div>
            </div>
            <div style="margin-bottom: 1.25rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.375rem; font-size: 0.8125rem;">
                    <span style="color: #64748b;">No. Nota</span>
                    <span style="font-weight: 700; color: #059669;">${orderId}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.375rem; font-size: 0.8125rem;">
                    <span style="color: #64748b;">Tanggal</span>
                    <span style="font-weight: 600;">${dateStr} ${timeStr}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.375rem; font-size: 0.8125rem;">
                    <span style="color: #64748b;">Pembayaran</span>
                    <span style="font-weight: 600;">${paymentLabels[payment]}</span>
                </div>
            </div>
            <div style="background: #f8fafc; border-radius: 8px; padding: 0.875rem; margin-bottom: 1.25rem;">
                <div style="font-size: 0.6875rem; font-weight: 700; color: #059669; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">Data Pembeli</div>
                <div style="font-size: 0.8125rem; font-weight: 600; margin-bottom: 0.125rem;">${name}</div>
                <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 0.25rem;">${phone}</div>
                <div style="font-size: 0.75rem; color: #64748b; line-height: 1.5;">${address}</div>
            </div>
            <div style="margin-bottom: 1.25rem;">
                <div style="font-size: 0.6875rem; font-weight: 700; color: #059669; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">Detail Pesanan</div>
                <table style="width: 100%; border-collapse: collapse; font-size: 0.8125rem;">
                    ${itemsHtml}
                </table>
            </div>
            <div style="border-top: 2px solid #e2e8f0; padding-top: 1rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.375rem; font-size: 0.8125rem;">
                    <span style="color: #64748b;">Subtotal</span>
                    <span style="font-weight: 600;">Rp ${subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.8125rem;">
                    <span style="color: #64748b;">Ongkir</span>
                    <span style="font-weight: 600;">Rp ${ongkir.toLocaleString('id-ID')}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding-top: 0.5rem; border-top: 1px solid #e2e8f0;">
                    <span style="font-weight: 700; font-size: 0.9375rem;">TOTAL</span>
                    <span style="font-weight: 800; font-size: 1.125rem; color: #059669;">Rp ${total.toLocaleString('id-ID')}</span>
                </div>
            </div>
            <div style="text-align: center; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed #cbd5e1;">
                <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 0.25rem;">Terima kasih telah berbelanja di MediCare Pharmacy</div>
                <div style="font-size: 0.6875rem; color: #cbd5e1;">Nota ini adalah bukti pembelian yang sah</div>
            </div>
        </div>
    `;

    document.getElementById('notaContent').innerHTML = notaHtml;
    document.getElementById('printNota').innerHTML = notaHtml;

    window._notaData = { name, phone, address, payment: paymentLabels[payment], orderId, dateStr, timeStr, subtotal, ongkir, total, items: cart };
}

function printNota() {
    const printContent = document.getElementById('printNota').innerHTML;
    const printWindow = window.open('', '_blank', 'width=600,height=800');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Nota Pembelian - MediCare Pharmacy</title>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
            <style>
                body { margin: 0; padding: 20px; font-family: 'Inter', sans-serif; background: #fff; }
                @media print {
                    body { padding: 0; }
                    .no-print { display: none !important; }
                }
            </style>
        </head>
        <body>
            ${printContent}
            <div class="no-print" style="text-align: center; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                <button onclick="window.print()" style="padding: 0.625rem 1.5rem; background: #059669; color: white; border: none; border-radius: 8px; font-family: inherit; font-weight: 600; cursor: pointer; font-size: 0.875rem;">
                    <i class="fas fa-print"></i> Print Sekarang
                </button>
                <button onclick="window.close()" style="padding: 0.625rem 1.5rem; background: #f1f5f9; color: #475569; border: none; border-radius: 8px; font-family: inherit; font-weight: 600; cursor: pointer; font-size: 0.875rem; margin-left: 0.5rem;">
                    <i class="fas fa-times"></i> Tutup
                </button>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
}

function kirimWaNota() {
    const d = window._notaData;
    if (!d) return;

    const waNumber = '6285280694058';

    let itemsText = d.items.map(item =>
        '• ' + item.name + '\n  ' + item.qty + ' x Rp ' + item.price.toLocaleString('id-ID') + ' = Rp ' + (item.price * item.qty).toLocaleString('id-ID')
    ).join('\n\n');

    const message = encodeURIComponent(
        '*NOTA PEMBELIAN - MediCare Pharmacy*\n' +
        '━━━━━━━━━━━━━━━━━━━━\n' +
        '*No. Nota:* ' + d.orderId + '\n' +
        '*Tanggal:* ' + d.dateStr + ' ' + d.timeStr + '\n' +
        '*Pembayaran:* ' + d.payment + '\n\n' +
        '*DATA PEMBELI:*\n' +
        'Nama: ' + d.name + '\n' +
        'No. HP: ' + d.phone + '\n' +
        'Alamat: ' + d.address + '\n\n' +
        '*DETAIL PESANAN:*\n' +
        itemsText + '\n\n' +
        '━━━━━━━━━━━━━━━━━━━━\n' +
        'Subtotal: Rp ' + d.subtotal.toLocaleString('id-ID') + '\n' +
        'Ongkir: Rp ' + d.ongkir.toLocaleString('id-ID') + '\n' +
        '*TOTAL: Rp ' + d.total.toLocaleString('id-ID') + '*\n\n' +
        'Terima kasih telah berbelanja di MediCare Pharmacy! 🙏'
    );

    const waUrl = `https://wa.me/${waNumber}?text=${message}`;
    window.open(waUrl, '_blank');
}

// ===== MODAL FUNCTIONS =====
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = '';
}

function switchModal(from, to) {
    closeModal(from);
    setTimeout(() => openModal(to), 150);
}

// ===== LOGIN/REGISTER =====
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showToast('Lengkapi email dan password!', 'error');
        return;
    }

    isLoggedIn = true;
    closeModal('loginModal');
    showToast('Login berhasil! Selamat datang.', 'success');

    const btn = document.querySelector('.header-actions .btn-primary');
    btn.innerHTML = '<i class="fas fa-user"></i> Akun';
    btn.onclick = () => showToast('Anda sudah login', 'success');
}

function register() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    const password = document.getElementById('regPassword').value;

    if (!name || !email || !phone || !password) {
        showToast('Lengkapi semua data!', 'error');
        return;
    }

    closeModal('registerModal');
    showToast('Pendaftaran berhasil! Silakan login.', 'success');
    setTimeout(() => openModal('loginModal'), 300);
}

// ===== CHAT FUNCTIONS =====
function toggleChat() {
    document.getElementById('chatBox').classList.toggle('active');
}

function sendChat() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;

    const messages = document.getElementById('chatMessages');
    messages.innerHTML += `<div class="chat-message user">${message}</div>`;
    input.value = '';
    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
        const responses = [
            'Terima kasih atas pertanyaan Anda. Apoteker kami akan segera merespons.',
            'Untuk informasi lebih detail, silakan konsultasi langsung dengan apoteker kami.',
            'Kami sarankan untuk membaca artikel kesehatan kami untuk informasi lengkap.',
            'Apakah ada produk spesifik yang Anda cari? Kami bisa membantu menyarankan.'
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];
        messages.innerHTML += `<div class="chat-message bot">${response}</div>`;
        messages.scrollTop = messages.scrollHeight;
    }, 800);
}

// ===== TOAST NOTIFICATION =====
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} toast-icon"></i>
        <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== NAVIGATION =====
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function filterProducts(category) {
    setFilter(category, document.querySelectorAll('.filter-tab')[getCategoryIndex(category)]);
    scrollToSection('products');
}

function getCategoryIndex(category) {
    const map = { 'all': 0, 'obat': 1, 'vitamin': 2, 'alat': 3, 'ibu-anak': 4, 'kecantikan': 5 };
    return map[category] || 0;
}

function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('active');
    document.querySelector('.mobile-menu-overlay').classList.toggle('active');
    document.body.style.overflow = document.getElementById('mobileMenu').classList.contains('active') ? 'hidden' : '';
}

// ===== SEARCH =====
document.getElementById('searchInput')?.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    if (query.length > 0) {
        const filtered = products.filter(p => p.name.toLowerCase().includes(query));
        const grid = document.getElementById('productsGrid');
        if (filtered.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--gray-400);"><i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>Produk tidak ditemukan</div>';
        } else {
            grid.innerHTML = filtered.map(product => {
                const stars = generateStars(product.rating);
                const stockClass = product.stock === 'available' ? 'stock-available' : 'stock-limited';
                const stockText = product.stock === 'available' ? 'Stok Tersedia' : 'Stok Terbatas';
                return `
                    <div class="product-card">
                        <div class="product-image">
                            <span style="font-size: 3.5rem;">${product.icon}</span>
                            <span class="product-badge badge-${product.badge}">${product.badge === 'bestseller' ? 'Terlaris' : product.badge === 'new' ? 'Baru' : 'Diskon'}</span>
                        </div>
                        <div class="product-info">
                            <div class="product-category">${product.category.toUpperCase()}</div>
                            <div class="product-name">${product.name}</div>
                            <div class="product-rating">${stars}<span>(${product.reviews.toLocaleString('id-ID')})</span></div>
                            <div class="product-stock ${stockClass}"><span class="stock-dot"></span> ${stockText}</div>
                            <div class="product-desc">${product.desc}</div>
                            <div class="product-footer">
                                <div class="product-price">
                                    <span class="current">Rp ${product.price.toLocaleString('id-ID')}</span>
                                    <span class="original">Rp ${product.original.toLocaleString('id-ID')}</span>
                                </div>
                                <button class="add-to-cart" onclick="addToCart(${product.id})" title="Tambah ke keranjang">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
        scrollToSection('products');
    } else {
        renderProducts(currentFilter);
    }
});

// ===== UPLOAD RESEP =====
document.getElementById('resepInput')?.addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
        showToast('Resep berhasil diupload! Menunggu verifikasi apoteker.', 'success');
    }
});

// Drag and drop for upload area
const uploadArea = document.getElementById('uploadArea');
if (uploadArea) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    uploadArea.addEventListener('dragenter', () => uploadArea.classList.add('drag-over'));
    uploadArea.addEventListener('dragover', () => uploadArea.classList.add('drag-over'));
    uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('drag-over'));
    uploadArea.addEventListener('drop', (e) => {
        uploadArea.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            showToast('Resep berhasil diupload! Menunggu verifikasi apoteker.', 'success');
        }
    });
}

// ===== PROMO COUNTDOWN =====
function updateCountdown() {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    const diff = endOfDay - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const cdHours = document.getElementById('cdHours');
    const cdMinutes = document.getElementById('cdMinutes');
    const cdSeconds = document.getElementById('cdSeconds');

    if (cdHours) cdHours.textContent = hours.toString().padStart(2, '0');
    if (cdMinutes) cdMinutes.textContent = minutes.toString().padStart(2, '0');
    if (cdSeconds) cdSeconds.textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
        header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
    } else {
        header.style.boxShadow = 'var(--shadow)';
    }
    lastScroll = currentScroll;
});

// ===== ACTIVE NAV LINK =====
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => observer.observe(reveal));
}

// ===== CLOSE MODALS ON ESCAPE =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
        document.getElementById('cartSidebar').classList.remove('active');
        document.getElementById('cartOverlay').classList.remove('active');
        document.getElementById('chatBox').classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    initScrollReveal();
});