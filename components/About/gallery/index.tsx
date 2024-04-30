import styles from "./style.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
export default function Gallery({
  mousePosition,
  handle,
  text,
}: {
  mousePosition: any;
  handle: any;
  text: string;
}) {
  const { x, y } = mousePosition;

  return (
    <div className={styles.gallery}>
      <div className={styles.imageContainer}>
        <Image src={`/images/${handle}/background.jpg`} alt="image" fill />
      </div>
      <motion.div className={styles.vignette} style={{ x, y }}>
        <Image src={`/images/${handle}/1.jpg`} alt="image" fill />
        <h1 className={styles.text}>{text}</h1>
      </motion.div>
    </div>
  );
}
