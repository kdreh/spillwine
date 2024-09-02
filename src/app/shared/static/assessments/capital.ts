import{Dropdowns} from "./dropdown";

export const timelineValue =[
  {value: 1, name: 'Immediately'},
  {value: 1, name: '1-3 months'},
  {value: 1, name: '3-6 months'},
  {value: 1, name: '6-12 months'},
  {value: 1, name: '12+ months'}
] //add values  needed

export const useName =[
  'Working Capital', 'Renovations', 'Hiring', 'Equipment',
  'Vehicles', 'Real Estate Purchase', 'Inventory', 'Rent', 'Marketing and Advertising',
  'Research and/or Development', 'Debt/Refinancing/Buying business']

export const capitalSeeking =[
  {value: 0, name: "I'm not sure how much"},
  {value: 1, name: "Less than 10K"},
  {value: 1, name: "$10K-$50K"},
  {value: 1, name: "$50K-$100K"},
  {value: 1, name: "$100K-$250K"},
  {value: 1, name: "$250K+"}
]


export const capRadBtn: Dropdowns[] =[
  {value: 0, name: 'Does not exist', weight: 1, inputSource: "capRadBtn", question: "Do you have the following financial items?"},
  {value: 0.5, name: 'Needs work or have to find it', weight: 1, inputSource: "capRadBtn", question: "Do you have the following financial items?"},
  {value: 1, name: 'Good to go', weight: 1, inputSource: "capRadBtn", question: "Do you have the following financial items?"}
];

export const capFinancial = [
  {name: 'Up to 3 years of past tax returns', subCategory: 'capFinTaxReturns'},
  {name: 'Cash flow projection', subCategory: 'capFinCashFlow'},
  {name: 'Income statement', subCategory: 'capFinIncStat'},
  {name: 'Balance sheet', subCategory: 'capFinBalSheet'}
]

export const existingInventory: Dropdowns[]=[
  {value: 3, name: "Fast selling, existing inventory sells out like hot cakes", weight: 3, inputSource: 'existingInventory', question: 'How would you rate your existing inventory situation? '},
  {value: 2, name: "It’s ok, we sell most of our existing inventory with ease", weight: 3, inputSource: 'existingInventory', question: 'How would you rate your existing inventory situation? '},
  {value: 1, name: "It needs improvement, our inventory collects dust sometimes",  weight: 3, inputSource: 'existingInventory', question: 'How would you rate your existing inventory situation? '}
]

export const marketingStrategy: Dropdowns[]=[
  {value: 3, name: "We have a robust plan in place", weight: 3, inputSource: 'marketingStrategy', question: 'How would you rate your plan to increase visibility (ex. Marketing strategy)?'},
  {value: 2, name: "We’re working on it", weight: 3, inputSource: 'marketingStrategy', question: 'How would you rate your plan to increase visibility (ex. Marketing strategy)?'},
  {value: 1, name: "We’re not sure yet", weight: 3, inputSource: 'marketingStrategy', question: 'How would you rate your plan to increase visibility (ex. Marketing strategy)?'}
]

export const productDevelopment: Dropdowns[]=[
  { value: 3, name: "Yes, we have a ton of customer feed back", weight: 3, inputSource: 'productDevelopment', question: 'Do you already have user feedback on how it needs to be improved? ' },
  {value: 2, name: "Kind of, we have a good amount to make a good guess ", weight: 3, inputSource: 'productDevelopment', question: 'Do you already have user feedback on how it needs to be improved? '},
  {value: 1, name: "No, we want to test the market", weight: 3, inputSource: 'productDevelopment', question: 'Do you already have user feedback on how it needs to be improved? '}
]

export const renovationCosts: Dropdowns[]=[
  {value: 1, name: "Yes", weight: 1, inputSource: 'renovationCosts', question: 'If this location needs any fixing up, do you have quotes for the renovation costs? '},
  {value: 0, name: "No", weight: 1, inputSource: 'renovationCosts', question: 'If this location needs any fixing up, do you have quotes for the renovation costs? '},
  {value: 1, name: "Not applicable", weight: 1, inputSource: 'renovationCosts', question: 'If this location needs any fixing up, do you have quotes for the renovation costs? '}
]

export const closingCostsRealEst: Dropdowns[]=[
  {value: 1, name: "Yes", weight: 1, inputSource: 'closingCostsRealEst', question: 'Do you already have taxes and closing cost information?'},
  {value: 0, name: "No", weight: 1, inputSource: 'closingCostsRealEst', question: 'Do you already have taxes and closing cost information?'},
  {value: 1, name: "Not applicable", weight: 1, inputSource: 'closingCostsRealEst', question: 'Do you already have taxes and closing cost information?'}
]

export const noneAbove = [
  { value: 0, name: "None of the above", weight: 1}
]
