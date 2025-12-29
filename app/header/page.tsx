import { Hamburger, Menu } from "lucide-react";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";

export default function Header() {
  return (
    <header className="border-secondary/50 flex h-20 items-center justify-between border-b px-3">
      <Fade direction="left" duration={100} damping={0.5} triggerOnce>
        <Link href="/" className="flex items-center justify-center gap-1">
          <Hamburger className="text-text/70 size-8" />
          <h3 className="text-xl font-bold uppercase">FoodStore</h3>
        </Link>
      </Fade>

      <Fade direction="right" duration={100} damping={0.5} triggerOnce>
        <Menu size={30} className="" />
      </Fade>
    </header>
  );
}
