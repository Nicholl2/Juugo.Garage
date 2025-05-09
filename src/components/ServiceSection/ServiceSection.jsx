import React from 'react';
import './ServiceSection.css';
import GantiOli from '../../assets/GantiOli.png';
import GantiSparepart from '../../assets/GantiSparepart.png';
import FullService from '../../assets/FullService.png';

const services = [
  {
    title: 'Oil Changes',
    description:
      'Regular oil changes are crucial for maintaining your vehicles performance, engine health, and fuel efficiency. At Juugo Garage, we offer fast and professional oil change services using high-quality synthetic, conventional, or high-mileage oils tailored to your car’s needs. Our skilled technicians ensure proper oil viscosity and filter replacement while performing a complimentary multi-point inspection to check fluids, tires, and brakes. With eco-friendly oil disposal and quick, reliable service, we help extend your engine’s life and keep your ride smooth. Follow your manufacturer’s recommendations—typically every 3,000–5,000 miles for conventional oil or 7,500–10,000 miles for synthetic oil and schedule your next oil change with us today!',
    image: GantiOli,
  },
  {
    title: 'Change Sparepart',
    description:
      'For spare part replacements, we only use high-quality OEM or premium aftermarket components to ensure optimal performance and longevity for your vehicle. Our expert technicians carefully install each part whether its filters, belts, brakes, or batteries with precision and attention to detail. We guarantee perfect fitment, reliable performance, and durable results for every replacement, all at competitive prices with transparent service.',
    image: GantiSparepart,
  },
  {
    title: 'Full Service',
    description:
      'At Juugo Garage, we provide thorough full-service maintenance to keep your bike running at its best. Our experienced technicians perform a complete inspection and servicing of all essential systems, including engine, transmission, brakes, suspension, and electrical components. We change oils, replace filters, adjust chains, inspect tires, and tune carburetors or fuel injection systems using high-quality OEM or premium aftermarket parts. Whether its routine maintenance or performance tuning, we ensure your motorcycle gets precise care for smoother rides and longer engine life. Trust us for reliable, affordable service done right—visit us today and feel the difference in your bikes performance!.',
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
