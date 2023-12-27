document.addEventListener("DOMContentLoaded", function () {
    var productsContainer = document.getElementById("products-container");
    var cartItemsContainer = document.getElementById("cart-items");
    var cartTotal = document.getElementById("cart-total");
    var total = 0;

    var products = [
        { name: "14 DM", description: "", price: 4.50, image: "ml.png" },
        { name: "28 DM", description: "", price: 8.40, image: "ml.png" },
        { name: "42 DM", description: "", price: 12.20, image: "ml.png" },
        { name: "74 DM", description: "", price: 19.00, image: "ml.png" },
        { name: "100 DM", description: "", price: 26.90, image: "ml.png" },
        { name: "172 DM", description: "", price: 45.00, image: "ml.png" },
        { name: "222 DM", description: "", price: 57.00, image: "ml.png" },
        { name: "284 DM", description: "", price: 73.80, image: "ml.png" },
        { name: "355 DM", description: "", price: 90.90, image: "ml.png" },
        { name: "408 DM", description: "", price: 104.40, image: "ml.png" },
        { name: "429 DM", description: "", price: 111.00, image: "ml.png" },
        { name: "514 DM", description: "", price: 131.00, image: "ml.png" },
        { name: "600 DM", description: "", price: 151.00, image: "ml.png" },
        { name: "706 DM", description: "", price: 178.20, image: "ml.png" },
        { name: "WDP", description: "Weekly diamond pass", price: 28.5, image: "wdp.png" },
        { name: "WDP 2x", description: "Weekly diamond pass", price: 55.4, image: "wdp.png" },
        // Tambahkan produk lainnya sesuai kebutuhan
    ];

    var cart = [];

    products.forEach(function (product) {
        var productArticle = document.createElement("article");
        productArticle.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}  Harga: ${formatRupiah(product.price)}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Beli</button>
        `;
        productsContainer.appendChild(productArticle);
    });

    function addToCart(productName, productPrice) {
        var item = { name: productName, price: productPrice };
        cart.push(item);
        total += productPrice;
        updateCart();
    }

    function updateCart() {
        cartItemsContainer.innerHTML = "";

        cart.forEach(function (item, index) {
            var li = document.createElement("li");
            li.textContent = `${item.name} - ${formatRupiah(item.price)}`;
            var cancelButton = document.createElement("button");
            cancelButton.textContent = "Batalkan";
            cancelButton.onclick = function () {
                cancelOrder(index);
            };
            li.appendChild(cancelButton);
            cartItemsContainer.appendChild(li);
        });

        cartTotal.textContent = `Total: ${formatRupiah(total)}`;
    }

    function cancelOrder(index) {
        var canceledItem = cart.splice(index, 1)[0];
        total -= canceledItem.price;
        updateCart();
    }

    function formatRupiah(amount) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount * 1000);
    }

    function generateOrderId() {
        return Date.now().toString() + Math.random().toString(36).substring(2, 15);
    }

    window.addToCart = addToCart;
    window.cancelOrder = cancelOrder;
    window.checkout = function () {
        if (cart.length > 0) {
            var confirmation = confirm(`Total belanja Anda: ${formatRupiah(total)}\nApakah Anda ingin melanjutkan pembayaran?`);

            if (confirmation) {
                var orderId = generateOrderId();
                var midtransClientKey = 'Mid-client-G3QKXRp2Ff0dySnF';  // Gantilah dengan kunci Midtrans yang valid

                var midtransParams = {
                    transaction_details: {
                        order_id: orderId,
                        gross_amount: total * 1000,
                    },
                    credit_card: {
                        secure: true,
                    },
                };

                snap.pay(midtransParams, {
                    onSuccess: function (result) {
                        var customerData = prompt("Masukkan ID ML:");

                        if (customerData) {
                            var message = `Pembelian dari Zon Store:\n\n${cart.map(item => `${item.name} - ${formatRupiah(item.price)}`).join('\n')}\n\nTotal: ${formatRupiah(total)}\n\nPembeli: ${customerData}`;

                            window.location.href = `https://wa.me/6285173138301?text=${encodeURIComponent(message)}`;
                            alert("Pesanan Anda telah berhasil. Terima kasih!");
                            resetCart();
                        }
                    },
                    onPending: function (result) {
                        alert("Pembayaran sedang diproses. Terima kasih!");
                        resetCart();
                    },
                    onError: function (result) {
                        alert("Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.");
                    },
                    onClose: function () {
                        // Callback ketika widget Midtrans tertutup
                    },
                });
            }
        } else {
            alert("Keranjang belanja Anda kosong. Silakan tambahkan produk terlebih dahulu.");
        }
    };

    function resetCart() {
        cart = [];
        total = 0;
        updateCart();
    }
});
