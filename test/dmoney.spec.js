const { expect } = require("chai");
const axios = require("axios");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL || "http://localhost:4000";
const PARTNER_KEY = process.env.PARTNER_KEY || "ROADTOSDET";

describe("dMoney Financial Transaction Workflow - Integration Testing Suite", function () {
  this.timeout(30000);

  // Authentication tokens
  let adminToken = "";
  let systemToken = "";
  let agentToken = "";
  let customer1Token = "";
  let customer2Token = "";

  // User credentials and identifiers
  let customer1Id = "";
  let customer1Phone = "";
  let customer1Email = "";
  let customer1Otp = "";

  let customer2Id = "";
  let customer2Phone = "";
  let customer2Email = "";
  let customer2Otp = "";

  let agentId = "";
  let agentPhone = "";
  let agentEmail = "";
  let agentOtp = "";

  let merchantId = "";
  let merchantPhone = "";
  let merchantEmail = "";

  // Helper for admin authorized headers
  const getAdminHeaders = () => ({
    headers: {
      Authorization: `Bearer ${adminToken}`,
      "X-AUTH-SECRET-KEY": PARTNER_KEY,
    },
  });

  // --- Phase 1: Authentication & User Provisioning ---

  it("1. Admin Login - Authenticate and retrieve bearer token", async () => {
    const response = await axios.post(`${BASE_URL}/user/login`, {
      email: "admin@dmoney.com",
      password: "1234",
    });

    console.log("Admin Login Response:", response.data);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("token");
    expect(response.data.message).to.equal("Login successful");
    expect(response.data.role).to.equal("Admin");

    adminToken = response.data.token;
  });

  it("2. Create Customer 1 - Register first customer account", async () => {
    const timestamp = Date.now().toString().slice(-8);
    customer1Phone = `017${timestamp}`;
    customer1Email = `customer1_${timestamp}@gmail.com`;

    const payload = {
      name: "Sakib Ahmed",
      email: customer1Email,
      password: "1234",
      phone_number: customer1Phone,
      nid: `19${timestamp}`,
      role: "Customer",
    };

    const response = await axios.post(
      `${BASE_URL}/user/create`,
      payload,
      getAdminHeaders()
    );

    console.log("Customer 1 Created Response:", response.data);
    expect(response.status).to.equal(201);
    expect(response.data.message).to.equal("User created");
    expect(response.data).to.have.property("user");
    expect(response.data.user).to.have.property("id");

    customer1Id = response.data.user.id;
  });

  it("3. Create Customer 2 - Register second customer account", async () => {
    const timestamp = (Date.now() + 11).toString().slice(-8);
    customer2Phone = `018${timestamp}`;
    customer2Email = `customer2_${timestamp}@gmail.com`;

    const payload = {
      name: "Tamim Iqbal",
      email: customer2Email,
      password: "1234",
      phone_number: customer2Phone,
      nid: `20${timestamp}`,
      role: "Customer",
    };

    const response = await axios.post(
      `${BASE_URL}/user/create`,
      payload,
      getAdminHeaders()
    );

    console.log("Customer 2 Created Response:", response.data);
    expect(response.status).to.equal(201);
    expect(response.data.message).to.equal("User created");
    expect(response.data).to.have.property("user");
    expect(response.data.user).to.have.property("id");

    customer2Id = response.data.user.id;
  });

  it("4. Create Agent - Register agent account", async () => {
    const timestamp = (Date.now() + 22).toString().slice(-8);
    agentPhone = `019${timestamp}`;
    agentEmail = `agent_${timestamp}@gmail.com`;

    const payload = {
      name: "Rahim Store Agent",
      email: agentEmail,
      password: "1234",
      phone_number: agentPhone,
      nid: `21${timestamp}`,
      role: "Agent",
    };

    const response = await axios.post(
      `${BASE_URL}/user/create`,
      payload,
      getAdminHeaders()
    );

    console.log("Agent Created Response:", response.data);
    expect(response.status).to.equal(201);
    expect(response.data.message).to.equal("User created");
    expect(response.data).to.have.property("user");
    expect(response.data.user).to.have.property("id");

    agentId = response.data.user.id;
  });

  it("5. Create Merchant - Register merchant account", async () => {
    const timestamp = (Date.now() + 33).toString().slice(-8);
    merchantPhone = `013${timestamp}`;
    merchantEmail = `merchant_${timestamp}@gmail.com`;

    const payload = {
      name: "Apex Footwear Merchant",
      email: merchantEmail,
      password: "1234",
      phone_number: merchantPhone,
      nid: `22${timestamp}`,
      role: "Merchant",
    };

    const response = await axios.post(
      `${BASE_URL}/user/create`,
      payload,
      getAdminHeaders()
    );

    console.log("Merchant Created Response:", response.data);
    expect(response.status).to.equal(201);
    expect(response.data.message).to.equal("User created");
    expect(response.data).to.have.property("user");
    expect(response.data.user).to.have.property("id");

    merchantId = response.data.user.id;
  });

  // --- Phase 2: User Account Activation via Admin API ---

  it("6. Activate Customer 1 - Update account status to active", async () => {
    const response = await axios.patch(
      `${BASE_URL}/user/update/${customer1Id}`,
      { status: "active" },
      getAdminHeaders()
    );

    console.log("Customer 1 Activation Response:", response.data);
    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal("User updated successfully");
  });

  it("7. Activate Customer 2 - Update account status to active", async () => {
    const response = await axios.patch(
      `${BASE_URL}/user/update/${customer2Id}`,
      { status: "active" },
      getAdminHeaders()
    );

    console.log("Customer 2 Activation Response:", response.data);
    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal("User updated successfully");
  });

  it("8. Activate Agent - Update account status to active", async () => {
    const response = await axios.patch(
      `${BASE_URL}/user/update/${agentId}`,
      { status: "active" },
      getAdminHeaders()
    );

    console.log("Agent Activation Response:", response.data);
    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal("User updated successfully");
  });

  it("9. Activate Merchant - Update account status to active", async () => {
    const response = await axios.patch(
      `${BASE_URL}/user/update/${merchantId}`,
      { status: "active" },
      getAdminHeaders()
    );

    console.log("Merchant Activation Response:", response.data);
    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal("User updated successfully");
  });

  // --- Phase 3: System Liquidity & Agent Onboarding ---

  it("10. System Login - Authenticate system master account", async () => {
    const response = await axios.post(`${BASE_URL}/user/login`, {
      email: "system@dmoney.com",
      password: "1234",
    });

    console.log("System Login Response:", response.data);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("token");
    expect(response.data.message).to.equal("Login successful");

    systemToken = response.data.token;
  });

  it("11. System Deposit to Agent - Deposit 5,000 BDT to Agent account", async () => {
    const response = await axios.post(
      `${BASE_URL}/transaction/deposit`,
      {
        from_account: "SYSTEM",
        to_account: agentPhone,
        amount: 5000,
      },
      {
        headers: {
          Authorization: `Bearer ${systemToken}`,
          "X-AUTH-SECRET-KEY": PARTNER_KEY,
        },
      }
    );

    console.log("System Deposit Response:", response.data);
    expect(response.status).to.equal(201);
    expect(response.data.message).to.equal("SYSTEM deposit to Agent successful");
    expect(response.data.amount).to.equal(5000);
    expect(response.data.agentBalance).to.equal(5000);
    expect(response.data).to.have.property("trnxId");
  });

  it("12. Agent Login - Authenticate Agent credentials", async () => {
    const response = await axios.post(`${BASE_URL}/user/login`, {
      email: agentPhone,
      password: "1234",
    });

    console.log("Agent Login Response:", response.data);
    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal("OTP sent to your registered email address");
  });

  it("13. Search Agent by ID - Retrieve generated OTP from Admin API", async () => {
    const response = await axios.get(
      `${BASE_URL}/user/search/id/${agentId}`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    console.log("Agent Search Response:", response.data);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("user");
    expect(response.data.user).to.have.property("otp");

    agentOtp = response.data.user.otp;
  });

  it("14. Agent Verify OTP - Complete 2FA and obtain Agent token", async () => {
    const response = await axios.post(`${BASE_URL}/user/verify-otp?env=dev`, {
      identifier: agentPhone,
      otp: agentOtp,
    });

    console.log("Agent Verify OTP Response:", response.data);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("token");
    expect(response.data.message).to.equal("Login successful");

    agentToken = response.data.token;
  });

  // --- Phase 4: Financial Transactions & Fee Assertions ---

  it("15. Agent Deposit to Customer 1 - Deposit 2,000 BDT & Assert Commission", async () => {
    const response = await axios.post(
      `${BASE_URL}/transaction/deposit`,
      {
        from_account: agentPhone,
        to_account: customer1Phone,
        amount: 2000,
      },
      {
        headers: {
          Authorization: `Bearer ${agentToken}`,
          "X-AUTH-SECRET-KEY": PARTNER_KEY,
        },
      }
    );

    console.log("Agent Deposit to Customer 1 Response:", response.data);
    expect(response.status).to.equal(201);
    expect(response.data.message).to.equal("Deposit successful");
    expect(response.data).to.have.property("trnxId");

    // Commission Verification: 2000 * 2.5% = 50 BDT
    expect(response.data.commission).to.equal(50);
    // Agent remaining balance: 5000 - 2000 + 50 (commission) = 3050 BDT
    expect(response.data.currentBalance).to.equal(3050);
  });

  it("16. Customer 1 Login - Authenticate Customer 1 credentials", async () => {
    const response = await axios.post(`${BASE_URL}/user/login`, {
      email: customer1Phone,
      password: "1234",
    });

    console.log("Customer 1 Login Response:", response.data);
    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal("OTP sent to your registered email address");
  });

  it("17. Search Customer 1 by ID - Retrieve generated OTP from Admin API", async () => {
    const response = await axios.get(
      `${BASE_URL}/user/search/id/${customer1Id}`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    console.log("Customer 1 Search Response:", response.data);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("user");
    expect(response.data.user).to.have.property("otp");

    customer1Otp = response.data.user.otp;
  });

  it("18. Customer 1 Verify OTP - Complete 2FA and obtain Customer 1 token", async () => {
    const response = await axios.post(`${BASE_URL}/user/verify-otp?env=dev`, {
      identifier: customer1Phone,
      otp: customer1Otp,
    });

    console.log("Customer 1 Verify OTP Response:", response.data);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("token");
    expect(response.data.message).to.equal("Login successful");

    customer1Token = response.data.token;
  });

  it("19. Customer 1 Send Money to Customer 2 - Transfer 1,000 BDT & Assert Service Fee", async () => {
    const response = await axios.post(
      `${BASE_URL}/transaction/sendmoney`,
      {
        from_account: customer1Phone,
        to_account: customer2Phone,
        amount: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${customer1Token}`,
          "X-AUTH-SECRET-KEY": PARTNER_KEY,
        },
      }
    );

    console.log("Customer 1 Send Money Response:", response.data);
    expect(response.status).to.equal(201);
    expect(response.data.message).to.equal("Send money successful");
    expect(response.data).to.have.property("trnxId");

    // Service Fee Verification: 5 BDT flat fee
    expect(response.data.fee).to.equal(5);
    // Customer 1 remaining balance: 2000 - 1000 - 5 = 995 BDT
    expect(response.data.currentBalance).to.equal(995);
  });

  it("20. Customer 2 Login - Authenticate Customer 2 credentials", async () => {
    const response = await axios.post(`${BASE_URL}/user/login`, {
      email: customer2Phone,
      password: "1234",
    });

    console.log("Customer 2 Login Response:", response.data);
    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal("OTP sent to your registered email address");
  });

  it("21. Search Customer 2 by ID - Retrieve generated OTP from Admin API", async () => {
    const response = await axios.get(
      `${BASE_URL}/user/search/id/${customer2Id}`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    console.log("Customer 2 Search Response:", response.data);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("user");
    expect(response.data.user).to.have.property("otp");

    customer2Otp = response.data.user.otp;
  });

  it("22. Customer 2 Verify OTP - Complete 2FA and obtain Customer 2 token", async () => {
    const response = await axios.post(`${BASE_URL}/user/verify-otp?env=dev`, {
      identifier: customer2Phone,
      otp: customer2Otp,
    });

    console.log("Customer 2 Verify OTP Response:", response.data);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("token");
    expect(response.data.message).to.equal("Login successful");

    customer2Token = response.data.token;
  });

  it("23. Customer 2 Cashout to Agent - Withdraw 500 BDT & Assert Service Fee", async () => {
    const response = await axios.post(
      `${BASE_URL}/transaction/withdraw`,
      {
        from_account: customer2Phone,
        to_account: agentPhone,
        amount: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${customer2Token}`,
          "X-AUTH-SECRET-KEY": PARTNER_KEY,
        },
      }
    );

    console.log("Customer 2 Cashout Response:", response.data);
    expect(response.status).to.equal(201);
    expect(response.data.message).to.equal("Withdraw successful");
    expect(response.data).to.have.property("trnxId");

    // Service Fee Verification: 5 BDT
    expect(response.data.fee).to.equal(5);
    // Customer 2 remaining balance: 1000 - 500 - 5 = 495 BDT
    expect(response.data.currentBalance).to.equal(495);
  });

  it("24. Customer 2 Pay Merchant - Payment of 400 BDT & Assert Deducted Fee", async () => {
    const response = await axios.post(
      `${BASE_URL}/transaction/payment`,
      {
        from_account: customer2Phone,
        to_account: merchantPhone,
        amount: 400,
      },
      {
        headers: {
          Authorization: `Bearer ${customer2Token}`,
          "X-AUTH-SECRET-KEY": PARTNER_KEY,
        },
      }
    );

    console.log("Customer 2 Merchant Payment Response:", response.data);
    expect(response.status).to.equal(201);
    expect(response.data.message).to.equal("Payment successful");
    expect(response.data).to.have.property("trnxId");

    // Service Fee Verification: 5 BDT
    expect(response.data.fee).to.equal(5);
    // Customer 2 remaining balance: 495 - 400 - 5 = 90 BDT
    expect(response.data.currentBalance).to.equal(90);
  });
});
