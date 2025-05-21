// This file provides mock implementations for Reown modules
// to prevent errors when the actual modules are not available

export const createMockReownModule = () => {
  return {
    init: () => Promise.resolve(),
    connect: () => Promise.resolve(),
    disconnect: () => Promise.resolve(),
    isConnected: () => false,
    getAddress: () => null,
    on: () => {},
    off: () => {},
  };
};

// Export a mock implementation that can be used as a fallback
export const mockReownAppKit = {
  init: () => Promise.resolve(),
  connect: () => Promise.resolve({ address: '0x0000000000000000000000000000000000000000' }),
  disconnect: () => Promise.resolve(),
  isConnected: () => false,
  getAddress: () => null,
  on: () => {},
  off: () => {},
};

// Mock wallet provider
export const mockWalletProvider = {
  connect: async () => ({ address: '0x0000000000000000000000000000000000000000' }),
  disconnect: async () => {},
  isConnected: () => false,
  getAddress: () => null,
};