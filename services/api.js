// Mock API Service - All API functions in one place
class MockApiService {
  constructor() {
    this.users = JSON.parse(localStorage.getItem("mockUsers")) || [];
    this.nextId = this.users.length + 1;
    this.products = JSON.parse(localStorage.getItem("mockProducts")) || [];
    this.delay = 500; // Simulate network delay
  }

  // Simulate API call delay
  async simulateApiCall(ms = this.delay) {
    console.log(`🔄 API: Simulating ${ms}ms delay...`);
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Save users to localStorage
  _saveUsers() {
    localStorage.setItem("mockUsers", JSON.stringify(this.users));
  }

  // Save products to localStorage
  _saveProducts() {
    localStorage.setItem("mockProducts", JSON.stringify(this.products));
  }

  // Generate mock JWT token
  _generateToken(userId) {
    return `mock_jwt_${userId}_${Date.now()}`;
  }


  // ===== ADD PRODUCT API =====
  async addProduct(productData) {
    console.log("🚀 API: addProduct called with:", productData);
    await this.simulateApiCall();

    if (!productData.name || !productData.category) {
      throw new Error("Missing required fields: name or category");
    }

    if (!productData.batchNumber || !productData.productionDate) {
    throw new Error("Missing required fields: batchNumber or productionDate");
  }

    if (productData.quantity < 0) {
      throw new Error("Quantity cannot be negative");
    }

    const newProduct = {
      id: `mock-product-${this.products.length + 1}`,
      name: productData.name,
      category: productData.category,
      quantity: productData.quantity || 0,
      manufacturer: productData.manufacturer || "Unknown",
      batchNumber: productData.batchNumber,
      productionDate: productData.productionDate,
      expiryDate: productData.expiryDate || null,
      createdAt: new Date().toISOString(),
    };

    this.products.push(newProduct);
    this._saveProducts();

    console.log("✅ API: Product added successfully:", newProduct);
    return newProduct;
  }

  // ===== REGISTRATION APIs =====

  /**
   * Register a new organization
   * @param {Object} userData - Organization data
   * @param {string} userData.username - Username
   * @param {string} userData.organizationName - Organization name
   * @param {string} userData.email - Email
   * @param {string} userData.password - Password
   * @param {string} userData.industry - Industry
   * @param {string} userData.size - Organization size
   * @param {string} userData.website - Website URL
   * @returns {Object} Registration response with token
   */
  async registerOrganization(userData) {
    console.log("🚀 API: registerOrganization called with:", userData);
    await this.simulateApiCall();

    // Validate required fields
    if (
      !userData.username ||
      !userData.organizationName ||
      !userData.email ||
      !userData.password
    ) {
      console.error("❌ API: Missing required fields");
      throw new Error("Missing required fields");
    }

    // Check if username already exists
    if (this.users.some((user) => user.username === userData.username)) {
      console.error("❌ API: Username already registered:", userData.username);
      throw new Error("Username already registered");
    }

    // Check if email already exists
    if (this.users.some((user) => user.email === userData.email)) {
      console.error("❌ API: Email already registered:", userData.email);
      throw new Error("Email already registered");
    }

    // Create new organization user
    const newUser = {
      id: this.nextId,
      username: userData.username,
      organizationName: userData.organizationName,
      email: userData.email,
      password: userData.password,
      industry: userData.industry || "",
      size: userData.size || "",
      website: userData.website || "",
      userType: "organization",
      walletAddress: null,
      createdAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    this.nextId++;
    this._saveUsers();

    const response = {
      access_token: this._generateToken(newUser.id),
      token_type: "bearer",
      user_type: "organization",
      username: newUser.username,
      user: newUser,
    };

    console.log("✅ API: Organization registered successfully:", {
      id: newUser.id,
      username: newUser.username,
      organizationName: newUser.organizationName,
    });

    return response;
  }

  /**
   * Register a new wallet user
   * @param {Object} walletData - Wallet data
   * @param {string} walletData.walletAddress - Wallet address
   * @param {string} walletData.userType - User type (default: 'organization')
   * @returns {Object} Registration response with token
   */
  async registerWallet(walletData) {
    console.log("🚀 API: registerWallet called with:", walletData);
    await this.simulateApiCall();

    if (!walletData.walletAddress) {
      console.error("❌ API: Wallet address is required");
      throw new Error("Wallet address is required");
    }

    // Check if wallet already exists
    if (
      this.users.some((user) => user.walletAddress === walletData.walletAddress)
    ) {
      console.error(
        "❌ API: Wallet already registered:",
        walletData.walletAddress
      );
      throw new Error("Wallet already registered");
    }

    // Create new wallet user
    const newUser = {
      id: this.nextId,
      username: `wallet_${walletData.walletAddress.slice(0, 8)}`,
      walletAddress: walletData.walletAddress,
      userType: walletData.userType || "organization",
      createdAt: new Date().toISOString(),
      organizationName: null,
      email: null,
      password: null,
    };

    this.users.push(newUser);
    this.nextId++;
    this._saveUsers();

    return {
      access_token: this._generateToken(newUser.id),
      token_type: "bearer",
      user_type: newUser.userType,
      username: newUser.username,
      user: newUser,
    };
  }

  // ===== AUTHENTICATION APIs =====

  /**
   * Login user with username and password
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.username - Username
   * @param {string} credentials.password - Password
   * @returns {Object} Login response with token
   */
  async login(credentials) {
    console.log("🔐 API: login called with:", {
      credentials,
    });
    await this.simulateApiCall();

    const user = this.users.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (!user) {
      console.error(
        "❌ API: Invalid username or password for:",
        credentials.username
      );
      throw new Error("Invalid username or password");
    }

    const response = {
      access_token: this._generateToken(user.id),
      token_type: "bearer",
      user_type: user.userType,
      username: user.username,
      user: user,
    };

    console.log("✅ API: Login successful for:", user.username);

    return response;
  }

  /**
   * Login user with wallet address and signature
   * @param {Object} walletData - Wallet login data
   * @param {string} walletData.walletAddress - Wallet address
   * @param {string} walletData.signature - Signature from wallet
   * @param {string} walletData.message - Original message that was signed
   * @returns {Object} Login response with token
   */
  async loginWithWallet(walletData) {
    console.log("🔐 API: loginWithWallet called with:", {
      walletAddress: walletData.walletAddress,
      message: walletData.message,
    });
    await this.simulateApiCall();

    if (!walletData.walletAddress) {
      console.error("❌ API: Wallet address is required");
      throw new Error("Wallet address is required");
    }

    if (!walletData.signature) {
      console.error("❌ API: Wallet signature is required");
      throw new Error("Wallet signature is required");
    }

    // Find user by wallet address
    const user = this.users.find(
      (u) => u.walletAddress === walletData.walletAddress
    );

    if (!user) {
      console.error("❌ API: Wallet not registered:", walletData.walletAddress);
      throw new Error("Wallet not registered. Please register first.");
    }

    // In a real app, you would verify the signature here
    // For mock purposes, we'll just check if the signature exists
    if (walletData.signature.length < 10) {
      console.error("❌ API: Invalid signature format");
      throw new Error("Invalid signature");
    }

    const response = {
      access_token: this._generateToken(user.id),
      token_type: "bearer",
      user_type: user.userType,
      username: user.username,
      user: user,
    };

    console.log("✅ API: Wallet login successful for:", user.username);

    return response;
  }

  // ===== USER MANAGEMENT APIs =====

  /**
   * Get all users (for testing/admin purposes)
   * @returns {Array} Array of all users
   */
  async getUsers() {
    await this.simulateApiCall();
    return this.users;
  }

  /**
   * Get user by ID
   * @param {number} id - User ID
   * @returns {Object|null} User object or null if not found
   */
  async getUserById(id) {
    await this.simulateApiCall();
    return this.users.find((user) => user.id === id);
  }

  /**
   * Get user by username
   * @param {string} username - Username
   * @returns {Object|null} User object or null if not found
   */
  async getUserByUsername(username) {
    await this.simulateApiCall();
    return this.users.find((user) => user.username === username);
  }

  /**
   * Get user by wallet address
   * @param {string} walletAddress - Wallet address
   * @returns {Object|null} User object or null if not found
   */
  async getUserByWallet(walletAddress) {
    await this.simulateApiCall();
    return this.users.find((user) => user.walletAddress === walletAddress);
  }

  // ===== UTILITY APIs =====

  /**
   * Clear all mock data (for testing)
   * @returns {Object} Success message
   */
  async clearMockData() {
    await this.simulateApiCall();
    this.users = [];
    this.nextId = 1;
    localStorage.removeItem("mockUsers");
    return { message: "Mock data cleared successfully" };
  }

  /**
   * Get mock data statistics
   * @returns {Object} Statistics about mock data
   */
  async getMockStats() {
    await this.simulateApiCall();
    return {
      totalUsers: this.users.length,
      organizationUsers: this.users.filter((u) => u.userType === "organization")
        .length,
      walletUsers: this.users.filter((u) => u.walletAddress).length,
      nextId: this.nextId,
    };
  }
}

// Create and export a single instance
const mockApi = new MockApiService();
export default mockApi;

// Also export the class for testing purposes
export { MockApiService };
