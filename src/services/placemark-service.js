
//imports
// @ts-nocheck
import axios from "axios";
import { user } from "../stores";
import { category } from "../stores";
import { goto } from "$app/navigation";

//declaring the placemark service export
export const placemarkService = {
    //defining the base url for the api calls 
    baseUrl: "https://placemark-api.onrender.com",

    //function to log the user in
    async login(email, password) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
            if (response.data.success) {
                user.set({
                    email: email,
                    token: response.data.token
                });
                localStorage.placemark = JSON.stringify({ email: email, token: response.data.token });
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    //function to log the user out
    async logout() {
        user.set({
            email: "",
            token: "",
        });
        axios.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem("placemark");
    },

    //function to signup the user
    async signup(firstName, lastName, email, password) {
        try {
            const userDetails = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            };
            await axios.post(this.baseUrl + "/api/users", userDetails);
            return true;
        } catch (error) {
            return false;
        }
    },

    //function to create a category
    async createCategory(categoryName) {
        try {
            const categoryDetails = {
                categoryName: categoryName
            };
            await axios.post(this.baseUrl + "/api/categories", categoryDetails);
            return true;
        } catch (error) {
            return false;
        }
    },

    //function to get all categories
    async getCategories() {
        try {
            const response = await axios.get(this.baseUrl + "/api/categories");
            if (response.data.success) {
                category.set({
                    categoryName: categoryName,
                    _id: _id
                });
            }
            return response.data;
        } catch (error) {
            return [];
        }
    },

    //function to delete a category
    async deleteCategory(categoryId) {
        const urlCategoryId = categoryId;
        try {
            console.log("Attempting to delete category with ID: " + urlCategoryId)
            const response = await axios.delete(this.baseUrl + "/api/categories/" + urlCategoryId);
            goto("/dashboard");
            return response.status;
        } catch (error) {
            console.log("Unable to delete category ID: " + urlCategoryId);
        }
    },

    //function to create a placemark
    async createPlacemark(categoryId, placemarkName, description, latitude, longitude) {
        const urlCategoryId = categoryId;
        try {
            const placemarkDetails = {
                placemarkName: placemarkName,
                description: description,
                latitude: latitude,
                longitude: longitude
            };
            await axios.post(this.baseUrl + "/api/categories/" + urlCategoryId + "/placemarks", placemarkDetails);
            return true;
        } catch (error) {
            return false;
        }
    },

    //function to get placemarks for a category
    async getPlacemarks(categoryId) {
        const urlCategoryId = categoryId;
        try {
            console.log("attempting placemark fetch")
            const response = await axios.get(this.baseUrl + "/api/categories/" + urlCategoryId);
            console.log(response.data.placemarks);
            return response.data.placemarks;
        } catch (error) {
            return [];
        }
    },

    //function to get all placemarks
    async getAllPlacemarks() {
        try {
            const response = await axios.get(this.baseUrl + "/api/placemarks")
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },

    //function to get a placemark by its ID
    async getPlacemark(placemarkId) {
        const urlPlacemarkId = placemarkId;
        try {
            console.log("Attempting to fetch info for placemark id: " + placemarkId);
            const response = await axios.get(this.baseUrl + "/api/placemarks/" + placemarkId);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            console.log("unable to fetch info for placemark Id: " + placemarkId);
        }
    },

    //function to upload an image
    async uploadImage(placemark) {
        const urlPlacemarkId = placemark._id;
        try {
            console.log("attempting uplaod of image");
            const imagePlacemark = {
                _id: placemark._id,
                placemarkName: placemark.placemarkName,
                description: placemark.description,
                latitude: placemark.latitude,
                longitude: placemark.longitude,
                img: placemark.img
            };
            const respose = await axios.patch(this.baseUrl + "/api/placemarks/" + urlPlacemarkId + "/uploadimage", imagePlacemark)
            console.log(response.data);
            return respose.data;
        } catch (error) {
            console.log(error);
        }
    },

    //function to delete a placemark
    async deletePlacemark(placemarkId) {
        const urlPlacemarkId = placemarkId;
        try {
            console.log("Attempting to delete placemark with ID: " + urlPlacemarkId)
            const response = await axios.delete(this.baseUrl + "/api/placemarks/" + urlPlacemarkId);
            return response.status;
        } catch (error) {
            console.log("Unable to delete placemark ID: " + urlPlacemarkId);
        }
    },

    //function to keep the user details set if the page is refreshed 
    reload() {
        const placemarkCredentials = localStorage.placemark;
        if (placemarkCredentials) {
            const savedUser = JSON.parse(placemarkCredentials);
            user.set({
                email: savedUser.email,
                token: savedUser.token
            });
            axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
        }
    }
};
