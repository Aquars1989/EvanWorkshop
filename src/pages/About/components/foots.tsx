import style from "../index.module.css";
import { motion } from "framer-motion";

const cardVariants = {
  offscreen: {
    opacity: 0,
    y: 80,
  },
  onscreen: {
    y: 0,
    opacity: 1,
  },
};

export function Foot1L() {
  return (
    <motion.div
      className={style.foot +" "+style.left_1}
      initial="offscreen"
      whileInView="onscreen"
      transition={{ duration: 1.5 }}
      viewport={{ once: false, amount: 0 }}
      variants={cardVariants}
    ></motion.div>
  );
}

export function Foot1R() {
  return (
    <motion.div
      className={style.foot +" "+style.right_1}
      initial="offscreen"
      whileInView="onscreen"
      transition={{ duration: 1.5 }}
      viewport={{ once: false, amount: 0 }}
      variants={cardVariants}
    ></motion.div>
  );
}

export function Foot2L() {
  return (
    <motion.div
      className={style.foot +" "+style.left_2}
      initial="offscreen"
      whileInView="onscreen"
      transition={{ duration: 1.5 }}
      viewport={{ once: false, amount: 0 }}
      variants={cardVariants}
    ></motion.div>
  );
}

export function Foot2R() {
  return (
    <motion.div
      className={style.foot +" "+style.right_2}
      initial="offscreen"
      whileInView="onscreen"
      transition={{ duration: 1.5 }}
      viewport={{ once: false, amount: 0 }}
      variants={cardVariants}
    ></motion.div>
  );
}

export function Foot3L() {
  return (
    <motion.div
      className={style.foot +" "+style.left_3}
      initial="offscreen"
      whileInView="onscreen"
      transition={{ duration: 1.5 }}
      viewport={{ once: false, amount: 0 }}
      variants={cardVariants}
    ></motion.div>
  );
}

export function Foot3R() {
  return (
    <motion.div
      className={style.foot +" "+style.right_3}
      initial="offscreen"
      whileInView="onscreen"
      transition={{ duration: 1.5 }}
      viewport={{ once: false, amount: 0 }}
      variants={cardVariants}
    ></motion.div>
  );
}
