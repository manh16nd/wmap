import axios from 'axios'

export const getLocation = (lat, lon) => new Promise((resolve, reject) => axios.get('https://apis.wemap.asia/geocode-3/api?key=ZpIVSmYKNucNvxlHgRFRVBuj&q=cau%20giay&lat' + lat + '&lon=' + lon)
    .then(resolve)
    .catch(reject))
