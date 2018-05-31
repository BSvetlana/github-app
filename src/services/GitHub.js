import axios from 'axios'

export default class Github {

    constructor() {
        axios.defaults.baseURL = 'https://api.github.com/users/'
        axios.defaults.headers.common['Authorization'] = `Bearer` + 'd51557e28cde06de54b64627dfa7f8fa3b99ee60'
    }

    getRepos(username) {
        return axios.get(`${username}/repos`)
    }

}

export const github = new Github();