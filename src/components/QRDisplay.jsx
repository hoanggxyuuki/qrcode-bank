import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const QRDisplay = ({ qrString }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(qrString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <QRCodeSVG 
            value={qrString} 
            size={256}
            level="H"
            includeMargin={true}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">QR Code String</h3>
        <div className="relative">
          <textarea 
            readOnly 
            value={qrString}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-12"
          />
          <button
            onClick={handleCopy}
            className="absolute right-2 top-2 p-2 text-gray-500 hover:text-indigo-600 transition-colors duration-200"
            title={copied ? 'Copied!' : 'Copy to clipboard'}
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default QRDisplay;