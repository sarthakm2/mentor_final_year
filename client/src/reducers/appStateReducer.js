import { 
  HANDLE_DIALOG_STATE,
  LOADING,
  SNACKBAR_STATE,
  DRAWER_STATE,
 } from "../store/types";

const initialState = {
  signinDialogOpen: false,
  signupDialogOpen: false,
  instructionsDialogOpen: false,
  timeupDialogOpen: false,
  drawerOpen: false,
  loading: false,
  snackbar: {
    open: false,
    type: "",
    message: ""
  },
}

export default function(state = initialState, action) {
  switch(action.type) {
    case HANDLE_DIALOG_STATE: {
      return {
        ...state,
        [action.payload.type]: action.payload.open
      }
    }    

    case LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }

    case SNACKBAR_STATE: {
      return {
        ...state,
        snackbar: {
          open: action.payload.open,
          type: action.payload.type,
          message: action.payload.message
        }
      }
    }

    case DRAWER_STATE: {
      return {
        ...state,
        drawerOpen: action.payload
      }
    }

    default:
      return state;
  }
}