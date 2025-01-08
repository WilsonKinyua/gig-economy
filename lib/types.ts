interface User {
  id: string;
  username: string;
  email: string;
  status: string;
  rating: string;
  gigs_count: number;
  role: string;
  created: string;
}

interface Tag {
  id: string;
  name: string;
  status: string;
}

interface Category {
  id: string;
  name: string;
  status: string;
}

interface Gigpricingplan {
  id: string;
  name: string;
  description: string;
  deliverytime: string;
  deliverytime_: number;
  revisions: number;
  price: string;
  price_: string;
  customdiscount: string;
  standarddiscount: string;
  status: string;
  deliverables: [];
}

export interface Mediafile {
  id: string;
  name: string;
  url: string;
  extension: string;
  title: string;
  description: string;
}

export interface Gigaddon {
  id: string;
}

export interface Faq {
  id: string;
}

export interface Gig {
  // Gig type details
  id: string;
  name: string;
  slug: string;
  status: string;
  description: string;
  lowestprice: string;
  favorites: number;
  created: string;
  created_: string;
  user: User;
  tags: Tag[];
  categories: Category[];
  gigpricingplans: Gigpricingplan[];
  mediafiles: Mediafile[];
  gigaddons: Gigaddon[];
  faqs: Faq[];
}
