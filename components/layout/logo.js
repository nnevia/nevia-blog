import Image from "next/image";
import classes from "./logo.module.css";

export default function Logo() {
  return (
    <div className={classes.logos}>
      <div className={classes.image}>
        <Image src='/images/site/OIG2.jpg' alt='Tennis' width={80} height={80} className='rounded-full object-cover' />
      </div>
      <div className={classes.logo}>Nevia's blog</div>
    </div>
  );
}
