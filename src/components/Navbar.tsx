import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="https://i.postimg.cc/MTHfXmpG/20250518-133009.png" 
              alt="KathGolap Logo" 
              className="h-6 sm:h-8 w-auto"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-primary">KathGolap</h1>
          </Link>
        </div>

        {!isMobile && (
          <nav className="mx-auto flex items-center gap-4">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="text-sm font-medium hover:text-primary transition-colors">
                  Categories
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/category/fashion" className="w-full">Fashion</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/category/electronics" className="w-full">Electronics</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/category/others" className="w-full">Others</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-4">
          {!isMobile && (
            <form className="flex items-center relative" onSubmit={handleSearchSubmit}>
              <Input
                type="search"
                placeholder="Search products..."
                className="w-[200px] lg:w-[300px] rounded-full pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Button type="submit" className="sr-only">Search</Button>
            </form>
          )}
          
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Search" 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {isMobile && isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b p-4 z-20">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium">Categories</span>
              <Link to="/category/fashion" className="text-xs sm:text-sm pl-4 hover:text-primary transition-colors">
                Fashion
              </Link>
              <Link to="/category/electronics" className="text-xs sm:text-sm pl-4 hover:text-primary transition-colors">
                Electronics
              </Link>
              <Link to="/category/others" className="text-xs sm:text-sm pl-4 hover:text-primary transition-colors">
                Others
              </Link>
            </div>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      )}

      {isMobile && isSearchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b p-4 z-20">
          <form className="flex items-center relative" onSubmit={handleSearchSubmit}>
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full rounded-full pl-9 text-sm"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Button type="submit" variant="ghost" size="sm" className="absolute right-2 text-xs">
              Search
            </Button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Navbar;
