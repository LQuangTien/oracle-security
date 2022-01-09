import React, { useEffect, useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addProfile } from "../../actions";
import "./style.css";
//phai co it nhat 1 trong 3 thang session,connect,idle
//input:{name:string,session:int[,connect:int,idle:int]}
//output:{ rowsAffected: 0 }
function AddProfile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (
      data.sessionsPerUser === "" &&
      data.connectTime === "" &&
      data.idleTime === ""
    ) {
      setError(
        "Required to have at least 1 of 3 fields: Sesions per user, connect time, idle time"
      );
      return;
    }
    setIsLoading(true);
    Object.keys(data).forEach((k) => data[k] === "" && delete data[k]);
    if (!isNaN(data.sessionsPerUser))
      data.sessionsPerUser = Number(data.sessionsPerUser);
    if (!isNaN(data.connectTime)) data.connectTime = Number(data.connectTime);
    if (!isNaN(data.idleTime)) data.idleTime = Number(data.idleTime);
    dispatch(addProfile(data)).then(() => {
      setIsLoading(false);
      history.push("/profiles");
    });
  };

  return (
    <Container>
      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {error !== "" && <p className="errorMessage">{error}</p>}
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
            <Form.Label className="form__title d-block">Idle time:</Form.Label>
            <Form.Control
              className="form__input w-100"
              {...register(`idleTime`)}
              placeholder="Idle time"
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-25 mt-3"
            disabled={isLoading}
          >
            {isLoading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            Submit
          </button>
        </Form>
      </div>
    </Container>
  );
}

export default AddProfile;
