import { useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import { currentSession } from "@/services/amplify";
import { fetchUserAttributes, signOut } from "aws-amplify/auth";
import { AuthPage } from "../Auth/AuthPage";
import { Toaster } from "@/components/ui/toaster";
import { UserStore } from "./UserStore";
import { checkUser, getUser } from "@/hooks/useAddUser";
import LoaderMain from "@/atoms/Loaders/LoaderMain";
import { checkUserFormData } from "./utils/ValidateUser";

export const HomeLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchParams] = useSearchParams();
  const hasNotSignedUp = searchParams.get("step") === "3";
  const updateUser = UserStore((state) => state.setUser);
  const user = UserStore((state) => state.user);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      try {
        const data = await currentSession();
        if (data.tokens) {
          if (data.tokens?.idToken && !hasNotSignedUp) {
            setIsAuthenticated(true);
            const user = await fetchUserAttributes();
            const checkuserData = await checkUser(
              data.tokens?.idToken?.payload.sub
            );
            const userData = await getUser(checkuserData.data.id);
            const formLevel = checkUserFormData(userData.data);
            if (formLevel === 0) {
              setIsAuthenticated(false);
              // await signOut();
            }
            updateUser({
              userRole: user["custom:role"] || " ",
              cognitoId: data.tokens?.idToken?.payload.sub || " ",
              userId: userData.data._id,
              // userId: "6727b3815e0057c7eff06422",
              userName: userData.data.name,
            });
          } else {
            setIsAuthenticated(false);
            await signOut();
          }
        }
      } catch (error) {
        console.error("Error:", error);
        setIsAuthenticated(false);
        await signOut();
      }
      setIsloading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [updateUser, user]);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center h-screen items-center">
          <LoaderMain />
        </div>
      ) : (
        <>
          {isAuthenticated ? (
            <div className="grid min-h-screen w-full md:grid-cols-[190px_1fr] ">
              <Sidebar />
              <div className="flex flex-col">
                <Navbar />
                <main className="flex flex-1 flex-col gap-4 p-3 lg:gap-6 lg:p-4 bg-[#F1F1F1]">
                  <Outlet />
                </main>
              </div>
            </div>
          ) : (
            <AuthPage />
          )}
          <Toaster />
        </>
      )}
    </>
  );
};
