import React, { useEffect } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { alterUser, getUser, dropUser } from "../../actions";
import "./style.css";
//input: {name:"user69",password:123[,defaultTablespace:"USERS",quota:'5M',
//tempTablespace:'TEMP',profile:'pro69',state:'LOCK||UNLOCK'] }
//output:{ rowsAffected: 0 }
function EditUser() {
  const { username } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();
  const { user, isGetting, isAltering, isDropping, error } = useSelector(
    (state) => state.user
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    if (username) {
      dispatch(getUser(username));
    }
  }, [dispatch, username]);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      reset({
        name: user.USERNAME,
        defaultTablespace: user.DEFAULT_TABLESPACE,
        quota: user.QUOTAS,
        tempTablespace: user.TEMPORARY_TABLESPACE,
        profile: user.PROFILE,
      });
    }
  }, [reset, user]);

  const onSubmit = (data) => {
    Object.keys(data).forEach((k) => data[k] === "" && delete data[k]);
    dispatch(alterUser(data));
    // .then(() => {
    //   if (!error) {
    //     history.push("/users");
    //   }
    // });
  };

  const handleDrop = () => {
    if (user && Object.keys(user).length > 0) {
      dispatch(dropUser(user.USERNAME));
      // .then(() => {
      //   if (!error) {
      //     history.push("/users");
      //   }
      // });
    }
  };

  return (
    <Container>
      <div>
        {error && <p className="errorMessage">{error}</p>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Form.Label className="form__title d-block">Username:</Form.Label>
            <Form.Control
              className="form__input w-100"
              {...register(`name`, { required: true })}
              placeholder="Username"
              readOnly
            />
            {errors?.name?.type === "required" && (
              <p className="errorMessage">This field is required</p>
            )}
          </div>
          <div>
            <Form.Label className="form__title d-block">Password:</Form.Label>
            <Form.Control
              className="form__input w-100"
              {...register(`password`, { required: true })}
              placeholder="Password"
              type="password"
            />
            {errors?.password?.type === "required" && (
              <p className="errorMessage">This field is required</p>
            )}
          </div>
          <div>
            <Form.Label className="form__title d-block">
              Default Tablespace:
            </Form.Label>
            <Form.Control
              className="form__input w-100"
              {...register(`defaultTablespace`)}
              placeholder="USERS"
            />
          </div>
          <div>
            <Form.Label className="form__title d-block">Quota:</Form.Label>
            <Form.Control
              className="form__input w-100"
              {...register(`quota`)}
              placeholder="DEFAULT"
            />
          </div>
          <div>
            <Form.Label className="form__title d-block">
              Temp Tablespace:
            </Form.Label>
            <Form.Control
              className="form__input w-100"
              {...register(`tempTablespace`)}
              placeholder="TEMP"
            />
          </div>
          <div>
            <Form.Label className="form__title d-block">Profile:</Form.Label>
            <Form.Control
              className="form__input w-100"
              {...register(`profile`)}
              placeholder="DEFAULT"
            />
          </div>
          <div className="mt-2">
            <Form.Label className="form__title d-inline-block mr-2">
              <input
                {...register("state")}
                type="radio"
                name="state"
                value="LOCK"
                className="mr-2"
              />
              LOCK
            </Form.Label>
            <Form.Label className="form__title d-inline-block">
              <input
                {...register("state")}
                type="radio"
                name="state"
                value="UNLOCK"
                className="mr-2"
              />
              UNLOCK
            </Form.Label>
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
    </Container>
  );
}

export default EditUser;
