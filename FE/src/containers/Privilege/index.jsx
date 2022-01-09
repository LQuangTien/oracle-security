import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  getPrivilegeAdmin,
  getPrivilegeByUser,
  grantRolePriv,
  revokeRolePriv,
  getUserByPriv,
  grantTable,
  revokeTable,
} from "../../actions";
import "./style.css";
function Privilege(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, authenticate } = useSelector((state) => state.auth);
  const { privileges, adminPrivs, userByPriv } = useSelector(
    (state) => state.privilege
  );
  const { isGranting, isRevoking, error } = useSelector((state) => state.role);
  const [withAdminOption, setWithAdminOption] = useState(false);
  const [screen, setScreen] = useState("priv");
  const [column, setColumn] = useState("");

  /** ADMIN GRANT PRIV  */
  const [grant, setGrant] = useState("priv");

  const [grantee, setGrantee] = useState("");
  const [table, setTable] = useState("");
  const [adminPrivCheck, setAdminPrivCheck] = useState([]);
  useEffect(() => {
    if (authenticate) {
      if (user.isAdmin) {
        if (screen === "priv") {
          dispatch(getPrivilegeAdmin());
        }
        if (screen === "user") {
          dispatch(getUserByPriv());
        }
      } else {
        dispatch(getPrivilegeByUser());
      }
    }
  }, [screen]);
  const columns = [
    "PRIVILEGE",
    "OWNER",
    "TABLE",
    "COLUMN",
    "GRANTOR",
    "GRANTABLE",
  ];
  const getPrivByUserColumns = [
    "GRANTEE",
    "OWNER",
    "TABLE",
    "COLUMN",
    "GRANTOR",
    "PRIVILEGE",
    "GRANTABLE",
  ];

  const options = {
    filter: true,
    filterType: "multiselect",
    download: false,
    print: false,
    // onRowClick: (rowData, rowMeta) => {
    //   history.push(`profile/${rowData[0]}`);
    // },
    selectableRowsHideCheckboxes: true,
  };
  let data = [];
  if (!user.isAdmin) {
    if (privileges) {
      privileges.forEach((privilege) => {
        // const index = data.findIndex((p) => privilege.privilege === p[0]);

        // if (index < 0) {
        data.push([
          privilege.privilege,
          privilege.owner,
          privilege.table,
          privilege.column,
          privilege.grantor,
          privilege.grantable,
        ]);
        // }
      });
    }
  } else {
    if (screen === "priv") {
      if (adminPrivs && adminPrivs.rolePriv && adminPrivs.tableCol) {
        data = [...adminPrivs.rolePriv, ...adminPrivs.tableCol].map((a) => [a]);
      }
    }
    if (screen === "user") {
      if (userByPriv) {
        data = userByPriv.map((user) => [
          user.grantee,
          user.owner,
          user.table,
          user.column,
          user.grantor,
          user.privilege,
          user.grantable,
        ]);
      }
    }
  }
  const renderProfilesTable = () =>
    data && (
      <MUIDataTable
        title={"Privilege"}
        data={data}
        columns={columns}
        options={options}
      />
    );
  const renderGetUserByPrivTable = () =>
    data && (
      <MUIDataTable
        title={"Users"}
        data={data}
        columns={getPrivByUserColumns}
        options={options}
      />
    );

  const toggleAdminGrantPriv = () => {
    setGrant((prev) => !prev);
  };
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

  const handleAdminGrantTable = () => {
    dispatch(
      grantTable({
        rolesOrSysPrivs: adminPrivCheck,
        grantee,
        grantable: withAdminOption,
        table,
      })
    );
  };

  const handleAdminRevokeTable = () => {
    dispatch(
      revokeTable({
        rolesOrSysPrivs: adminPrivCheck,
        grantee,
        table,
      })
    );
  };
  const handleAdminGrantCol = () => {
    dispatch(
      grantTable({
        rolesOrSysPrivs: adminPrivCheck.map((priv) => `${priv}(${column})`),
        grantee,
        grantable: withAdminOption,
        table,
      })
    );
  };

  const handleAdminRevokeCol = () => {
    dispatch(
      revokeTable({
        rolesOrSysPrivs: adminPrivCheck.map((priv) => `${priv}(${column})`),
        grantee,
        table,
      })
    );
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

  const renderAdminGrantRole = () => {
    return (
      <div>
        <input
          value={grantee}
          onChange={(e) => setGrantee(e.target.value)}
          placeholder="User"
        />
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
          {adminPrivs.rolePriv &&
            adminPrivs.rolePriv.map((priv) => (
              <div key={priv} className="d-inline-block mr-2">
                <input
                  type="checkbox"
                  id={priv}
                  checked={adminPrivCheck.includes(priv)}
                  onChange={() => handleAdminPrivCheck(priv)}
                  className="mr-1"
                />
                <label htmlFor={priv}>{priv}</label>
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
        <input
          value={grantee}
          onChange={(e) => setGrantee(e.target.value)}
          placeholder="User"
        />
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
          {privileges &&
            privileges.map(
              (priv) =>
                priv.grantable === "YES" && (
                  <div key={priv.privilege} className="d-inline-block mr-2">
                    <input
                      type="checkbox"
                      id={priv.privilege}
                      checked={adminPrivCheck.includes(priv.privilege)}
                      onChange={() => handleAdminPrivCheck(priv.privilege)}
                      className="mr-1"
                    />
                    <label htmlFor={priv.privilege}>{priv.privilege}</label>
                  </div>
                )
            )}
        </div>
      </div>
    );
  };
  const renderAdminGrantTable = () => {
    return (
      <div>
        <input
          placeholder="User"
          value={grantee}
          onChange={(e) => setGrantee(e.target.value)}
          className="mr-2"
        />
        <input
          placeholder="HR.JOBS"
          value={table}
          onChange={(e) => setTable(e.target.value)}
        />
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
            onClick={handleAdminGrantTable}
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
            onClick={handleAdminRevokeTable}
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
          {["SELECT", "INSERT", "DELETE"].map((priv) => (
            <div key={priv} className="d-inline-block mr-2">
              <input
                type="checkbox"
                id={priv}
                checked={adminPrivCheck.includes(priv)}
                onChange={() => handleAdminPrivCheck(priv)}
                className="mr-1"
              />
              <label htmlFor={priv}>{priv}</label>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const renderAdminGrantCol = () => {
    return (
      <div>
        <input
          placeholder="User"
          value={grantee}
          onChange={(e) => setGrantee(e.target.value)}
          className="mr-2"
        />
        <input
          placeholder="HR.JOBS"
          value={table}
          className="mr-2"
          onChange={(e) => setTable(e.target.value)}
        />
        <input
          placeholder="COLUMN"
          value={column}
          onChange={(e) => setColumn(e.target.value)}
        />
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
            onClick={handleAdminGrantCol}
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
            onClick={handleAdminRevokeCol}
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
          {["INSERT", "UPDATE"].map((priv) => (
            <div key={priv} className="d-inline-block mr-2">
              <input
                type="checkbox"
                id={priv}
                checked={adminPrivCheck.includes(priv)}
                onChange={() => handleAdminPrivCheck(priv)}
                className="mr-1"
              />
              <label htmlFor={priv}>{priv}</label>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <div className="d-flex ">
              <h3 className="mr-2">Privilege</h3>
              {user.isAdmin && (
                <>
                  <Button onClick={() => setScreen("priv")} className="mr-2">
                    Privilege
                  </Button>
                  <Button onClick={() => setScreen("user")} className="mr-2">
                    User
                  </Button>
                </>
              )}

              <Button
                variant="primary"
                className="mr-2"
                onClick={() =>
                  setGrant((prev) => (prev === "priv" ? "" : "priv"))
                }
              >
                Grant Privileges
              </Button>
              <Button
                variant="primary"
                className="mr-2"
                onClick={() =>
                  setGrant((prev) => (prev === "table" ? "" : "table"))
                }
              >
                Grant Privileges On Table
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  setGrant((prev) => (prev === "column" ? "" : "column"))
                }
              >
                Grant Privileges On Column
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          {user && user.isAdmin && grant === "priv" && renderAdminGrantRole()}
          {user && !user.isAdmin && grant === "priv" && renderUserGrantRole()}
          {user && grant === "table" && renderAdminGrantTable()}
          {user && grant === "column" && renderAdminGrantCol()}

          {error && (
            <div className="w-100 ">
              <p className="errorMessage">{error}</p>
            </div>
          )}
          {screen === "priv" && <Col md={12}>{renderProfilesTable()}</Col>}
          {screen === "user" && <Col md={12}>{renderGetUserByPrivTable()}</Col>}
        </Row>
      </Container>
    </div>
  );
}

export default Privilege;
