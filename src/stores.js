import {writable} from "svelte/store";

export const user = writable({
  email: "",
  token: ""
});

export const category = writable({
  categoryName: "",
  _id: "",
});