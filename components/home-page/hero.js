import Image from "next/image";
import classes from "./hero.module.css";
import { FaGithub, FaEnvelope } from "react-icons/fa";
import ContactModal from "../contact/contact-modal";
import { useDisclosure } from "@chakra-ui/react";

export default function Hero() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <section className={classes.hero}>
      <div className={classes.container}>
        <div className={classes.content}>
          <h1>
            <span className={classes.highlight}>Have a nice day!</span>
          </h1>
          <p>this is my blog.</p>
          <div className={classes.social}>
            <a href='https://github.com/nnevia' target='_blank' rel='noopener noreferrer' aria-label='GitHub'>
              <FaGithub />
            </a>
            <a href='mailto:dbs00024@gmail.com' aria-label='Email'>
              <FaEnvelope />
            </a>
            <button onClick={onOpen} className={classes.contactButton} aria-label='Contact'>
              <FaEnvelope />
            </button>
          </div>
        </div>
        <div className={classes.imageWrapper}>
          <div className={classes.image}>
            <Image src='/images/site/OIG2.jpg' alt='Profile' width={300} height={300} priority />
          </div>
          <div className={classes.backdrop} />
        </div>
      </div>
      <ContactModal isOpen={isOpen} onClose={onClose} />
    </section>
  );
}
