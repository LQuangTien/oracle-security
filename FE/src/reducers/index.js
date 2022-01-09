import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
// import categoryReducer from "./category.reducers";
// import productReducer from "./product.reducers";
import userReducer from "./user.reducers";
import profileReducer from "./profile.reducers";
import roleReducer from "./role.reducers";
import privilegeReducer from "./privilege.reducers";
// import orderReducer from "./order.reducers";
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  profile: profileReducer,
  role: roleReducer,
  privilege: privilegeReducer,
  // categories: categoryReducer,
  // products: productReducer,
  // orders: orderReducer
});

export default rootReducer;
