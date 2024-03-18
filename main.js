document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.getElementById('cart-items');
    const totalCost = document.getElementById('total-cost');
  
    class Item {
      constructor(name, price) {
        this.name = name;
        this.price = price;
        this.quantity = 0;
      }
  
      incrementQuantity() {
        this.quantity++;
      }
  
      decrementQuantity() {
        if (this.quantity > 0) {
          this.quantity--;
        }
      }
    }
  
    let items = [];
  
    function updateCart() {
      cartItems.innerHTML = '';
      let total = 0;
      items.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.textContent = `${item.name} x ${item.quantity}`;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
      });
      totalCost.textContent = `Total Cost: $${total}`;
    }
  
    function addItem(name, price) {
      const existingItem = items.find(item => item.name === name);
      if (existingItem) {
        existingItem.incrementQuantity();
      } else {
        const newItem = new Item(name, price);
        newItem.incrementQuantity();
        items.push(newItem);
      }
      updateCart();
    }
  
    function removeItem(name) {
      items = items.filter(item => item.name !== name);
      updateCart();
    }
  
    document.querySelectorAll('.box').forEach(box => {
      const itemName = box.querySelector('h2').textContent;
      const itemPrice = parseInt(box.querySelector('.price').textContent.slice(1));
      const plusBtn = box.querySelector('.plus');
      const minusBtn = box.querySelector('.minus');
      const deleteBtn = box.querySelector('.delete-btn');
  
      plusBtn.addEventListener('click', () => {
        addItem(itemName, itemPrice);
      });
  
      minusBtn.addEventListener('click', () => {
        const existingItem = items.find(item => item.name === itemName);
        if (existingItem) {
          existingItem.decrementQuantity();
          updateCart();
        }
      });
  
      deleteBtn.addEventListener('click', () => {
        removeItem(itemName);
      });
    });
  });
  