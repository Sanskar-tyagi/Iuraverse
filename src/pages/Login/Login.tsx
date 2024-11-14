import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
  currentSession,
  handleSignInConfirmation,
  handleUserSignIn,
} from "@/services/amplify";
import { fetchUserAttributes, getCurrentUser, signOut } from "aws-amplify/auth";
import { useSearchParams } from "react-router-dom";
import { checkUser, getUser } from "@/hooks/useAddUser";
import { UserStore } from "../HomeLayout/UserStore";
import logo from "@/assets/BeingVakil.png";
export const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    moblie: "",
    otp: "",
  });
  console.log(searchParams.get("SignUp"));
  const [sendOTP, setSendOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const updateUser = UserStore((state) => state.setUser);
  const handleOnSubmit = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await handleUserSignIn({
        username: `+91${formData.moblie}`,
        options: { authFlowType: "CUSTOM_WITHOUT_SRP" },
      });
      if (data?.isSignedIn) {
        fetchData();
      }
      if (
        data?.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE"
      ) {
        setSendOTP(true);
        setIsLoading(false);
      }
    } catch (err) {
      setSendOTP(false);
      setFormData({ moblie: formData.moblie, otp: "" });
      console.log("Error:", err);
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const session = await currentSession();
      if (session.tokens) {
        if (session.tokens?.idToken) {
          const user = await fetchUserAttributes();
          const checkuserData = await checkUser(
            session.tokens?.idToken?.payload.sub
          );
          const userData = await getUser(checkuserData.data.id);
          updateUser({
            userRole: user["custom:role"] || " ",
            cognitoId: session.tokens?.idToken?.payload.sub || " ",
            userId: userData.data._id,
            // userId: "6727b3815e0057c7eff06422",
            userName: userData.data.name,
          });
        }
      } else {
        await signOut();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleOTPConfirm = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const data = await handleSignInConfirmation({
        challengeResponse: formData.otp,
      });
      if (data.nextStep.signInStep === "DONE") {
        fetchData();
      } else {
        console.log("Incorrect OTP");
        setIsLoading(false);
        setFormData({ moblie: formData.moblie, otp: "" });
        setSendOTP(false);
        setError("Incorrect OTP");
        setTimeout(() => {
          setError("");
        }, 2400);
      }
    } catch (error) {
      if (error instanceof Error) {
        setIsLoading(false);
        setSendOTP(false);
        setFormData({ moblie: formData.moblie, otp: "" });
        setError("Incorrect OTP");
        setTimeout(() => {
          setError("");
        }, 2400);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full lg:grid  lg:grid-cols-2  ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <img src={logo} className="w-52 ml-10  " alt="" />
            <h1 className="text-3xl -mt-12 -ml-12 font-bold">Welcome Back!</h1>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="moblie">Mobile No.</Label>
              <Input
                id="moblie"
                type="moblie"
                placeholder="Enter here"
                required
                value={formData.moblie}
                onChange={(e) =>
                  setFormData({ ...formData, moblie: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="otp">OTP</Label>
              </div>
              <Input
                placeholder="Enter here"
                id="otp"
                type="otp"
                disabled={!sendOTP}
                required
                value={formData.otp}
                onChange={(e) =>
                  setFormData({ ...formData, otp: e.target.value })
                }
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
            </div>

            {!sendOTP ? (
              <Button
                type="submit"
                disabled={isLoading}
                onClick={() => {
                  handleOnSubmit();
                }}
                className="w-full mt-8"
              >
                {isLoading ? "Loading..." : "Send OTP"}
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading}
                onClick={handleOTPConfirm}
                className="w-full mt-8"
              >
                {isLoading ? "Loading..." : "Verify OTP"}
              </Button>
            )}
          </div>
          {
            
          }
          <div className="mt-4 text-center text-sm">
            Don’t have an account with iuraverse?
            <a
              onClick={() => {
                setSearchParams([
                  ["SignUp", "true"],
                  ["step", "1"],
                ]);
              }}
              className="ml-2 text-primary font-semibold"
            >
              Join iuraverse
            </a>
          </div>
        </div>
      </div>
      <div className="hidden w-full h-full lg:block bg-[url('https://cdn.prod.website-files.com/5a9423a3f702750001758d4f/64ddbec690d3da8a292418d8_%20-%2012.png')]">
        <img
          src="https://png.pngtree.com/png-vector/20240820/ourmid/pngtree-realisitc-lady-justice-statue-png-image_13560893.png"
          alt="Image"
          className=" h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};
