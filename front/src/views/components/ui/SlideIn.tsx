"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
type Directions = "up" | "down" | "left" | "right";


type SlideInProps = {
    children: ReactNode;
    duration?: number;
    delay?: number;
    direction?: Directions;
    distance?: number;
} & React.ComponentProps<typeof motion.div>;


const SlideIn = ({
    children,
    duration = 0.3,
    delay = 0,
    direction = "up",
    distance = 20,
    ...props
}: SlideInProps) => {
    const axis = direction === "left" || direction === "right" ? "x" : "y";
    const sign = direction === "left" || direction === "up" ? -1 : 1;


    return (
        <motion.div
            initial={{ opacity: 0, [axis]: sign * distance }}
            animate={{ opacity: 1, [axis]: 0 }}
            transition={{ duration, delay }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export { SlideIn };