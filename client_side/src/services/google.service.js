import axios from 'axios';

const mapToken = 'AIzaSyA_hy3y7YHkmBPghmhXam_uKBrnQvcblJk';

const apis = {
  // Google service
  findPlaceFromLatLng: `https://maps.googleapis.com/maps/api/geocode/json?latlng={{latlng}}&key=${mapToken}&language=vi`,
};

export const findPlaceFromLatLng = latlng => axios({
  url: apis.findPlaceFromLatLng.replace('{{latlng}}', latlng),
  method: 'GET',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
