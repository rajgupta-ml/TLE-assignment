"use client";

import type React from "react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, Code } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { OmiitedStudents } from "@/api/studentApi";
import usePagination from "@/hooks/usePagination";

interface AddStudentPopupProps {
  onAddStudent: (student: OmiitedStudents) => void;
  open: boolean;
  setOpen: () => void;
}

const AddStudentPopup = ({
  onAddStudent,
  open,
  setOpen,
}: AddStudentPopupProps) => {
  const [formData, setFormData] = useState<OmiitedStudents>({
    name: "",
    email: "",
    phone_number: "",
    codeforceHandle: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone_number)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.codeforceHandle.trim()) {
      newErrors.codeforcesHandle = "Codeforces handle is required";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.codeforceHandle)) {
      newErrors.codeforcesHandle =
        "Handle can only contain letters, numbers, and underscores";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onAddStudent(formData);
      setFormData({
        name: "",
        email: "",
        phone_number: "",
        codeforceHandle: "",
      });
      setErrors({});
      setOpen();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          className="w-screen h-screen fixed inset-0 z-20 backdrop-blur-md bg-black/20 flex items-center justify-center"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          onClick={setOpen}
        >
          <motion.div
            className="sm:max-w-[500px] w-full max-w-lg mx-4"
            initial={{
              scale: 0.8,
              opacity: 0,
              y: 20,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
              y: 20,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[var(--card)] border-[var(--border)] rounded-lg p-6 shadow-xl">
              <div className="mb-6">
                <h2 className="text-[var(--card-foreground)] text-3xl font-bold mb-2">
                  New Student
                </h2>
                <p className="text-[var(--muted-foreground)]">
                  Enter the student's information to add them to the system.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                  >
                    <Label
                      htmlFor="name"
                      className="text-[var(--card-foreground)] font-semibold flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Enter student's full name"
                      className={`bg-[var(--background)] border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] ${
                        errors.name ? "border-[var(--destructive)]" : ""
                      }`}
                    />
                  </motion.div>
                  {errors.name && (
                    <p className="text-[var(--destructive)] text-sm">
                      {errors.name}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.25 }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <Label
                      htmlFor="email"
                      className="text-[var(--card-foreground)] font-semibold flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.35 }}
                  >
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="Enter email address"
                      className={`bg-[var(--background)] border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] ${
                        errors.email ? "border-[var(--destructive)]" : ""
                      }`}
                    />
                  </motion.div>
                  {errors.email && (
                    <p className="text-[var(--destructive)] text-sm">
                      {errors.email}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.45 }}
                  >
                    <Label
                      htmlFor="phone"
                      className="text-[var(--card-foreground)] font-semibold flex items-center gap-2"
                    >
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <Input
                      id="phone"
                      value={formData.phone_number}
                      onChange={(e) =>
                        handleInputChange("phone_number", e.target.value)
                      }
                      placeholder="Enter phone number"
                      className={`bg-[var(--background)] border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] ${
                        errors.phone ? "border-[var(--destructive)]" : ""
                      }`}
                    />
                  </motion.div>
                  {errors.phone && (
                    <p className="text-[var(--destructive)] text-sm">
                      {errors.phone}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.55 }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <Label
                      htmlFor="codeforcesHandle"
                      className="text-[var(--card-foreground)] font-semibold flex items-center gap-2"
                    >
                      <Code className="h-4 w-4" />
                      Codeforces Handle
                    </Label>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.65 }}
                  >
                    <Input
                      id="codeforcesHandle"
                      value={formData.codeforceHandle}
                      onChange={(e) =>
                        handleInputChange("codeforceHandle", e.target.value)
                      }
                      placeholder="Enter Codeforces handle"
                      className={`bg-[var(--background)] border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] ${
                        errors.codeforcesHandle
                          ? "border-[var(--destructive)]"
                          : ""
                      }`}
                    />
                  </motion.div>
                  {errors.codeforcesHandle && (
                    <p className="text-[var(--destructive)] text-sm">
                      {errors.codeforcesHandle}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  className="flex justify-end gap-3 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={setOpen}
                    className="border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--accent)] cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[var(--acet-blue)]/50 hover:bg-[var(--acet-blue)] cursor-pointer text-[var(--text-acet-blue)]"
                  >
                    Add Student
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddStudentPopup;
