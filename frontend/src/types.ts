export interface Email {
  id?: number;
  user_id?: number;
  recipient: string;
  subject?: string;
  body: string;
  spam_score?: number;
  delivered?: boolean;
  created_at?: Date;
}
