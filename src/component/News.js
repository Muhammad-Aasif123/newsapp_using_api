import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


import Spinner from "./spinner";
export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category:'general'
  };
capitalizeFirstLetter=(string)=>{
  return string.charAt(0).toUpperCase() + string.slice(1)
}
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };
 constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
  }
  // async updateNews(){
  //   const URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ae449313a86648e5a353073af4648367&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(URL);
  //   let parseData = await data.json();
  //   this.setState({
  //     articles: parseData.articles,
  //     totalResults: parseData.totalResults,
  //     loading: false,
  //   });
  // }

  async componentDidMount() {
    this.props.setProgress(10)
    let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(URL);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  }

  // handlePreviousClick = async () => {
  //   let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ae449313a86648e5a353073af4648367&page=${
  //     this.state.page - 1
  //   }&pageSize=20`;
  //   this.setState({ loading: true });
  //   let data = await fetch(URL);
  //   let parseData = await data.json();
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parseData.articles,
  //     loading: false,
  //   });
  //   // this.setState({page:this.state.page -1})
  //   // this.updateNews()
  // };

  // handleNextClick = async () => {
  //   if (
  //     !(
  //       this.state.page + 1 >
  //       Math.ceil(this.state.totalResults / this.props.pageSize)
  //     )
  //   ) {
  //     let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ae449313a86648e5a353073af4648367&page=${
  //       this.state.page + 1
  //     }&pageSize=${this.props.pageSize}`;
  //     this.setState({ loading: true });
  //     let data = await fetch(URL);
  //     let parseData = await data.json();
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parseData.articles,
  //       loading: false,
  //     });
  //   }
  //   // this.setState({page:this.state.page+1})
  //   // this.updateNews()
  // };


  fetchMoreData =async () => {
    this.setState({page:this.state.page + 1})
    const URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
    let data = await fetch(URL);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
    });
  };


  render() {
    return (
      <>
        <h2 className="text-center" style={{marginBottom:'30px',marginTop:'90px'}}>NewsMonkey - Top HeadLines from {this.capitalizeFirstLetter(this.props.category)} Category</h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          {
          /* !this.state.loading && */
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 45)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handlePreviousClick}
            className="btn btn-dark"
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            onClick={this.handleNextClick}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}
