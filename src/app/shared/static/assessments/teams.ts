import{Dropdowns} from "./dropdown";

export const teamRole : Dropdowns[] = [
  { value: 1, name: 'Administration and operations', weight: 5, inputSource: 'teamRole', question: 'What skills are your team strong in?'  },
  { value: 1, name: 'Research and development, and Production', weight: 5, inputSource: 'teamRole', question: 'What skills are your team strong in?'},
  { value: 1, name: 'Trades (ex. Teacher, Baker, Trucker)', weight: 5, inputSource: 'teamRole', question: 'What skills are your team strong in?' },
  { value: 1, name: 'Sales and marketing', weight: 5, inputSource: 'teamRole', question: 'What skills are your team strong in?' },
  { value: 1, name: 'Accounting and finance', weight: 5, inputSource: 'teamRole', question: 'What skills are your team strong in?' },
];

export const teamIndustryKnowledge : Dropdowns[] = [
  { value: 5, name: 'Expert', weight: 5, inputSource: 'teamIndustryKnowledge', question: 'How well does the team know the business industry?'  },
  { value: 4, name: 'Advanced', weight: 5, inputSource: 'teamIndustryKnowledge', question: 'How well does the team know the business industry?'  },
  { value: 3, name: 'Competent', weight: 5, inputSource: 'teamIndustryKnowledge', question: 'How well does the team know the business industry?'  },
  { value: 2, name: 'Developing', weight: 5, inputSource: 'teamIndustryKnowledge', question: 'How well does the team know the business industry?'  },
  { value: 1, name: 'Beginner', weight: 5, inputSource: 'teamIndustryKnowledge', question: 'How well does the team know the business industry?'  },
];

export const teamTime : Dropdowns[] = [
  { value: 1, name: '8 hours or less', weight: 5, inputSource: 'teamTime', question: 'How much time do most team members have to dedicate to the business per week?'},
  { value: 2, name: '9-16 hours', weight: 5, inputSource: 'teamTime', question: 'How much time do most team members have to dedicate to the business per week?'  },
  { value: 3, name: '17-24 hours', weight: 5, inputSource: 'teamTime', question: 'How much time do most team members have to dedicate to the business per week?'  },
  { value: 4, name: '25-32 hours', weight: 5, inputSource: 'teamTime', question: 'How much time do most team members have to dedicate to the business per week?' },
  { value: 5, name: '33-40 hours or more', weight: 5, inputSource: 'teamTime', question: 'How much time do most team members have to dedicate to the business per week?'  },
];

export const teamNetwork : Dropdowns[] = [
  { value: 5, name: 'A great deal', weight: 5,  inputSource: 'teamNetwork', question: 'What is the ability of the team to develop or sell the product or service through its network?'  },
  { value: 3, name: 'Moderately', weight: 5,  inputSource: 'teamNetwork', question: 'What is the ability of the team to develop or sell the product or service through its network?'  },
  { value: 1, name: 'Not at all', weight: 5,  inputSource: 'teamNetwork', question: 'What is the ability of the team to develop or sell the product or service through its network?'  },
];

export const teamTimeManage : Dropdowns[] = [
  { value: 5, name: 'Extremely Well', weight: 5, inputSource: 'teamTimeManage', question: 'How often does the team encounter internal dysfunction or unproductivity?'  },
  { value: 3, name: 'Moderately Well', weight: 5, inputSource: 'teamTimeManage', question: 'How often does the team encounter internal dysfunction or unproductivity?'  },
  { value: 1, name: 'Not at all Well', weight: 5, inputSource: 'teamTimeManage', question: 'How often does the team encounter internal dysfunction or unproductivity?'  },
];

export const teamUnproductivity : Dropdowns[] = [
  { value: 1, name: 'Always or often', weight: 5, inputSource: 'teamUnproductivity', question: 'How often does the team encounter internal dysfunction or unproductivity?' },
  { value: 3, name: 'Sometimes', weight: 5, inputSource: 'teamUnproductivity', question: 'How often does the team encounter internal dysfunction or unproductivity?'  },
  { value: 5, name: 'Rarely or never', weight: 5, inputSource: 'teamUnproductivity', question: 'How often does the team encounter internal dysfunction or unproductivity?'  },
];

