import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      //   atricles: this.articles,
      articles: [],
      loading: true,
      page: 1,
    };
  }
  capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=20`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ loading: false });
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=20`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({ loading: false });
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
    console.log("this is component did mount function");
    console.log(this.state.articles);
    document.title = `${this.capitalize(this.props.category)} - NewsMonkey`;
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  render() {
    return (
      <div className="container my-3">
        <h2>News Monkey - Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          <InfiniteScroll
            dataLength={this.state.items.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length != this.state.totalResults}
            loader={<Spinner />}
          >
            {this.state.articles.map((element) => {
              return (
                <div className="container">
                  <div className="col-md-3" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={element.urlToImage}
                      url={element.url}
                    />
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
            className="btn btn-sm btn-primary"
          >
            &laquo; Prev
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 20)
            }
            type="button"
            onClick={this.handleNextClick}
            className="btn btn-sm btn-primary"
          >
            Next &raquo;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
