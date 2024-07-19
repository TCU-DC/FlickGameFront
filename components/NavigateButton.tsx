"use client";

import { useRouter } from "next/navigation";

interface NavigateButtonProps {
  to: string | "";
  label: string;
}

const NavigateButton: React.FC<NavigateButtonProps> = ({ to, label }) => {
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

export default NavigateButton;
