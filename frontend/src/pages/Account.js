import React, { useContext } from 'react';
import { useEffect } from 'react';
import styles from '../styles/Main.module.scss';
import { ItinerariesContext } from '../context/ItineraryContext';
import ItineraryDetails from '../components/ItineraryDetails';
import ItineraryForm from '../components/ItineraryForm';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { pageAnimation } from '../components/Animation'

function Account() {
  const { itineraries, dispatch } = useContext(ItinerariesContext);
  const { user } = useContext(AuthContext);

  //Only if user is logged in, we display itineraries created by them in accounts route
  useEffect(() => {
    const fetchItineraries = async () => {
      const res = await fetch('/api/itineraries/account', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        dispatch({ type: 'SET_ITINERARIES', payload: data });
      }
    };

    if (user) {
      fetchItineraries();
    }
  }, [dispatch, user]);

 
  return (
    <motion.div
    variants={pageAnimation}
    initial='hidden'
    animate='show'
    exit='exit'
>
    <div className={styles.container}>
              <ItineraryForm />
      <div className={styles.itineraries}>
        {itineraries &&
          itineraries.map((itinerary) => (
            <ItineraryDetails key={itinerary._id} itinerary={itinerary} />
          ))}
      </div>
    </div>
    </motion.div>
  );
}

export default Account;
