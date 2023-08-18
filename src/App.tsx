import { useState } from "react";
import list from "./assets/list.json";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  TextField,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Table,
  Paper,
} from "@mui/material";
import arrow from "../public/feathered-arrow.png";

export interface Item {
  name: string;
  category: string;
  discount: string;
  location: { lat: number; lng: number };
  address?: string;
  dist?: number;
  phone?: string;
}

const placeList = (list as Item[]).filter((place, index) => {
  const placeName = place.name;
  const isDupe =
    index ===
    list.findIndex((obj) => {
      return obj.name === placeName;
    });
  return isDupe;
});

const categoryList: string[] = [];

function App() {
  const [filteredList, setFilteredList] = useState<Item[]>(placeList);
  const [value, setValue] = useState<string>("");
  const [selected, setSelected] = useState<string>("");
  // const [center, setCenter] = useState();
  const getSelectedList = (value: string) => {
    setValue("");
    if (!value.length) return placeList;
    const updatedList = placeList.filter((item: Item) => {
      if (!value.length || value === "All") return item;
      if (item.category.indexOf(value) !== -1) {
        return item;
      }
    });
    setSelected(value);
    setFilteredList(updatedList);
  };
  const filterBySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setValue(query);
    setSelected("");
    const updatedList = placeList.filter((item: Item) => {
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
        return item;
      }
    });
    setFilteredList(updatedList);
  };

  const table = (
    <TableContainer sx={{ maxHeight: 440, width: "100%", overflow: "scroll" }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Business Name</TableCell>
            <TableCell>Discount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredList.map((item: Item) => {
            // let discount = item.discount;
            // const hasEmail = discount.match(
            //   /([a-zA-Z0-9+._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gm
            // );
            // const phoneNumber = discount.match(
            //   /^(\s{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}.?$/g
            // );

            // if (phoneNumber) {
            //   const arr = discount.split(phoneNumber[0]);
            //   console.log("phone: ", phoneNumber);
            //   discount =
            //     arr[0] +
            //     `<a html={href="tel:${phoneNumber[0]}"}>${phoneNumber[0]}</>` +
            //     arr[1];
            //   console.log("discount: ", discount);
            // }

            if (categoryList.indexOf(item.category) === -1) {
              categoryList.push(item.category);
            }
            return (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.discount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
  return (
    <>
      <div className="container">
        <h1>Suwanee Area Moms Club</h1>
        <img src={arrow} alt="feathered arrow" />
        <h2>Member Discount List</h2>
        <form>
          <p className="subheading">
            An easy way to find the discount you are looking for! Just search
            below!
          </p>
          <div className="search-text">Search Me!</div>
          <TextField
            id="search-box"
            type="search"
            label="Search"
            variant="outlined"
            onChange={filterBySearch}
            value={value}
          />
          <div className="search-text">
            Or select a category from the dropdown
          </div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selected}
              onChange={(event: SelectChangeEvent<string>) =>
                getSelectedList(event.target.value)
              }
              label="Category"
            >
              {categoryList.map((category: string, index: number) => {
                return (
                  <MenuItem
                    value={category}
                    key={index}
                    selected={selected === category}
                  >
                    {category}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </form>
        {/* <Map newCenter={center} /> */}
        <div className="list">{table || "Loading..."}</div>
      </div>
    </>
  );
}

export default App;
