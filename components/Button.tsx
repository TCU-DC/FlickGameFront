"use client";

import { useRouter } from "next/navigation";

interface ButtonProps {
  to: string | "";
  label: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ to, label, onClick }) => {
  const router = useRouter();

  const navigateTo = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      router.push("/" + to);
    }
  };

  return (
    <button type="button" onClick={navigateTo}>
      {label}
    </button>
  );
};

export default Button;
