document.addEventListener('DOMContentLoaded', () => {
    // Button interaction for Explore
    const exploreButton = document.querySelector('.hero button');
    exploreButton.addEventListener('click', () => {
        alert('Explore our products and services!');
    });

    // Contact button interaction
    const contactButton = document.querySelector('.contact-btn');
    contactButton.addEventListener('click', () => {
        alert('Contact us for more information!');
    });

    // Newsletter subscription interaction
    const subscribeButton = document.querySelector('#subscribeBtn');
    subscribeButton.addEventListener('click', () => {
        const emailInput = document.querySelector('#emailInput');
        const email = emailInput.value;
        if (email) {
            alert(`Thank you for subscribing, ${email}!`);
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });

    // Product hover effect
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        });
    });
});
