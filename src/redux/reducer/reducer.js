import * as types from '../type/types';

const initialState = {
    isUser : false,
    userData : null

}

const personalReducer = (state = initialState, action) => {
    switch(action.type){
        case types.LOGIN:
            return{
                ...state,
                isUser : true,
                userData : action.data
            }
            break;
        case types.LOGOUT:
            return{
                ...state,
                isUser : false,
                userData : null
            }
            break;
        default:
            return state;
    }
}

export default personalReducer;