import { Hamburger, Menu } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-secondary/20 border-secondary/50 flex h-16 items-center justify-between border-b px-3">
      <Link href="/" className="flex items-center justify-center gap-1">
        <Hamburger size={30} />
        <h3 className="text-xl font-bold uppercase">FoodStore</h3>
      </Link>

      <Menu size={30} className="" />
    </header>
  );
};

export default Header;
