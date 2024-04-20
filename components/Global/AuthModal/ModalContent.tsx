import React, { useContext } from "react";

import { ForgotPassword } from "./ForgotPassword";
import { SignInContent } from "./SignInContent";
import { AuthModelContext } from "./AuthModal";
import { SignUpContent } from "./SignUpContent";

export default function ModalContent() {
  const { modalType: type } = useContext(AuthModelContext);
  
  switch (type) {
    case "signIn":
      return <SignInContent />;
    case "signUp":
      return <SignUpContent />;
    case "forgotPassword":
      return <ForgotPassword />;
  }
}
