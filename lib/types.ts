export type TimelineEvent = {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
  position: number;
  branchId?: string;
};

export type TimelineBranch = {
  id: string;
  anchorId: string;
  premise: string;
  events: TimelineEvent[];
};

export type BranchResponse = {
  premise: string;
  events: Array<Pick<TimelineEvent, "year" | "title" | "description">>;
};
