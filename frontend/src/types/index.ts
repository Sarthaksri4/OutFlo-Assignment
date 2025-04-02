export interface Campaign {
    _id?: string;
    name: string;
    description: string;
    status: 'ACTIVE' | 'INACTIVE' | 'DELETED';
    leads: string[];
    accountIDs: string[];
  }
  
  export interface LinkedInProfile {
    name: string;
    jobTitle: string;
    company: string;
    location: string;
    summary: string;
  }
  
  export interface MessageResponse {
    message: string;
  }