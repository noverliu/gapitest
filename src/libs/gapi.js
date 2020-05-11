import google from 'googleapis'
const apikey='AIzaSyCoT4aKakBNKfOuy7qT_b_08cM1MNX_qpU'


const entitySearch=new google.kgsearch_v1.Resource$Entities({
    key:apikey
})

export default entitySearch;
