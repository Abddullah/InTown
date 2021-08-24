import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    error: {},
    user: null,
    uidAndPhone: {},
    allContacts: [],
    loader: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.SHOW_ERROR:
            return ({
                ...state,
                error: action.payload
            })
        case ActionTypes.USER:
            return ({
                ...state,
                user: action.payload
            })
        case ActionTypes.VERIFICATION_PHONEID_AND_UID:
            return ({
                ...state,
                uidAndPhone: action.payload
            })
        case ActionTypes.ALL_CONTACTS:
            return ({
                ...state,
                allContacts: action.payload
            })
        case ActionTypes.INITIALIZE_STATES:
            return ({
                ...state,
                error: {},
                user: null,
                uidAndPhone: {},
                allContacts: []
            })
        case ActionTypes.HIDE_ERROR:
            return ({
                ...state,
                error: {},

            })
        case ActionTypes.LOADER_START:
            return ({
                ...state,
                loader: true,
            })

        case ActionTypes.LOADER_STOP:
            return ({
                ...state,
                loader: false,
            })


        default:
            return state;
    }

}