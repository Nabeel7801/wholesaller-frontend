import http from '../http-common';

class userService {
  commonPostService(route, data) {
    return http.post(route, data);
  }
  commonGetService(route, data) {
    return http.get(route, data);
  }
}

export default new userService();
