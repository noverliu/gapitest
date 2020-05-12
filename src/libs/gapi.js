import google from 'gapi'
const apikey='AIzaSyCoT4aKakBNKfOuy7qT_b_08cM1MNX_qpU'


export function loadClient() {
    google.client.setApiKey(apikey);
    return google.client.load("https://kgsearch.googleapis.com/$discovery/rest?version=v1")
  }
  // Make sure the client is loaded before calling this method.
export function execute(opt) {
    return google.client.kgsearch.entities.search(opt)
  }
  google.load("client");

export default google;