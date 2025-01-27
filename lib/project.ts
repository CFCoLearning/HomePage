export enum ProjectStatus {
  SIGN_UP = "报名中",
  IN_PROGRESS = "进行中",
  FINISHED = "已结束",
  UNKNOWN = "未知",
}

export const GetStatusColor = (status: ProjectStatus) => {
  switch (status) {
    case ProjectStatus.SIGN_UP:
      return "bg-RoyalBlue-950/50 text-RoyalBlue-400 border-RoyalBlue-400/30";
    case ProjectStatus.IN_PROGRESS:
      return "bg-MutedSage-950/50 text-MutedSage-400 border-MutedSage-400/30";
    case ProjectStatus.FINISHED:
      return "bg-DeepCharcoal-950/50 text-DeepCharcoal-400 border-DeepCharcoal-400/30";
    default:
      return "bg-OliveGray-950/50 text-OliveGray-400 border-OliveGray-400/30";
  }
};

export interface ProjectInfo {
  title: string;
  description?: string;
  githubUrl?: string;
  pageUrl: string;
  startDate: string;
  endDate: string;
  tags?: string[];
}

export interface ProjectDetail {
  id: string;
  hero_image_url?: string;
  github_url?: string;
  title: string;
  description: string;
  initiator: string; // 发起者 GitHub 用户名
  status?: ProjectStatus;
  tags: string[];
  content: string[]; // 学习内容
  timeline: ProjectTimeline; // 时间安排
  learningFormat?: string[]; // 学习形式
  materials?: string[]; // 学习资料
  suitable?: string[]; // 适合人群
  gains?: string[]; // 收获
  participants?: ParticipantProgress[]; // 参与者打卡
}

export interface ProjectTimeline {
  registration: {
    start: string;
    end: string;
  };
  learning: {
    start: string;
    end: string;
  };
}

export interface ParticipantProgress {
  name: string;
  status: ParticipantStatus[];
}

export enum ParticipantStatus {
  COMPLETED = "已完成",
  IMCOMPLETE = "未完成",
  FAILED = "失败",
}
