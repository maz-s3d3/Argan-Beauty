import * as actionTypes from "./actionTypes";

export const addArticle = article => ({
  type: actionTypes.ADD_ARTICLE,
  article,
});
