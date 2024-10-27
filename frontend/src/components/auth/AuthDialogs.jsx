import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import LoginDialog from "./LoginDialog";
import SignUpDialog from "./SignUpDialog";

// Parent component to manage both dialogs
const AuthDialogs = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <>
      {/* Login Dialog Trigger */}
      <Button
        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground"
        onClick={() => setLoginOpen(true)}
      >
        Log In
      </Button>

      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSwitchToSignup={() => {
          setSignupOpen(true);
        }}
      />

      <SignUpDialog
        open={signupOpen}
        onOpenChange={setSignupOpen}
        onSwitchToLogin={() => {
          setLoginOpen(true);
        }}
      />
    </>
  );
};

export default AuthDialogs;
