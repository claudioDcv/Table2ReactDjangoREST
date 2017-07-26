import axios from 'axios';

const AjaxClass = () => {
    const request = function request(opt, callback) {
        axios(opt)
          .then((response) => {
              callback(response.data);
          });
    };
    return {
        request,
    };
};

export default new AjaxClass();
