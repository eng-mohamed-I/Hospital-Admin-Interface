export interface Blog {
  _id: number;
  url?: string; // Optional, as it might not always be present
  Image?: { // Optional, as it might not always be present
    secure_url: string;
    public_id: string;
  };
  title: string;
  body: string;
}
