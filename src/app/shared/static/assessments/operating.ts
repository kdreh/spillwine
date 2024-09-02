import {Dropdowns } from './dropdown';

export const busiRegType : Dropdowns[] = [
  {value: 0, name: 'Not registered', weight: 1, inputSource: 'busiRegType', question: 'What is your registration status?'},
  {value: 0.5, name: 'Sole proprietor',  weight: 1, inputSource: 'busiRegType', question: 'What is your registration status?'},
  {value: 1, name:'Single Member LLC',  weight: 1, inputSource: 'busiRegType', question: 'What is your registration status?'},
  {value: 1, name: 'Multi Member LLC', weight: 1, inputSource: 'busiRegType', question: 'What is your registration status?'},
  {value: 1, name: 'Corp', weight: 1, inputSource: 'busiRegType', question: 'What is your registration status?'},
  {value: 1, name: 'S Corp', weight: 1, inputSource: 'busiRegType', question: 'What is your registration status?'},
  {value: 1, name: 'C Corp', weight: 1, inputSource: 'busiRegType', question: 'What is your registration status?'},
  {value: 1, name: 'B Corp', weight: 1, inputSource: 'busiRegType', question: 'What is your registration status?'},
  {value: 1, name: 'Non-profit', weight: 1, inputSource: 'busiRegType', question: 'What is your registration status?'},
];

export const legalOpAgreement : Dropdowns[] = [
  { value: 1, name: 'Yes', weight: 1, inputSource: 'legalOpAgreement', question: 'Do you have a solid operating agreement?'},
  { value: 0, name: 'No', weight: 1, inputSource: 'legalOpAgreement', question: 'Do you have a solid operating agreement?' },
];

export const busiInsurance: Dropdowns[] = [
  { value: 1, name: 'Yes', weight: 1, inputSource: 'busiInsurance', question: 'Do you know what type of insurance the business needs?'},
  { value: 0, name: 'No', weight: 1, inputSource: 'busiInsurance', question: 'Do you know what type of insurance the business needs?' },
];


export const legalIP  : Dropdowns[] = [
  { value: 1, name: 'has patentable or trademarkable content or product(s), and it`s legally protected.', weight: 1, inputSource: 'legalIP', question: 'In terms of intellectual property, the business...' },
  { value: 0, name: 'has patentable or trademarkable content or product(s), but it`s not legally protected.', weight: 1, inputSource: 'legalIP', question: 'In terms of intellectual property, the business...' },
  { value: 1, name: 'doesn`t have patentable or trademarkable content or product(s).', weight: 1, inputSource: 'legalIP', question: 'In terms of intellectual property, the business...' },
];

export const financePaymentSystem : Dropdowns[] = [
  { value: 1, name: 'Yes, and someone on the team (or I) know(s) how to use it', weight: 1,  inputSource: 'financePaymentSystem', question: 'Do you actively use a payment processing system or have one set up?' },
  { value: 0, name: 'Yes, but no one on the team (or I) know(s) how to use it', weight: 1, inputSource: 'financePaymentSystem', question: 'Do you actively use a payment processing system or have one set up?' },
  { value: 0, name: 'No', weight: 1, inputSource: 'financePaymentSystem', question: 'Do you actively use a payment processing system or have one set up?' },
];

export const financeAccountingSystem : Dropdowns[] = [
  { value: 1, name: 'Yes, and someone on the team (or I) know(s) how to use it', weight: 1, inputSource: 'financeAccountingSystem', question: 'Do you actively use accounting software or have one set up?'  },
  { value: 0, name: 'Yes, but no one on the team (or I) know(s) how to use it', weight: 1, inputSource: 'financeAccountingSystem', question: 'Do you actively use accounting software or have one set up?' },
  { value: 0, name: 'No', weight: 1, inputSource: 'financeAccountingSystem', question: 'Do you actively use accounting software or have one set up?' },
];

export const financeBusiBankAccount : Dropdowns[] = [
  { value: 1, name: 'Yes', weight: 1, inputSource: 'financeBusiBankAccount', question: 'Does the business have a business bank account?'  },
  { value: 0, name: 'No', weight: 1, inputSource: 'financeBusiBankAccount', question: 'Does the business have a business bank account?'  },
]

export const operatingSOP : Dropdowns[] = [
  { value: 2, name: 'Yes', weight: 2,  inputSource: 'operatingSOP', question: 'Do you have thorough standard operating procedures on how to run your business?' },
  { value: 1, name: 'Yes, but it needs to be updated', weight: 2,  inputSource: 'operatingSOP', question: 'Do you have thorough standard operating procedures on how to run your business?' },
  { value: 0, name: 'No or not sure', weight: 2,  inputSource: 'operatingSOP', question: 'Do you have thorough standard operating procedures on how to run your business?' },
];

export const operatingProductionProcess : Dropdowns[] = [
  { value: 2, name: 'I have one and it`s stable and consistent', weight: 2, inputSource: 'operatingProductionProcess', question: 'Do you have a consistent and stable production process for the product(s) you offer?' },
  { value: 1, name: 'I have one but it`s not stable or consistent', weight: 2, inputSource: 'operatingProductionProcess', question: 'Do you have a consistent and stable production process for the product(s) you offer?' },
  { value: 0, name: 'I haven`t identified one yet', weight: 2, inputSource: 'operatingProductionProcess', question: 'Do you have a consistent and stable production process for the product(s) you offer?' },
];


export const legalOvercomeNoneAbove = [
  { value: 0, name: "None of the above",  inputSource: 'legal', question: 'Out of these legal disclaimers, which do you already have?' }
]

export const operationsToolsOvercomeNoneAbove = [
  { value: 0, name: "None of the above", inputSource: 'operationsTools', question: 'Out of these operations, which do you already have?' }
]

export const kpiOvercomeNoneAbove = [
  { value: 0, name: "None of the above", inputSource: 'kpi', question: 'Out of these kpis, which are you tracking?' }
]



export const noneAbove = [
  { value: 0, name: "None of the above", weight: 1}
]
