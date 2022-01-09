import React, { useEffect, useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addRole } from "../../actions";
import "./style.css";
//input:{name:string[,password:string]}
//output: { rowsAffected: 0 }
function AddRole() {
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
    setIsLoading(true);
    Object.keys(data).forEach((k) => data[k] === "" && delete data[k]);
    dispatch(addRole(data)).then(() => {
      setIsLoading(false);
      history.push("/roles");
    });
  };

  return (
    <Container>
      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Form.Label className="form__title d-block">Role:</Form.Label>
            <Form.Control
              className="form__input w-100"
              {...register(`name`, { required: true })}
              placeholder="Role"
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

export default AddRole;
