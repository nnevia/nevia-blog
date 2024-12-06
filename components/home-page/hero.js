import Image from "next/image";
import classes from "./hero.module.css";
import { FaGithub, FaEnvelope } from "react-icons/fa";
import ContactModal from "../contact/contact-modal";
import { useDisclosure } from "@chakra-ui/react";
import { MdOutlineMessage } from "react-icons/md";

export default function Hero() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <section className={classes.hero}>
      <div className={classes.container}>
        <div className={classes.content}>
          <h1>
            <span className={classes.name}>Nevia's Blog</span>
            <p className={classes.description}>
              프론트엔드 블로그 <br /> 개인 기술 및 지식 저장소
            </p>
          </h1>
          <div className={classes.social}>
            <a
              href='https://github.com/nnevia'
              target='_blank'
              rel='noopener noreferrer'
              className={classes.socialLink}
              aria-label='GitHub'
            >
              <FaGithub />
              <span>GitHub</span>
            </a>
            <a href='mailto:dbs00024@gmail.com' className={classes.socialLink} aria-label='Email'>
              <FaEnvelope />
              <span>Email</span>
            </a>
            <button onClick={onOpen} className={classes.contactButton} aria-label='Contact'>
              <MdOutlineMessage />
              <span>Contact</span>
            </button>
          </div>
        </div>
        <div className={classes.imageWrapper}>
          <div className={classes.image}>
            <Image
              src='/images/site/fishsociety.jpg'
              alt='Profile'
              width={400}
              height={400}
              priority
              className={classes.profileImage}
            />
          </div>
          <div className={classes.backdrop} />
        </div>
      </div>
      <ContactModal isOpen={isOpen} onClose={onClose} />
    </section>
  );
}
