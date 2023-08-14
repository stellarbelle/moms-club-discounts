import { useState } from "react";
import { itemList } from "./assets/getPlaces";
import list from "./assets/list.txt?raw";
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
import Map from "./MapContainer";

interface Item {
  name: string;
  category: string;
  discount: string;
  discount2?: string;
}

const categoryList: string[] = [];

function App() {
  const [filteredList, setFilteredList] = useState(itemList());
  const [value, setValue] = useState<string>("");
  const [selected, setSelected] = useState<string>("");

  const getSelectedList = (value: string) => {
    setValue("");
    if (!value.length) return list;
    const updatedList = itemList().filter((item: Item) => {
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
    const updatedList = itemList().filter((item: Item) => {
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
        return item;
      }
    });
    setFilteredList(updatedList);
  };

  const table = (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Business Name</TableCell>
              <TableCell>Discount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredList.map((item) => {
              return (
                <TableRow key={item.name}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {item.discount} {item.discount2 ? "-" : ""} {item.discount2}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
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
        <Map />
        <div className="list">{table || "Loading..."}</div>
      </div>
    </>
  );
}

export default App;
