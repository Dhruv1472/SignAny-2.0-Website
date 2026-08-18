// Business emails where you want to receive demo requests
const BUSINESS_EMAILS = ["dhruv.k@mvclouds.com", "yash.s@mvclouds.com"];

export const sendDemoRequest = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  country: string;
  phone?: string;
  message?: string;
}): Promise<boolean> => {
  try {
    const sendPromises = BUSINESS_EMAILS.map(async (businessEmail) => {
      const formSubmitUrl = `https://formsubmit.co/${businessEmail}`;

      const data = new FormData();
      data.append("name", `${formData.firstName} ${formData.lastName}`);
      data.append("email", formData.email);
      data.append(
        "subject",
        `SignAny 2.0 Demo Request from ${formData.firstName} ${formData.lastName}`
      );
      data.append("company", formData.company);
      data.append("country", formData.country);
      data.append("phone", formData.phone || "Not provided");
      data.append("message", formData.message || "No additional message");

      // FormSubmit settings
      data.append("_captcha", "false");
      data.append("_template", "table");
      data.append(
        "_subject",
        `SignAny 2.0 Demo Request from ${formData.firstName} ${formData.lastName}`
      );

      const response = await fetch(formSubmitUrl, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        console.error(`FormSubmit error for ${businessEmail}:`, await response.text());
        return false;
      }
      return true;
    });

    const results = await Promise.all(sendPromises);
    return results.every((res) => res === true);
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
