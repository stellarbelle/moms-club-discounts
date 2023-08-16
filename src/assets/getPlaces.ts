import list from "./list.txt?raw";
// import axios from "axios";

interface Item {
  name: string;
  category: string;
  discount: string;
}

const categoryList: string[] = [];

// const fetchData = async (name: string) => {
//   let place: any = {};
//   const baseURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name}&key={apiKey}`;
//   await axios
//     .get(baseURL)
//     .then((response: any) => {
//       place = response.data;
//     })
//     .catch();
//   console.log("place: ", place);

//   return place;
// };

export const itemList = () => {
  let itemList: string[] | Item[];
  let category: string;
  itemList = list.split("\n").map((item: string) => {
    const newItem: string[] = item.split("- ");
    if (!newItem[1]) {
      category = newItem[0];
      if (category && categoryList.indexOf(category) === -1) {
        categoryList.push(category);
      }
    }
    // else {
    //   const name = newItem[0];
    //   const place = fetchData(name);
    // }
    return {
      name: newItem[0],
      discount: newItem[1],
      category,
    };
  });
  itemList = itemList.filter((item: Item) => {
    if (item.discount) return item;
  });
  return itemList;
};
