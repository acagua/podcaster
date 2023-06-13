export interface Entry {
  "im:name": IMName;
  "im:image": IMImage[];
  summary: IMName;
  "im:price": IMPrice;
  "im:contentType": IMContentType;
  rights: IMName;
  title: IMName;
  link: Link;
  id: ID;
  "im:artist": IMArtist;
  category: Category;
  "im:releaseDate": IMReleaseDate;
}

interface Category {
  attributes: CategoryAttributes;
}

interface CategoryAttributes {
  "im:id": string;
  term: string;
  scheme: string;
  label: string;
}

interface ID {
  label: string;
  attributes: IDAttributes;
}

interface IDAttributes {
  "im:id": string;
}

interface IMArtist {
  label: string;
  attributes: IMArtistAttributes;
}

interface IMArtistAttributes {
  href: string;
}

interface IMContentType {
  attributes: IMContentTypeAttributes;
}

interface IMContentTypeAttributes {
  term: string;
  label: string;
}

interface IMImage {
  label: string;
  attributes: IMImageAttributes;
}

interface IMImageAttributes {
  height: string;
}

interface IMName {
  label: string;
}

interface IMPrice {
  label: string;
  attributes: IMPriceAttributes;
}

interface IMPriceAttributes {
  amount: string;
  currency: string;
}

interface IMReleaseDate {
  label: string;
  attributes: IMName;
}

interface Link {
  attributes: LinkAttributes;
}

interface LinkAttributes {
  rel: string;
  type: string;
  href: string;
}
