import * as React from "react";
import * as Yup from "yup";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/modal";
import { Form, Formik } from "formik";
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { FaHome } from "react-icons/fa";
import { CgPassword } from "react-icons/cg";
import { Button } from "@chakra-ui/button";
import { AuthContext } from "../../store/auth-context";
import { InputRightElement, useToast } from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useHistory } from "react-router";

type LoginProps = {
  modalProps: Omit<ModalProps, "children">;
};

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, ({ min }) =>
      min === 1
        ? `Username must be at least ${min} character`
        : `Username must be at least ${min} characters`
    )
    .required("Username is a required field"),
  password: Yup.string()
    .min(6, ({ min }) =>
      min === 1
        ? `Password must be at least ${min} character`
        : `Password must be at least ${min} characters`
    )
    .required("Password is a required field"),
});

const Login = ({ modalProps }: LoginProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { login } = React.useContext(AuthContext);
  const toast = useToast();
  const history = useHistory();

  return (
    <Modal isCentered {...modalProps}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader textAlign="center">Login to your home</ModalHeader>

        <ModalBody>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                setLoading(true);
                await login!(values.username, values.password);
                history.push("/home");
              } catch (err) {
                toast({
                  title: "Error",
                  description: "Invalid username or password",
                  status: "error",
                  position: "top-right",
                  duration: 3000,
                  isClosable: true,
                });

                setLoading(false);
                resetForm();
              }
            }}
          >
            {(props) => (
              <Form id="login">
                <FormControl
                  mb={4}
                  isInvalid={!!props.errors.username && props.touched.username}
                >
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaHome />}
                    />

                    <Input
                      name="username"
                      placeholder="Username"
                      focusBorderColor="pink.500"
                      value={props.values.username}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </InputGroup>

                  <FormErrorMessage>{props.errors.username}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!props.errors.password && props.touched.password}
                >
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CgPassword />}
                    />

                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      focusBorderColor="pink.500"
                      value={props.values.password}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />

                    <InputRightElement
                      cursor="pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <HiEye /> : <HiEyeOff />}
                    </InputRightElement>
                  </InputGroup>

                  <FormErrorMessage>{props.errors.password}</FormErrorMessage>
                </FormControl>
              </Form>
            )}
          </Formik>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button
            type="submit"
            form="login"
            isFullWidth
            isLoading={loading}
            bgColor="pink.500"
            _hover={{
              bgColor: "pink.600",
            }}
            _focus={{ bgColor: "pink.600" }}
            _active={{ bgColor: "pink.600" }}
          >
            Login
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Login;
