'use client';

import { motion } from 'framer-motion';
import stringToColor from '@/lib/stringToColor';

type FollowPointerProps = {
    info: {
        name: string;
        email: string;
        avatar?: string; 
    };
    x: number;
    y: number;
};

const FollowPointer: React.FC<FollowPointerProps> = ({ info, x, y }) => {
    const color = stringToColor(info.email || '1');

    return (
        <motion.div
            className="h-4 w-4 rounded-full absolute z-50"
            style={{
                top: y,
                left: x,
                pointerEvents: 'none',
                backgroundColor: color,
            }}
            initial={{
                scale: 0,
                opacity: 0,
            }}
            animate={{
                scale: 1,
                opacity: 1,
            }}
            exit={{
                scale: 0,
                opacity: 0,
            }}
        >
            <span className="absolute text-xs text-white transform translate-y-5 flex items-center">
                {/* SVG Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16c4 0 6-2 6-6S16 4 12 4 6 6 6 12s2 6 6 6z" />
                </svg>
                <motion.div>{info.name || info.email}</motion.div>
            </span>
        </motion.div>
    );
};

export default FollowPointer;
