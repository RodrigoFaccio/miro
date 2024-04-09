export interface DailyRevenue {
  date: string;
  pixAmount: number;
  creditCardAmount: number;
  boletoAmount: number;
  chargebackAmount: number;
  refundAmount: number;
}

export interface Conversion {
  boletoConversion: number;
  creditCardConversion: number;
  pixConversion: number;
  chargebackConversion: number;
  refundConversion: number;
  prechargebackConversion: number;
}

export interface Sales {
  boletoAmount: number;
  paidBoletoAmount: number;
  boletoCount: number;
  creditCardAmount: number;
  paidCreditCardAmount: number;
  creditCardCount: number;
  pixAmount: number;
  paidPixAmount: number;
  pixCount: number;
}

export interface PaymentDetails {
  label: string;
  revenue: number;
  fee: number;
  profit: number;
}

export interface SalesData {
  totalSalesAmount: number;
  paidSalesAmount: number;
  averageTicket: number;
  boleto: {
    amount: number;
    paidAmount: number;
    count: number;
    conversion: number;
    revenue: number;
    fee: number;
    profit: number;
  };
  pix: {
    amount: number;
    paidAmount: number;
    count: number;
    conversion: number;
    revenue: number;
    fee: number;
    profit: number;
  };
  creditCard: {
    amount: number;
    paidAmount: number;
    count: number;
    conversion: number;
    interest: number;
    revenue: number;
    fee: number;
    profit: number;
    installmentsProfit: Array<{
      installments: number;
      profit: number;
    }>;
  };
  chargeback: {
    amount: number;
    count: number;
    percentage: number;
  };
  gateway: {
    fee: number;
    percentage: number;
  };
  summary: PaymentDetails[];
  total: {
    fee: number;
    revenue: number;
    profit: number;
    summary: Array<{
      label: string;
      value: number;
    }>;
  };
  dailyRevenue: DailyRevenue[];
  approvedCompanies: number;
}
