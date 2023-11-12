import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Card, Alert, Form, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TypeRegistraionData, registrationSchema } from "../models/UserModel";

const ResetCredentials: React.FC = () => {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeRegistraionData>({
    resolver: zodResolver(registrationSchema),
  });

  const registerUser = async (data: TypeRegistraionData) => {
    // try {
    //   setLoading(true);
    //   await userSignUp(data.email, data.password);
    //   setError("");
    //   navigate("/");
    // } catch (error: any) {
    //   handleErrors(setError, error.code);
    // }
    // setLoading(false);
    console.log(data);
  };

  return (
    <>
      <Card>
        <Card.Header className="text-center">
          <h3>
            <strong>Update Profile</strong>
          </h3>
        </Card.Header>
        <Card.Body className="p-5 ">
          {error && (
            <Alert variant="danger" className="danger">
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit(registerUser)}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                defaultValue={user?.email || ""}
                {...register("email")}
                type="email"
              />
              {errors.email && (
                <Form.Text className="text-danger">
                  {errors.email.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group id="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Fill to reset"
                {...register("password")}
                type="password"
              />
              {errors.password && (
                <Form.Text className="text-danger">
                  {errors.password.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group id="passwordConfirm" className="mt-3">
              <Form.Label>Password confirmation</Form.Label>
              <Form.Control
                placeholder="Fill to reset"
                {...register("passwordConfirm")}
                type="password"
              />
              {errors.passwordConfirm && (
                <Form.Text className="text-danger">
                  {errors.passwordConfirm.message}
                </Form.Text>
              )}
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 mt-4">
              {!loading ? "Update" : <Spinner animation="border" />}
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-center">
          <Link to="/">Back</Link>
        </Card.Footer>
      </Card>
    </>
  );
};

export default ResetCredentials;
