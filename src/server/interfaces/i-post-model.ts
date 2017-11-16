export interface IPostModel {
  id?: string;
  title: string;
  content: string;
  authorId: string;
  posted: boolean;
  postedAt: Date;
  archived: boolean;
  archivedAt: Date;
}
