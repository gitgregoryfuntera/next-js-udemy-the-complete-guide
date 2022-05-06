import React from "react";
import EventList from "../components/events/event-list";
import EventsSearch from "../components/events/events-search";
import { getFeaturedEvents } from "../data/dummy-data";
import { useRouter } from "next/router";
const HomePage = () => {
  const featuredEvents = getFeaturedEvents();
  const router = useRouter();
  const onSearch = (year, month) => {
    const path = `/events/${year}/${month}`;
    router.push(path);
  };
  return (
    <div>
      <EventsSearch onSearch={onSearch} />
      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;
