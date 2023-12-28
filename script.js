document.addEventListener("DOMContentLoaded", function () {
    var productsContainer = document.getElementById("products-container");
    var cartItemsContainer = document.getElementById("cart-items");
    var cartTotal = document.getElementById("cart-total");
    var total = 0;

    var products = [
        { name: "30 UC", description: "", price: 7.000, image: "uc.png" },
        { name: "60 UC", description: "", price: 13.0, image: "uc.png" },
        { name: "120 UC", description: "", price: 25.500, image: "uc.png" },
        { name: "180 UC", description: "", price: 38, image: "uc.png" },
        { name: "240 UC", description: "", price: 49.04, image: "uc.png" },
        { name: "325 UC", description: "", price: 60.80, image: "uc.png" },
        { name: "415 UC", description: "", price: 77.80, image: "uc.png" },
        { name: "445 UC", description: "", price: 83.00, image: "uc.png" },
        { name: "595 UC", description: "", price: 112.50, image: "uc.png" },
        { name: "660 UC", description: "", price: 118.50, image: "uc.png" },
        { name: "720 UC", description: "", price: 130.00, image: "uc.png" },
        { name: "750 UC", description: "", price: 136.50, image: "uc.png" },
        // Add more products as needed
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
            var customerName = prompt("Masukkan nama akun:");
            var customerId = prompt("Masukkan ID pubg:");

            if (customerName && customerId) {
                var confirmation = confirm(`Konfirmasi data pelanggan:\nNama: ${customerName}\nID PUBG: ${customerId}\n\nTotal belanja Anda: ${formatRupiah(total)}\nApakah Anda ingin melanjutkan pembayaran?`);

                if (confirmation) {
                    var message = `Pembelian dari zon store:\n\n${cart.map(item => `${item.name} - ${formatRupiah(item.price)}`).join('\n')}\n\nTotal: ${formatRupiah(total)}\n\nPelanggan: ${customerName}\nID Pelanggan: ${customerId}`;

                    window.location.href = `https://wa.me/6285173138301?text=${encodeURIComponent(message)}`;
                    alert("Pesanan Anda telah berhasil. Terima kasih!");
                }
            }
        } else {
            alert("Keranjang belanja Anda kosong. Silakan tambahkan produk terlebih dahulu.");
        }
    };
});
