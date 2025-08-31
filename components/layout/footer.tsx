import classes from "./footer.module.css";
import { FaGithub, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.info}>
        <p>© 2024 My Blog. All rights reserved.</p>
        <p></p>
        <p>
          Powered by <strong>Next.js</strong> & <strong>Vercel</strong>
        </p>
      </div>
      <div className={classes.icons}>
        <a href='https://github.com/nnevia' target='_blank' rel='noopener noreferrer' aria-label='GitHub'>
          <FaGithub className={classes.icon} />
        </a>
        <a href='mailto:dbs00024@gmail.com' aria-label='Email'>
          <FaEnvelope className={classes.icon} />
        </a>
      </div>
    </footer>
  );
}
