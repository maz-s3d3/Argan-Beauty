// src/store/suprimeArticle.js
import * as actionTypes from "./actionTypes";

export const suprimeArticle = id => ({
  type: actionTypes.REMOVE_ARTICLE,
  articleId: id,
});
