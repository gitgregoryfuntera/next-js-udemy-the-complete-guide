import React, { useEffect, useState } from "react";
import EventList from "../components/events/event-list";
import EventsSearch from "../components/events/events-search";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getEvents, url, transformObjToArr } from "../utils/getEventsHelper";

const HomePage = (props) => {
  const { featuredEventsResponse } = props;
  const { data, error } = useSWR(url, (args) =>
    fetch(args).then((res) => res.json())
  );
  const [featuredEvents, setFeaturedEvents] = useState(featuredEventsResponse);

  useEffect(() => {
    if (data) {
      const tempFeaturedEvents = transformObjToArr(data);
      setFeaturedEvents(
        tempFeaturedEvents.filter((event) => event.isFeatured === true)
      );
    }
  }, [data]);

  const router = useRouter();

  const onSearch = (year, month) => {
    const path = `/events/${year}/${month}`;
    router.push(path);
  };

  if (!data && !featuredEvents) {
    return <>Loading...</>;
  }

  return (
    <div>
      <EventsSearch onSearch={onSearch} />
      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;

export const getServerSideProps = async () => {
  const response = await getEvents() || [];
  const featuredEventsResponse = response.filter(
    (event) => event.isFeatured === true
  );
  return {
    props: {
      featuredEventsResponse,
    },
  };
};
