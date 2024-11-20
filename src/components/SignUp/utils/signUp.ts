import { toast } from "@/hooks/use-toast";
import { checkUser } from "@/hooks/useAddUser";
import {
  handleSignInConfirmation,
  handleUserSignIn,
  handleUserSignUp,
} from "@/services/amplify";
import { getCurrentUser } from "aws-amplify/auth";

export const signUpWithOTP = async ({
  formData,
  setIsOpen,
}: {
  formData: any;
  setIsOpen: any;
}) => {
  try {
    const signUp = await handleUserSignUp({
      username: `+91${formData.moblie}`,
      password: "Temp8**01**12222@123",
      role: formData.role,
    });
  } catch (error) {
    if (error instanceof Error) {
      toast({
        variant: "destructive",
        title: error.message,
      });
    } else {
      console.log(String(error));
    }
    return;
  }
  const data = await handleUserSignIn({
    username: `+91${formData.moblie}`,
    options: { authFlowType: "CUSTOM_WITHOUT_SRP" },
  });
  if (data?.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE") {
    setIsOpen(true);
  }
};
