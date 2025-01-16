import { QRPay, BanksObject } from 'vietnam-qr-pay';

export const generateQR = ({ bankBin, accountNumber, amount, purpose }) => {
  const qrPay = QRPay.initVietQR({
    bankBin: bankBin,
    bankNumber: accountNumber,
    amount: amount,
    purpose: purpose
  });
  
  return qrPay.build();
};

export const bankList = Object.keys(BanksObject).map(key => ({
  name: BanksObject[key].name,         
  bin: BanksObject[key].bin,          
  code: BanksObject[key].code,         
  shortName: BanksObject[key].shortName,
  keywords: BanksObject[key].keywords,  
  swiftCode: BanksObject[key].swiftCode,
  key: key                            
}));

export default generateQR;