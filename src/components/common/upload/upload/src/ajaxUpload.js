import axios from 'axios';
import moment from 'moment';

console.log(moment().toISOString());

function getError(action, option, xhr) {
  let msg;
  if (xhr.response) {
    msg = `${xhr.status} ${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.status} ${xhr.responseText}`;
  } else {
    msg = `fail to post ${action} ${xhr.status}`;
  }

  const err = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = action;
  return err;
}

function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

export default function upload(option) {
  let dateLine = new Date().toUTCString();
  console.log(option.file);
  return axios({
    method: 'put',
    url: option.action + option.data.key,
    headers: {
      'Authorization': 'QS ' + option.data.access_key_id + ':' + option.data.signature,
      'x-qs-date': dateLine, // Wed, 10 Dec 2014 17:20:31 GMT
      'Content-Type': option.file.type
    },
    data: option.file,
    onUploadProgress: function (e, s, a) {
      console.log(e, s, a);
    }
  }).then(res => {
    console.log('res', res);
  });
}
