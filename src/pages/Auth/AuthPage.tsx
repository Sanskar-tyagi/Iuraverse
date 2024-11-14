import { useEffect } from "react";
import Login from "../Login";
import SignUp from "../SignUp";
import { useSearchParams } from "react-router-dom";

export const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const ShowLogin = searchParams.get("SignUp");
  useEffect(() => {}, [ShowLogin]);

  return <>{!ShowLogin ? <Login /> : <SignUp />}</>;
};
