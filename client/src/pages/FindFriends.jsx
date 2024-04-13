import React, { useState, useEffect } from "react";
import "./FindFriends.css"; // Import the CSS file

const FindFriends = () => {
  const [selectedCommunity, setSelectedCommunity] = useState("Community 1");
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch activities data for the selected community
    const fetchActivities = async () => {
      // Mock API call (replace with actual fetch logic)
      // Example: Fetch activities data based on the selected community
      const response = await fetchActivitiesForCommunity(selectedCommunity);
      setActivities(response);
    };

    fetchActivities();
  }, [selectedCommunity]);

  // Function to fetch activities data for a given community (replace with actual fetch logic)
  const fetchActivitiesForCommunity = async (communityName) => {
    // Mock activities data based on community name
    switch (communityName) {
      case "Community 1":
        return [
          {
            title: "Activity 1 for Community 1",
            description: "Description of Activity 1...",
          },
          {
            title: "Activity 2 for Community 1",
            description: "Description of Activity 2...",
          },
        ];
      case "Community 2":
        return [
          {
            title: "Activity 1 for Community 2",
            description: "Description of Activity 1...",
          },
          {
            title: "Activity 2 for Community 2",
            description: "Description of Activity 2...",
          },
        ];
      case "Community 3":
        return [
          {
            title: "Activity 1 for Community 3",
            description: "Description of Activity 1...",
          },
          {
            title: "Activity 2 for Community 3",
            description: "Description of Activity 2...",
          },
        ];
      default:
        return [];
    }
  };

  // Event handler for selecting a community
  const handleCommunitySelect = (communityName) => {
    setSelectedCommunity(communityName);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar (Channels) */}
      <div className="sidebar">
        <h2>Cluster Communities</h2>
        <ul className="channel-list">
          <li
            className={
              selectedCommunity === "Community 1" ? "channel active" : "channel"
            }
            onClick={() => handleCommunitySelect("Community 1")}
          >
            Community 1
          </li>
          <li
            className={
              selectedCommunity === "Community 2" ? "channel active" : "channel"
            }
            onClick={() => handleCommunitySelect("Community 2")}
          >
            Community 2
          </li>
          <li
            className={
              selectedCommunity === "Community 3" ? "channel active" : "channel"
            }
            onClick={() => handleCommunitySelect("Community 3")}
          >
            Community 3
          </li>
          {/* Add more community channels dynamically */}
        </ul>
      </div>

      {/* Main Content (Activities) */}
      <div className="main-content">
        <div className="channel-header">
          <h2>{selectedCommunity}</h2>
        </div>
        <div className="activities-list">
          {activities.map((activity, index) => (
            <div className="activity" key={index}>
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindFriends;
