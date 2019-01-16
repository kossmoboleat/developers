import shortId from 'shortid';

export default (id=shortId.generate()) =>
  `https://api.uport.space/chasqui/topic/${id}`
