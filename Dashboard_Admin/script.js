// Example chart using Chart.js
const ctx = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales',
      data: [120, 90, 100, 80, 130, 110],
      backgroundColor: '#333'
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Example form handling
document.getElementById('productForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Product added!');
});
