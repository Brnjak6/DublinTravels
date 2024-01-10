import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import styles from '../styles/Main.module.scss';
import { ItinerariesContext } from '../context/ItineraryContext';
import ItineraryDetails from '../components/ItineraryDetails';
import ItineraryForm from '../components/ItineraryForm';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { pageAnimation } from '../components/Animation';
import { ReactComponent as QuestionSVG } from '../img/question.svg';

function Account() {
  const { itineraries, dispatch } = useContext(ItinerariesContext);
  const { user } = useContext(AuthContext);
  const [isModalOn, setIsModalOn] = useState(false);
  const [wasModalOn, setWasModalOn] = useState(false);
  //Only if user is logged in, we display itineraries created by them in accounts route

  const closeModal = () => {
    setIsModalOn(false);
  };

  const openModal = () => {
    setIsModalOn(true);
  };

  useEffect(() => {
    const fetchItineraries = async () => {
      const res = await fetch(
        process.env.REACT_APP_BACKEND + '/api/itineraries/account',
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
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
      initial="hidden"
      animate="show"
      exit="exit"
    >
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
              The idea is to share when your event is happening and when should
              you take a flight to get to the event. The location, and the
              flight carrier should be included in the form. <br />
              With this information, users should have ideally an afforadble
              departing flight information and the cost of ticket included in
              the total price. It is on them to decide their return flight
              options.
            </p>
          </div>
        </div>
      )}
      <div className={styles.question} onClick={openModal}>
        <QuestionSVG />
      </div>
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
