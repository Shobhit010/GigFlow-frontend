import { motion, AnimatePresence } from "framer-motion";

export const Toast = ({ message, type = "success", onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-8 right-8 z-[100] px-6 py-4 rounded-xl border shadow-2xl backdrop-blur-md flex items-center gap-3 ${type === "success"
                    ? "bg-green-500/10 border-green-500/20 text-green-500"
                    : "bg-blue-500/10 border-blue-500/20 text-blue-500"
                }`}
        >
            <div className={`p-1 rounded-full ${type === "success" ? "bg-green-500/20" : "bg-blue-500/20"}`}>
                {type === "success" ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                )}
            </div>
            <div>
                <h4 className="font-bold text-sm">Notification</h4>
                <p className="text-sm font-medium opacity-90">{message}</p>
            </div>
            <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </motion.div>
    );
};
