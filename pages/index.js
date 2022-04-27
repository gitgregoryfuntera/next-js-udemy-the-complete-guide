import React from "react";
import EventList from "../components/event-list/event-list";
import { getFeaturedEvents } from "../data/dummy-data";

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;
