import { categoryConstants } from "../actions/constants";

const initState = {
  categories: [],
  loading: false,
  error: null,
  category: {},
};
const updateNewCategories = (categories, newCategory, newCategories = []) => {
  if (newCategory.parentId == undefined) {
    return [
      ...categories,
      {
        _id: newCategory._id,
        name: newCategory.name,
        slug: newCategory.slug,
        type: newCategory.type,
        children: [],
      },
    ];
  }
  for (let category of categories) {
    if (category._id + "" === newCategory.parentId + "") {
      newCategories.push({
        ...category,
        children:
          category.children && category.children.length > 0
            ? [...category.children, newCategory]
            : [newCategory],
      });
    } else {
      newCategories.push({
        ...category,
        children: category.children
          ? updateNewCategories(category.children, newCategory)
          : [],
      });
    }
  }
  return newCategories;
};
const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.GET_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        category: action.payload,
      };
      break;
    case categoryConstants.GET_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case categoryConstants.GET_ALL_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        categories: action.payload.categories,
      };
      break;
    case categoryConstants.GET_ALL_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case categoryConstants.ADD_CATEGORY_REQUEST:
      state = {
        ...state,

        loading: true,
      };
      break;
    case categoryConstants.ADD_CATEGORY_SUCCESS:
      const updatedCategories = updateNewCategories(
        state.categories,
        action.payload.category
      );
      state = {
        ...state,
        categories: updatedCategories,
        loading: false,
      };
      break;
    case categoryConstants.ADD_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case categoryConstants.UPDATE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.UPDATE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case categoryConstants.UPDATE_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case categoryConstants.DELETE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.DELETE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case categoryConstants.DELETE_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    default:
      state = {
        ...state,
      };
  }
  return state;
};
export default categoryReducer;
