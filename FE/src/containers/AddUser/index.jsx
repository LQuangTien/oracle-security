import React from "react";
import { useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addUser } from "../../actions";
import "./style.css";
//input: {name:"user69",password:123[,defaultTablespace:"USERS",quota:'5M',
//tempTablespace:'TEMP',profile:'pro69',state:'LOCK||UNLOCK'] }
//output:{ rowsAffected: 0 }
function AddUser(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    Object.keys(data).forEach((k) => data[k] === "" && delete data[k]);
    dispatch(addUser(data)).then(() => {
      setIsLoading(false);
      history.push("/users");
    });
  };

  return (
    <Container>
      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Form.Label className="form__title d-block">Username:</Form.Label>
            <Form.Control
              className="form__input w-100"
              {...register(`name`, { required: true })}
              placeholder="Username"
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
            Add
          </button>
        </Form>
      </div>
    </Container>
  );
}

export default AddUser;
