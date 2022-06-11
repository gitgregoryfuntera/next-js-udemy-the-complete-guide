import React from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import { getEventById, getEvents } from "../../utils/getEventsHelper";
const SelectedEventPage = (props) => {
  const { event } = props;
  if (!event) {
    return (
      <>
        <ErrorAlert>
          <p>No Event Found</p>
        </ErrorAlert>
      </>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export const getStaticProps = async (context) => {
  const {
    params: { eventId },
  } = context;
  const event = await getEventById(eventId);
  return {
    props: {
      event,
    },
  };
};

export const getStaticPaths = async () => {
  const events = await getEvents();
  const pathsWithParams = events.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));
  return {
    paths: pathsWithParams,
    fallback: false,
  };
};

export default SelectedEventPage;
