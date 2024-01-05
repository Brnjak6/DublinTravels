import React, { useContext, useState, useEffect } from 'react';
import styles from '../styles/Main.module.scss';
import { ItinerariesContext } from '../context/ItineraryContext';
import ItineraryDetails from '../components/ItineraryDetails';
import landingPic from '../img/front.jpg';
import { motion } from 'framer-motion';
import { pageAnimation } from '../components/Animation';

function Main() {
  const { itineraries, dispatch } = useContext(ItinerariesContext);
  const [avgCost, setAvgCost] = useState(0);
  const [isModalOn, setIsModalOn] = useState(false);
  const [wasModalOn, setWasModalOn] = useState(false);

  useEffect(() => {
    // We fetch all itineraries from the database
    const fetchItineraries = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_BACKEND + '/api/itineraries'
        );
        const data = await res.json();

        if (res.ok) {
          dispatch({ type: 'SET_ITINERARIES', payload: data });

          //Implementing logic for getting the average cost of all itineraries
          let accumulatedCost = 0;
          let costCount = 0;

          data.forEach((itinerary) => {
            accumulatedCost += itinerary.price;
            costCount++;
          });

          setAvgCost(accumulatedCost / costCount);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchItineraries();
  }, [dispatch]);

  useEffect(() => {
    const wasModalOn = localStorage.getItem('wasModalOn');

    if (!wasModalOn) {
      setTimeout(() => {
        setIsModalOn(true);
        localStorage.setItem('wasModalOn', 'true');
      }, 4000);
    }
  }, [wasModalOn]);

  const closeModal = () => {
    setIsModalOn(false);
  };

  if (!itineraries) {
    return <h3>Loading...</h3>;
  }
  return (
    <motion.div variants={pageAnimation} initial="hidden" animate="show">
      <div className={styles.container}>
        <div className={styles.landingContainer}>
          <div className={styles.landing}>
            <h2>Explore and Share</h2>
            <h1>Your City Break Adventures</h1>
            <h2>Inspire or Be Inspired with Captivating Event Ideas</h2>
          </div>
          <img src={landingPic} alt="landingPicture" />
        </div>
        <div className={styles.description}>
          <h4>
            Embark on a journey with our unique inspirations created by fellow
            users
          </h4>
          <h4>
            The total cost displayed on each itinerary includes both the event
            ticket and outbound flight
          </h4>
          <div className={styles.average_price}>
            <p>
              Average price: <span>€{avgCost.toFixed(0)}</span>{' '}
            </p>
          </div>
        </div>
        {itineraries &&
          itineraries.map((itinerary) => (
            <ItineraryDetails key={itinerary._id} itinerary={itinerary} />
          ))}
      </div>
      {isModalOn && (
        <div className={styles.modal}>
          <div className={styles.modal_window}>
            <button className={styles.close} onClick={closeModal}>
              x
            </button>
            <h3>Sign up and share your event idea</h3>
            <p>
              Once you are signed up, you can share the event details from your
              profile.
            </p>
            <p>
              The idea is to share departure/event date and price. The location,
              and the flight carrier should be included in the form. <br />
              These information should be clear enough for any user to avail of
              the great itinerary you have on your mind to share
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Main;
