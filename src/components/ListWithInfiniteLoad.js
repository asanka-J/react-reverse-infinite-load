import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default class ListWithInfiniteLoad  extends React.Component {
  state = {
    items: Array.from({ length: 20 })
  };

  fetchMoreData = () => {
    this.setState({
      items: this.state.items.concat(Array.from({ length: 10 }))
    });
  };

  render() {
    return (
      <div>
        <div
          id="scrollableDiv"
          style={{
            height: 300,
            overflow: "auto",
            display: "flex",
            flexDirection: "column-reverse"
          }}>
          <InfiniteScroll
            dataLength={this.state.items.length}
            next={this.fetchMoreData}
            style={{ display: "flex", flexDirection: "column-reverse" }}  
            inverse={true}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv">
            {this.state.items.map((_, index) => (
              <div key={index}> #{index}</div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}
