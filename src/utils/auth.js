// DEMO ONLY - no real authentication happens here.
// Replace the body of this function with a call to your backend, for example:
//
//   const res = await fetch("/api/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });
//   if (!res.ok) throw new Error("Invalid email or password.");
//   return res.json(); // e.g. { email, token }
export async function loginRequest(email, password) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Enter a valid email address.");
  if (password.length < 6) throw new Error("Password must be at least 6 characters.");
  return { email };
}

// DEMO ONLY - replace with a call to your backend's sign-up endpoint.
export async function signupRequest(email, password) {
  return loginRequest(email, password);
}