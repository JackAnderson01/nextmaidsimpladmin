export const verifyToken = async (token) => {
  try {
    const response = await fetch("/api/verifyToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Token verification failed");
      return null;
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

export const apiRequest = async (url, method = "GET", data = null) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.error("API request failed");
      throw new Error("API request failed");
    }
  } catch (error) {
    console.error("API request failed:", error);
    throw new Error("API request failed");
  }
};

export const setToken = (token, email, type) => {
  localStorage.setItem("token", token);
  localStorage.setItem("email", email);
  localStorage.setItem("type", type)
};
