import React, { useContext, useState, useEffect } from 'react';
import styles from '../styles/Form.module.scss';
import { ItinerariesContext } from '../context/ItineraryContext';
import { AuthContext } from '../context/AuthContext';

//All the code and logic for the form user fills when they want to insert their own itinerary card
function ItineraryForm() {
  const { dispatch } = useContext(ItinerariesContext);
  const { user } = useContext(AuthContext);
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [carrier, setCarrier] = useState('');
  const [departure, setDeparture] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [price, setPrice] = useState('');
  const [username, setUsername] = useState('');

  const flightCarriers = [
    'Aer Lingus',
    'Ryanair',
    'British Airways',
    'Lufthansa',
    'Emirates',
    'Air France',
    'KLM Royal Dutch Airlines',
    'Turkish Airlines',
    'Qatar Airways',
    'Norwegian Air',
  ];

  const handleCarrierChange = (e) => {
    setCarrier(e.target.value);
  };

  useEffect(() => {
    //We need username to post an itinerary. Therefore, we get the username from useContext and put it in a variable for easier access
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    //Once an user creates itinerary, they submit it by the submit button and below logic sends it to the database
    e.preventDefault();
    if (!user) {
      console.log('User not logged in');
      return;
    }

    const itinerary = {
      eventName,
      location,
      price,
      username,
      carrier,
      departure: new Date(departure),
      eventDate: new Date(eventDate),
    };

    //We take all user input information into above constant and below we use post method to send it to database
    const response = await fetch('/api/itineraries', {
      method: 'POST',
      body: JSON.stringify(itinerary),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await response.json();

    //We reset local information for next itinerary to be empty and the current data from const data is being dispatched to useContext and the logic for creating itinerary is being processed
    if (response.ok) {
      setEventName('');
      setLocation('');
      setPrice('');
      setCarrier('');
      setDeparture('');
      setEventDate('');
      dispatch({ type: 'CREATE_ITINERARY', payload: data });
    } else {
      console.log(data.error);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2>Add your event itinerary</h2>

      <label>Event name:</label>
      <input
        type="text"
        onChange={(e) => setEventName(e.target.value)}
        value={eventName}
        maxLength={30}
      />

      <label>City:</label>
      <input
        type="text"
        onChange={(e) => setLocation(e.target.value)}
        value={location}
        maxLength={18}
      />
      <div className={styles.selection}>
        <label>Flight Carrier:</label>
        <select value={carrier} onChange={handleCarrierChange}>
          <option value="">Select One</option>
          {flightCarriers.map((carrier) => (
            <option key={carrier} value={carrier}>
              {carrier}
            </option>
          ))}
        </select>
      </div>
      <label>Departure Date:</label>
      <input
        type="date"
        onChange={(e) => setDeparture(e.target.value)}
        value={departure}
      />
      <label>Event Date:</label>
      <input
        type="date"
        onChange={(e) => setEventDate(e.target.value)}
        value={eventDate}
      />
      <label>Price:</label>
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <button className={styles.btn}>Submit itinerary</button>
    </form>
  );
}

export default ItineraryForm;
