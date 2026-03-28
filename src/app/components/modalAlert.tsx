import React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface ModalAlertProps {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error";
  title: string;
  message: string;
}

export default function ModalAlert({ isOpen, onClose, type, title, message }: ModalAlertProps) {
  if (!isOpen) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
        {/* Header strip */}
        <div className={`h-1.5 w-full ${isSuccess ? "bg-green-500" : "bg-red-500"}`} />

        <div className="p-6 flex flex-col items-center text-center">
          {/* Icon */}
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${isSuccess ? "bg-green-50" : "bg-red-50"}`}>
            {isSuccess ? (
              <CheckCircle2 className="text-green-500" size={28} />
            ) : (
              <AlertCircle className="text-red-500" size={28} />
            )}
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{message}</p>

          <button
            onClick={onClose}
            className={`mt-6 w-full py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              isSuccess
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
