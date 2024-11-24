export interface AttachedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  isDeleted?: boolean;
  file: File;
}
