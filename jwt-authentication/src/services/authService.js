// src/services/authService.js

export const authenticateUser = (username, password) => {
 const validUser = {
  username: "24BAI70882",
  password: "Naveen@123",
  email: "24bai70882@cumail.in",
  role: "Administrator",
};
  if (
    username === validUser.username &&
    password === validUser.password
  ) {
    // JWT Header
    const header = btoa(
      JSON.stringify({
        alg: "HS256",
        typ: "JWT",
      })
    );

    // JWT Payload
    const payload = btoa(
      JSON.stringify({
        username: validUser.username,
        email: validUser.email,
        role: validUser.role,
      })
    );

    // Fake Signature
    const signature = btoa("jwt-signature");

    // Create Fake JWT Token
    return `${header}.${payload}.${signature}`;
  }

  return null;
};