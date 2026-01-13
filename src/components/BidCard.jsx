import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";

const BidCard = ({ bid, isOwner, onHire, gigStatus }) => {
    const statusColors = {
        pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        hired: "bg-green-500/10 text-green-500 border-green-500/20",
        rejected: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`relative overflow-hidden rounded-xl border p-6 transition-all duration-300 ${bid.status === "hired"
                    ? "bg-green-900/10 border-green-500/30"
                    : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                } ${bid.status === "rejected" ? "opacity-60" : ""}`}
        >
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                            {bid.freelancer?.name?.charAt(0).toUpperCase() || "F"}
                        </div>
                        <div>
                            <h4 className="font-semibold text-white">
                                {bid.freelancer?.name || "Freelancer"}
                            </h4>
                            <span className="text-xs text-zinc-500">
                                {new Date(bid.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <span
                            className={`ml-auto sm:ml-4 text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusColors[bid.status]
                                }`}
                        >
                            {bid.status.toUpperCase()}
                        </span>
                    </div>

                    <div className="mt-4 p-4 rounded-lg bg-zinc-900 border border-zinc-800/50">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Bid Amount</span>
                            <span className="text-lg font-bold text-white">${bid.amount}</span>
                        </div>
                        <div className="h-px bg-zinc-800 my-2" />
                        <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                            {bid.message}
                        </p>
                    </div>
                </div>

                {isOwner && gigStatus === "open" && bid.status === "pending" && (
                    <div className="flex items-center sm:self-center">
                        <Button
                            onClick={() => onHire(bid._id)}
                            className="bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/20"
                        >
                            Hire Freelancer
                        </Button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default BidCard;
