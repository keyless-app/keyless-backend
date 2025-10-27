// In a production environment, this would validate against a database
// For MVP, we'll use an in-memory store with some sample API keys

interface ApiKeyInfo {
  userId: string;
  permissions: string[];
  createdAt: Date;
  lastUsed: Date;
  isActive: boolean;
  rateLimit: number;
}

// In-memory store for API keys (replace with database in production)
const apiKeyStore = new Map<string, ApiKeyInfo>();

// Initialize with some sample API keys for testing
const initializeSampleApiKeys = () => {
  // Sample API key: keyless_live_1234567890abcdef
  apiKeyStore.set("keyless_live_1234567890abcdef", {
    userId: "user_001",
    permissions: ["read:generation", "read:points", "read:stats"],
    createdAt: new Date("2024-01-01"),
    lastUsed: new Date(),
    isActive: true,
    rateLimit: 100,
  });

  // Sample API key: keyless_live_0987654321fedcba
  apiKeyStore.set("keyless_live_0987654321fedcba", {
    userId: "user_002",
    permissions: [
      "read:generation",
      "read:points",
      "write:generation",
      "write:contributions",
    ],
    createdAt: new Date("2024-01-01"),
    lastUsed: new Date(),
    isActive: true,
    rateLimit: 1000,
  });

  // Sample API key: keyless_live_admin_superuser
  apiKeyStore.set("keyless_live_admin_superuser", {
    userId: "admin_001",
    permissions: ["*"], // All permissions
    createdAt: new Date("2024-01-01"),
    lastUsed: new Date(),
    isActive: true,
    rateLimit: 10000,
  });
};

// Initialize sample API keys
initializeSampleApiKeys();

export interface ApiKeyValidationResult {
  valid: boolean;
  userId?: string;
  permissions?: string[];
  message?: string;
  rateLimit?: number;
}

export const validateApiKey = async (
  apiKey: string
): Promise<ApiKeyValidationResult> => {
  try {
    // Check if API key exists
    const keyInfo = apiKeyStore.get(apiKey);

    if (!keyInfo) {
      return {
        valid: false,
        message: "API key not found",
      };
    }

    // Check if API key is active
    if (!keyInfo.isActive) {
      return {
        valid: false,
        message: "API key is deactivated",
      };
    }

    // Update last used timestamp
    keyInfo.lastUsed = new Date();
    apiKeyStore.set(apiKey, keyInfo);

    return {
      valid: true,
      userId: keyInfo.userId,
      permissions: keyInfo.permissions,
      rateLimit: keyInfo.rateLimit,
    };
  } catch (error) {
    console.error("API key validation error:", error);
    return {
      valid: false,
      message: "Error validating API key",
    };
  }
};

export const createApiKey = async (
  userId: string,
  permissions: string[]
): Promise<string> => {
  try {
    // Generate a new API key
    const apiKey = `keyless_live_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 15)}`;

    const keyInfo: ApiKeyInfo = {
      userId,
      permissions,
      createdAt: new Date(),
      lastUsed: new Date(),
      isActive: true,
      rateLimit: 100, // Default rate limit
    };

    apiKeyStore.set(apiKey, keyInfo);

    return apiKey;
  } catch (error) {
    console.error("Error creating API key:", error);
    throw new Error("Failed to create API key");
  }
};

export const revokeApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    const keyInfo = apiKeyStore.get(apiKey);

    if (!keyInfo) {
      return false;
    }

    keyInfo.isActive = false;
    apiKeyStore.set(apiKey, keyInfo);

    return true;
  } catch (error) {
    console.error("Error revoking API key:", error);
    return false;
  }
};

export const getApiKeyInfo = async (
  apiKey: string
): Promise<ApiKeyInfo | null> => {
  try {
    return apiKeyStore.get(apiKey) || null;
  } catch (error) {
    console.error("Error getting API key info:", error);
    return null;
  }
};

export const updateApiKeyPermissions = async (
  apiKey: string,
  permissions: string[]
): Promise<boolean> => {
  try {
    const keyInfo = apiKeyStore.get(apiKey);

    if (!keyInfo) {
      return false;
    }

    keyInfo.permissions = permissions;
    apiKeyStore.set(apiKey, keyInfo);

    return true;
  } catch (error) {
    console.error("Error updating API key permissions:", error);
    return false;
  }
};
