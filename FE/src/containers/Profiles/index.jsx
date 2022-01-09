import MUIDataTable from "mui-datatables";
import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getAllProfile } from "../../actions";
import "./style.css";
function Profiles(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { profiles, isGettingAll } = useSelector((state) => state.profile);
  const { user, authenticate } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user.isAdmin) {
      dispatch(getAllProfile());
    }
  }, [authenticate, user.isAdmin]);
  const columns = ["PROFILE", "SESSIONS_PER_USER", "CONNECT_TIME", "IDLE_TIME"];

  const options = {
    filter: true,
    filterType: "multiselect",
    download: false,
    print: false,
    onRowClick: (rowData, rowMeta) => {
      history.push(`profile/${rowData[0]}`);
    },
    selectableRowsHideCheckboxes: true,
  };
  let data = [];
  if (profiles) {
    data = user.isAdmin
      ? profiles.map((profile, index) => [
          profile.name,
          profile.sessionsPerUser,
          profile.connectTime,
          profile.idleTime,
        ])
      : [];
  }
  const renderProfilesTable = () =>
    data && (
      <MUIDataTable
        title={"Profiles"}
        data={data}
        columns={columns}
        options={options}
      />
    );
  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <div className="d-flex justify-content-between">
              <h3>Users</h3>
              <Button
                variant="primary"
                onClick={() => {
                  history.push("/profile/add");
                }}
              >
                Add
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={12}>{renderProfilesTable()}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profiles;
