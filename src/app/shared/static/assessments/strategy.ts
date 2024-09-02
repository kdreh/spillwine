import {Dropdowns } from './dropdown';

//TODO get from api
export const keysToSuccess=[
{ "id": "goodRep", "name": "Good reputation", "B2What": "Any", "offerType": "Any", "distChannel": [{ "id": "Any" }], "inputSource": "keysToSuccess", "description": "Delivering on time, in budget, with results (Hubspot, 2019).", "resourceArray": [{ "resource": null, "url": null, "promocode": null }] },
{ "id": "indusKnow", "name": "Up to date industry knowledge", "B2What": "Any", "offerType": "Any", "distChannel": [{ "id": "Any" }], "inputSource": "keysToSuccess", "description": "Keeping up to date on latest marketing strategies (Hubspot, 2019).", "resourceArray": [{ "resource": null, "url": null, "promocode": null }] },
{ "id": "digiCapability", "name": "Digital capabilities", "B2What": "Any", "offerType": "Any", "distChannel": [{ "id": "Any" }], "inputSource": "keysToSuccess", "description": "Knowing how to drive results (Hubspot, 2019).", "resourceArray": [{ "resource": null, "url": null, "promocode": null }] },
  { "id": "techExpertise", "name": "Technical expertise", "B2What": "Any", "inputSource": "keysToSuccess", "description": "", "resourceArray": [{ "resource": null, "url": null, "promocode": null }] },
  { "id": "effectiveMarketing", "name": "Effective marketing", "B2What": "Any", "inputSource": "keysToSuccess", "description": "", "resourceArray": [{ "resource": null, "url": null, "promocode": null }] }

];
export const offerFeatures = [
{ "id": "presentation", "name": "Easy to understand presentation of marketing or ads results data", "B2What": "Any", "offerType": "Any", "distChannel": [{ "id": "Any" }], "inputSource": "offerFeatures", "description": "Develop an easy way to relay marketing or ad campaign effectiveness, benefits and results to the customer; this can be via presentation, reports or dashboards.", "resourceArray": [{ "resource": "9 Marketing Report Templates & Examples for SEO, SEM & More", "url": "https://www.semrush.com/blog/marketing-report-templates-and-examples/", "promocode": null }] },
  { "id": "platformValue", "name": "Platform Usefulness", "B2What": "Any", "inputSource": "offerFeatures", "description": "Is the platform valuable and useful (Userpilot, 2022).", "resourceArray": [{ "resource": "Improve Engagement with These SaaS UX Design Best Practices", "url": "https://www.toptal.com/designers/ux/saas-ux-design", "promocode": null }] },
  { "id": "platformUsability", "name": "Platform Usability", "B2What": "Any", "inputSource": "offerFeatures", "description": "Is the platform easy to use (Userpilot, 2022).", "resourceArray": [{ "resource": "Improve Engagement with These SaaS UX Design Best Practices", "url": "https://www.toptal.com/designers/ux/saas-ux-design", "promocode": null }] },
  { "id": "platformAdoptability", "name": "Platform Ease to Start Using", "B2What": "Any", "inputSource": "offerFeatures", "description": "Is the platform easy to start using, to minimize confusion and attrition. Is it easily adoptible? (Userpilot, 2022).", "resourceArray": [{ "resource": "SaaS Onboarding Process", "url": "https://userpilot.com/blog/best-user-onboarding-experience/", "promocode": null }] },
  { "id": "platformDesirability", "name": "Platform Desirability", "B2What": "Any", "inputSource": "offerFeatures", "description": "Is it fun and engaging? (Userpilot, 2022).", "resourceArray": [{ "resource": null, "url": null, "promocode": null }] },
  { "id": "platformScalability", "name": "Platform Scalability", "B2What": "Any", "inputSource": "offerFeatures", "description": "Is it suitable to host a high volume of users or data processing (Userpilot, 2022).", "resourceArray": [{ "resource": null, "url": null, "promocode": null }] },
  { "id": "platformIntergrations", "name": "Key intergrations in the platform", "B2What": "Any", "inputSource": "offerFeatures", "description": "Does it intergrate with necessary existing products (Userpilot, 2022).", "resourceArray": [{ "resource": null, "url": null, "promocode": null }] }

]


export const strategyRadBtn : Dropdowns[] =
  [
    {name: 'Does not have', value: 0, weight: 1, inputSource: 'busiPlanArray', question: 'What`s the status on this part of the plan?'},
    {name: 'Needs work', value: 0.5,   weight: 1, inputSource: 'busiPlanArray', question: 'What`s the status on this part of the plan?'},
    {name: 'Good to go', value: 1,   weight: 1, inputSource: 'busiPlanArray', question: 'What`s the status on this part of the plan?'}
  ];

export const busiPlanArray  =[
  {name: 'Executive Summary or One Pager', subCategory: 'busiPlanExecSum'},
  {name: 'Mission and Vision, Goals', subCategory: 'busiPlanMisVisGoal'},
  {name: 'Business Summary', subCategory: 'busiPlanBusiSum'},
  {name: 'Services and Products Description', subCategory: 'busiPlanOfferDescrip'},
  {name: 'Industry Overview or Insights', subCategory: 'busiPlanIndustryOverview'},
  {name: 'Target Market Description or Insights', subCategory: 'busiPlanTargetMarket'},
  {name: 'Marketing Summary or Plan', subCategory: 'busiPlanMarketingSummary'},
  {name: 'Sales Strategy or Plan', subCategory: 'busiPlanSaleStrategy'},
  {name: 'Team Overview or Biography', subCategory: 'busiPlanTeamOverview'},
  {name: 'Financial Projections', subCategory: 'busiPlanFinancialProjections'},
];

