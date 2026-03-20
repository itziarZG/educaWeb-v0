export const mockSupabaseClient = {
  auth: {
    getUser: jest.fn(),
    signUp: jest.fn(),
    signInWithPassword: jest.fn(),
    signOut: jest.fn(),
  },
  from: jest.fn(),
  storage: {
    from: jest.fn(),
  },
};

export const mockSupabaseQuery = {
  select: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  eq: jest.fn(),
  order: jest.fn(),
  limit: jest.fn(),
  offset: jest.fn(),
};

export function setupMockSupabaseQuery() {
  Object.keys(mockSupabaseQuery).forEach((method) => {
    const fn = mockSupabaseQuery[method as keyof typeof mockSupabaseQuery];
    if (typeof fn === 'function') {
      fn.mockReturnValue(mockSupabaseQuery);
    }
  });

  // Make all methods chainable
  Object.values(mockSupabaseQuery).forEach((fn) => {
    if (typeof fn === 'function') {
      fn.mockReturnValue(mockSupabaseQuery);
    }
  });

  return mockSupabaseQuery;
}
