import Image from "next/image";
import classes from "./hero.module.css";

export default function Hero() {
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
    </section>
  );
}
