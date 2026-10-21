
/*multiple countries with a customized dialog */
/*import React, { useState } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import { Button, Dropdown } from 'react-bootstrap';

const CountryDropdown = () => {
  const [selectedCountry, setSelectedCountry] = useState("INDIA");

  const countries = ["INDIA", "USA", "UK", "CANADA", "AUSTRALIA"];

  return (
    <Dropdown>
      <Dropdown.Toggle
        as={Button}
        className='countryDrop d-flex flex-column align-items-start ms-3 shadow-none'
      >
        <span className='label' style={{ fontSize: '11px', color: '#b9b9b9', textTransform: 'uppercase' }}>
          Your Location
        </span>

        <span className='name d-flex align-items-center w-100 fw-bold' style={{ color: '#233a95', fontSize: '15px' }}>
          {selectedCountry} <FaAngleDown className="ms-auto text-primary" />
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {countries.map((country, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => setSelectedCountry(country)}
          >
            {country}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CountryDropdown;*/




import React, { useState } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import { Button, Modal, ListGroup } from 'react-bootstrap';

const CountryDropdown = () => {
  const [show, setShow] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("INDIA");

  const countries = ["INDIA", "USA", "UK", "CANADA", "AUSTRALIA","Iran","jarmani"];

  const handleSelect = (country) => {
    setSelectedCountry(country);
    setShow(false);
  };

  return (
    <>
      <Button
        className='countryDrop d-flex flex-column align-items-start ms-3 shadow-none'
        onClick={() => setShow(true)}
      >
        <span className='label' style={{ fontSize: '11px', color: '#b9b9b9', textTransform: 'uppercase' }}>
          Your Location
        </span>

        <span className='name d-flex align-items-center w-100 fw-bold' style={{ color: '#233a95', fontSize: '15px' }}>
          {selectedCountry} <FaAngleDown className="ms-auto text-primary" />
        </span>
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Country</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ListGroup>
            {countries.map((country, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={() => handleSelect(country)}
              >
                {country}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CountryDropdown;
