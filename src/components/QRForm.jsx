import { useState } from 'react';
import { bankList } from '../utils/qrGenerator';
import Select from 'react-select';

const QRForm = ({ onGenerate }) => {
  const [formData, setFormData] = useState({
    bank: '',
    accountNumber: '',
    amount: '',
    purpose: ''
  });

  const suggestedAmounts = [10000, 20000, 50000, 100000, 200000, 500000];

  const bankOptions = bankList.map(bank => ({
    value: bank.bin,
    label: `${bank.shortName} - ${bank.name} - ${bank.code}`,
    data: {
      keywords: bank.keywords,
      code: bank.code,
      swiftCode: bank.swiftCode
    }
  }));

  const customFilter = (option, inputValue) => {
    const searchTerm = inputValue.toLowerCase();
    return (
      option.label.toLowerCase().includes(searchTerm) ||
      option.data.keywords?.toLowerCase().includes(searchTerm) ||
      option.data.code?.toLowerCase().includes(searchTerm)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({
      bankBin: formData.bank,
      accountNumber: formData.accountNumber,
      amount: formData.amount,
      purpose: formData.purpose
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Bank</label>
        <Select
          className="react-select"
          options={bankOptions}
          placeholder="Select or search bank..."
          onChange={(option) => setFormData({...formData, bank: option.value})}
          isSearchable={true}
          filterOption={customFilter}
          required
          styles={{
            control: (base) => ({
              ...base,
              borderRadius: '0.5rem',
              borderColor: '#e5e7eb',
              '&:hover': {
                borderColor: '#a5b4fc'
              }
            })
          }}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Account Number
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter account number"
          value={formData.accountNumber}
          onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
          required
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter amount"
          value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: e.target.value})}
          required
        />
        <div className="grid grid-cols-3 gap-2">
          {suggestedAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, amount: amount.toString() }))}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-colors duration-200"
            >
              {formatAmount(amount)}₫
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Money transfer content"
          value={formData.purpose}
          onChange={(e) => setFormData({...formData, purpose: e.target.value})}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
      >
        Generate QR Code
      </button>
    </form>
  );
};
export default QRForm;