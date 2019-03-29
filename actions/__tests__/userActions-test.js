import * as userActions from "../userActions";
import { REACT_APP_API_URL } from "react-native-dotenv";
import { Alert } from "react-native";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const user = { name: "TestUser" };

// Async action tests
describe("user async actions", () => {
  let store;
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = mockStore({
      fetchingUser: false,
      fetchedUser: false,
      updatingUser: false,
      user: { countries: [] }
    });
  });

  afterEach(() => {
    mock.restore();
    store.clearActions();
  });

  it("dispatches FETCH_USER_FULFILLED after axios request", async () => {
    const token = "testtoken";
    mock
      .onGet(`${REACT_APP_API_URL}/api/v1/rest-auth/user/`)
      .replyOnce(200, user);
    await store.dispatch(userActions.fetchUser(token));
    const actions = store.getActions();
    expect(actions[0]).toEqual(userActions.fetchUserPending());
    expect(actions[1]).toEqual(userActions.fetchUserFulfilled(user));
  });

  it("dispatches FETCH_USER_REJECTED if internal server error & alerts", async () => {
    spy = jest.spyOn(Alert, "alert");
    const token = "testtoken";
    const data = { "internal server error": "" };
    mock
      .onGet(`${REACT_APP_API_URL}/api/v1/rest-auth/user/`)
      .replyOnce(500, data);
    await store.dispatch(userActions.fetchUser(token));
    const actions = store.getActions();
    expect(actions[0]).toEqual(userActions.fetchUserPending());
    expect(actions[1]).toEqual(userActions.fetchUserRejected());
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

// Action Creators
describe("User Action Creators", () => {
  it("should create a FETCH_USER_PENDING action", () => {
    const expectedAction = { type: "FETCH_USER_PENDING" };
    expect(userActions.fetchUserPending()).toEqual(expectedAction);
  });
  it("should create a FETCH_USER_FULFILLED action", () => {
    const expectedAction = {
      type: "FETCH_USER_FULFILLED",
      user
    };
    expect(userActions.fetchUserFulfilled(user)).toEqual(expectedAction);
  });
  it("should create a FETCH_USER_REJECTED action", () => {
    const expectedAction = { type: "FETCH_USER_REJECTED" };
    expect(userActions.fetchUserRejected()).toEqual(expectedAction);
  });
  it("should create a UPDATE_USER_PENDING action", () => {
    const expectedAction = { type: "UPDATE_USER_PENDING" };
    expect(userActions.updateUserPending()).toEqual(expectedAction);
  });
  it("should create a UPDATE_USER_FULFILLED action", () => {
    const expectedAction = {
      type: "UPDATE_USER_FULFILLED",
      user
    };
    expect(userActions.updateUserFulfilled(user)).toEqual(expectedAction);
  });
  it("should create a UPDATE_USER_REJECTED action", () => {
    const expectedAction = { type: "UPDATE_USER_REJECTED" };
    expect(userActions.updateUserRejected()).toEqual(expectedAction);
  });
});
