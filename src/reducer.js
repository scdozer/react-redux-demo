import ActionConstants from './ActionConstants';
//This is a reducer file, in projects we're going to call it a duck (re-duck, get it?!)
//We put all action builders and the reducer function in here.
//We can make as many reducers as we want, in as many files as we want to split up our code in easier to understand chunks.

const {
  UPDATE_NAME,
  ADD_PERSON,
  UPDATE_EXCITEMENT_LEVEL,
  GET_PEOPLE} = ActionConstants;

// export function getPeople() {
//     return {
//         type: GET_PEOPLE,
//         payload: axios.get('URL TO GET PEOPLE')
//         //PROMISE MIDDLEARE DOES THIS PART FOR YOU
//         //payload.then(function(response){
//         // redux.dispatcher.dispatch(GET_PEOPLE + "_FULLFILLED", response)
//         // })//
//     }
// }

let initialState = {
    people: [{
        name: "Sleepy",
        age: 7
    }],
    markExcitementLevel: 100
}
//REDUCER
export default function (state = initialState, action) {
  let data;
    switch (action.type) {
        case UPDATE_NAME:
            return Object.assign({}, state, { name: action.name })
        case ADD_PERSON:
            let peopleCopy = state.people.slice();
            let { name, age } = action;
            peopleCopy.push({ name, age });
            return Object.assign({}, state, { people: peopleCopy });
            //or return {...state, people:peopleCopy};
        case GET_PEOPLE + "_PENDING":
            //FROM REDUX-PROMISE-MIDDLEWARE
            //This action is fired when the promise starts, but isn't done.
            return Object.assign({}, state, { isLoading: true })
            //Most common case is to set a loading state
            break;
        case GET_PEOPLE + "_FULFILLED":
            //FROM REDUX-PROMISE-MIDDLEWARE
            //This action is fired when promise returns the data.
            data = action.payload //The response data is found here put it on state or do stuff
            let status = action.status //This is the http status code IE - 200, 404, 500
            return data;
        case GET_PEOPLE + "_REJECTED":
            //FROM REDUX-PROMISE-MIDDLEWARE
            //This action is fired when promise returns but was broken/unfulfilled
            data = action.payload
            return data;
        case UPDATE_EXCITEMENT_LEVEL:
            return Object.assign({}, state, { markExcitementLevel: state.markExcitementLevel + 100})
    }

    return state;
}
