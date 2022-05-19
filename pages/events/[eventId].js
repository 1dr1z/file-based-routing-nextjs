import React, { Fragment } from 'react';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';

const EventDetails = (props) => {
  if (!props.selectedEvent) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <Fragment>
      <EventSummary title={props.selectedEvent.title} />
      <EventLogistics
        date={props.selectedEvent.date}
        address={props.selectedEvent.location}
        image={props.selectedEvent.image}
        eventAlt={props.selectedEvent.title}
      />
      <EventContent>
        <p>{props.selectedEvent.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const event = await getEventById(context.params.eventId);
  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      selectedEvent: event,
      revalidate: 30,
    },
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: 'blocking',
  };
};
export default EventDetails;
