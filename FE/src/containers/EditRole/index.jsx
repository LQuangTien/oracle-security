import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  alterRole,
  dropRole,
  getAllPrivByRole,
  getAllUserByRole,
} from "../../actions";
import "./style.css";
//input: {name:"user69",password:123[,defaultTablespace:"USERS",quota:'5M',
//tempTablespace:'TEMP',profile:'pro69',state:'LOCK||UNLOCK'] }
//output:{ rowsAffected: 0 }
function EditRole() {
  const { roleName } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();
  const {
    isAltering,
    isDropping,
    allPrivByRole,
    allUserByRole,
    isGettingAllPrivByRole,
    isGettingAllUserByRole,
    error,
  } = useSelector((state) => state.role);
  const { user, authenticate } = useSelector((state) => state.auth);
  const [screen, setScreen] = useState("edit");

  useEffect(() => {
    if (user.isAdmin) {
      if (screen === "priv") {
        dispatch(getAllPrivByRole(roleName));
      }
      if (screen === "user") {
        dispatch(getAllUserByRole(roleName));
      }
    }
  }, [screen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    reset({
      name: roleName,
    });
  }, [roleName]);

  const onSubmit = (data) => {
    Object.keys(data).forEach((k) => data[k] === "" && delete data[k]);
    dispatch(alterRole(data));
  };

  const handleDrop = () => {
    dispatch(dropRole(roleName)).then(() => {
      history.push("/roles");
    });
  };

  const allPrivByRoleColumns = ["#", "PRIVILEGE", "GRANTABLE"];
  const allUserByRoleColumns = ["#", "GRANTEE", "GRANTABLE"];

  const options = {
    filter: true,
    filterType: "multiselect",
    download: false,
    print: false,
    selectableRowsHideCheckboxes: true,
  };
  let allPrivByRoleData = [];
  let allUserByRoleData = [];
  if (allPrivByRole) {
    allPrivByRoleData = allPrivByRole.map((priv, index) => [
      index + 1,
      priv.privilege,
      priv.grantable,
    ]);
  }
  if (allUserByRole) {
    allUserByRoleData = allUserByRole.map((user, index) => [
      index + 1,
      user.GRANTEE,
      user.ADMIN_OPTION,
    ]);
  }
  const renderAllPrivByRoleTable = () =>
    allPrivByRoleData && (
      <MUIDataTable
        title={"Role's Privilege"}
        data={allPrivByRoleData}
        columns={allPrivByRoleColumns}
        options={options}
      />
    );
  const renderAllUserByRoleTable = () =>
    allPrivByRoleData && (
      <MUIDataTable
        title={"Role's User"}
        data={allUserByRoleData}
        columns={allUserByRoleColumns}
        options={options}
      />
    );

  return (
    <Container>
      <div className="mt-3">
        <Button onClick={() => setScreen("edit")} className="mr-2">
          Edit
        </Button>
        {user.isAdmin && (
          <>
            <Button onClick={() => setScreen("priv")} className="mr-2">
              Privilege
            </Button>
            <Button onClick={() => setScreen("user")}>User</Button>
          </>
        )}
      </div>
      <div className="my-2">
        {error && <p className="errorMessage">{error}</p>}
      </div>
      {screen === "edit" && (
        <div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Form.Label className="form__title d-block">Role:</Form.Label>
              <Form.Control
                className="form__input w-100"
                {...register(`name`, { required: true })}
                placeholder="Role"
                disabled
              />
              {errors?.name?.type === "required" && (
                <p className="errorMessage">This field is required</p>
              )}
            </div>
            <div>
              <Form.Label className="form__title d-block">Password:</Form.Label>
              <Form.Control
                className="form__input w-100"
                type="password"
                {...register(`password`)}
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="btn btn-success w-25 mt-3"
              disabled={isAltering || isDropping}
            >
              {isAltering && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              ALTER
            </button>
            <button
              type="button"
              onClick={handleDrop}
              className="btn btn-danger w-25 mt-3"
              disabled={isAltering || isDropping}
            >
              {isDropping && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              DELETE
            </button>
          </Form>
        </div>
      )}
      {user.isAdmin && screen === "priv" && renderAllPrivByRoleTable()}
      {user.isAdmin && screen === "user" && renderAllUserByRoleTable()}
    </Container>
  );
}

export default EditRole;
