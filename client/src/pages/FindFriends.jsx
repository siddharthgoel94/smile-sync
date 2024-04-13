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
            title: "Nitin Kumal",
            description: "Age 20, eager to talk with new people",
          },
          {
            title: "Manya Jain",
            description: "Age 25,a shy and reserved person",
          },
          {
            title: "Rohan das",
            description: "Age 30, suffering from relationship problems",
          },
          {
            title: "Tanya Saini",
            description: "Age 25, victim of domestic abuse",
          },
        ];
      case "Community 2":
        return [
          {
            title: "Vasu Yadav",
            description: "Age 18, Suffering from ptsd",
          },
          {
            title: "Sanya Sharma",
            description: "Age 30, Feeling of inferiority complex",
          },
        ];
      case "Community 3":
        return [
          {
            title: "Siddharth",
            description: "Age 20, career tension",
          },
          {
            title: "Sarvesh",
            description: "Age 21, Relationship problems",
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
              <button className="btn btn-primary">Have a chat with them</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindFriends;
