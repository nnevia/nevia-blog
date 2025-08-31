import { useEffect, useState } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

async function sendContactData(contactDetails: { email: string; name: string; message: string }) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contactDetails),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "문제가 생겼어요 !");
  }
}

export default function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState<"pending" | "success" | "error" | null>();
  const [requestError, setRequestError] = useState<string | null>();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendMessageHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setRequestStatus("pending");

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setRequestStatus("success");
      setEnteredEmail("");
      setEnteredMessage("");
      setEnteredName("");
    } catch (error: any) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  }

  let notification:
    | { status: "pending" | "success" | "error"; title: string; message: string | null | undefined }
    | undefined;
  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "메시지 전송 중...",
      message: "메시지 전송 중",
    };
  }
  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "성공!",
      message: "메시지가 성공적으로 전송되었습니다 ! !",
    };
  }
  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "실패",
      message: requestError,
    };
  }
  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input
              type='email'
              id='email'
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input
              type='text'
              id='name'
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea
            id='message'
            required
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification status={notification.status} title={notification.title} message={notification.message} />
      )}
    </section>
  );
}
