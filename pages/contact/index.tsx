import Head from "next/head";
import ContactForm from "../../components/contact/contact-form";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Me</title>
        <meta name='description' content='Contact me for any inquiries or questions.' />
      </Head>
      <ContactForm />
    </>
  );
}
