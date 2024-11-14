import { AmplifyAuthConfig } from "./config";
import { Amplify } from "aws-amplify";
import {
  AuthError,
  ConfirmSignInInput,
  ResetPasswordOutput,
  SignInInput,
  autoSignIn,
  confirmResetPassword,
  fetchAuthSession,
  getCurrentUser,
  resendSignUpCode,
  resetPassword,
  signIn,
  signOut,
  signUp,
  confirmSignIn,
} from "aws-amplify/auth";

export function initiateAmplify() {
  Amplify.configure({
    Auth: {
      Cognito: AmplifyAuthConfig,
    },
  });
}

export async function handleUserSignIn({ username, options }: SignInInput) {
  try {
    const user = await signIn({
      username,
      options,
    });
    return user;
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      throw new Error(error.message);
    } else console.log("error", error);
  }
}

export async function handleSignOut() {
  console.log("signing out");
  try {
    await signOut();
    console.log("signed out");
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

export async function handleGlobalSignOut() {
  try {
    await signOut({ global: true });
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

export async function handleUserSignUp({
  username,
  password,
  role,
}: {
  username: string;
  password: string;
  role?: string;
}) {
  const { isSignUpComplete, userId, nextStep } = await signUp({
    username,
    password,
    options: {
      userAttributes: { "custom:role": role || "CUSTOMER" },
    },
  });

  return { isSignUpComplete, userId, nextStep };
}
export async function handleSignInConfirmation({
  challengeResponse,
}: ConfirmSignInInput) {
  try {
    const data = await confirmSignIn({
      challengeResponse,
    });
    return data;
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      throw new Error(error.message);
    } else throw new Error("Incorrect code");
  }
}

export async function handleSendConfirmationCode(username: string) {
  try {
    await resendSignUpCode({ username });
  } catch (err) {
    console.log("error resending code: ", err);
  }
}

export async function handleAutoSignIn() {
  try {
    const signInOutput = await autoSignIn();
    return signInOutput;
  } catch (error) {
    console.log(error);
  }
}

function handleResetPasswordNextSteps(output: ResetPasswordOutput) {
  const { nextStep } = output;
  switch (nextStep.resetPasswordStep) {
    case "CONFIRM_RESET_PASSWORD_WITH_CODE":
      const codeDeliveryDetails = nextStep.codeDeliveryDetails;
      console.log(
        `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
      );
      // Collect the confirmation code from the user and pass to confirmResetPassword.
      break;
    case "DONE":
      console.log("Successfully reset password.");
      break;
  }
}

export async function initiateForgotPassword(username: string) {
  try {
    const output = await resetPassword({ username });
    handleResetPasswordNextSteps(output);
  } catch (error) {
    console.log(error);
  }
}

export async function confirmForgotPassword(
  username: string,
  confirmationCode: string,
  newPassword: string
) {
  try {
    await confirmResetPassword({ username, confirmationCode, newPassword });
  } catch (error) {
    console.log(error);
  }
}

export async function currentSession() {
  try {
    const userSession = (await fetchAuthSession()) ?? {};
    return userSession;
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      throw new Error(error.message);
    } else throw new Error("Error fetching user session");
  }
}

export async function currentAuthenticatedUser() {
  try {
    const { username, userId, signInDetails } = await getCurrentUser();
    return { username, userId, signInDetails };
  } catch (err) {
    return { err };
  }
}
