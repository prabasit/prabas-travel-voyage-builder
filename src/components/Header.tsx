
import React, { useState } from 'react';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const businessMenuItems = [
    { name: 'Prabas Holidays', href: '#holidays' },
    { name: 'Flights Nepal', href: '#flights' },
    { name: 'Hotel Bookings', href: '#hotels' },
    { name: 'Tour Packages', href: '#packages' },
  ];

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      {/* Top Contact Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>+977-1-4445566</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>info@prabastravel.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Your Trusted Travel Partner Since 1995</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=50&h=50&fit=crop&crop=center" 
              alt="Prabas Travels Logo" 
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-primary">Prabas Travels</h1>
              <p className="text-sm text-muted-foreground">& Tours Pvt. Ltd.</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <a href="#home" className="px-4 py-2 hover:text-primary transition-colors">
                    Home
                  </a>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <a href="#about" className="px-4 py-2 hover:text-primary transition-colors">
                    About Us
                  </a>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Our Businesses</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-4">
                      {businessMenuItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <a href="#team" className="px-4 py-2 hover:text-primary transition-colors">
                    Our Team
                  </a>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <a href="#testimonials" className="px-4 py-2 hover:text-primary transition-colors">
                    Testimonials
                  </a>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <a href="#blog" className="px-4 py-2 hover:text-primary transition-colors">
                    Blog
                  </a>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <a href="#contact" className="px-4 py-2 hover:text-primary transition-colors">
                    Inquiries
                  </a>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button>Get Quote</Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <div className="space-y-2 pt-4">
              <a href="#home" className="block px-4 py-2 hover:bg-accent rounded-md">Home</a>
              <a href="#about" className="block px-4 py-2 hover:bg-accent rounded-md">About Us</a>
              
              <div className="px-4 py-2">
                <span className="font-semibold">Our Businesses</span>
                <div className="ml-4 mt-2 space-y-1">
                  {businessMenuItems.map((item) => (
                    <a key={item.name} href={item.href} className="block py-1 text-sm hover:text-primary">
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              
              <a href="#team" className="block px-4 py-2 hover:bg-accent rounded-md">Our Team</a>
              <a href="#testimonials" className="block px-4 py-2 hover:bg-accent rounded-md">Testimonials</a>
              <a href="#blog" className="block px-4 py-2 hover:bg-accent rounded-md">Blog</a>
              <a href="#contact" className="block px-4 py-2 hover:bg-accent rounded-md">Inquiries</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
