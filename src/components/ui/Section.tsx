"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps extends HTMLMotionProps<"section"> {
  children: ReactNode;
  container?: boolean;
  className?: string;
  id?: string;
}

export function Section({ 
  children, 
  container = true, 
  className, 
  id,
  ...props 
}: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "py-16 md:py-24 relative", // Standard vertical rhythm
        className
      )}
      {...props}
    >
      {container ? (
        <div className="container-x mx-auto px-4 md:px-6">
          {children}
        </div>
      ) : (
        children
      )}
    </motion.section>
  );
}
