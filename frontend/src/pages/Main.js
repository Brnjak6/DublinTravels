import React, { useContext, useState, useEffect } from 'react';
import styles from '../styles/Main.module.scss';
import { ItinerariesContext } from '../context/ItineraryContext';
import ItineraryDetails from '../components/ItineraryDetails';
import landingPic from '../img/front.jpg';
import { motion } from 'framer-motion';
import { pageAnimation } from '../components/Animation';
import { Chart } from 'react-google-charts';
import Footer from '../components/Footer';

function Main() {
  const { itineraries, dispatch } = useContext(ItinerariesContext);
  const [avgCost, setAvgCost] = useState(0);
  const [isModalOn, setIsModalOn] = useState(false);
  const [dataChart, setDataChart] = useState([['Carrier', 'Repetitions']]);

  let totalFlights = 0;

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
          const flightCarriers = [];

          data.forEach((itinerary) => {
            accumulatedCost += itinerary.price;
            costCount++;
            totalFlights++;
            const carrier = itinerary.carrier;

            const existingCarrier = flightCarriers.findIndex(
              (flight) => flight.carrier === carrier
            );

            if (existingCarrier !== -1) {
              flightCarriers[existingCarrier].count++;
            } else {
              flightCarriers.push({ carrier, count: 1 });
            }
          });

          flightCarriers.forEach((carrier) => {
            dataChart.push([carrier.carrier, carrier.count]);
          });

          const newChartData = flightCarriers.map(({ carrier, count }) => [
            carrier,
            count,
          ]);
          newChartData.unshift(['Carrier', 'Repetitions']);
          setDataChart(newChartData);
          setAvgCost(accumulatedCost / costCount);

          console.log(flightCarriers);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchItineraries();
  }, [dispatch]);

  const closeModal = () => {
    setIsModalOn(false);
  };

  const options = {
    pieHole: 0.4,
    is3D: false,
    colors: ['#121ea1', '#32a852', '#242323', '#a1911d'],
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
      <div className={styles.chart_text}>
        <h4>Distribution of flights by carrier</h4>
      </div>
      <div>
        {dataChart.length > 1 && (
          <Chart
            className={styles.chart}
            chartType="PieChart"
            data={dataChart}
            options={options}
            width="90%"
            height="300px"
          />
        )}
      </div>
      <Footer />
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
    </motion.div>
  );
}

export default Main;
