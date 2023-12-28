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
        { name: "WDP", description: "Weekly diamond pass", price: 28.500, image: "wdp.png" },
        { name: "WDP 2x", description: "Weekly diamond pass", price: 55.400, image: "wdp.png" },
        // Add more products as needed
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
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    }

    window.addToCart = addToCart;
    window.cancelOrder = cancelOrder;
    window.checkout = function () {
        if (cart.length > 0) {
            var confirmation = confirm(`Total belanja Anda: ${formatRupiah(total)}\nApakah Anda ingin melanjutkan pembayaran?`);

            if (confirmation) {
                var customerName = prompt("Masukkan nama akun:");

                if (customerName) {
                    var nameConfirmation = confirm(`Konfirmasi nama Anda: ${customerName}\nApakah nama Anda sudah benar?`);

                    if (nameConfirmation) {
                        var customerId = prompt("Masukkan ID (SERVER):");

                        if (customerId) {
                            var idConfirmation = confirm(`Konfirmasi ID Anda: ${customerId}\nApakah ID Anda sudah benar?`);

                            if (idConfirmation) {
                                var message = `Pembelian dari zon store:\n\n${cart.map(item => `${item.name} - ${formatRupiah(item.price)}`).join('\n')}\n\nTotal: ${formatRupiah(total)}\n\nPelanggan: ${customerName}\nID Pelanggan: ${customerId}`;

                                window.location.href = `https://wa.me/6285173138301?text=${encodeURIComponent(message)}`;
                                alert("Pesanan Anda telah berhasil. Terima kasih!");
                            }
                        }
                    }
                }
            }
        } else {
            alert("Keranjang belanja Anda kosong. Silakan tambahkan produk terlebih dahulu.");
        }
    };
});
