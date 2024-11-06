import React from "react";
import UserLayout from "../layouts/UserLayout";
import Destination from "../components/Destination"; // Import Destination Section

const DashboardUser = () => {
  return (
    <UserLayout>
      {/* Hero, Destination, and Experience sections */}
      <section className="px-8 py-16">
        <Destination />
      </section>
    </UserLayout>
  );
};

export default DashboardUser;
