import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  getAllRole,
  getAllRoleByUser,
  grantRolePriv,
  revokeRolePriv,
} from "../../actions";
import "./style.css";
function Roles(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { roles, isGettingAll, userRole, isGranting, isRevoking, error } =
    useSelector((state) => state.role);
  const { user, authenticate } = useSelector((state) => state.auth);
  const [toggleGrantRole, setToggleGrantRole] = useState(false);
  const [withAdminOption, setWithAdminOption] = useState(false);
  const [grantee, setGrantee] = useState("");
  const [adminPrivCheck, setAdminPrivCheck] = useState([]);

  useEffect(() => {
    if (authenticate) {
      if (user.isAdmin) {
        dispatch(getAllRole());
      } else {
        dispatch(getAllRoleByUser());
      }
    }
  }, []);
  const handleAdminPrivCheck = (priv) => {
    setAdminPrivCheck((prev) => {
      const isCheck = adminPrivCheck.includes(priv);
      if (isCheck) {
        return adminPrivCheck.filter((item) => item !== priv);
      } else {
        return [...prev, priv];
      }
    });
  };

  const handleUserGrantRolePriv = () => {
    dispatch(
      grantRolePriv({
        rolesOrSysPrivs: adminPrivCheck,
        grantee,
        grantable: withAdminOption,
      })
    );
  };

  const handleUserRevokeRolePriv = () => {
    dispatch(
      revokeRolePriv({
        rolesOrSysPrivs: adminPrivCheck,
        grantee,
      })
    );
  };

  const adminColumns = ["#", "ROLE"];
  const userColumns = ["#", "ROLE", "GRANTABLE"];

  const options = {
    filter: true,
    filterType: "multiselect",
    download: false,
    print: false,
    onRowClick: (rowData, rowMeta) => {
      history.push(`role/${rowData[1]}`);
    },
    selectableRowsHideCheckboxes: true,
  };
  let adminData = [];
  if (roles) {
    adminData = roles.map((role, index) => [index + 1, role.ROLE]);
  }

  let userData = [];
  if (userRole) {
    userData = userRole.map((role, index) => [
      index + 1,
      role.GRANTED_ROLE,
      role.ADMIN_OPTION,
    ]);
  }

  const renderAdminTable = () =>
    adminData && (
      <MUIDataTable
        title={"Roles"}
        data={adminData}
        columns={adminColumns}
        options={options}
      />
    );
  const renderUserTable = () =>
    userData && (
      <MUIDataTable
        title={"Roles"}
        data={userData}
        columns={userColumns}
        options={options}
      />
    );
  const toggleAdminGrantPriv = () => {
    setToggleGrantRole((prev) => !prev);
  };

  const handleAdminGrantRolePriv = () => {
    dispatch(
      grantRolePriv({
        rolesOrSysPrivs: adminPrivCheck,
        grantee,
        grantable: withAdminOption,
      })
    );
  };

  const handleAdminRevokeRolePriv = () => {
    dispatch(
      revokeRolePriv({
        rolesOrSysPrivs: adminPrivCheck,
        grantee,
      })
    );
  };
  const renderAdminGrantRole = () => {
    return (
      <div>
        <input value={grantee} onChange={(e) => setGrantee(e.target.value)} />
        <div className="d-inline-block ml-3 mr-1">
          <input
            type="checkbox"
            id={"withadminoption"}
            defaultChecked={withAdminOption}
            onChange={() => setWithAdminOption(!withAdminOption)}
            className="mr-1"
          />
          <label htmlFor={"withadminoption"}>WITH ADMIN OPTION</label>
        </div>
        <div className="d-inline-block ml-3 mr-1">
          <Button
            onClick={handleAdminGrantRolePriv}
            disabled={isGranting || isRevoking}
          >
            {isGranting && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}{" "}
            GRANT
          </Button>
        </div>
        <div className="d-inline-block ml-3 mr-1">
          <Button
            className="btn-warning"
            onClick={handleAdminRevokeRolePriv}
            disabled={isGranting || isRevoking}
          >
            {isRevoking && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}{" "}
            REVOKE
          </Button>
        </div>
        <div>
          {roles.map((role) => (
            <div key={role.ROLE} className="d-inline-block mr-2">
              <input
                type="checkbox"
                id={role.ROLE}
                checked={adminPrivCheck.includes(role.ROLE)}
                onChange={() => handleAdminPrivCheck(role.ROLE)}
                className="mr-1"
              />
              <label htmlFor={role.ROLE}>{role.ROLE}</label>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const renderUserGrantRole = () => {
    if (user && user.isAdmin) return;
    return (
      <div>
        <input value={grantee} onChange={(e) => setGrantee(e.target.value)} />
        <div className="d-inline-block ml-3 mr-1">
          <input
            type="checkbox"
            id={"withadminoption"}
            defaultChecked={withAdminOption}
            onChange={() => setWithAdminOption(!withAdminOption)}
            className="mr-1"
          />
          <label htmlFor={"withadminoption"}>WITH ADMIN OPTION</label>
        </div>
        <div className="d-inline-block ml-3 mr-1">
          <Button
            onClick={handleUserGrantRolePriv}
            disabled={isGranting || isRevoking}
          >
            {isGranting && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}{" "}
            GRANT
          </Button>
        </div>
        <div className="d-inline-block ml-3 mr-1">
          <Button
            className="btn-warning"
            onClick={handleUserRevokeRolePriv}
            disabled={isGranting || isRevoking}
          >
            {isRevoking && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}{" "}
            REVOKE
          </Button>
        </div>
        <div>
          {userRole.map(
            (role) =>
              role.ADMIN_OPTION === "YES" && (
                <div key={role.GRANTED_ROLE} className="d-inline-block mr-2">
                  <input
                    type="checkbox"
                    id={role.GRANTED_ROLE}
                    checked={adminPrivCheck.includes(role.GRANTED_ROLE)}
                    onChange={() => handleAdminPrivCheck(role.GRANTED_ROLE)}
                    className="mr-1"
                  />
                  <label htmlFor={role.GRANTED_ROLE}>{role.GRANTED_ROLE}</label>
                </div>
              )
          )}
        </div>
      </div>
    );
  };
  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <div className="d-flex justify-content-between">
              <h3>Users</h3>
              <div>
                <Button
                  variant="primary"
                  onClick={() => {
                    history.push("/role/add");
                  }}
                  className="mr-2"
                >
                  Add
                </Button>
                <Button variant="primary" onClick={toggleAdminGrantPriv}>
                  Grant Roles
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={12}>
            {error && <p className="errorMessage">{error}</p>}
            {user && user.isAdmin && toggleGrantRole && renderAdminGrantRole()}
            {user && !user.isAdmin && toggleGrantRole && renderUserGrantRole()}
            <br />
            {user && user.isAdmin ? renderAdminTable() : renderUserTable()}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Roles;
