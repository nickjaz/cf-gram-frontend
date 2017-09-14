export default (state=[], action) => {
  let {type, payload} = action;

  switch(type) {
    case 'PHOTO_SET' :
      return payload;
    case 'PHOTO_CREATE' :
      return [payload, ...state];
    case 'PHOTO_UPDATE' :
      return state.map(photo => photo._id === payload._id ? payload : photo);
    case 'PHOTO_DELETE' :
      return state.filter(photo => photo._id !== payload._id);
    case 'LOGOUT' :
      return [];
    default :
      return state;
  }
}
