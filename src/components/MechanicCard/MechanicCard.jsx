import React from 'react';
import './MechanicCard.css';
import avatar from '../../assets/avatar.png';
import { useNavigate } from 'react-router-dom';

const MechanicCard = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/contact');
  };

  return (
    <section className="mechanic-card">
      <div className="mechanic-content">
        <img src={avatar} alt="Lek Sulis" className="avatar" />
        <div className="info">
          <h3>Lek Sulis Vespa</h3>
          <p>Experienced in motorcycle repair and maintenance</p>
        </div>
        <button onClick={handleClick}>Contact</button>
      </div>
    </section>
  );
};

export default MechanicCard;
