import { Entry } from "./interfaces";

export const getFilteredResults = (elements: Entry[], query: string) => {
  if (!query) return elements;
  return elements.filter((element) => {
    return (
      element["im:artist"].label.toLowerCase().includes(query.toLowerCase()) ||
      element["im:name"].label.toLowerCase().includes(query.toLowerCase())
    );
  });
};
