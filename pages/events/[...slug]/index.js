import React from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../../data/dummy-data";
import get from "lodash/get";
import EventList from "../../../components/events/event-list";
import ErrorAlert from "../../../components/ui/error-alert";
import Button from "../../../components/ui/button";
import ResultsTitle from "../../../components/events/results-title";

const EventSlugPage = () => {
  const router = useRouter();
  const {
    query: { slug },
  } = router;

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

  const filteredEvents =
    getFilteredEvents({
      year: numYear,
      month: numMonth,
    }) || [];

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

  const date = new Date(numYear, numMonth - 1);
  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

export default EventSlugPage;
