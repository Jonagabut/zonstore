document.addEventListener("DOMContentLoaded", function () {
    var productsContainer = document.getElementById("products-container");
    var cartItemsContainer = document.getElementById("cart-items");
    var cartTotal = document.getElementById("cart-total");
    var total = 0;

    var products = [
        { name: "50 DM", description: "", price: 7.000, image: "ff.png" },
        { name: "70 DM", description: "", price: 10.000, image: "ff.png" },
        { name: "120 DM", description: "", price: 16.700, image: "ff.png" },
        { name: "145 DM", description: "", price: 20.000, image: "ff.png" },
        { name: "190 DM", description: "", price: 26.500, image: "ff.png" },
        { name: "200 DM", description: "", price: 27.000, image: "ff.png" },
        { name: "280 DM", description: "", price: 37.000, image: "ff.png" },
        { name: "300 DM", description: "", price: 40.500, image: "ff.png" },
        { name: "360 DM ", description: "", price: 49.000, image: "ff.png" },
        { name: "425 DM", description: "", price: 56.500, image: "ff.png" },
        { name: "475 DM", description: "", price: 62.000, image: "ff.png" },
        { name: "510 DM", description: "", price: 67.00, image: "ff.png" },
        
        // Tambahkan produk lainnya sesuai kebutuhan
    ];

    var cart = [];

    products.forEach(function (product) {
        var productArticle = document.createElement("article");
        productArticle.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}.Harga: ${formatRupiah(product.price)}</p>
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
            // Implementasi logika pembayaran di sini (contoh sederhana hanya mengonfirmasi)
            var confirmation = confirm(`Total belanja Anda: ${formatRupiah(total)}\nApakah Anda ingin melanjutkan pembayaran?`);

            if (confirmation) {
                var customerData = prompt("Masukan id ml ):");

                if (customerData) {
                    var message = `Pembelian dari zon store:\n\n${cart.map(item => `${item.name} - ${formatRupiah(item.price)}`).join('\n')}\n\nTotal: ${formatRupiah(total)}\n\nPembeli: ${customerData}`;

                    window.location.href = `https://wa.me/6285173138301?text=${encodeURIComponent(message)}`;
                    // Setelah mengirim data ke WhatsApp, Anda dapat mereset keranjang belanja atau melakukan langkah lainnya sesuai kebutuhan
                    alert("Pesanan Anda telah berhasil. Terima kasih!");
                }
            }
        } else {
            alert("Keranjang belanja Anda kosong. Silakan tambahkan produk terlebih dahulu.");
        }
    };
});
