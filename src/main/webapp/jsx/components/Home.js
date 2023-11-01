import React, { useState, Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col, Card, Tab, Tabs } from "react-bootstrap";
import Base from "./Base";
import axios from "axios";
import { token, url } from "../../api";

const divStyle = {
  borderRadius: "2px",
  fontSize: 14,
};

const Home = (props) => {
  const [key, setKey] = useState("manifest-list");
  const [config, setConfig] = useState({});

  const urlTabs =
    props.location && props.location.state ? props.location.state : null;
  const [permissions, setPermissions] = useState([]);

  const userPermission = () => {
    axios
      .get(`${url}account`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setPermissions(response.data.permissions);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    userPermission();

    switch (urlTabs) {
      case "database-backup":
        return setKey("backup");
      default:
        return setKey("backup");
    }
  }, [urlTabs]);

  return (
    <Fragment>
      <Row>
        <Col xl={12}>
          <Card style={divStyle}>
            <Card.Body>
              {/* <!-- Nav tabs --> */}
              <div className="custom-tab-1">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
                >
                  <Tab eventKey="backup" title="Database backup">
                    <Base />
                  </Tab>
                </Tabs>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Home;
