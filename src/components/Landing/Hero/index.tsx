import * as React from "react";
import GooglePayButton from "@google-pay/button-react";
import generator from "generate-password";
import hero from "../../../assets/images/hero.svg";
import {
  Center,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";
import { sendUserCredentials } from "../../../services/email.service";

const Hero = () => {
  const { signup } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Center
      flexDirection={{ base: "column", lg: "row" }}
      gridGap={{ base: 16, lg: 20 }}
      px={10}
      py={{ base: 10, lg: 20 }}
    >
      <Stack spacing={10} maxW="lg" textAlign={{ base: "center", lg: "left" }}>
        <Stack>
          <Heading>
            Controlling your{" "}
            <Text as="span" color="pink.500">
              HOME
            </Text>{" "}
            has never been this easy
          </Heading>

          <Text color="gray.400">
            Track your home's energy usage, temperature, and security with our
            state-of-the art smart devices.
          </Text>
        </Stack>

        <GooglePayButton
          buttonColor="white"
          buttonSizeMode="fill"
          environment="TEST"
          paymentRequest={{
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
              {
                type: "CARD",
                parameters: {
                  allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                  allowedCardNetworks: ["VISA", "MASTERCARD"],
                },
                tokenizationSpecification: {
                  type: "PAYMENT_GATEWAY",
                  parameters: {
                    gateway: "example",
                    gatewayMerchantId: "exampleGatewayMerchantId",
                  },
                },
              },
            ],
            merchantInfo: {
              merchantId: "00000000-0000-0000-0000-000000000000",
              merchantName: "SmartIO",
            },
            transactionInfo: {
              totalPrice: "0",
              totalPriceStatus: "FINAL",
              totalPriceLabel: "Total",
              currencyCode: "USD",
              countryCode: "US",
            },
            emailRequired: true,
          }}
          onLoadPaymentData={async ({ email }) => {
            try {
              const password = generator.generate();
              await signup!(email!, password);
              await sendUserCredentials(email!, password);
              console.log("success");
            } catch (err) {
              console.log(err);
            }
          }}
        />
      </Stack>

      <Image boxSize={{ base: "full", md: "50%", lg: "40%" }} src={hero} />
    </Center>
  );
};

export default Hero;
