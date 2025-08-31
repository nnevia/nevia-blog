import Footer from "./footer";
import MainNavigation from "./main-navigation";
import { PropsWithChildren } from "react";

export default function Layout(props: PropsWithChildren) {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px" }}>
      <MainNavigation />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}
