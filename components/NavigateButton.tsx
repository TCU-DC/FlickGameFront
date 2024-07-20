"use client";

import { useRouter } from "next/navigation";
import { animatePageOut } from "../animations";
import styles from "@/styles/button.module.scss";

interface NavigateButtonProps {
  to: string | "";
  label: string;
}

const NavigateButton: React.FC<NavigateButtonProps> = ({ to, label }) => {
  const router = useRouter();

  const handleClick = () => {
    animatePageOut(to, router);
  };

  return (
    <button type="button" onClick={handleClick} className={styles.button}>
      {/* <div className={styles.button__cloud1}></div>
      <div className={styles.button__cloud2}></div> */}
      <div className={styles.button__inner}>
        <span className={styles.button__text}>{label}</span>
        <div className={styles.button__pattern}></div>
      </div>
    </button>
  );
};

export default NavigateButton;
