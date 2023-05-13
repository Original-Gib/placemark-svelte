// @ts-nocheck
import axios from "axios";
import { user } from "../stores";
import { category } from "../stores";
import { goto } from "$app/navigation";

export const placemarkService = {
    baseUrl: "http://localhost:4000",

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

    async logout() {
        user.set({
            email: "",
            token: "",
          });
        axios.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem("placemark");
    },

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

    async createCategory(categoryName){
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

    async getCategories(){
        try{
            const response = await axios.get(this.baseUrl + "/api/categories");
            if (response.data.success){
                category.set({
                    categoryName: categoryName,
                    _id: _id
                });
            }
            return response.data;
        } catch (error){
            return [];
        }
    },

    async deleteCategory(categoryId){
        const urlCategoryId = categoryId;
        try{
            console.log("Attempting to delete category with ID: " + urlCategoryId)
            const response = await axios.delete(this.baseUrl + "/api/categories/" + urlCategoryId);
            goto("/dashboard");
            return response.status;
        } catch (error){
            console.log("Unable to delete category ID: " + urlCategoryId);
        }
    },

    async getPlacemarks(categoryId){
        const urlCategoryId = categoryId;
        try{
            console.log("attempting placemark fetch")
            const response = await axios.get(this.baseUrl + "/api/categories/" + urlCategoryId);
            console.log(response.data.placemarks);
            return response.data.placemarks;
        } catch (error){
            return [];
        }
    },

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
