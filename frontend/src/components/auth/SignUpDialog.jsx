import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Eye, EyeOff, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Root } from "@radix-ui/react-visually-hidden";
import { validateEmail, validatePassword } from "../utils/authHelpers";
import { signUp } from "../../api/auth";
import { toast } from "sonner";

// helper functions
const validateUsername = (username) => {
  return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
};

const validateFullName = (name) => {
  return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
};

const SignUpDialog = ({ open, onOpenChange, onSwitchToLogin }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    gender: "",
    dob: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // Reset form data and errors whenever the dialog opens
  useEffect(() => {
    if (open) {
      setStep(1);
      setFormData({
        email: "",
        fullName: "",
        gender: "",
        dob: "",
        username: "",
        password: "",
      });
      setErrors({});
    }
  }, [open]);

  // Helper function to map API errors to form fields
  const mapApiErrorsToFields = (apiErrors) => {
    const fieldErrors = {};

    apiErrors.forEach((error) => {
      switch (error.code) {
        case "DuplicateUserName":
          fieldErrors.username = error.description;
          break;
        case "DuplicateEmail":
          fieldErrors.email = error.description;
          break;
        default:
          break;
      }
    });

    return fieldErrors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleGenderChange = (value) => {
    setFormData((prev) => ({ ...prev, gender: value }));
    if (errors.gender) {
      setErrors((prev) => ({ ...prev, gender: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
    } else if (!validateFullName(formData.fullName)) {
      newErrors.fullName = "Invalid full name format";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (!validateUsername(formData.username)) {
      newErrors.username =
        "Username must be at least 3 characters and contain only letters, numbers, and underscores";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) {
      return;
    }

    setIsLoading(true);
    // signup logic here
    setErrors({}); // Clear previous errors

    try {
      const signUpData = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        fullName: formData.fullName,
        gender: formData.gender,
        dateOfBirth: formData.dob,
      };
      console.log("signUpData", signUpData);
      const response = await signUp(signUpData);
      console.log("error from SignUpDialog", response);

      // Add success toast notification
      toast.success("Account created successfully!", {
        description: "You can now log in with your credentials.",
        duration: 5000,
      });

      // Handle successful signup
      setIsLoading(false);
      onOpenChange(false); // Close the dialog
      onSwitchToLogin(); // Switch to login dialog
    } catch (error) {
      setIsLoading(false);
      // Handle specific API errors
      if (!error.succeeded && error.errors) {
        // Map API errors to form fields
        const fieldErrors = mapApiErrorsToFields(error.errors);

        // If we found field-specific errors, update the errors state
        if (Object.keys(fieldErrors).length > 0) {
          setErrors((prev) => ({ ...prev, ...fieldErrors }));
          // If the error is related to email and we're on step 2,
          // go back to step 1 to show the email error
          if (fieldErrors.email && step === 2) {
            setStep(1);
          }
        }
        // Add error toast notification
        toast.error(error.errors[0]?.description || "Registration failed");
      } else {
        // Handle unexpected error format
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  const handleLoginClick = () => {
    onOpenChange(false); // Close signup dialog
    onSwitchToLogin(); // Open login dialog
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="hidden sm:block hover:bg-primary/10">
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {step === 1 ? "Join ConnectMe Today" : "Create Your Account"}
          </DialogTitle>
          <DialogDescription>
            <Root>Signup Form</Root>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`bg-muted/50 ${
                    errors.email
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`bg-muted/50 ${
                    errors.fullName
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={handleGenderChange}
                >
                  <SelectTrigger
                    className={`bg-muted/50 ${
                      errors.gender ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-sm text-red-500">{errors.gender}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal bg-muted/50 ${
                        errors.dob ? "border-red-500 focus:ring-red-500" : ""
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dob
                        ? format(formData.dob, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dob}
                      onSelect={(selectedDate) => {
                        setFormData((prev) => ({ ...prev, dob: selectedDate }));
                        if (errors.dob) {
                          setErrors((prev) => ({ ...prev, dob: "" }));
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.dob && (
                  <p className="text-sm text-red-500">{errors.dob}</p>
                )}
              </div>

              <Button
                type="button"
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                onClick={handleNextStep}
              >
                Next Step
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  className={`bg-muted/50 ${
                    errors.username
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
                {errors.username && (
                  <p className="text-sm text-red-500">{errors.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={`bg-muted/50 ${
                    errors.password
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground hover:text-primary" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground hover:text-primary" />
                  )}
                </Button>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setStep(1);
                    setErrors({});
                  }}
                >
                  Back
                </Button>
              </div>
            </div>
          )}
        </form>

        <div className="mt-2 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button
            variant="link"
            className="p-0 h-auto font-semibold text-primary hover:text-primary/80"
            onClick={handleLoginClick}
          >
            Log In
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpDialog;
