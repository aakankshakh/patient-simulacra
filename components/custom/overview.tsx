import { motion } from 'framer-motion';
import Link from 'next/link';

import { HeartPulse, Hospital } from 'lucide-react';

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
        <p className="flex flex-row justify-center gap-4 items-center">
          <HeartPulse size={32} />
          <span>+</span>
          <Hospital size={32} />
        </p>
        <p>Patient Simulacra</p>
        <p></p>
      </div>
    </motion.div>
  );
};
