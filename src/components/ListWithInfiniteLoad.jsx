import React from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ListItem from "./ListItem";

export default class ListWithInfiniteLoad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      page: 1,
      limit: 14,
      total: 0,
      next: null
    };
  }

  componentDidMount() {
    this.getQuery(this.state.page, this.state.limit).then(data =>
      this.setState({
        items: data.results,
        total: data.total_pages,
        next: data.next ? data.next.page : null
      })
    );
  }

  getQuery = async (page, limit) => {
    let response = await axios.get(`/users?page=${page}&limit=${limit}`);
    return response.data;
  };

  fetchMoreData = async () => {
    if (this.state.next) {
      let current_page = this.state.page + 1;
      let data = await this.getQuery(current_page, this.state.limit);

      this.setState({
        items: this.state.items.concat(data.results),
        page: current_page,
        next: data.next ? data.next.page : null
      });
    }
  };

  render() {
    return (
      <div>
        <div
          id="scrollableDiv"
          style={{
            height: 200,
            overflow: "auto",
            display: "flex",
            flexDirection: "column-reverse"
          }}>
          <InfiniteScroll
            dataLength={this.state.items.length}
            next={this.fetchMoreData}
            style={{ display: "flex", flexDirection: "column-reverse" }}
            inverse={true}
            hasMore={this.state.next ? true : false}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv">
            {this.state.items.map((item, index) => (
              <ListItem key={index} item={item} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}
