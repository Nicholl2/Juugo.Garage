import React from 'react';
import './HeroSection.css';
import logo from '../../assets/logo1.png';

const HeroSection = ({ onClick }) => {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1>Welcome to our Garage</h1>
        <p>Your one-stop shop for all motorcycle needs</p>
        <button onClick={onClick}>Explore</button>
      </div>
      <div className="hero-right">
        <div className="logo-with-text">
          <img src={logo} alt="Juugo Logo" />
          <div className="logo-text">
            {/*<h3>GARAGE</h3> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


// import React from 'react';
// import './HeroSection.css';
// import logo from '../../assets/logo.png';

// const HeroSection = ({ onClick }) => {
//   return (
//     <section className="hero">
//       <div className="hero-left">
//         <h1>Welcome to our Garage</h1>
//         <p>Your one-stop shop for all motorcycle needs</p>
//         <button onClick={onClick}>Explore</button>
//       </div>
//       <div className="hero-right">
//         <img src={logo} alt="Juugo Logo" />
//         <h3>GARAGE</h3>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
