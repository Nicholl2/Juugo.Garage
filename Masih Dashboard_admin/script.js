function toggleForm() {
    const form = document.getElementById('productForm');
    form.classList.toggle('hidden');
  }
  
  document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    alert(`Product Saved: ${name} - $${price}`);
  });
  