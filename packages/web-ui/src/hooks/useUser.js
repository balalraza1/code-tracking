import { useState, useEffect } from "react";
import { getUserData } from "../api/channel";

const useUser = () => {
  const [userData, setUserData] = useState();
  return { userData, setUserData };
};

export default useUser;
