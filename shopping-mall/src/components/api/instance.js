import axios from "axios";

export default function instance() {
  return axios.create({
    baseURL: "https://fakestoreapi.com/products",
  });
}
