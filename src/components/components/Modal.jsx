"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Modal({
  open,
  onClose,
  title,
  children,
  maskClosable = true,
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // при размонтировании восстанавливаем
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <AnimatePresence>
      {open && (
        // ОВЕРЛЕЙ покрывает весь экран и ловит клик
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={maskClosable ? onClose : undefined}
        >
          {/* Фон (не перехватывает события, просто визуальный слой) */}
          <div className="absolute inset-0 bg-black/50 " />

          {/* Само модальное окно. Клик внутри не закрывает */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative bg-white rounded-2xl shadow-lg p-6 min-w-md"
            initial={{ y: -16, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -16, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="mb-6">{children}</div>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
              >
                Закрыть
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
