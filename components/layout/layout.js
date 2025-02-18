import Footer from "./footer";
import MainNavigation from "./main-navigation";
export default function Layout(props) {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px" }}>
      <MainNavigation />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}
