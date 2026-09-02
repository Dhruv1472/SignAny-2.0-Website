// Business emails where you want to receive demo requests
const BUSINESS_EMAILS = ["dharmik@mvclouds.com"];

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
      // Use FormSubmit AJAX endpoint for JSON requests
      const formSubmitUrl = `https://formsubmit.co/ajax/${businessEmail}`;

      const payload = {
        Name: `${formData.firstName} ${formData.lastName}`,
        Email: formData.email,
        _subject: `SignAny 2.0 Demo Request from ${formData.firstName} ${formData.lastName}`,
        Company: formData.company,
        Country: formData.country,
        Phone: formData.phone || "Not provided",
        Message: formData.message || "No additional message",
        _captcha: "false",
        _template: "table",
      };

      const response = await fetch(formSubmitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();
      console.log(`FormSubmit response for ${businessEmail}:`, resData);

      if (!response.ok || resData.success === "false") {
        console.error(`FormSubmit error for ${businessEmail}:`, resData);
        return false;
      }
      return true;
    });

    const results = await Promise.all(sendPromises);
    return results.every((res) => res === true);
  } catch (error) {
    console.error("Error sending email via FormSubmit:", error);
    return false;
  }
};
