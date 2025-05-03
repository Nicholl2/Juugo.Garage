import React from 'react';
import './Reviews.css';

const Reviews = () => {
  const reviews = [
    {
      name: 'Nicholas',
      comment: 'Best Benghkel ni mah! Pelayanan cepat dan ramah.',
    },
    {
      name: 'Sari Mi',
      comment: 'Harga oke, mekanik jujur, dan hasil mantap!',
    },
    {
      name: 'Bimogg',
      comment: 'Suku cadang lengkap, rekomendasi banget buat motor tua.',
    },
  ];

  return (
    <section className="reviews">
      <h2>Customer Reviews</h2>
      <div className="review-list">
        {reviews.map((item, index) => (
          <div className="review-card" key={index}>
            <p>"{item.comment}"</p>
            <span>- {item.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
