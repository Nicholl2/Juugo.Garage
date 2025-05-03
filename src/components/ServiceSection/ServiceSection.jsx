import React from 'react';
import './ServiceSection.css';
import GantiOli from '../../assets/GantiOli.png';
import GantiSparepart from '../../assets/GantiSparepart.png';
import FullService from '../../assets/FullService.png';

const services = [
  {
    title: 'Oil Changes',
    description:
      'Regular oil changes are crucial for maintaining your vehicle’s performance, engine health, and fuel efficiency. At Juugo Garage, we offer fast and professional oil change services using high-quality synthetic, conventional, or high-mileage oils tailored to your car’s needs.',
    image: GantiOli,
  },
  {
    title: 'Change Sparepart',
    description:
      'For spare part replacements, we only use high-quality OEM or premium aftermarket components to ensure optimal performance and longevity. Our expert technicians carefully install each part with precision and attention to detail.',
    image: GantiSparepart,
  },
  {
    title: 'Full Service',
    description:
      'At Juugo Garage, we provide thorough full-service maintenance to keep your bike running at its best. Whether it’s routine maintenance or performance tuning, we ensure your motorcycle gets precise care for smoother rides and longer engine life.',
    image: FullService,
  },
];

const ServiceSection = () => {
  return (
    <section className="services">
      <h2>Our Services</h2>
      {services.map((service, index) => (
        <div className="service" key={index}>
          <div className="text">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
          <img src={service.image} alt={service.title} style={{ maxWidth: '300px', borderRadius: '10px' }} />
        </div>
      ))}
    </section>
  );
};

export default ServiceSection;
