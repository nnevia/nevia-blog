import Link from "next/link";
import Logo from "./logo";
import classes from "./main-navigation.module.css";
import ToggleButton from "./toggle-button";
export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link href='/posts'>
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/posts'>posts</Link>
          </li>
          <li>
            <Link href='/about'>about</Link>
          </li>
          <li>
            <ToggleButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
