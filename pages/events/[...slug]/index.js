import React from "react";
import { useRouter } from "next/router";
// import { getFilteredEvents } from "../../../data/dummy-data";
import get from "lodash/get";
import EventList from "../../../components/events/event-list";
import ErrorAlert from "../../../components/ui/error-alert";
import Button from "../../../components/ui/button";
import ResultsTitle from "../../../components/events/results-title";
import { getFilteredEvents } from "../../../utils/getEventsHelper";

const EventSlugPage = (props) => {
  const {
    hasError,
    events,
    date: { year, month },
  } = props;

  if (hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link={"/events"}>Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = events;

  const { length } = filteredEvents || [];

  if (!length) {
    return (
      <>
        <ErrorAlert>
          <p>No Events found for the choose filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link={"/events"}>Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(year, month - 1);
  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

export default EventSlugPage;

export const getServerSideProps = async (context) => {
  const {
    query: { slug },
  } = context;
  console.log(
    "🚀 ~ file: index.js ~ line 68 ~ getServerSideProps ~ slug",
    slug
  );

  const yearValue = get(slug, "[0]");
  const monthValue = get(slug, "[1]");

  const numYear = +yearValue;
  const numMonth = +monthValue;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
        // notFound: true // OOTB next show 404 page
        // redirect : { destination: '/error' } // show custom redirect destination page
      },
    };
  }

  const filteredEvents =
    (await getFilteredEvents({
      year: numYear,
      month: numMonth,
    })) || [];

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
};
