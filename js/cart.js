// Check if cart exists in localStorage, else create empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Render cart table
function renderCart() {
    const tbody = document.querySelector('#cart-table tbody');
    tbody.innerHTML = '';

    if(cart.length === 0){
        tbody.innerHTML = `<tr><td colspan="5">Your cart is empty.</td></tr>`;
        document.getElementById('total-price').innerText = '0.00';
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" min="1" value="${item.quantity}" class="form-control quantity-input" data-index="${index}">
            </td>
            <td>$${subtotal.toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm remove-btn" data-index="${index}">Remove</button></td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('total-price').innerText = total.toFixed(2);

    // Add event listeners for quantity inputs
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const idx = e.target.getAttribute('data-index');
            let val = parseInt(e.target.value);
            if(val < 1) val = 1;
            cart[idx].quantity = val;
            saveCart();
        });
    });

    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = e.target.getAttribute('data-index');
            cart.splice(idx, 1);
            saveCart();
        });
    });
}

// Add product to cart (can be called from product page)
function addToCart(product) {
    const existingIndex = cart.findIndex(item => item.id === product.id);
    if(existingIndex !== -1){
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    saveCart();
}

// Checkout button
document.getElementById('checkout-btn').addEventListener('click', () => {
    if(cart.length === 0){
        alert('Your cart is empty!');
        return;
    }
    alert(`Thank you for your purchase! Total: $${document.getElementById('total-price').innerText}`);
    cart = [];
    saveCart();
});

// Initial render
renderCart();
