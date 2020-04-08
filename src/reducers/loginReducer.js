import {GET_LOGIN_STATUS} from "../actions/loginActions";

const initialState = {
    login: 'false'
}


const loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_LOGIN_STATUS:
            return  {
                login: action.getLoginStatus
            }
        default:
            return state
    }


}


export default loginReducer
