//action types created and exported
export const CREATE = "Add new picture";
export const READ = "Fetch all pictures";
export const UPDATE = "Update picture";
export const DELETE = "Delete picture";

//dispatched when picture needs to be created
export const createpicture = (picture) => ({
  type: CREATE,
  payload: { picture }
})

//dispatched when all the pictures stored in redux store needs to be read
export const readpictures = () => ({
  type: READ
})

//dispatched when certain picture needs to be updated
export const updatepicture = (picture) => ({
  type: UPDATE,
  payload: { picture }
})

//dispatched when certain picture needs to be removed from redux store
export const deletepicture = (id) => ({
  type : DELETE,
  payload : { id }
})