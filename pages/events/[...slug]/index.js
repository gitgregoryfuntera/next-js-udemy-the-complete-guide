import React from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../../data/dummy-data";
import get from "lodash/get";

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
    return <p>Invalid filter. Please adjust your values!</p>;
  }

  const filteredEvents =
    getFilteredEvents({
      year: numYear,
      month: numMonth,
    }) || [];

  const { length } = filteredEvents || [];

  if (!length) {
    return <p>No Events found for the choose filter</p>;
  }

  return <div>EventSlugPage Works!</div>;
};

export default EventSlugPage;
