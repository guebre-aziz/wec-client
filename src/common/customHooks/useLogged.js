import { useState, useEffect } from "react";
import { getCookie } from "../cookieMngr";

export const useLogged = () => {
  const [state, setState] = useState(null);
  const username = getCookie("username");
  const jwt = getCookie("jwt");
  const userId = getCookie("userId");

  useEffect(() => {
    if (username && jwt && userId) {
      setState(true);
    } else {
      setState(false);
    }
  }, [username, jwt, userId]);

  return state;
};
