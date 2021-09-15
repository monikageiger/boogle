const axios = require("axios");


class GoogleBookApi {
    constructor(baseURL = "https://www.googleapis.com/books/v1") {
        this.baseURL = baseURL
        this.API = process.env.BOOKAPI
        this.api = axios.create({
            baseURL: process.env.API_URL
        })
    }


    getAllBooks = (params) => this.api.get(`https://www.googleapis.com/books/v1/volumes`, {
        params: params
    })

    getBookById = (id) => {
        return this.api.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
            .then(response => {
                return response;
            })
    }


}

module.exports = GoogleBookApi;