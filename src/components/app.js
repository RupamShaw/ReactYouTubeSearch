import React, { Component } from 'react'
import YTSearch from "youtube-api-search";
import _ from "lodash";
import VideoDetail from "./video_detail";
import VideoList from "./video_list";
import SearchBar from './search_bar'

const API_KEY= 'AIzaSyAEcEPSJPjC3AMtjxaeQ0SAyyd6V7huaUs'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch("surfboards");
  }

  videoSearch(term) {//this max if not passed bydefault fetches 5 items only
    YTSearch({ key: API_KEY, term: term, max:10 }, videos => {
      console.log('videos ',videos)
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
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
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          videos={this.state.videos}
        />
      </div>
    )
  }
}
