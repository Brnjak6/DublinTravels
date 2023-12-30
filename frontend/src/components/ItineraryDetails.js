import React, { useContext, useState, useEffect } from 'react';
import styles from '../styles/Itinerary.module.scss';
import { ItinerariesContext } from '../context/ItineraryContext';
import { AuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { ReactComponent as PlaneSVG } from '../img/plane.svg';
import { ReactComponent as LocationSVG } from '../img/location.svg';
import { createClient } from 'pexels';

//All the logic and details of each itinerary card posted by any user
function ItineraryDetails({ itinerary }) {
  const { dispatch } = useContext(ItinerariesContext);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  let [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const formattedDeparture = new Date(itinerary.departure).toLocaleDateString();
const formattedEventDate = new Date(itinerary.eventDate).toLocaleDateString();
const client = createClient(process.env.REACT_APP_pexels);
let query = itinerary.location

  useEffect(() => {
    //Using external API to find an image of a city
    const fetchCityImage = async () => {
      try {
        //Using pexels npm to make the fetching cleaner. Once we verify my API code from .env file, we can search for an image and the query is a city coming from itinerary's insterted location
        client.photos.search({ query, per_page: 1 }).then(photos => {
          //by following the array of photos we can see where exactly is a link to a photo we need for our card and we put it in the imageData variable
        setImageData(photos.photos[0].src.medium);
        });

      } catch (error) {
        console.error('Error fetching city image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityImage();
  }, [itinerary.location]);

  const handleDelete = async () => {
    if (!user) {
      console.log('User not logged in');
      return;
    }

    //Navigating to the database and finding the right itinerary so we can delete it in the next step below
    const response = await fetch('/api/itineraries/' + itinerary._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      //We are accessing useContext and using itineraryContext logic to delete itinerary from database that matches the id from above search
      dispatch({ type: 'DELETE_ITINERARY', payload: data });
    }
  };

  return (
    <div className={styles.itinerary} key={itinerary._id}>
      <div className={styles.img_container}>
        {loading ? (
          <p>Loading image...</p>
        ) : (
          imageData && imageData ? (
              <div key={Math.random()}>
                <h3 className={styles.title}>{itinerary.eventName}</h3>
                <div className={styles.details}>
                  <p>Departure: {formattedDeparture}</p>
                  <p>Event: {formattedEventDate}</p>
                </div>
                <img
                  key={Math.random()}
                  src={imageData}
                  alt={'cityPhoto'}
                />
              </div>
            
          ) : (
            <div key={Math.random()}>
              <h3 className={styles.title}>{itinerary.eventName}</h3>
              <div className={styles.details}>
                <p>Departure: {formattedDeparture}</p>
                <p>Event: {formattedEventDate}</p>
              </div>
            </div>
          )
        )}
        <div className={styles.img_overlay}></div>
      </div>
      <div className={styles.location}>
        <LocationSVG />
        <p>{itinerary.location}</p>
      </div>
  
      <div className={styles.carrier}>
        <PlaneSVG />
        <p>{itinerary.carrier}</p>
  
        <p></p>
      </div>
  
      <h4 className={styles.createdBy}>By: {itinerary.username}</h4>
      <p></p>
      {location.pathname === '/account' ? (
        <button
          onClick={handleDelete}
          className={`${styles.btn} ${styles.delete}`}
        >
          delete
        </button>
      ) : (
        <div className={styles.price}>€{itinerary.price}</div>
      )}
    </div>
  );
}

export default ItineraryDetails;
