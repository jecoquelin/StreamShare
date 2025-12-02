"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type FadeInProps = {
    children: ReactNode;
    duration?: number;
    delay?: number;
} & React.ComponentProps<typeof motion.div>;


const FadeIn = ({
    children,
    duration = 0.3,
    delay = 0,
    ...props
}: FadeInProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration, delay }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export { FadeIn };