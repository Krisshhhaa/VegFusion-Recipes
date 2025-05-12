import React, { useContext, useState } from 'react';
import { AppContext } from '../context/App_Context';

const Profile = () => {
  const { user, userRecipe } = useContext(AppContext);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <>
      {/* User Info Section */}
      <div style={styles.profileContainer}>
        <h1 style={styles.heading}>Welcome, {user?.name || "Guest"} 👋</h1>
        <h2 style={styles.email}>{user?.gmail || "Email not available"}</h2>
      </div>

      {/* User Recipes Section */}
      <div style={styles.recipeContainer}>
        <h2 style={styles.sectionTitle}>Your Recipes</h2>
        <div style={styles.recipeGrid}>
          {userRecipe?.map((data, index) => (
            <div
              key={data?._id}
              style={{
                ...styles.card,
                ...(hoveredCard === index ? styles.cardHover : {}),
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <img src={data?.imgurl} alt="Recipe" style={styles.image} />
              <h5 style={styles.title}>{data?.title}</h5>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Styling
const styles = {
  profileContainer: {
    textAlign: "center",
    padding: "30px 20px",
    background: "linear-gradient(135deg, #E8F5E9, #C8E6C9)", // Soft green background
    borderRadius: "12px",
    margin: "20px auto",
    maxWidth: "80%",
    boxShadow: "0px 5px 12px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "30px",
    fontWeight: "600",
    color: "#1B5E20", // Deep Green
    marginBottom: "8px",
  },
  email: {
    fontSize: "18px",
    color: "#2E7D32", // Medium green
    fontWeight: "500",
  },
  recipeContainer: {
    padding: "40px 20px",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: "20px",
  },
  recipeGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    textAlign: "center",
    width: "250px",
    cursor: "pointer",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)", // Stronger shadow on hover
  },
  image: {
    width: "100%",
    height: "180px",
    borderRadius: "8px",
    objectFit: "cover",
    border: "3px solid #FFB300", // Warm yellow border for highlight
  },
  title: {
    color: "#1B5E20", // Deep green
    marginTop: "10px",
    fontWeight: "600",
    fontSize: "16px",
  },
};

export default Profile;
