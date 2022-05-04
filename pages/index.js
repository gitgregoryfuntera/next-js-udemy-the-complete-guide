import React from "react";
import EventList from "../components/events/event-list";
import EventsSearch from "../components/events/events-search";
import { getFeaturedEvents } from "../data/dummy-data";

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventsSearch />
      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;
