export interface Comic {
  id: number;
  thumbnail: {
    path: string;
    extension: string;
  };
  title: string;
}

export interface Hero {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}
