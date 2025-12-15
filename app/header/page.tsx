import { Hamburger, Menu } from "lucide-react";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";

const Header = () => {
  return (
    <header className="bg-secondary/20 border-secondary/50 flex h-16 items-center justify-between border-b px-3">
      <Fade direction="left" duration={100} damping={0.5} triggerOnce>
        <Link href="/" className="flex items-center justify-center gap-1">
          <Hamburger size={30} />
          <h3 className="text-xl font-bold uppercase">FoodStore</h3>
        </Link>
      </Fade>

      <Fade direction="right" duration={100} damping={0.5} triggerOnce>
        <Menu size={30} className="" />
      </Fade>
    </header>
  );
};

export default Header;
