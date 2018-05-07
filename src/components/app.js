import React, { Component } from 'react'
import YTSearch from "youtube-api-search";
import _ from "lodash";

import VideoList from "./video_list";
import SearchBar from './search_bar'

const API_KEY= 'AIzaSyAEcEPSJPjC3AMtjxaeQ0SAyyd6V7huaUs'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: []
    };

    this.videoSearch("surfboards");
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, videos => {
      console.log('videos ',videos)
      this.setState({
        videos: videos
      });
    });
  }

  render() {
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoList
          videos={this.state.videos}
        />
      </div>
    )
  }
}
