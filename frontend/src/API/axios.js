import axios from "axios";
import { Buffer } from "buffer";
import localforage from "localforage";

const axiosInstance = axios.create({
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    console.log(error);
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      );
      return Promise.reject(error);
    }

    if (
      (error.response.status === 401 || error.response.status === 403) &&
      originalRequest.url === "/api/token/refresh"
    ) {
      return Promise.reject("SendLogin")
    }

    if (
      (error.response.data.code === "token_not_valid" && error.response.status === 401) 
      || error.response.status === 403
    ) {
      console.log("Refreshing tokens...");
      const refreshToken = await localforage.getItem("refresh_token");
      console.log("Access refresh tokens...");

      if (refreshToken !== undefined && refreshToken !== null) {
        console.log("Found refresh tokens...");
        const tokenParts = JSON.parse(
          Buffer.from(refreshToken.split(".")[1], "base64")
        );
        console.log(tokenParts);
        console.log("Found parts of token...");
        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);
        console.log("About to make request");

        if (tokenParts.exp > now) {
          console.log("Refresh tokens are not expired.");
          return axiosInstance
            .post("/api/token/refresh", { refresh: refreshToken })
            .then(async (response) =>  {
              await localforage.setItem("access_token", response.data.access);
              await localforage.setItem("refresh_token", response.data.refresh);

              axiosInstance.defaults.headers["Authorization"] =
                "JWT " + response.data.access;
              originalRequest.headers["Authorization"] =
                "JWT " + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          return Promise.reject("SendLogin")
        }
      } else {
        console.log("Refresh token not available.");
        return Promise.reject("SendLogin")
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;