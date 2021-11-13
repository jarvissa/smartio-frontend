import * as React from "react";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useToast,
} from "@chakra-ui/react";
import { FaEnvelope } from "react-icons/fa";
import { Form, Formik } from "formik";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { IoIosKeypad } from "react-icons/io";
import { useAuth } from "../../../hooks/useAuth";
import { useHistory } from "react-router";

type LoginProps = {
  modalProps: Omit<ModalProps, "children">;
};

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email address is a required field"),
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
  const { login } = useAuth();
  const { push } = useHistory();
  const toast = useToast();

  return (
    <Modal isCentered {...modalProps}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader textAlign="center">Log into your home</ModalHeader>

        <ModalBody>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                setLoading(true);
                await login!(values.email, values.password);
                push("/home");
              } catch (err) {
                toast({
                  title: "Error",
                  description: "Invalid user credentials",
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
                  isInvalid={!!props.errors.email && props.touched.email}
                >
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaEnvelope />}
                    />

                    <Input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      focusBorderColor="pink.500"
                      value={props.values.email}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </InputGroup>

                  <FormErrorMessage>{props.errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!props.errors.password && props.touched.password}
                >
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<IoIosKeypad />}
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
