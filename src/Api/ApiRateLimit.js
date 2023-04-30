
import React from 'react';
import { getAnimeData } from './AnimeApi';

const limit = 1; // limit to 3 requests per second
const queue = [];
let running = false;

const runQueue = async () => {
  running = true;
  while (queue.length > 0) {
    const { index, resolve } = queue.shift();
    const data = await getAnimeData(index);
    resolve(data);
    await new Promise(resolve => setTimeout(resolve, 1000 / limit));
  }
  running = false;
};

const limitApiRequests = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      data: null,
    };

    async componentDidMount() {
      const { index } = this.props;
      const promise = new Promise((resolve) => {
        queue.push({ index, resolve });
      });
      if (!running) {
        runQueue();
      }
      const data = await promise;
      this.setState({ data });
    }

    render() {
      const { data } = this.state;
      return <WrappedComponent {...this.props} data={data} />;
    }
  };
};

export default limitApiRequests;
