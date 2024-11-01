import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

const TechSupportForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [taskType, setTaskType] = useState("");
  const [message, setMessage] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [showTokenField, setShowTokenField] = useState(false);

  const buttonRef = useRef(null);
  const tokenFieldRef = useRef(null);

  const onSubmit = (data) => {
    const {
      accountId,
      taskType,
      issueReason,
      userFirstName,
      workSpace,
      cerbyApiToken,
      provider,
      userEmail,
      userId,
    } = data;
    let actionMessage;
    let issueMessage;

    switch (taskType) {
      case "Access Account":
        actionMessage = `The access to the account was unsuccessful due to the following issue: ${issueReason}.`;
        break;
      case "Disable MFA":
        actionMessage = `The request to disable multi-factor authentication was unsuccessful due to the following issue: ${issueReason}.`;
        break;
      case "Email Swap In":
        actionMessage = `The request to swap the email was unsuccessful due to the following issue: ${issueReason}.`;
        break;
      case "Healthcheck MFA":
        actionMessage = `The health check for multi-factor authentication was unsuccessful due to the following issue: ${issueReason}.`;
        break;
      case "Password Rotation":
        actionMessage = `The password rotation was unsuccessful due to the following issue: ${issueReason}.`;
        break;
      case "Setup MFA":
        actionMessage = `The request to set up multi-factor authentication was unsuccessful due to the following issue: ${issueReason}.`;
        break;
      case "Get Business (Sync)":
        actionMessage = `The request to sync with your tenant was unsuccessful due to the following issue: ${issueReason}.`;
        break;
      case "Provide Access (Add a user)":
        actionMessage = `The request to add a user to your tenant was unsuccessful due to the following issue: ${issueReason}.`;
        break;
      case "Revoke Access (Remove a user)":
        actionMessage = `The request to revoke access to a user on your tenant was unsuccessful due to the following issue: ${issueReason}.`;
        break;
      case "Update Access":
        actionMessage = `The request to update user access was unsuccessful due to the following issue: ${issueReason}.`;
        break;
      default:
        actionMessage = `We detected an issue with the task: ${taskType}. The reason provided is: ${issueReason}.`;
        break;
    }

    switch (issueReason) {
      case "Cerby Managed Email/Phone Not Managed":
        issueMessage = `Essentially, the code was not sent to Cerby and the automation can't complete the 2FA challenge.

For this, we recommend creating a Cerby-managed email/phone. This way, the automation can fill in the confirmation code on your behalf. You can find more details in the following documentation: https://help.cerby.com/en/articles/6393770-video-how-to-add-a-cerby-managed-email-or-phone-number-to-your-account`;
        break;

      case "Interference":
        issueMessage = `This may happen when the automation workflow is filling in the login details, and the tab is unexpectedly closed or interrupted. Our recommendation is to wait until the automation has been completed automatically.

If auto-login is failing, you can manually fill in the detail using the extension. On the username and password field, you should be able to see the Cerby logo and select the right fill to insert. You can see the steps in this short video: https://share.vidyard.com/watch/9B1zeTZ9ZyHfZMMegibWAp`;
        break;

      case "Invalid Credentials":
        issueMessage = `Apparently, the credentials (username and/or password) stored inside Cerby for this account need to be corrected. Please verify the credentials inside Cerby and the Application are the same, update them with the correct ones if needed, and try again.`;
        break;

      case "Invalid TOTP":
        issueMessage = `This may happen when the application is not accepting the generated TOTP as a valid verification code.

As a workaround, you can manually fill in the TOTP detail using the extension. Inside the code field, at the right, you should be able to see the cerby logo and select the right fill to insert.`;
        break;

      case "IP Address":
        issueMessage = `This usually happens when an application identifies multiple retries or logins that have been performed from a single IP Address.

As a workaround, perhaps you could try from a different IP address, this can be achieved by using a VPN or switching to an alternate Wi-Fi network.`;
        break;

      case "Missing BusinessID":
        issueMessage = `This app has a field called Business ID, which means you must add the information required to perform any automation with this account. You can find your business ID on the URL of the app you are trying to add before the domain.

This is the structure we are looking for: "https://(Business ID).${provider}.com"

After you add the business ID to your Cerby app, the automation should work without a problem.`;
        break;

      case "Network":
        issueMessage = `This may happen when the automation workflow is filling in the login details and the application takes longer than expected to load. This could be caused due to hiccups in the network performance.

Feel free to retry the login, or if auto-login is failing, you can manually fill in the details using the extension. On the username and password field, you should be able to see the Cerby logo and select the right fill to insert. 

You can see the steps in this short video: https://share.vidyard.com/watch/9B1zeTZ9ZyHfZMMegibWAp`;
        break;

      case "Pre-Stored Password/Browser Interference":
        issueMessage = `Apparently, the introduced password was incorrect. This usually happens when the credentials are stored on a local password manager.

If auto-login is failing, you can manually fill in the detail using the extension. On the username and password field, you should be able to see the Cerby logo and select the right fill to insert. 

You can follow the steps in our help video: https://share.vidyard.com/watch/9B1zeTZ9ZyHfZMMegibWAp`;
        break;

      case "2FA Not Managed":
        issueMessage = `Essentially, there is no way Cerby is able to complete the 2FA challenge automatically.

For this, we recommend enabling 2FA with Cerby as described in this document: https://help.cerby.com/en/articles/6992597-how-to-turn-on-2fa-for-google-manually`;
        break;

      case "Account Limited":
        issueMessage = `Based on our logs, we identified the error message you encountered as "Too many attempts. Try again later" or “Maximum number of attempts reached.”

As a workaround, our recommendation is to perform a manual login with the “Phone” option as described in this video: https://help.cerby.com/en/articles/8092336-video-how-to-log-in-to-tiktok-using-a-cerby-managed-phone-number

If you still face this error, we recommend using an alternative browser (Chrome, Firefox, Edge, or Safari).`;
        break;

      case "Captcha Issue":
        issueMessage = `Unfortunately, Cerby is unable to solve those Captchas on your behalf, so the expectation is for you to solve it manually.

Feel free to retry the login, or if you continue having issues let us know if you would like us to assist you in any way.`;
        break;

      default:
        issueMessage = `An unknown issue occurred. The reason provided is: ${issueReason}.`;
        break;
    }

    const compiledMessage = `Hi ${userFirstName}, this is an automated message. 

The Cerby support system detected a failed ${taskType} attempt to the following ${provider} account from Cerby: https://${workSpace}.cerby.com/account?id=${accountId}

${issueMessage}

Please indicate if you require any further assistance from the Cerby Team. Replying to this email will route you directly to one of your support specialists. 

Best, 
The Cerby Team

-----------------------------------------------------------------------

Other information:
  Email to reach out to: ${userEmail}
  User ID: ${userId}
  ${actionMessage}
  API Token: ${cerbyApiToken}`;

    setMessage(compiledMessage);
    setIsEditable(true);
  };

  const handleTaskTypeChange = (event) => {
    setTaskType(event.target.value);
  };

  const handleReset = () => {
    reset();
    setMessage("");
    setIsEditable(false);
    setTaskType("");
    setShowTokenField(false);
  };

  const toggleTokenField = () => {
    setShowTokenField((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      tokenFieldRef.current &&
      !tokenFieldRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setShowTokenField(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container fluid className="mt-4">
      <Card className="p-4">
        <Row className="align-items-center justify-content-center">
          <Col>
            <h2 className="text-center">Cerby's Sentinel 🐶🚀</h2>
          </Col>
        </Row>

        <hr
          style={{ margin: "20px 0", borderColor: "#ccc", borderWidth: "2px" }}
        />

        <Row>
          <Col md={6}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3 text-start" controlId="formAccountID">
                <Form.Label>Account ID 🆔</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Account ID"
                  {...register("accountId", { required: true })}
                />
                {errors.accountId && (
                  <p className="text-danger">Account ID is required</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3 text-start" controlId="formUserID">
                <Form.Label>User ID 👤</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter User ID"
                  {...register("userId", { required: true })}
                />
                {errors.userId && (
                  <p className="text-danger">User ID is required</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3 text-start" controlId="workSpace">
                <Form.Label>Workspace 🏢</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Workspace / Will be fetched from API"
                  {...register("workSpace", { required: true })}
                />
                {errors.workSpace && (
                  <p className="text-danger">Workspace is required</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3 text-start" controlId="provider">
                <Form.Label>Provider 🌐</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Application Provider"
                  {...register("provider", { required: true })}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-start" controlId="userFirstName">
                <Form.Label>User First Name 🙋‍♂️</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter User First Name / Will be fetched from API"
                  {...register("userFirstName", { required: true })}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-start" controlId="formTaskType">
                <Form.Label>Task 🛠️</Form.Label>
                <Form.Control
                  as="select"
                  {...register("taskType", { required: true })}
                  onChange={handleTaskTypeChange}
                >
                  <option value="">Select a task</option>
                  <option value="Access Account">Access Account</option>
                  <option value="Password Rotation">Password Rotation</option>
                  <option value="Disable MFA">Disable MFA</option>
                  <option value="Email Swap In">Email Swap In</option>
                  <option value="Healthcheck MFA">Healthcheck MFA</option>
                  <option value="Setup MFA">Setup MFA</option>
                  <option value="Get Business (Sync)">
                    Get Business (Sync)
                  </option>
                  <option value="Provide Access (Add a user)">
                    Provide Access (Add a user)
                  </option>
                  <option value="Revoke Access (Remove a user)">
                    Revoke Access (Remove a user)
                  </option>
                  <option value="Update Access">Update Access</option>
                </Form.Control>
                {errors.taskType && (
                  <p className="text-danger">Please select a task</p>
                )}
              </Form.Group>

              <Form.Group
                className="mb-3 text-start"
                controlId="formIssueReason"
              >
                <Form.Label>Reason for the Issue ❗</Form.Label>
                <Form.Control
                  as="select"
                  {...register("issueReason", { required: true })}
                >
                  {taskType === "" && (
                    <option value="">Please select a task first</option>
                  )}
                  <option value="Cerby Managed Email/Phone Not Managed">
                    CMe / CMp ot Managed
                  </option>
                  <option value="Interference">Interference</option>
                  <option value="Invalid Credentials">
                    Invalid Credentials
                  </option>
                  <option value="Invalid TOTP">Invalid TOTP</option>
                  <option value="IP Address">IP Address</option>
                  <option value="Missing BusinessID">Missing BusinessID</option>
                  <option value="Network">Network</option>
                  <option value="Pre-Stored Password/Browser Interference">
                    Pre-Stored Password / Browser Interference
                  </option>
                  <option value="2FA Not Managed">2FA Not Managed</option>
                  <option value="Account Limited">Account Limited</option>
                  <option value="Captcha Issue">Captcha Issue</option>
                </Form.Control>
                {errors.issueReason && (
                  <p className="text-danger">Please select a reason</p>
                )}
              </Form.Group>

              <Form.Group className="mt-4">
                <Button variant="primary" type="submit">
                  Submit ✅
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleReset}
                  className="ms-2"
                >
                  Reset 🔄
                </Button>
                <Button
                  ref={buttonRef}
                  variant="info"
                  onClick={toggleTokenField}
                  className="ms-2"
                >
                  {showTokenField ? "Hide API Token 🔑" : "Show API Token 🔑"}
                </Button>
                {showTokenField && (
                  <Form.Group ref={tokenFieldRef} className="mt-4">
                    <Form.Label>API Token 🔑</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Cerby API Token"
                      {...register("cerbyApiToken")}
                    />
                  </Form.Group>
                )}
              </Form.Group>
            </Form>
          </Col>
          <Col md={6}>
            <Card className="p-4">
              <h5 className="text-center">Recommended Message 📨</h5>
              <textarea
                className="form-control"
                rows={23}
                value={message}
                readOnly={!isEditable}
                style={{ resize: "none" }}
              />
            </Card>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default TechSupportForm;
