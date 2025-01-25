export enum ProjectStatus {
  SIGN_UP = "报名中",
  IN_PROGRESS = "进行中",
  FINISHED = "已结束",
  UNKNOWN = "未知",
}

export interface ProjectInfo {
  title: string;
  description?: string;
  githubUrl?: string;
  pageUrl: string;
  startDate: string;
  endDate: string;
  tags?: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  organizer: string;
  organizerDescription: string;
  tags: string[];
  timeline: {
    registration: {
      start: string;
      end: string;
    };
    learning: {
      start: string;
      end: string;
    };
  };
  content: {
    week: string;
    time: string;
    content: string[];
  }[];
  participants: {
    name: string;
    status: boolean[];
  }[];
}
