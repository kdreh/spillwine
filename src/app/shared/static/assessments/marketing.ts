import {Dropdowns } from './dropdown';

export const marketTargetB2BC = [
  {name: 'Business to Business'},
  {name: 'Business to Consumer'},
  {name: 'Both'}
]


export const marketingStrategiesOvercomeNoneAbove = [
  { value: 0, name: "None of the above",  inputSource: 'marketingStrategies', question: 'These may be marketing strategies to get the word out about your business. Out of these, which are you already doing well?' }
]

export const salesStrategiesOvercomeNoneAbove = [
  { value: 0, name: "None of the above",  inputSource: 'salesStrategies', question: 'These may be sales strategies to help sell your product or service. Out of these, which are you already doing well?' }
]

export const marketingWebsite : Dropdowns[] = [
  { value: 3, name: 'I have a lot of visitors, and it drives sales', weight: 3, inputSource: 'marketingWebsite', question: 'Tell us about your website' },
  { value: 2, name: 'I have one with alot of visitors, but its not driving sales', weight: 3, inputSource: 'marketingWebsite', question: 'Tell us about your website' },
  { value: 1, name: 'Its not effective, needs work and/or I don`t know how many visitors I have and how it affects sales', weight: 3, inputSource: 'marketingWebsite', question: 'Tell us about your website' },
  { value: 0, name: 'I don`t have a website', weight: 3, inputSource: 'marketingWebsite', question: 'Tell us about your website' },
]

export const marketingDomainEmail: Dropdowns[] = [
  { value: 2, name: 'Has a domain name that is used on the website and used as a customer facing email', weight: 2, inputSource: 'marketingDomainEmail', question: 'Tell us about your website domain and email' },
  { value: 1, name: 'Has a domain name that is used on the website but not used as a customer facing email', weight: 2, inputSource: 'marketingDomainEmail', question: 'Tell us about your website domain and email' },
  { value: 1, name: 'Does not have a domain name that is connected to the website but is used as a customer facing email', weight: 2, inputSource: 'marketingDomainEmail', question: 'Tell us about your website domain and email' },
  { value: 0, name: 'Does not have a domain name nor professional customer facing email', weight: 2, inputSource: 'marketingDomainEmail', question: 'Tell us about your website domain and email' },
]

export const marketingBrand : Dropdowns[] = [
  { value: 3, name: 'It`s great', weight: 3,  inputSource: 'marketingBrand', question: 'How consistent and professional is your brand?'},
  { value: 2, name: 'I`m getting by', weight: 3, inputSource: 'marketingBrand', question: 'How consistent and professional is your brand?' },
  { value: 1, name: 'I have a concept or some elements', weight: 3, inputSource: 'marketingBrand', question: 'How consistent and professional is your brand?' },
  { value: 0, name: 'I don`t have a brand', weight: 3, inputSource: 'marketingBrand', question: 'How consistent and professional is your brand?' },
]

export const marketingEffectiveness : Dropdowns[] = [
  { value: 3, name: 'Extremely comfortable', weight: 3, inputSource: 'marketingEffectiveness', question: 'How comfortable are you in your marketing efforts and understanding how effective they are?' },
  { value: 2, name: 'Kind of comfortable', weight: 3,  inputSource: 'marketingEffectiveness', question: 'How comfortable are you in your marketing efforts and understanding how effective they are?' },
  { value: 1, name: 'Not at all comfortable', weight: 3,  inputSource: 'marketingEffectiveness', question: 'How comfortable are you in your marketing efforts and understanding how effective they are?' },
  { value: 0, name: 'I don`t market', weight: 3,  inputSource: 'marketingEffectiveness', question: 'How comfortable are you in your marketing efforts and understanding how effective they are?' },
]

export const marketingNetworkMaterial : Dropdowns[] = [
  { value: 3, name: 'Yes, it`s good', weight: 3,  inputSource: 'marketingNetworkMaterial', question: 'Do you have material to showcase your business when networking?'},
  { value: 2, name: 'Yes, but it needs work', weight: 3,  inputSource: 'marketingNetworkMaterial', question: 'Do you have material to showcase your business when networking?' },
  { value: 1, name: 'No', weight: 3,  inputSource: 'marketingNetworkMaterial', question: 'Do you have material to showcase your business when networking?' },
  { value: 0, name: 'I don`t network', weight: 3,  inputSource: 'marketingNetworkMaterial', question: 'Do you have material to showcase your business when networking?' }
]

export const marketingSocialMedia : Dropdowns[]  = [

  { value: 3, name: 'It`s a major business driver', weight: 3, inputSource: 'marketingSocialMedia', question: 'Which best describes your social media presence?' },
  { value: 2, name: 'It helps build awareness and engage existing customers', weight: 3, inputSource: 'marketingSocialMedia', question: 'Which best describes your social media presence?'  },
  { value: 1, name: 'I use it but there is little to no benefit', weight: 3, inputSource: 'marketingSocialMedia', question: 'Which best describes your social media presence?'  },
  { value: 0, name: 'I don`t use social media yet', weight: 3, inputSource: 'marketingSocialMedia', question: 'Which best describes your social media presence?'  },
  { value: 3, name: 'Social media doesn`t drive sales for my industry', weight: 3, inputSource: 'marketingSocialMedia', question: 'Which best describes your social media presence?'  }
]

export const customerEngagement : Dropdowns[] = [
  { value: 3, name: 'Highly engaged with lots of repeat customers', weight: 3, inputSource: 'customerEngagement', question: 'How is your customer engagement?'},
  { value: 2, name: 'Somewhat engaged', weight: 3, inputSource: 'customerEngagement', question: 'How is your customer engagement?'},
  { value: 1, name: 'No engagement at all', weight: 3, inputSource: 'customerEngagement', question: 'How is your customer engagement?' },
  { value: 0, name: 'I haven`t started providing customer engagement yet', weight: 3, inputSource: 'customerEngagement', question: 'How is your customer engagement?' },
]

export const customerService : Dropdowns[] = [
  { value: 3, name: 'Consistently excellent', weight: 3, inputSource: 'customerService', question: 'How would others describe your customer service?' },
  { value: 2, name: 'Most often good', weight: 3, inputSource: 'customerService', question: 'How would others describe your customer service?' },
  { value: 1, name: 'Needs work', weight: 3, inputSource: 'customerService', question: 'How would others describe your customer service?' },
  { value: 0, name: 'I haven`t started providing customer service yet', weight: 3, inputSource: 'customerService', question: 'How would others describe your customer service?' },
]

export const customerFeedback: Dropdowns[] = [
  { value: 1, name: 'Yes', weight: 1, inputSource: 'customerFeedback', question: 'Do you collect customer feedback or reviews?' },
  { value: 0, name: 'No', weight: 1, inputSource: 'customerFeedback', question: 'Do you collect customer feedback or reviews?' },
]

export const noneAbove = [
  { value: 0, name: "None of the above", weight: 1}
]
