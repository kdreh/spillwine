export interface SubIndustry {
  subIndustryId: string;
  subIndustryName: string;
}

export interface Industry {
  industryId: string;
  industryName: string;
  subIndustries: SubIndustry[];
}
export interface DistributionChannel {
  channelId: string;
  channelName: string;
}

export interface SimpleIndustry {
  industryId: string;
  industryName: string;
}
