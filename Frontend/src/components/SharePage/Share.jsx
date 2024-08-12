import React from 'react'
import { FaWhatsapp } from "react-icons/fa";
import { LiaTelegramPlane } from "react-icons/lia";
import { FaInstagram } from "react-icons/fa";
import styles from "./Share.module.scss";
import clsx from "clsx";

const handleWhatsAppShare = () => {
    const shareUrl = encodeURIComponent(window.location.href);
    const subscription = encodeURIComponent("Посмотрите это нашей новой афиши!");
    const whatsappUrl = `whatsapp://send?text=${subscription}%20${shareUrl}`;
    window.open(whatsappUrl, "_blank");
    console.log("shareUrl:", shareUrl);
    console.log("whatsappUrl:", whatsappUrl);
    console.log("subscription:", subscription);
  };
  
  const handleTelegramShare = () => {
    const shareUrl = encodeURIComponent(window.location.href);
    const subscription = encodeURIComponent("Посмотрите это нашей новой афиши!");
    const telegramUrl = `https://t.me/share/url?url=${shareUrl}&text=${subscription}`;
    window.open(telegramUrl, "_blank");
  };
  
  const handleInstagramShare = () => {
    const shareUrl = encodeURIComponent(window.location.href);
    const instagramUrl = `https://www.instagram.com/share?url=${shareUrl}`;
    window.open(instagramUrl, "_blank");
  };

export const Share = () => {
  return (
    <div className={styles.wrapper}>
    <span className={styles.shareText}>Поделиться:</span>
    <div className={styles.shareIcons}>
      <FaWhatsapp
        size={25}
        color="white"
        className={clsx(styles.share)}
        onClick={handleWhatsAppShare}
      />
      <LiaTelegramPlane
        color="white"
        className={clsx(styles.share)}
        onClick={handleTelegramShare}
      />
      <FaInstagram
        color="white"
        className={clsx(styles.share)}
        onClick={handleInstagramShare}
      />
    </div>
  </div>
  )
}

