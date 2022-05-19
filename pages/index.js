import React, { Fragment } from 'react';
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';

const HomePage = (props) => {
  return (
    <Fragment>
      <EventList items={props.events} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
      revalidate: 1800,
    },
  };
};

export default HomePage;
