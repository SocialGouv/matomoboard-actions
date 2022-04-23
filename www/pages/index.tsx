import type { NextPage } from "next";
import Head from "next/head";
import { Container, Row, Col, Table } from "react-bootstrap";

const data = require("../src/data.json");

const TopWeekSites = () => {
  const topWeekSites = data.sort((a: any, b: any) => {
    return b.stats.summary.week.nb_visits - a.stats.summary.week.nb_visits;
  });
  return (
    <Table>
      <thead>
        <tr>
          <th>Produits</th>
          <th>Visites</th>
        </tr>
      </thead>
      <tbody>
        {topWeekSites.slice(0, 15).map((site: any) => (
          <tr key={site.site.idsite}>
            <td>
              <a
                href={site.site.main_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.site.name}
              </a>
            </td>
            <td>{site.stats.summary.week.nb_visits}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const sum = (arr: number[]) => arr.reduce((a, c) => a + c, 0);

const LastVisits = () => {
  const sumVisits = sum(
    data.map((site: any) => parseInt(site.stats.live[0].visits, 10))
  );
  return <div>Les 30 dernières minutes : {sumVisits} visites</div>;
};

const TodayVisits = () => {
  const sumVisits = sum(
    data.map((site: any) => parseInt(site.stats.summary.day.nb_visits, 10))
  );
  return <div>Aujourd‘hui : {sumVisits} visites</div>;
};

const Home: NextPage = () => {
  console.log(data);

  return (
    <Container fluid>
      <Head>
        <title>MatomoBoard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row>
        <Col>[header]</Col>
      </Row>
      <Row>
        <LastVisits />
        <TodayVisits />
        <TopWeekSites />
      </Row>
    </Container>
  );
};

export default Home;