export const teamPassion : Dropdowns[] = [

  { value: 5, name: 'Extremely passionate', weight: 5,  inputSource: 'teamPassion', question: 'How passionate is the team about the business?'},
  { value: 3, name: 'Moderately passionate', weight: 5,  inputSource: 'teamPassion', question: 'How passionate is the team about the business?'  },
  { value: 1, name: 'Not at all passionate', weight: 5,  inputSource: 'teamPassion', question: 'How passionate is the team about the business?'  },
];

export const teamWorkLife : Dropdowns[] = [
  { value: 5, name: 'Extremely well',  weight: 5,  inputSource: 'teamWorkLife', question: 'How is the team`s work-life balance?' },
  { value: 3, name: 'Moderately well', weight: 5, inputSource: 'teamWorkLife', question: 'How is the team`s work-life balance?'  },
  { value: 1, name: 'Not well or does not exist', weight: 5, inputSource: 'teamWorkLife', question: 'How is the team`s work-life balance?'  },
];

export const teamHiring = [
  { name: 'Yes' },
  { name: 'No or not right now' },
];

export const hrEmployeeRetention: Dropdowns[] =[
  { value: 1, name: 'Competitive Wages', weight: 1, inputSource:'hrEmployeeRetention', question: 'What do you currently do to foster company culture and team member retention?' },
  { value: 1, name: '401K and insurance benefits',  weight: 1, inputSource:'hrEmployeeRetention', question: 'What do you currently do to foster company culture and team member retention?' },
  { value: 1, name: 'Company lunches, gatherings or outings',  weight: 1, inputSource:'hrEmployeeRetention', question: 'What do you currently do to foster company culture and team member retention?' },
  { value: 1, name: 'Friendly onboarding process',  weight: 1, inputSource:'hrEmployeeRetention', question: 'What do you currently do to foster company culture and team member retention?' },
  { value: 1, name: 'Company swag',  weight: 1, inputSource:'hrEmployeeRetention', question: 'What do you currently do to foster company culture and team member retention?' },
  { value: 1, name: 'Commuter benefit',  weight: 1, inputSource:'hrEmployeeRetention', question: 'What do you currently do to foster company culture and team member retention?' },
  { value: 1, name: 'Morally supportive environment',  weight: 1, inputSource:'hrEmployeeRetention', question: 'What do you currently do to foster company culture and team member retention?' },
  { value: 1, name: 'Continuing Education supplementation/sponsorship',  weight: 1, inputSource:'hrEmployeeRetention', question: 'What do you currently do to foster company culture and team member retention?' },
  { value: 1, name: 'Bonuses',  weight: 1, inputSource:'hrEmployeeRetention', question: 'What do you currently do to foster company culture and team member retention?' },
  { value: 1, name: 'Other',  weight: 1, inputSource:'hrEmployeeRetention', question: 'What do you currently do to foster company culture and team member retention?' },
];

export const boolAnswer = [
  { name: 'Yes' },
  { name: 'No' }];

export const  teamLeaderSerialEntrp = [
  { value: 1, name: 'Yes', inputSource:'teamLeaderSerialEntrp', question:'Has anyone on the core or executive team started or managed a business before??' },
  { value: 0, name: 'No', inputSource:'teamLeaderSerialEntrp', question:'Has anyone on the core or executive team started or managed a business before?' }
];

export const hirePract: Dropdowns[] =[
  {name: 'Does not have', value: 0, weight: 2, inputSource:'hiringPractices', question:'What is your level of quality and comfortability for these hiring practices?'},
  {name: 'Needs work', value: 1, weight: 2, inputSource:'hiringPractices', question:'What is your level of quality and comfortability for these hiring practices?'},
  {name: 'Good to go', value: 2, weight: 2, inputSource:'hiringPractices', question:'What is your level of quality and comfortability for these hiring practices?'}
];

export const hiringPractices = [
  {name: 'Interviewing', subCategory: 'hiringPracticesInterviewing'},
  {name: 'Job Descriptions', subCategory: 'hiringPracticesJobDescrp'},
  {name: 'Onboarding Process', subCategory: 'hiringPracticesOnboarding'},
  {name: 'HR/employee Maintenance', subCategory: 'hiringPracticesHR'},
]

export const noneAboveTeamRole = [
  { value: 0, name: "None of the above", weight: 5, inputSource: 'teamRole', question: 'What skills are your team strong in?' }
]


export const noneAbove = [
  { value: 0, name: "None of the above", weight: 1}
]
