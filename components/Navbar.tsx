"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ModeToggle";

// Navigation links array for easy editing
const navLinks = [
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About" },
    { href: "/make-links", label: "Make Your Links" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky w-full z-50 top-0"
        >
            <div className="backdrop-blur-md bg-background/60 border-b supports-[backdrop-filter]:bg-background/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex-shrink-0"
                        >
                            <Link href="/" className="text-2xl font-bold text-primary">
                                &lt; SetLinks /&gt;
                            </Link>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex md:items-center md:space-x-8">
                            {navLinks.map((link) => (
                                <motion.div
                                    key={link.href}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={`text-sm font-medium transition-colors hover:text-primary ${
                                            pathname === link.href
                                                ? "text-primary"
                                                : "text-muted-foreground"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <ModeToggle/>
                        </div>

                        {/* Mobile Navigation */}
                        <div className="md:hidden">
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right">
                                    <SheetHeader>
                                        <SheetTitle>Navigation Menu</SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col space-y-6 mt-8">
                                        {navLinks.map((link) => (
                                            <motion.div
                                                key={link.href}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className={`text-lg font-medium transition-colors hover:text-primary ${
                                                        pathname === link.href
                                                            ? "text-primary"
                                                            : "text-muted-foreground"
                                                    }`}
                                                >
                                                    {link.label}
                                                </Link>
                                            </motion.div>
                                        ))}
                                        <ModeToggle/>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}