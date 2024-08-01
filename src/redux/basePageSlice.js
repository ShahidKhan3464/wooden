import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
    locations: "[locations] Action",
    owners: "[owners] Action",
    assignedEmployees: "[assignedEmployees] Action",
    allPropertySearchType: "[allPropertySearchType] Action",
    allAmenties: "[allAmenties] Action",
    allLeads: "[allLeads] Action",
    leadVarificationStatus: "[leadVarificationStatus] Action",
    leadsSources: "[leadsSources] Action",
    leadProfessions: "[leadProfessions] Action",
    allCountries: "[allCountries] Action",
    allStates: "[allStates] Action",
    allZipCodes: "[allZipCodes] Action",
    employeeTitle: "[employeeTitle] Action",
    allRoles: "[allRoles] Action",
    
};

const initialAuthState = {
    locations: null,
    owners: null,
    assignedEmployees: null,
    allPropertySearchType: null,
    allAmenties: null,
    allLeads: null,
    leadVarificationStatus: null,
    leadsSources: null,
    leadProfessions: null,
    allCountries: null,
    allStates: null,
    allZipCodes: null,
    employeeTitle: null,
    allRoles : null
    
};

export const basePageSlice = persistReducer(
    { storage, key: "locations", whitelist: ["locations", "locations"] },
    (state = initialAuthState, action) => {
        switch (action.type) {
            case actionTypes.locations: {
                return { ...state ,  locations: action.payload }
            }
            case actionTypes.owners: {
                return { ...state, owners: action.payload }
            }
            case actionTypes.assignedEmployees: {
                return { ...state, assignedEmployees: action.payload }
            }
            case actionTypes.allPropertySearchType: {
                return { ...state, allPropertySearchType: action.payload }
            }
            case actionTypes.allAmenties: {
                return { ...state, allAmenties: action.payload }
            }
            case actionTypes.allLeads: {
                return { ...state, allLeads: action.payload }
            }
            case actionTypes.leadVarificationStatus: {
                return { ...state, leadVarificationStatus: action.payload }
            }
            case actionTypes.leadsSources: {
                return { ...state, leadsSources: action.payload }
            }
            case actionTypes.leadProfessions: {
                return { ...state, leadProfessions: action.payload }
            }
            case actionTypes.allCountries: {
                return { ...state, allCountries: action.payload }
            }
            case actionTypes.allStates: {
                return { ...state, allStates: action.payload }
            }
            case actionTypes.allZipCodes: {
                return { ...state, allZipCodes: action.payload }
            }
            case actionTypes.employeeTitle: {
                return { ...state, employeeTitle: action.payload }
            }
            case actionTypes.allRoles: {
                return { ...state, allRoles: action.payload }
            }
            default:
                return state;
        }
    }
);

export const actions = {
    locations: (data) => ({ type: actionTypes.locations, payload: data }),
    owners: (data) => ({ type: actionTypes.owners, payload: data }),
    assignedEmployees: (data) => ({ type: actionTypes.assignedEmployees, payload: data }),
    allPropertySearchType: (data) => ({ type: actionTypes.allPropertySearchType, payload: data }),
    allAmenties: (data) => ({ type: actionTypes.allAmenties, payload: data }),
    allLeads: (data) => ({ type: actionTypes.allLeads, payload: data }),
    leadVarificationStatus: (data) => ({ type: actionTypes.leadVarificationStatus, payload: data }),
    leadsSources: (data) => ({ type: actionTypes.leadsSources, payload: data }),
    leadProfessions: (data) => ({ type: actionTypes.leadProfessions, payload: data }),
    allCountries: (data) => ({ type: actionTypes.allCountries, payload: data }),
    allStates: (data) => ({ type: actionTypes.allStates, payload: data }),
    allZipCodes: (data) => ({ type: actionTypes.allZipCodes, payload: data }),
    employeeTitle: (data) => ({ type: actionTypes.employeeTitle, payload: data }),
    allRoles: (data) => ({ type: actionTypes.allRoles, payload: data }),
    
};

export function* saga() {
    yield takeLatest(actionTypes.locations, function* locationSaga() {
        yield put(actions.locations());
    });
    yield takeLatest(actionTypes.owners, function* locationSaga() {
        yield put(actions.owners());
    });
    yield takeLatest(actionTypes.assignedEmployees, function* locationSaga() {
        yield put(actions.assignedEmployees());
    });
    yield takeLatest(actionTypes.allPropertySearchType, function* locationSaga() {
        yield put(actions.allPropertySearchType());
    });

    yield takeLatest(actionTypes.allAmenties, function* locationSaga() {
        yield put(actions.allAmenties());
    });
    yield takeLatest(actionTypes.allLeads, function* locationSaga() {
        yield put(actions.allLeads());
    });
    yield takeLatest(actionTypes.leadVarificationStatus, function* locationSaga() {
        yield put(actions.leadVarificationStatus());
    });
    yield takeLatest(actionTypes.leadsSources, function* locationSaga() {
        yield put(actions.leadsSources());
    });
    yield takeLatest(actionTypes.leadProfessions, function* locationSaga() {
        yield put(actions.leadProfessions());
    });

    yield takeLatest(actionTypes.allCountries, function* locationSaga() {
        yield put(actions.allCountries());
    });
    yield takeLatest(actionTypes.allStates, function* locationSaga() {
        yield put(actions.allStates());
    });
    yield takeLatest(actionTypes.allZipCodes, function* locationSaga() {
        yield put(actions.allZipCodes());
    });
    yield takeLatest(actionTypes.employeeTitle, function* locationSaga() {
        yield put(actions.employeeTitle());
    });
    yield takeLatest(actionTypes.allRoles, function* locationSaga() {
        yield put(actions.allRoles());
    });
}
