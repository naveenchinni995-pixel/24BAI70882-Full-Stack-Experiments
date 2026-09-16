// src/utils/token.js

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");

  // If no token exists, return null
  if (!token) {
    return null;
  }

  try {
    // Split the JWT into Header.Payload.Signature
    const payload = token.split(".")[1];

    // Decode the payload
    const decodedPayload = JSON.parse(atob(payload));

    return decodedPayload;
  } catch (error) {
    console.error("Invalid Token:", error);
    return null;
  }
};