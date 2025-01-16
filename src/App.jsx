import { useState } from 'react';
import { QrCode, Github } from 'lucide-react';
import QRForm from './components/QRForm';
import QRDisplay from './components/QRDisplay';
import { generateQR } from './utils/qrGenerator';

function App() {
  const [qrString, setQrString] = useState('');

  const handleGenerate = (formData) => {
    const qrCode = generateQR(formData);
    setQrString(qrCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-4">
          <a
            href="https://github.com/hoanggxyuuki/qrcode-bank"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
          >
            <Github className="w-5 h-5" />
            <span className="text-sm font-medium">View on GitHub</span>
          </a>
        </div>

        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <QrCode className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Bank QR Code Generator
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Generate QR codes for bank transfers quickly and easily. Simply select your bank, 
            enter the account details, and get your QR code instantly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <QRForm onGenerate={handleGenerate} />
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            {qrString ? (
              <QRDisplay qrString={qrString} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-500">
                <QrCode className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-lg">Fill in the form to generate your QR code</p>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Developed by <a href="https://www.nhhoang.io.vn/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 font-medium">@hoanggxyuuki</a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;