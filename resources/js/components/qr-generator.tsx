import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download } from "lucide-react";

interface QrGeneratorProps {
    url: string;
    size?: number;          // Display size
    showDownload?: boolean; // Show download button
}

export default function QrGenerator({ url, size = 120, showDownload = false }: QrGeneratorProps) {
    const qrRef = useRef<HTMLDivElement>(null);

    const downloadQRCode = () => {
        const canvas = qrRef.current?.querySelector("canvas");
        if (!canvas) return;

        const scale = 4; // 4x resolution for Instagram-quality
        const padding = 40;

        // Create a new high-res canvas
        const newCanvas = document.createElement("canvas");
        const newSize = canvas.width * scale + padding * 2;
        newCanvas.width = newSize;
        newCanvas.height = newSize;
        const ctx = newCanvas.getContext("2d");

        if (!ctx) return;

        // Fill background white
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, newSize, newSize);

        // Draw the original QR scaled up with padding
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(canvas, padding, padding, canvas.width * scale, canvas.height * scale);

        // Trigger download
        const dataUrl = newCanvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `qr-code-${Date.now()}.png`;
        a.click();
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <div ref={qrRef} className="bg-white p-2 rounded">
                <QRCodeCanvas
                    value={url}
                    size={size}
                    level="Q"
                />
            </div>
            {showDownload && (
                <button
                    onClick={downloadQRCode}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    title="تنزيل QR Code"
                >
                    <Download className="w-3 h-3" />
                    <span>تنزيل</span>
                </button>
            )}
        </div>
    );
}
