"use client"
import Image from 'next/image';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface LinkType {
    title: string;
    url: string;
}

interface LinkTreeProps {
    handle: string;
    imageUrl?: string;
    description?: string;
    links: LinkType[];
}

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.5,
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.3 }
    }
};

export default function LinkTree({ handle, imageUrl, description, links }: LinkTreeProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="container mx-auto px-4 py-8 max-w-2xl min-h-screen"
        >
            <Card className="p-6 shadow-lg w-full bg-gradient-to-b from-background to-background/80">
                {/* Profile Section */}
                <motion.div 
                    className="text-center mb-8"
                    variants={itemVariants}
                >
                    {imageUrl && (
                        <motion.div 
                            className="w-32 h-32 rounded-full overflow-hidden mb-4 mx-auto border-4 border-primary"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Image 
                                src={imageUrl}
                                alt={handle}
                                width={128}
                                height={128}
                                className="object-cover"
                            />
                        </motion.div>
                    )}
                    <motion.h1 
                        className="text-3xl font-bold mb-2"
                        variants={itemVariants}
                    >
                        @{handle}
                    </motion.h1>
                    {description && (
                        <motion.p 
                            className="text-muted-foreground max-w-md mx-auto"
                            variants={itemVariants}
                        >
                            {description}
                        </motion.p>
                    )}
                </motion.div>

                {/* Links Section */}
                <motion.div 
                    className="w-full space-y-4"
                    variants={containerVariants}
                >
                    {links.map((link, index) => (
                        <motion.a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex bg-card hover:bg-card/80 transition-all duration-300 
                                     rounded-lg p-4 text-center border border-border
                                     items-center justify-between"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="font-medium">{link.title}</span>
                            <FaExternalLinkAlt className="text-sm text-muted-foreground" />
                        </motion.a>
                    ))}
                </motion.div>

                {/* Footer */}
                <motion.footer 
                    className="mt-12 text-center text-sm text-muted-foreground"
                    variants={itemVariants}
                >
                    <p>© {new Date().getFullYear()} {handle}&apos;s links</p>
                </motion.footer>
            </Card>
        </motion.div>
    );
}