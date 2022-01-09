import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  alterProfile,
  dropProfile,
  getProfile,
  getUsersByProfile,
} from "../../actions";
import "./style.css";

//phai co it nhat 1 trong 3 thang session,connect,idle
//input:{name:string,session:int[,connect:int,idle:int]}
//output:{ rowsAffected: 0 }
function EditProfile() {
  const { profileName } = useParams();
  const [errorLocal, setErrorLocal] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const {
    profile,
    isGetting,
    isAltering,
    isDropping,
    userByProfile,
    isGettingUserByProfile,
    error,
  } = useSelector((state) => state.profile);
  const [screen, setScreen] = useState("edit");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    if (profileName) {
      if (screen === "edit") {
        dispatch(getProfile(profileName));
      }
      if (screen === "user") {
        dispatch(getUsersByProfile(profileName));
      }
    }
  }, [dispatch, profileName, screen]);

  useEffect(() => {
    if (profile && Object.keys(profile).length > 0) {
      reset({
        profile: profile.profile,
        sessionsPerUser: profile.sessionsPerUser,
        connectTime: profile.connectTime,
        idleTime: profile.idleTime,
      });
    }
  }, [reset, profile]);

  const onSubmit = (data) => {
    if (
      data.sessionsPerUser === "" &&
      data.connectTime === "" &&
      data.idleTime === ""
    ) {
      setErrorLocal(
        "Required to have at least 1 of 3 fields: Sesions per user, connect time, idle time"
      );
      return;
    } else {
      Object.keys(data).forEach((k) => data[k] === "" && delete data[k]);
      if (!isNaN(data.sessionsPerUser))
        data.sessionsPerUser = Number(data.sessionsPerUser);
      if (!isNaN(data.connectTime)) data.connectTime = Number(data.connectTime);
      if (!isNaN(data.idleTime)) data.idleTime = Number(data.idleTime);
      dispatch(alterProfile(data));
      // .then(() => {
      //   history.push("/profiles");
      // });
    }
  };

  const handleDrop = () => {
    if (profile && Object.keys(profile).length > 0) {
      dispatch(dropProfile(profile.profile));
      // .then(() => {
      //   history.push("/profiles");
      // });
    }
  };

  const columns = ["#", "USERNAME"];

  const options = {
    filter: true,
    filterType: "multiselect",
    download: false,
    print: false,
    selectableRowsHideCheckboxes: true,
  };
  let data = [];
  if (userByProfile) {
    data = userByProfile.map((user, index) => [index + 1, user.USERNAME]);
  }
  const renderTable = () =>
    data && (
      <MUIDataTable
        title={"Users"}
        data={data}
        columns={columns}
        options={options}
      />
    );

  return (
    <Container>
      <div className="mb-3">
        <Button onClick={() => setScreen("edit")} className="mr-2">
          Edit
        </Button>
        <Button onClick={() => setScreen("user")} className="mr-2">
          User
        </Button>
      </div>
      <div>
        {error && <p className="errorMessage">{error}</p>}
        {screen === "edit" && (
          <Form onSubmit={handleSubmit(onSubmit)}>
            {errorLocal !== "" && <p className="errorMessage">{errorLocal}</p>}

            <div>
              <Form.Label className="form__title d-block">Profile:</Form.Label>
              <Form.Control
                className="form__input w-100"
                {...register(`profile`, { required: true })}
                placeholder="Profile"
              />
              {errors?.profile?.type === "required" && (
                <p className="errorMessage">This field is required</p>
              )}
            </div>
            <div>
              <Form.Label className="form__title d-block">
                Sessions per user:
              </Form.Label>
              <Form.Control
                className="form__input w-100"
                {...register(`sessionsPerUser`)}
                placeholder="Sessions per user"
              />
            </div>
            <div>
              <Form.Label className="form__title d-block">
                Connect time:
              </Form.Label>
              <Form.Control
                className="form__input w-100"
                {...register(`connectTime`)}
                placeholder="Connect time"
              />
            </div>
            <div>
              <Form.Label className="form__title d-block">
                Idle time:
              </Form.Label>
              <Form.Control
                className="form__input w-100"
                {...register(`idleTime`)}
                placeholder="Idle time"
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
        )}
        {screen === "user" && renderTable()}
      </div>
    </Container>
  );
}

export default EditProfile;
