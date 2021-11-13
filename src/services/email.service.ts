import http from "../utils/http.util";

export const sendUserCredentials = async (email: string, password: string) => {
  try {
    const res = await http.post("sendUserCredentials", {
      email,
      password
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
