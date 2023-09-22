export interface IAfiliateCreate {
  name: string;
  lastName: string;
  grade: string;
  email?: string;
  numberPhone?: string;
  address?: string;
  imageUrl: afiliateImage;
  jobAddress: string;
  position: string;
  antiquity: string;
}

export interface IAfiliate {
  _id: string;
  name: string;
  lastName: string;
  grade: string;
  email?: string;
  numberPhone?: string;
  address?: string;
  imageUrl: afiliateImage;
  jobAddress: string;
  position: string;
  antiquity: string;
  state: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type afiliateImage = {
  publicId: string;
  url: string;
};
