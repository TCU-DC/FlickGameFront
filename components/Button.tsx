"use client";

import { useRouter } from "next/navigation";

interface ButtonProps {
  to: string | "";
  label: string;
}

const Button: React.FC<ButtonProps> = ({ to, label }) => {
  const router = useRouter();

  const navigateTo = () => {
    router.push("/" + to);
  };

  return (
    <button type="button" onClick={navigateTo}>
      {label}
    </button>
  );
};

export default Button;
