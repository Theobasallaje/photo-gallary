const API = {
    getPhotos: (page, color, orientation) => fetch(
        page && color ? `https://api.unsplash.com/search/photos?page=${page}&query=hunting&color=${color}` :
        page && color && orientation ? `https://api.unsplash.com/search/photos?page=${page}&query=hunting&color=${color}&orientation=${orientation}` :
        `https://api.unsplash.com/search/photos?page=${page}&query=hunting`, {
        method: 'GET',
        headers: { Authorization: 'Client-ID uz9K2g4ajtfs9035pk5hpGWC6qOgY2QieglQYddAeNM' }
    })
}

export default API;