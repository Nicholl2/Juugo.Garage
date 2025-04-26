// JavaScript for basic functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add order button functionality
    const addOrderBtn = document.querySelector('.add-order-btn');
    if (addOrderBtn) {
        addOrderBtn.addEventListener('click', function() {
            alert('Add new order functionality would go here');
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                alert('Search functionality would go here for: ' + this.value);
            }
        });
    }
    
    // Order search functionality
    const searchOrder = document.querySelector('.search-order');
    if (searchOrder) {
        searchOrder.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                alert('Order search functionality would go here for Order ID: ' + this.value);
            }
        });
    }
    
    // View all products button
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Navigate to all products page');
        });
    }
    
    // Read more button
    const readMoreBtn = document.querySelector('.read-more-btn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Navigate to updates page');
        });
    }
});