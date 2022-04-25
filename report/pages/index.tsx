import { Datum, ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import format from "date-fns/format";
import frLocale from "date-fns/locale/fr";
import type { NextPage } from "next";
import Head from "next/head";
import { CSSProperties, ReactChildren } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import GitHubForkRibbon from "react-github-fork-ribbon";

const data = require("../src/data.json") as MatomoData;

const TopWeekSites = ({ data }: { data: MatomoSitesDate }) => {
  const topWeekSites = data
    .map((site) => ({
      id: site.site.idsite,
      url: site.site.main_url,
      name: site.site.name,
      nb_visits: sum(site.stats.visits.map((visit) => visit.summary.nb_visits)),
    }))
    .sort((a: any, b: any) => {
      return b.nb_visits - a.nb_visits;
    });
  return (
    <Table striped hover>
      <thead>
        <tr>
          <td colSpan={2} style={{ fontSize: "2em" }}>
            Top visites sur 7 jours
          </td>
        </tr>
      </thead>
      <thead>
        <tr>
          <th>Produit</th>
          <th>Visites</th>
        </tr>
      </thead>
      <tbody>
        {topWeekSites.slice(0, 15).map((site: any) => (
          <tr key={site.id}>
            <td>
              <a href={site.url} target="_blank" rel="noopener noreferrer">
                {site.name}
              </a>
            </td>
            <td>{parseInt(site.nb_visits).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const TopWeekContents = ({ data }: { data: MatomoSitesDate }) => {
  const topWeekContents = data
    .flatMap((site: any) =>
      site.stats.pages.week.map((entry: any) => ({
        label: entry.label,
        nb_visits: entry.nb_visits,
        url: decodeURIComponent(
          entry.segment.replace(/^pageUrl=+\^?(.*)/g, "$1")
        ),
      }))
    )
    .sort((a: any, b: any) => {
      return b.nb_visits - a.nb_visits;
    });

  return (
    <Table striped hover>
      <thead>
        <tr>
          <td colSpan={2} style={{ fontSize: "2em" }}>
            Top contenus sur 7 jours
          </td>
        </tr>
      </thead>
      <thead>
        <tr>
          <th>Url</th>
          <th>Visites</th>
        </tr>
      </thead>
      <tbody>
        {topWeekContents.slice(0, 15).map((content: any) => (
          <tr key={content.url}>
            <td>
              <a
                href={decodeURIComponent(content.url)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.label}
              </a>
            </td>
            <td>{parseInt(content.nb_visits).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const MyResponsiveLine = ({ data }: { data: Datum[] }) => {
  const lineData = data
    .sort((a: any, b: any) => {
      return b.stats.summary.week.nb_visits - a.stats.summary.week.nb_visits;
    })
    .slice(0, 15)
    .reverse()
    .map((site: any) => ({
      id: site.site.name,
      data: site.stats.visits
        .sort((a: any, b: any) => {
          return new Date(b).getDate() - new Date(a).getDate();
        })
        .map((visit: any) => ({
          x: visit.date,
          y: parseInt(visit.summary.nb_visits),
        }))
        .reverse(),
    }));

  return (
    //@ts-ignore
    <ResponsiveLine
      data={lineData}
      curve="monotoneX"
      margin={{ top: 50, right: 150, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      // yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -30,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "visites",
        legendOffset: -50,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      enableSlices="x"
      isInteractive={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 140,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 120,
          itemHeight: 20,
          itemOpacity: 1,
          symbolSize: 12,
          symbolShape: "circle",
        },
      ]}
    />
  );
};

const MyResponsivePie = ({ data }: { data: Datum[] }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 50, right: 80, bottom: 30, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    borderWidth={1}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
  />
);

const TopMonthDevices = ({ data }: { data: MatomoSitesDate }) => {
  const topMonthDevices = data
    .flatMap((site: any) =>
      site.stats.devices.month
        .filter((entry: any) => entry.nb_visits > 0)
        .map((entry: any) => ({
          label: entry.label,
          nb_visits: entry.nb_visits,
          logo: entry.logo,
        }))
    )
    .reduce((a: any, c: any) => {
      if (!a[c.label]) {
        a[c.label] = 0;
      }
      a[c.label] += parseInt(c.nb_visits);
      return a;
    }, {});

  const topMonthDevicesSorted = Object.keys(topMonthDevices)
    .map((device) => ({
      label: device,
      id: device,
      value: topMonthDevices[device],
    }))
    .sort((a: any, b: any) => {
      return b.value - a.value;
    });

  return (
    <>
      <div style={{ fontSize: "2em" }}>Top devices sur un mois</div>
      <div style={{ height: 400 }}>
        <MyResponsivePie data={topMonthDevicesSorted} />
      </div>
    </>
  );
};

const TopMonthBrowsers = ({ data }: { data: MatomoSitesDate }) => {
  const topMonthBrowsers = data
    .flatMap((site: any) =>
      site.stats.browsers.month
        .filter((entry: any) => entry.nb_visits > 0)
        .map((entry: any) => ({
          label: entry.label,
          nb_visits: entry.nb_visits,
          logo: entry.logo,
        }))
    )
    .reduce((a: any, c: any) => {
      if (!a[c.label]) {
        a[c.label] = 0;
      }
      a[c.label] += parseInt(c.nb_visits);
      return a;
    }, {});

  const topMonthBrowsersSorted = Object.keys(topMonthBrowsers)
    .map((browser) => ({
      label: browser,
      id: browser,
      value: topMonthBrowsers[browser],
    }))
    .sort((a: any, b: any) => {
      return b.value - a.value;
    })
    .slice(0, 10);

  return (
    <>
      <div style={{ fontSize: "2em" }}>Top browsers sur un mois</div>
      <div style={{ height: 400 }}>
        <MyResponsivePie data={topMonthBrowsersSorted} />
      </div>
    </>
  );
};

const sum = (arr: number[]) => arr.reduce((a, c) => a + c, 0);

const Box = ({
  style = {},
  children,
}: {
  style?: CSSProperties;
  children: JSX.Element | JSX.Element[];
}) => (
  <div
    style={{
      border: "1px solid #eee",
      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      padding: 10,
      margin: 10,
      ...style,
    }}
  >
    {children}
  </div>
);

const BigNumber = ({
  title,
  value,
  ...rest
}: {
  title: string;
  value: number;
}) => {
  return (
    <Col sm={12} md={4} style={{ textAlign: "center" }} {...rest}>
      <Box>
        <div style={{ fontSize: "1.5em" }}>{title}</div>
        <div style={{ fontSize: "2.5em", fontVariantNumeric: "tabular-nums" }}>
          {value.toLocaleString()}
        </div>
      </Box>
    </Col>
  );
};

const getOnlineUsers = (data: any[]) =>
  sum(data.map((site) => parseInt(site.stats.live[0].visitors)));

const getMonthUsers = (data: any[]) =>
  sum(data.map((site) => parseInt(site.stats.summary.month.nb_visits)));

const getDayUsers = (data: any[]) =>
  sum(data.map((site) => parseInt(site.stats.summary.day.nb_visits)));

const Home: NextPage = () => {
  const countOnline = getOnlineUsers(data.data);
  const countMonth = getMonthUsers(data.data);
  const countToday = getDayUsers(data.data);

  return (
    <Container fluid>
      <Head>
        <title>MatomoBoard</title>
        <link
          rel="shortcut icon"
          href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.png`}
        />
      </Head>
      <GitHubForkRibbon
        href="//github.com/socialgouv/matomoboard"
        target="_blank"
        position="right"
      >
        Fork me on GitHub
      </GitHubForkRibbon>
      <Row>
        <Col style={{ textAlign: "center", margin: 20 }}>
          <h1>{data.url.replace(/^https?:\/\//, "")}</h1>
        </Col>
      </Row>
      <Container>
        <Row>
          <BigNumber title="Visites depuis 1h" value={countOnline} />
          <BigNumber title="Visites aujourd'hui" value={countToday} />
          <BigNumber title="Visites sur 30 jours" value={countMonth} />
        </Row>
        <Row>
          <Col xs={12}>
            <Box style={{ height: 400 }}>
              <MyResponsiveLine data={data.data} />
            </Box>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            <Box>
              <TopWeekSites data={data.data} />
            </Box>
          </Col>
          <Col sm={12} md={6}>
            <Box>
              <TopWeekContents data={data.data} />
            </Box>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            <Box>
              <TopMonthBrowsers data={data.data} />
            </Box>
          </Col>
          <Col sm={12} md={6}>
            <Box>
              <TopMonthDevices data={data.data} />
            </Box>
          </Col>
        </Row>
      </Container>
      <Row>
        <Col>
          <div style={{ textAlign: "center" }}>
            Dernière mise à jour : le{" "}
            {format(new Date(data.date), "PPPP à pp", { locale: frLocale })}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
