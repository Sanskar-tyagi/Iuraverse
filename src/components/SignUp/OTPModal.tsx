import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  handleSignInConfirmation,
  handleUserSignIn,
  handleUserSignUp,
} from "@/services/amplify";
import { getCurrentUser } from "aws-amplify/auth";
import { checkUser, useAddUser } from "@/hooks/useAddUser";
import { toast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";
import { signUpWithOTP } from "./utils/signUp";

export const OTPModal = ({
  formData,
  setForm,
}: {
  formData: any;
  setForm: any;
}) => {
  const [IsLoadingLogin, setIsLoadingLogin] = useState(false);
  const [IsIncorrectOTP, setIsIncorrectOTP] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const handleOTPConfirm = async (e: any) => {
    e.preventDefault();
    setIsLoadingLogin(true);
    try {
      const data = await handleSignInConfirmation({
        challengeResponse: otp,
      });
      if (data.nextStep.signInStep === "DONE") {
        const { userId } = await getCurrentUser();
        if (userId) {
          setIsLoadingLogin(false);
          setIsOpen(false);
          try {
            const user = await checkUser(userId);
            console.log(user, "existing");
            // const existingPhone=await checkUserWithPhone(formData.moblie);
          } catch (error) {
            const addUser = await useAddUser({
              contactNumber: formData.moblie,
              email: formData.email,
              name: formData.username,
              cognitoID: userId,
            });
            console.log(addUser, "addUser");
          }
          setIsOpen(false);
          setSearchParams([
            ["SignUp", "true"],
            ["step", "2"],
          ]);
          setForm(1);
        }
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: (
            <>
              <div>Incorrect OTP</div>
              <div>Please try again</div>
            </>
          ),
        });
        setIsIncorrectOTP(true);
        setIsLoadingLogin(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        setIsIncorrectOTP(true);
        setIsLoadingLogin(false);
        toast({
          variant: "destructive",
          title: "Error",
          description: (
            <>
              <div>Incorrect OTP</div>
              <div>Please try again</div>
            </>
          ),
        });
      }
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const [otp, setOtp] = useState("");
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            signUpWithOTP({ formData, setIsOpen });
          }}
          disabled={
            !formData.moblie ||
            !formData.username ||
            !formData.role ||
            IsLoadingLogin
          }
          className="bg-primary"
        >
          Send OTP
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>OTP</DialogTitle>
          <DialogDescription>
            Please enter the OTP sent to your mobile number
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <input
              className="border"
              type="otp"
              value={otp}
              max={6}
              onChange={(e) => setOtp(e.target.value)}
            />
            {IsIncorrectOTP && (
              <div className="flex flex-col">
                <div className="col-span-4 text-sm text-red-500">
                  Incorrect OTP. Please try again
                </div>
              </div>
            )}
            <Button
              onClick={(e) => {
                setIsIncorrectOTP(false);
                handleOTPConfirm(e);
              }}
              disabled={!IsIncorrectOTP}
            >
              Resend OTP
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleOTPConfirm} disabled={!otp || otp.length < 6}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
