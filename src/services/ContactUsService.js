import api from "../services/apiAllowAny";

export default {
  sendContactUsForm(body) {
    return api().post("contact-us", body);
  }
};
