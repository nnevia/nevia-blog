import Head from "next/head";
import classes from "./about-form.module.css";
import { FaGithub, FaEnvelope } from "react-icons/fa";

export default function AboutForm() {
  return (
    <>
      <Head>
        <title>About Me</title>
        <meta name='description' content='About me and my blog.' />
      </Head>
      <section className={classes.about}>
        <p>
          이 블로그는 Next를 배우고 지식을 공유하기 위해 만들어졌습니다. <br />
          다양한 주제에 대한 글을 읽고, 제 경험을 나누고자 합니다.
        </p>
        <br />
        <br />
        <p>구본헌 • FrontEnd developer</p>
        <div className={classes.social}>
          <a
            href='https://github.com/nnevia'
            target='_blank'
            rel='noopener noreferrer'
            className={classes.socialLink}
            aria-label='GitHub'
          >
            <FaGithub />
          </a>
          <a href='mailto:dbs00024@gmail.com' className={classes.socialLink} aria-label='Email'>
            <FaEnvelope />
          </a>
        </div>
      </section>
    </>
  );
}
