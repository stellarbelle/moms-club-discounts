import { TableRow, TableCell } from "@mui/material";
import { Item } from "../App";

const websiteRegex =
  /([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/gim;
const phoneRegex = /(\s{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}.?$/g;
const emailRegex = /([a-zA-Z0-9+._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gm;

const BusinessRow = ({ business }: { business: Item }) => {
  const discount = business.discount;
  const emails = discount.match(emailRegex);
  const phoneNumbers = discount.match(phoneRegex);
  const websites = discount.match(websiteRegex);
  return (
    <TableRow key={business.name}>
      <TableCell>{business.name}</TableCell>
      <TableCell>{discount}</TableCell>
      <TableCell>
        {phoneNumbers &&
          phoneNumbers.map((num, idx) => {
            return (
              <div key={`${num}${idx}`}>
                <a href={`tel:${num}`}>{num}</a>
              </div>
            );
          })}
        {emails &&
          emails.map((email, idx) => {
            return (
              <div key={`${email}${idx}`}>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            );
          })}
        {websites &&
          websites.map((site, idx) => {
            const website = site.includes("http") ? site : `http://${site}`;
            const isWebsite = site.length > 4;
            if (isWebsite && !site.includes("http")) {
              return (
                <a
                  key={`${website}${idx}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={website}
                >
                  {website}
                </a>
              );
            }
          })}
      </TableCell>
    </TableRow>
  );
};

export default BusinessRow;
