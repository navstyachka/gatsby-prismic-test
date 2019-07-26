import React from 'react';
import { Posts } from '../components/posts';
import Layout from '../components/layout';

const Home = props => {
  return (
    <Layout>
      <div>
        <Posts />
      </div>
    </Layout>
  );
};

export default Home;