export const  offerType = [
  { name: "Product" },
  { name: "Service" },
  { name: "Product and Service" },
];

export const generalIndustryBarriers  = [

  { value: 1, name: "Sourcing and retaining labor", inputSource: 'generalIndustryBarriers', question: 'What barriers could you possibly run into while starting or operating this business? Select all that apply'  },
  //  labor
  // { value: 1, name: "Tech Challenges", inputSource: 'generalIndustryBarriers', question: 'What barriers could you possibly run into while starting or operating this business? Select all that apply'  },
  { value: 1, name: "Regulation Compliance (Licensing, permits, etc.)",  inputSource: 'generalIndustryBarriers', question: 'What barriers could you possibly run into while starting or operating this business? Select all that apply'  },
  //regulation
  { value: 1, name: "Startup costs/Access to capital",  inputSource: 'generalIndustryBarriers', question: 'What barriers could you possibly run into while starting or operating this business? Select all that apply'  },
  //startupCosts
  //{ value: 1, name: "High research and development costs", inputSource: 'generalIndustryBarriers', question: 'What barriers could you possibly run into while starting or operating this business? Select all that apply'  },
  { value: 1, name: "Ownership of Raw Materials or Inventory", inputSource: 'generalIndustryBarriers', question: 'What barriers could you possibly run into while starting or operating this business? Select all that apply'  },
  //ownMaterial
  { value: 1, name: "Team Education or Skills",  inputSource: 'generalIndustryBarriers', question: 'What barriers could you possibly run into while starting or operating this business? Select all that apply'  },
  //teamSkill
  { value: 1, name: "Large players dominating the marketing",  inputSource: 'generalIndustryBarriers', question: 'What barriers could you possibly run into while starting or operating this business? Select all that apply'  },
  //marketDomination
  { value: 1, name: "Selling enough to make money on each, or efficient operations", inputSource: 'generalIndustryBarriers', question: 'What barriers could you possibly run into while starting or operating this business? Select all that apply'},
  //effecientOperations
  { value: 1, name: "Network Effect, sales, effective marketing", inputSource: 'generalIndustryBarriers', question: 'What barriers could you possibly run into while starting or operating this business? Select all that apply' },
  //salesStrategies
  { value: 1, name: "Business loyalty or good reputation needed",  inputSource: 'generalIndustryBarriers', question: 'What barriers could you possibly run into while starting or operating this business? Select all that apply'  },
  //goodRep
  { value: 1, name: "Access to suppliers and distribution channels",  inputSource: 'generalIndustryBarriers', question: 'What barriers could you possibly run into while starting or operating this business? Select all that apply'  }
  //suppliersDisChannels

//"Large players dominating the market",
  // marketDomination
];

export const operationsMethods = [
  {name: 'Brick and mortar location'},
  {name: 'E-commerce'},
  {name: 'Online platform (software, etc.)'},
  {name: 'Third party product placement/retail'},
  {name: 'Mobile operations/Pop up shops/food trucks/vending'},
]

export const barriersDropdown = [
  {name: 'Overcome'},
  {name: 'Somewhat overcome'},
  {name: 'Not overcome'}
]

export const barriersOvercomeNoneAbove = [
  { value: 0, name: "None of the above",  inputSource: 'barriers', question: 'These seem to be potential barriers for your industry. Out of this list, which have you already overcome?' }
]

export const threatsOvercomeNoneAbove = [
  { value: 0, name: "None of the above", inputSource: 'threats', question: 'These may be potential challenges for your business. Which of these challenges have you taken action to address?' }
]

export const offerFeaturesRadBtn : Dropdowns[] =
  [
    {name: 'Alot of work needed, not started or not sure', value: 0, weight: 1, inputSource: 'offerFeatures', question: 'These may be some things to make your product or service competitive, how would you rate them?'},
    {name: 'It`s ok but could be better', value: 0.5,   weight: 1, inputSource: 'offerFeatures', question: 'These may be some things to make your product or service competitive, how would you rate them?'},
    {name: 'We do this well', value: 1,   weight: 1, inputSource: 'offerFeatures', question: 'These may be some things to make your product or service competitive, how would you rate them?'}
  ];

export const keysToSuccessRadBtn : Dropdowns[] =
  [
    {name: 'Not achieved or I`m not sure', value: 0, weight: 1, inputSource: 'keysToSuccess', question: 'These may be keys to success for your business, what`s their status?'},
    {name: 'Somewhat Achieved', value: 0.5,   weight: 1, inputSource: 'keysToSuccess', question: 'These may be keys to success for your business, what`s their status?'},
    {name: 'Achieved', value: 1,   weight: 1, inputSource: 'keysToSuccess', question: 'These may be keys to success for your business, what`s their status?'}
  ];



export const noneAbove = [
  { value: 0, name: "None of the above", weight: 1}
]
