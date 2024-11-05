import Image from "next/image";
import classes from "./hero.module.css";

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src='/images/site/OIG2.jpg' alt='Tennis' width={300} height={300} />
      </div>
      <h1>Hi, I'm nevia</h1>
      <p>this is blog</p>
    </section>
  );
}
