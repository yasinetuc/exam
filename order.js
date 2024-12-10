// Initialize cart
let cart = [];

// Add item to cart
function addToCart(item, price) {
    const existingItem = cart.find(i => i.name === item);

    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already exists
    } else {
        cart.push({ name: item, price: price, quantity: 1 }); // Add new item with quantity 1
    }

    updateCart(); // Update cart and display the total cost
}

// Update cart display and calculate total cost
function updateCart() {
    const cartItemsList = document.getElementById('cartItems');
    const totalAmount = document.getElementById('totalAmount');
    
    cartItemsList.innerHTML = ''; // Clear the current list
    let total = 0;

    // Populate cart and calculate total
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ₱${item.price} x ${item.quantity}`;
        cartItemsList.appendChild(listItem);
        total += item.price * item.quantity; // Update total cost
    });

    totalAmount.textContent = `Total: ₱${total.toFixed(2)}`; // Show the total cost
}

// Handle order form submission
function placeOrder(event) {
    event.preventDefault(); // Prevent form submission

    // Get user inputs
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const cellphone = document.getElementById('cellphone').value;

    if (cart.length === 0) {
        alert("Your cart is empty. Please add some items to your cart before ordering.");
        return;
    }

    // Display order details in a confirmation alert
    let orderDetails = `Order Placed!\nName: ${name}\nAddress: ${address}\nCellphone No.: ${cellphone}\nItems:\n`;
    cart.forEach(item => {
        orderDetails += `${item.name} - ₱${item.price} x ${item.quantity}\n`;
    });
    orderDetails += `Total: ₱${calculateTotal()}`;

    alert(orderDetails);

    // Clear cart after order is placed
    cart = [];
    updateCart(); // Reset cart display
    document.getElementById('orderForm').reset(); // Reset the form
}

// Calculate total cost of the cart
function calculateTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
}