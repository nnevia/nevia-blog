import Link from "next/link";
import Logo from "./logo";
import classes from "./main-navigation.module.css";
import ToggleButton from "./toggle-button";
export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link href='/'>
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/posts'>Posts</Link>
          </li>
          <li>
            <Link href='/contact'>Contact</Link>
          </li>
          <li>
            <Link href='/'>home</Link>
          </li>
          <li>
            <ToggleButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
