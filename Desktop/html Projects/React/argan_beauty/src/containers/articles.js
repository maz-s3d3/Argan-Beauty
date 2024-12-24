import React from "react";
import { connect } from "react-redux";
import Article from "../components/Article";
import AddArticle from "../components/AddArticle";
import { addArticle } from "../store/actionCreators";
import { suprimeArticle } from "../store/suprimeArticle";

const Articles = ({ articles, saveArticle, deleteArticle }) => (
  <div>
    <AddArticle saveArticle={saveArticle} />
    {articles.map(article => (
      <div key={article.id}>
        <Article article={article} />
        <button onClick={() => deleteArticle(article.id)}>Delete</button>
      </div>
    ))}
  </div>
);

const mapStateToProps = state => ({
  articles: state.articles,
});

const mapDispatchToProps = dispatch => ({
  saveArticle: article => dispatch(addArticle(article)),
  deleteArticle: id => dispatch(suprimeArticle(id)), // Add this line
});

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
