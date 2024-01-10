import { useState } from "react";

export function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="h-full">
      <div className="w-full container mx-auto">
        <div className="w-full flex ite	ms-center justify-between">
          <a
            className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl mt-3"
            href="#"
          >
            Midgard
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
              Magic
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
