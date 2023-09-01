import { TableRow, TableCell } from "@mui/material";
import { Item } from "../App";

const websiteRegex =
  /([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/gim;
const phoneRegex = /(\s{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}.?$/g;
const emailRegex = /([a-zA-Z0-9+._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gm;

interface Props {
  businesses: Item[];
  categories: string[];
}

const BusinessRow = (lists: Props) => {
  return lists.businesses.map((business: Item) => {
    const discount = business.discount;
    const emails = discount.match(emailRegex);
    const phoneNumbers = discount.match(phoneRegex);
    const websites = discount.match(websiteRegex);
    if (lists.categories.indexOf(business.category) === -1) {
      lists.categories.push(business.category);
    }
    return (
      <TableRow key={business.name}>
        <TableCell>{business.name}</TableCell>
        <TableCell>{discount}</TableCell>
        <TableCell>
          {phoneNumbers &&
            phoneNumbers.map((num) => {
              return (
                <div>
                  <a href={`tel:${num}`}>{num}</a>
                </div>
              );
            })}
          {emails &&
            emails.map((email) => {
              return (
                <div>
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
              );
            })}
          {websites &&
            websites.map((site) => {
              const website = site.includes("http") ? site : `http://${site}`;
              const isWebsite = site.length > 4;
              if (isWebsite && !site.includes("http")) {
                return (
                  <a target="_blank" rel="noopener noreferrer" href={website}>
                    {website}
                  </a>
                );
              }
            })}
        </TableCell>
      </TableRow>
    );
  });
};

export default BusinessRow;
