const API = {
    getPhotos: (page) => fetch(`https://api.unsplash.com/search/photos?page=${page}&query=hunting`, {
        method: 'GET',
        headers: { Authorization: 'Client-ID uz9K2g4ajtfs9035pk5hpGWC6qOgY2QieglQYddAeNM' }
    })
}

export default API;