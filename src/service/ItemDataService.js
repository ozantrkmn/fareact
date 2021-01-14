import axios from 'axios'

const ITEM_API_URL = 'http://localhost:8080'

class ItemDataService {

    retrieveAllItems() {
        //console.log('executed service')
        return axios.get(`${ITEM_API_URL}/items/`);
    }

    retrieveItem(id) {
        //console.log('executed service')
        return axios.get(`${ITEM_API_URL}/items/${id}`);
    }

    deleteItem(id) {
        //console.log('executed service')
        return axios.delete(`${ITEM_API_URL}/items/${id}`);
    }

    updateItem(id, item) {
        //console.log('executed service')
        return axios.put(`${ITEM_API_URL}/items/${id}`, item);
    }

    createItem(item) {
        //console.log('executed service')
        return axios.post(`${ITEM_API_URL}/items/`, item);
    }

    retrieveAllWeather() {
        //console.log('executed service')
        return axios.get(`${ITEM_API_URL}/weathers/`);
    }
}

export default new ItemDataService()