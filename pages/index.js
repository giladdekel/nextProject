import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

import React,{useState} from 'react';
import { Box, Button, Container, Typography  } from '@material-ui/core';
import { render } from 'react-dom'

import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'

import HighchartsReact from 'highcharts-react-official'



// Load module after Highcharts is loaded
  // require('highcharts/modules/exporting')(Highcharts);  
// Create the chart
  // Highcharts.chart('container', { /*Highcharts options*/ });


// import ReactDOM from 'react-dom';
// import Button from '@material-ui/core/Button';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}


// const options = {
//   title: {
//     text: 'Gilad chart'
//   },
//   series: [{
//     type: 'line',
//     data: [1, 2, 3,4,5]
//   }]
// }
 




// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // props for your component
//     }
//   }
// }



export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}





// export default function Home(props) { ... }

// export async function getStaticProps() {
//   // Get external data from the file system, API, DB, etc.
//   const data = ...

//   // The value of the `props` key will be
//   //  passed to the `Home` component
//   return {
//     props: ...
//   }
// }



export default function Home({ allPostsData }) {
  const [hoverData, setHoverData] = useState(null);
  
  
  const [chartOptions, setChartOptions] = useState({
    title: {
      text: 'My custom title'
  },
  subtitle: {
      text: 'My custom subtitle'
  },

    xAxis: {
      categories: ['A', 'B', 'C'],
    },
    series: [
      {        name: 'Tokyo',
      data: [1, 2, 8] },
      {        name: 'dddf',
      data: [12, 32, 81] }
    ],
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver(e){
              setHoverData(e.target.category)
            }
          }
        }
      }
    }
  });



  const [chartOptions1, setChartOptions1] = useState({
    title: {
      text: 'My custom title'
  },
  subtitle: {
      text: 'My custom subtitle'
  },


  yAxis: [{ //--- Primary yAxis
    title: {
        text: 'Temperature'
    }
}, { //--- Secondary yAxis
    title: {
        text: 'Rainfall'
    },
    opposite: true
}],
series: [{
    yAxis: 0,
    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
},{
    yAxis: 1,
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
}],


    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver(e){
              setHoverData(e.target.category)
            }
          }
        }
      }
    }
  });


  const [chartOptionsColmun, setChartOptionsColmun] = useState({
    chart: {
      renderTo: 'container',
      type: 'column'
  },
  title: {
      text: 'Fruit Consumption'
  },
  xAxis: {
      title: {
          text: 'Fruit Number'
      },
      tickInterval: 1
  },
  yAxis: {
      title: {
          text: 'Fruit eaten'
      },
      tickInterval: 1
  },
  series: [{
      name: 'Jane',
      data: [1, 0, 4]
  }, {
      name: 'John',
      data: [5, 7, 3]
  }]
  });



  const updateSeries = () => {
    setChartOptions({ 
      series: [
          { data: [Math.random() * 5, 2, 1]}
        ]
    });
  }




  console.log(allPostsData);
  return (
    <Layout home>
      <Head>
        <title>ddddd{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>

      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          
        />


{/* <HighchartsReact
    options = { this.state.chartOptions }
    highcharts = { Highcharts }
    constructorType = { 'mapChart' }
    allowChartUpdate = { true }
    immutable = { false }
    updateArgs = { [true, true, true] }
    containerProps = {{ className: 'chartContainer' }}
    callback = { this.chartCallback }
  /> */}


        <h3>Hovering over {hoverData}</h3>
        <button onClick={updateSeries}>Update Series</button>
      </div>

  <div>
      <Container fixed>
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '70vh' }} />
      </Container>
  </div>

        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
             <Link href={`/posts/${id}`}>
             <a>{title}</a>
             </Link>
             <br />
            <small className={utilStyles.lightText}>
            <Date dateString={date} />
            </small>
           </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}



