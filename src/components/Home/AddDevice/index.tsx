import * as React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
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
  // useToast,
} from "@chakra-ui/react";
import { MdDevices } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

type AddDeviceProps = {
  modalProps: Omit<ModalProps, "children">;
};

const DeviceSchema = Yup.object().shape({
  deviceId: Yup.string()
    .min(4, ({ min }) =>
      min === 1
        ? `Device ID must be at least ${min} character`
        : `Device ID must be at least ${min} characters`
    )
    .required("Device ID is a required field"),
});

const AddDevice = ({ modalProps }: AddDeviceProps) => {
  // const [loading, setLoading] = React.useState(false);
  // const toast = useToast();

  return (
    <Modal isCentered {...modalProps}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader textAlign="center">Connect your device</ModalHeader>

        <ModalBody>
          <Formik
            initialValues={{
              deviceId: "",
            }}
            validationSchema={DeviceSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                console.log(values);
              } catch (err) {}
            }}
          >
            {(props) => (
              <Form id="login">
                <FormControl
                  isInvalid={!!props.errors.deviceId && props.touched.deviceId}
                >
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<MdDevices />}
                    />

                    <Input
                      name="deviceId"
                      placeholder="Device ID"
                      focusBorderColor="pink.500"
                      value={props.values.deviceId}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      pr={12}
                    />

                    <InputRightElement mr={1}>
                      <Button
                        size="xs"
                        _focus={{}}
                        onClick={() => {
                          const id = uuidv4();
                          props.setFieldValue("deviceId", id);
                        }}
                      >
                        Auto
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <FormErrorMessage>{props.errors.deviceId}</FormErrorMessage>
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
            // isLoading={loading}
            bgColor="pink.500"
            _hover={{
              bgColor: "pink.600",
            }}
            _focus={{ bgColor: "pink.600" }}
            _active={{ bgColor: "pink.600" }}
          >
            Connect
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddDevice;
