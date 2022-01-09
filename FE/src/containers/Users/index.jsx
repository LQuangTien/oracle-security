import MUIDataTable from "mui-datatables";
import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getAllUser, getUserInfo } from "../../actions";
import "./style.css";
function Users(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { users, isGettingAll, isGettingCurrentUser, currentUser } =
    useSelector((state) => state.user);
  const { user, authenticate } = useSelector((state) => state.auth);
  useEffect(() => {
    if (authenticate) {
      if (user.isAdmin) {
        dispatch(getAllUser());
      } else {
        dispatch(getUserInfo());
      }
    }
  }, []);
  const columns = [
    "USERNAME",
    "ACCOUNT_STATUS",
    "LOCK_DATE",
    "CREATED",
    "DEFAULT_TABLESPACE",
    "QUOTAS",
    "TEMPORARY_TABLESPACE",
    "PROFILE",
  ];

  const options = {
    filter: true,
    filterType: "multiselect",
    download: false,
    print: false,
    onRowClick: (rowData, rowMeta) => {
      history.push(`user/${rowData[0]}`);
    },
    selectableRowsHideCheckboxes: true,
  };
  let data = [];
  if (isGettingAll) {
    data = null;
  }
  if (user.isAdmin) {
    if (users) {
      data = users.map((user) => [
        user.USERNAME,
        user.ACCOUNT_STATUS,
        user.LOCK_DATE,
        user.CREATED,
        user.DEFAULT_TABLESPACE,
        user.QUOTAS,
        user.TEMPORARY_TABLESPACE,
        user.PROFILE,
      ]);
    }
  } else {
    if (currentUser) {
      data = [
        [
          currentUser.USERNAME,
          currentUser.ACCOUNT_STATUS,
          currentUser.LOCK_DATE,
          currentUser.CREATED,
          currentUser.DEFAULT_TABLESPACE,
          currentUser.QUOTAS,
          currentUser.TEMPORARY_TABLESPACE,
          currentUser.PROFILE,
        ],
      ];
    } else {
      data = [];
    }
  }

  const renderUsersTable = () =>
    data && (
      <MUIDataTable
        title={"Users"}
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
                  history.push("/user/add");
                }}
              >
                Add
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={12}>{renderUsersTable()}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default Users;
