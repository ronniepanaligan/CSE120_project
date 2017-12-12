import axios from 'axios';
import cookie from 'react-cookie';

export function fetchUser(uid) {
  var stuff = {}
  axios.get('/api/users/' + uid)
  .then((res) => {
    console.log(res.data);
    console.log(uid);
    stuff = res.data
    return
  })
  return stuff;
}
