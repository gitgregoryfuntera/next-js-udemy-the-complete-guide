import React from "react";
import { useRouter } from "next/router";
import { getEventById } from "../../data/dummy-data";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
const SelectedEventPage = () => {
  const router = useRouter();
  const {
    query: { eventId },
  } = router;
  const event = getEventById(eventId);
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

export default SelectedEventPage;
