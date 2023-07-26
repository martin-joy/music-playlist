import { useEffect, useState } from "react";

const useProtectedRoute = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const user_id = localStorage?.getItem("userId");
  const access_token = localStorage?.getItem("token");
  useEffect(() => {
    if (access_token) {
      setIsAuthorized(access_token);
    }
  }, [access_token]);

  return isAuthorized;
};

export default useProtectedRoute;
