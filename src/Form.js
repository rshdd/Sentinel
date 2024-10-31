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
      userId,
      taskType,
      issueReason,
      userFirstName,
      workSpace,
      cerbyApiToken,
      provider,
    } = data;
    let actionMessage;

    switch (taskType) {
      case "Access Account":
        actionMessage = `We detected a request to access the account, but it was unsuccessful due to the following issue: ${issueReason}.`;
        break;
      case "Disable MFA":
        actionMessage = `The request to disable multi-factor authentication has encountered an issue: ${issueReason}.`;
        break;
      case "Email Swap In":
        actionMessage = `Your request to swap the email was unsuccessful due to: ${issueReason}.`;
        break;
      case "Healthcheck MFA":
        actionMessage = `During the health check for multi-factor authentication, we found an issue: ${issueReason}.`;
        break;
      case "Password Rotation":
        actionMessage = `The password rotation process failed due to: ${issueReason}.`;
        break;
      case "Setup MFA":
        actionMessage = `There was a problem setting up multi-factor authentication: ${issueReason}.`;
        break;
      case "Get Business (Sync)":
        actionMessage = `The synchronization request for the tenant information could not be completed because of: ${issueReason}.`;
        break;
      case "Provide Access (Add a user)":
        actionMessage = `We encountered an issue while adding a user: ${issueReason}.`;
        break;
      case "Revoke Access (Remove a user)":
        actionMessage = `The request to revoke access for a user failed due to: ${issueReason}.`;
        break;
      case "Update Access":
        actionMessage = `Updating user access encountered an issue: ${issueReason}.`;
        break;
      default:
        actionMessage = `We detected an issue with the task: ${taskType}. The reason provided is: ${issueReason}.`;
        break;
    }

    const compiledMessage = `Hi ${userFirstName}, this is an automated message. 

The Cerby support system detected a failed ${taskType} attempt to the following account from Cerby: https://${workSpace}.cerby.com/account?id=${accountId}.

${actionMessage}

Please indicate if you require any further assistance from the Cerby Team. Replying to this email will route you directly to one of your support specialists. 

Best, 
The Cerby Team

-------------------------------------------------

Other information:
  User ID: ${userId}
  Provider: ${provider}
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

              <Form.Group className="mb-3 text-start" controlId="userFirstName">
                <Form.Label>Provider 🌐</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Application Provider"
                  {...register("userFirstName", { required: true })}
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
                  <option value="CMe / CMp Not Managed">
                    CMe / CMp Not Managed
                  </option>
                  <option value="Interference">Interference</option>
                  <option value="Invalid Credentials">
                    Invalid Credentials
                  </option>
                  <option value="Invalid TOTP">Invalid TOTP</option>
                  <option value="IP Address">IP Address</option>
                  <option value="Missing BusinessID">Missing BusinessID</option>
                  <option value="Network">Network</option>
                  <option value="Pre-Stored Password">
                    Pre-Stored Password
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
                rows={15}
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
